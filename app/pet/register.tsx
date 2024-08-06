import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from "react-hook-form"
import { StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { PetView } from '@/components/PetView'
import { PetText } from '@/components/PetText'
import { PetTitle } from '@/components/PetTitle'
import { PetButton } from '@/components/PetButton'
import { PetTextInput } from '@/components/PetTextInput'

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
  const onSubmit = (data: PetFormData) => console.log(data)

  const goToHome = () => {
    router.back()
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.scrollView}
      scrollEnabled={true}
    >
      <PetView style={{ alignItems: 'center', justifyContent: 'center', gap: 5 }}>
        <PetTitle type='subtitle' >Pet Details</PetTitle>
        <Controller
          control={control}
          rules={{ required: true }}
          name="petName"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder='Pet name, e.g. coco'
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
              placeholder='Pet type, e.g. dog'
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
              placeholder='Pet gender, e.g. male'
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
              placeholder='Pet breed, e.g. bulldog'
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
              placeholder='Pet age, e.g. 3 years'
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
              placeholder='Medical Condition, e.g. Allergy'
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        <PetTitle type='subtitle'>Owner's Details</PetTitle>
        <Controller
          control={control}
          rules={{ required: true }}
          name="ownerName"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              placeholder="Owner's name"
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
              placeholder="Owner's cell phone"
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
              placeholder="Owner's email"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.ownerEmail && <PetText type='smallText' style={{ color: 'red' }}>Owner's Email is required</PetText>}

        <PetButton onPress={handleSubmit(onSubmit)} iconName='save' buttonName='Save' />
        <PetTitle type='link' onPress={goToHome} style={{ textDecorationLine: 'underline' }}>Back to Home</PetTitle>

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
