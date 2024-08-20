import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useColorScheme, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { PetButton } from '@/components/PetButton';
import { PetImageViewer } from '@/components/PetImageViewer';
import { PetText } from '@/components/PetText';
import { PetTextInput } from '@/components/PetTextInput';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { localization } from '@/localizations/localization';

const placeholderImageDark = require('../../assets/images/pet-image-dark.png');
const placeholderImageLight = require('../../assets/images/pet-image-light.png');

type PetFormData = {
  pet_name: string;
  pet_type: string;
  pet_gender: string;
  pet_breed: string;
  pet_age: string;
  pet_medical_condition: string;
  // owner_name: string;
  // owner_cell_phone: string;
  // owner_email: string;
};

const PetRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PetFormData>({
    defaultValues: {
      pet_name: '',
      pet_type: '',
      pet_gender: '',
      pet_breed: '',
      pet_age: '',
      pet_medical_condition: '',
      // owner_name: '',
      // owner_cell_phone: '',
      // owner_email: '',
    },
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
    console.log("values=>", values);
  };

  const goToHome = () => {
    router.back();
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    console.log('result=>', result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert('Error', 'You did not select any image.');
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.scrollView}
      scrollEnabled>
      <PetView style={{ alignItems: 'center', justifyContent: 'center', gap: 5 }}>
        <PetTitle type="subtitle">{localization.t('pet_register_title')}</PetTitle>
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
          <PetText type="smallText" style={{ color: 'red' }}>
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
          <PetText type="smallText" style={{ color: 'red' }}>
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
          <PetText type="smallText" style={{ color: 'red' }}>
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
          <PetText type="smallText" style={{ color: 'red' }}>
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
          <PetText type="smallText" style={{ color: 'red' }}>
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
        {/* <PetTitle type="subtitle">{localization.t('pet_register_owner_detail')}</PetTitle>
        <Controller
          control={control}
          rules={{ required: true }}
          name="owner_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t('pet_register_owner_name')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.owner_name && (
          <PetText type="smallText" style={{ color: 'red' }}>
            Owner's name is required
          </PetText>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          name="owner_cell_phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t('pet_register_owner_cell_phone')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.owner_cell_phone && (
          <PetText type="smallText" style={{ color: 'red' }}>
            Owner's Cell Phone is required
          </PetText>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          name="owner_email"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t('pet_register_owner_email')}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.owner_email && (
          <PetText type="smallText" style={{ color: 'red' }}>
            Owner's Email is required
          </PetText>
        )} */}

        <PetButton
          onPress={handleSubmit(onSubmit)}
          iconName="save"
          buttonName={localization.t('pet_register_save_button')}
        />
        {/* <PetTitle type="link" onPress={goToHome} style={{ textDecorationLine: 'underline' }}>
          {localization.t('pet_register_back_to_home')}
        </PetTitle> */}
      </PetView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default PetRegister;
