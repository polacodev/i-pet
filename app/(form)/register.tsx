import { readAsStringAsync } from 'expo-file-system';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useColorScheme, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { PetButton } from '@/components/PetButton';
import { PetDropdown } from '@/components/PetDropdown';
import { PetImageViewer } from '@/components/PetImageViewer';
import { PetText } from '@/components/PetText';
import { PetTextInput } from '@/components/PetTextInput';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { useUser } from '@/components/context/UserContext';
import { petTypeData, petGenderData } from '@/constants/constants';
import { getPetList, insertPet, storePetImage } from '@/lib/api';
import { localization } from '@/localizations/localization';
import { useToastStore, usePetStore } from '@/store/store';

const placeholderImageDark = require('../../assets/images/pet-image-dark.png');
const placeholderImageLight = require('../../assets/images/pet-image-light.png');

type PetFormData = {
  pet_image: string;
  pet_name: string;
  pet_type: string;
  pet_gender: string;
  pet_breed: string;
  pet_age: string;
  pet_medical_condition: string;
};

const PetRegister = () => {
  const { user } = useUser();
  const { setToast } = useToastStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<PetFormData>({
    defaultValues: {
      pet_image: '',
      pet_name: '',
      pet_type: '',
      pet_gender: '',
      pet_breed: '',
      pet_age: '',
      pet_medical_condition: 'NA',
    },
  });

  const { setPetList } = usePetStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageObj, setImageObj] = useState<any>({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const theme = useColorScheme() ?? 'light';

  const isDark =
    theme === 'light' ? (
      <PetImageViewer
        placeholderImageSource={placeholderImageLight}
        selectedImage={selectedImage}
      />
    ) : (
      <PetImageViewer placeholderImageSource={placeholderImageDark} selectedImage={selectedImage} />
    );

  const onSubmit = async (values: PetFormData) => {
    setSubmitLoading(true);
    if (!selectedImage) {
      setError('pet_image', {
        type: 'manual',
        message: 'Image is required',
      });
      setSubmitLoading(false);
      return;
    }

    const img = imageObj;
    const base64 = await readAsStringAsync(img.uri, { encoding: 'base64' });
    const fileExt = img.uri?.split('.').pop();
    const filePath = `${Date.now()}.${fileExt}`;
    const contentType = 'image/jpeg';

    try {
      const { error: errorImage } = await storePetImage(filePath, base64, contentType);
      if (errorImage) Alert.alert('Error uploading image', errorImage.message);

      const imageUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pets/${filePath}`;

      const newPet = {
        user_id: user?.id,
        pet_image: imageUrl,
        pet_name: values.pet_name,
        pet_type: values.pet_type,
        pet_gender: values.pet_gender,
        pet_breed: values.pet_breed,
        pet_age: values.pet_age,
        pet_medical_condition: values.pet_medical_condition,
        inserted_at: new Date(),
      };

      const { error } = await insertPet(newPet);
      if (error) Alert.alert('Error creating pet', error.message);

      setToast({ isVisible: true, message: 'Pet has been created successfully!' });
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      const { data, error } = await getPetList(user?.id);
      if (error) Alert.alert(error.message);
      setPetList(data);
    }

    setSubmitLoading(false);
    reset();
    setSelectedImage(null);
  };

  const pickImageAsync = async () => {
    const { canceled, assets } = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!canceled) {
      setSelectedImage(assets[0].uri);
      setImageObj(assets[0]);
      clearErrors('pet_image');
    } else {
      Alert.alert('You did not select any image.');
    }
  };

  if (submitLoading) {
    return (
      <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <PetText>processing...</PetText>
      </PetView>
    );
  }
  return (
    <PetView style={{ width: '100%' }}>
      <PetView style={{ alignItems: 'center', gap: 5 }}>
        <PetTitle type="subtitle">{localization.t('pet_register_title')}</PetTitle>
        <TouchableOpacity
          testID="register-pet-image"
          onPress={pickImageAsync}
          style={{ flexDirection: 'column', alignItems: 'center' }}>
          {isDark}
        </TouchableOpacity>
        {errors.pet_image && (
          <PetText
            testID="register-pet-image-error"
            type="smallText"
            style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.pet_image.message}
          </PetText>
        )}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'pet name is required' },
            minLength: { value: 3, message: 'min length is 3' },
            maxLength: { value: 20, message: 'max length is 20' },
          }}
          name="pet_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              testID="register-pet-name"
              placeholder={localization.t('pet_register_pet_name')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.pet_name && (
          <PetText
            testID="register-pet-name-error"
            type="smallText"
            style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.pet_name.message}
          </PetText>
        )}
        <Controller
          control={control}
          rules={{ required: { value: true, message: 'Pet type is required' } }}
          name="pet_type"
          render={({ field: { onChange, value } }) => (
            <PetDropdown
              onChange={onChange}
              value={value}
              data={Object.values(petTypeData)}
              placeholder="Select pet type"
            />
          )}
        />
        {errors.pet_type && (
          <PetText
            testID="register-pet-type-error"
            type="smallText"
            style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.pet_type.message}
          </PetText>
        )}
        <Controller
          control={control}
          rules={{ required: { value: true, message: 'Pet gender is required' } }}
          name="pet_gender"
          render={({ field: { onChange, value } }) => (
            <PetDropdown
              onChange={onChange}
              value={value}
              data={Object.values(petGenderData)}
              placeholder="Select pet gender"
            />
          )}
        />
        {errors.pet_gender && (
          <PetText
            testID="register-pet-gender-error"
            type="smallText"
            style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.pet_gender.message}
          </PetText>
        )}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'pet breed is required' },
            minLength: { value: 3, message: 'min length is 3' },
            maxLength: { value: 30, message: 'max length is 30' },
          }}
          name="pet_breed"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              testID="register-pet-breed"
              placeholder={localization.t('pet_register_pet_breed')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.pet_breed && (
          <PetText
            testID="register-pet-breed-error"
            type="smallText"
            style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.pet_breed.message}
          </PetText>
        )}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'pet age is required' },
            minLength: { value: 3, message: 'min length is 3' },
            maxLength: { value: 30, message: 'max length is 20' },
          }}
          name="pet_age"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              testID="register-pet-age"
              placeholder={localization.t('pet_register_pet_age')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.pet_age && (
          <PetText
            testID="register-pet-age-error"
            type="smallText"
            style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.pet_age.message}
          </PetText>
        )}
        <Controller
          control={control}
          rules={{ required: false }}
          name="pet_medical_condition"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              testID="register-pet-medical-condition"
              placeholder={localization.t('pet_register_pet_medical_condition')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <PetButton
          onPress={handleSubmit(onSubmit)}
          iconName="save"
          buttonName={localization.t('pet_register_save_button')}
        />
      </PetView>
    </PetView>
  );
};

export default PetRegister;
