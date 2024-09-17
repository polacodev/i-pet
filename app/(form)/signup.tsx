import { router } from 'expo-router';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert } from 'react-native';

import { PetButton } from '@/components/PetButton';
import { PetText } from '@/components/PetText';
import { PetTextInput } from '@/components/PetTextInput';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { signUpWithEmailPassword, saveUserProfile } from '@/lib/api';
import { localization } from '@/localizations/localization';

type UserSignupFormData = {
  email: string;
  password: string;
  country_code: string;
  phone: string;
};

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignupFormData>({
    defaultValues: {
      email: '',
      password: '',
      country_code: '',
      phone: '',
    },
  });

  const onSignUp = async (values: UserSignupFormData) => {
    const {
      data: { session },
      error,
    } = await signUpWithEmailPassword(values.email, values.password);

    if (error) Alert.alert(error.message);

    if (session) {
      await saveProfile(session.user.id, values.email, values.country_code, values.phone);
      router.navigate('/');
    }
  };

  const saveProfile = async (
    userId: string,
    userEmail: string,
    countryCode: string,
    userPhone: string,
  ) => {
    try {
      const userProfile = {
        id: userId,
        email: userEmail,
        country_code: countryCode,
        phone: userPhone,
        updated_at: new Date(),
      };
      const { error } = await saveUserProfile(userProfile);
      if (error) {
        Alert.alert(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  const goToLogIn = () => {
    router.navigate('/login');
  };

  return (
    <PetView style={{ width: '100%' }}>
      <PetView style={{ alignItems: 'center', justifyContent: 'center', gap: 5 }}>
        <PetText style={{ paddingHorizontal: 50, paddingVertical: 20 }}>
          {localization.t('header_sign_up_form_message')}
        </PetText>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'email is required' },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={localization.t('header_sign_up_form_email')}
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <PetText type="smallText" style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.email.message}
          </PetText>
        )}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'password is required' },
            minLength: {
              value: 6,
              message: 'min length is 6',
            },
          }}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
              placeholder={localization.t('header_sign_up_form_password')}
              autoCapitalize="none"
            />
          )}
        />
        {errors.password && (
          <PetText type="smallText" style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.password.message}
          </PetText>
        )}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'country code is required' },
            pattern: {
              value: /^[0-9]+/,
              message: 'country code must be numeric only',
            },
          }}
          name="country_code"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={localization.t('header_sign_up_form_country_code')}
              autoCapitalize="none"
            />
          )}
        />
        {errors.country_code && (
          <PetText type="smallText" style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.country_code.message}
          </PetText>
        )}
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'phone is required' },
            pattern: {
              value: /^[0-9]+/,
              message: 'phone must be numeric only',
            },
          }}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={localization.t('header_sign_up_form_phone')}
              autoCapitalize="none"
            />
          )}
        />
        {errors.phone && (
          <PetText type="smallText" style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.phone.message}
          </PetText>
        )}
        <PetButton
          iconName="log-in"
          buttonName={localization.t('header_sign_up')}
          onPress={handleSubmit(onSignUp)}
        />
        <PetView style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <PetText>{localization.t('header_sign_up_account_message')}</PetText>
          <PetTitle type="link" onPress={goToLogIn} style={{ textDecorationLine: 'underline' }}>
            {localization.t('header_log_in')}
          </PetTitle>
        </PetView>
      </PetView>
    </PetView>
  );
}
