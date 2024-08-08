import React, { useState } from 'react'
import { useColorScheme, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from "react-hook-form"
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router'
import { PetView } from '@/components/PetView'
import { PetText } from '@/components/PetText'
import { PetTitle } from '@/components/PetTitle'
import { PetButton } from '@/components/PetButton'
import { PetTextInput } from '@/components/PetTextInput'
import { PetImageViewer } from '@/components/PetImageViewer'

import { localization } from '@/localizations/localization';

const placeholderImageLight = require('../../assets/images/pet-image-light.png');
const placeholderImageDark = require('../../assets/images/pet-image-dark.png');

type PetFormData = {
  petName: string,
  petType: string,
  petGender: string,
  petBreed: string,
  petAge: string,
  petMedicalCondition: string,
  ownerName: string,
  ownerCellPhone: string,
  ownerEmail: string,
}

const PetRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PetFormData>({
    defaultValues: {
      petName: "",
      petType: "",
      petGender: "",
      petBreed: "",
      petAge: "",
      petMedicalCondition: "",
      ownerName: "",
      ownerCellPhone: "",
      ownerEmail: "",
    },
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'light' ?
    <PetImageViewer placeholderImageSource={placeholderImageLight} selectedImage={selectedImage} /> :
    <PetImageViewer placeholderImageSource={placeholderImageDark} selectedImage={selectedImage} />;

  const onSubmit = (data: PetFormData) => console.log(data)

  const goToHome = () => {
    router.back()
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    console.log("result=>", result)

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert("Error", "You did not select any image.");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.scrollView}
      scrollEnabled={true}
    >
      <PetView style={{ alignItems: 'center', justifyContent: 'center', gap: 5 }}>
        <PetTitle type='subtitle'>{localization.t("pet_register_title")}</PetTitle>
        {
          !selectedImage ?
            <TouchableOpacity onPress={pickImageAsync} style={{ flexDirection: 'column', alignItems: 'center' }}>
              {isDark}
            </TouchableOpacity> :
            <TouchableOpacity onPress={pickImageAsync} style={{ flexDirection: 'column', alignItems: 'center' }}>
              {isDark}
            </TouchableOpacity>
        }
        <Controller
          control={control}
          rules={{ required: true }}
          name="petName"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t("pet_register_pet_name")}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.petName && <PetText type='smallText' style={{ color: 'red' }}>Pet name is required</PetText>}
        <Controller
          control={control}
          rules={{ required: true }}
          name="petType"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t("pet_register_pet_type")}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.petType && <PetText type='smallText' style={{ color: 'red' }}>Pet type is required</PetText>}
        <Controller
          control={control}
          rules={{ required: true }}
          name="petGender"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t("pet_register_pet_gender")}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.petGender && <PetText type='smallText' style={{ color: 'red' }}>Pet gender is required</PetText>}
        <Controller
          control={control}
          rules={{ required: true }}
          name="petBreed"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t("pet_register_pet_breed")}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.petBreed && <PetText type='smallText' style={{ color: 'red' }}>Pet breed is required</PetText>}
        <Controller
          control={control}
          rules={{ required: true }}
          name="petAge"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t("pet_register_pet_age")}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.petAge && <PetText type='smallText' style={{ color: 'red' }}>Pet age is required</PetText>}
        <Controller
          control={control}
          rules={{ required: false }}
          name="petMedicalCondition"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t("pet_register_pet_medical_condition")}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <PetTitle type='subtitle'>{localization.t("pet_register_owner_detail")}</PetTitle>
        <Controller
          control={control}
          rules={{ required: true }}
          name="ownerName"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t("pet_register_owner_name")}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.ownerName && <PetText type='smallText' style={{ color: 'red' }}>Owner's name is required</PetText>}
        <Controller
          control={control}
          rules={{ required: true }}
          name="ownerCellPhone"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t("pet_register_owner_cell_phone")}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.ownerCellPhone && <PetText type='smallText' style={{ color: 'red' }}>Owner's Cell Phone is required</PetText>}
        <Controller
          control={control}
          rules={{ required: true }}
          name="ownerEmail"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder={localization.t("pet_register_owner_email")}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.ownerEmail && <PetText type='smallText' style={{ color: 'red' }}>Owner's Email is required</PetText>}

        <PetButton onPress={handleSubmit(onSubmit)} iconName='save' buttonName={localization.t("pet_register_save_button")} />
        <PetTitle type='link' onPress={goToHome} style={{ textDecorationLine: 'underline' }}>{localization.t("pet_register_back_to_home")}</PetTitle>

      </PetView>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  }
});

export default PetRegister
