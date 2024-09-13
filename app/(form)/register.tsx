import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useColorScheme, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { PetButton } from '@/components/PetButton';
import { PetImageViewer } from '@/components/PetImageViewer';
import { PetText } from '@/components/PetText';
import { PetTextInput } from '@/components/PetTextInput';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { useUser } from '@/components/context/UserContext';
import { getPetList } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { localization } from '@/localizations/localization';
import { usePetStore } from '@/store/store';

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
  const { session, user } = useUser();

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
      pet_medical_condition: '',
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

    const fileURL = await uploadImage();
    if (!fileURL) {
      Alert.alert('Failed to upload image');
      setSubmitLoading(false);
      return;
    }

    try {
      const newPet = {
        user_id: user?.id,
        pet_image: fileURL,
        pet_name: values.pet_name,
        pet_type: values.pet_type,
        pet_gender: values.pet_gender,
        pet_breed: values.pet_breed,
        pet_age: values.pet_age,
        pet_medical_condition: values.pet_medical_condition,
        inserted_at: new Date(),
      };

      const { error } = await supabase.from('pets').upsert(newPet);
      if (error) Alert.alert(error.message);
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      const { data, error } = await getPetList(user?.id ?? null);
      if (error) Alert.alert(error.message);
      setPetList(data);
    }

    setSubmitLoading(false);
    reset();
    setSelectedImage(null);
  };

  const uploadImage = async () => {
    try {
      // setUploadingImage(true);

      const img = imageObj;
      const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
      const fileExt = img.uri?.split('.').pop();
      const filePath = `${Date.now()}.${fileExt}`;
      const contentType = img.type === 'image' ? 'image/jpeg' : 'video/mp4';

      const { data, error } = await supabase.storage
        .from('pets')
        .upload(filePath, decode(base64), { contentType });

      if (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Error uploading image:', error);
        return null;
      }
      const imageUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pets/${filePath}`;
      return imageUrl;
    } catch (error) {
      Alert.alert('catch error image:', error);
      // console.error('catch error image:', error);
      return null;
    } finally {
      // setUploadingImage(false);
    }
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setImageObj(result.assets[0]);
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
        <>
          {!selectedImage ? (
            <TouchableOpacity
              onPress={pickImageAsync}
              style={{ flexDirection: 'column', alignItems: 'center' }}>
              {isDark}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={pickImageAsync}
              style={{ flexDirection: 'column', alignItems: 'center' }}>
              {isDark}
            </TouchableOpacity>
          )}
        </>
        {errors.pet_image && (
          <PetText type="smallText" style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.pet_image.message}
          </PetText>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          name="pet_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t('pet_register_pet_name')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.pet_name && (
          <PetText type="smallText" style={{ color: 'red', fontSize: 11, margin: -5 }}>
            Pet name is required
          </PetText>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          name="pet_type"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t('pet_register_pet_type')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.pet_type && (
          <PetText type="smallText" style={{ color: 'red', fontSize: 11, margin: -5 }}>
            Pet type is required
          </PetText>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          name="pet_gender"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t('pet_register_pet_gender')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.pet_gender && (
          <PetText type="smallText" style={{ color: 'red', fontSize: 11, margin: -5 }}>
            Pet gender is required
          </PetText>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          name="pet_breed"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t('pet_register_pet_breed')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.pet_breed && (
          <PetText type="smallText" style={{ color: 'red', fontSize: 11, margin: -5 }}>
            Pet breed is required
          </PetText>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          name="pet_age"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t('pet_register_pet_age')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.pet_age && (
          <PetText type="smallText" style={{ color: 'red', fontSize: 11, margin: -5 }}>
            Pet age is required
          </PetText>
        )}
        <Controller
          control={control}
          rules={{ required: false }}
          name="pet_medical_condition"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
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
