import { router } from 'expo-router';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert, TouchableOpacity } from 'react-native';

import { PetButton } from '@/components/PetButton';
import { PetText } from '@/components/PetText';
import { PetTextInput } from '@/components/PetTextInput';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { signInWithPassword } from '@/lib/api';
import { localization } from '@/localizations/localization';

type UserLoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const LogInWithEmail = async (values: UserLoginFormData) => {
    const {
      data: { session },
      error,
    } = await signInWithPassword(values.email, values.password);

    if (error) {
      Alert.alert(error.message);
    } else {
      if (session) {
        router.navigate('/');
      }
    }
  };

  const goToSignUp = () => {
    router.navigate('/signup');
  };

  return (
    <PetView style={{ width: '100%' }}>
      <PetView style={{ alignItems: 'center', justifyContent: 'center', gap: 5 }}>
        <PetText style={{ paddingHorizontal: 50, paddingVertical: 20 }}>
          {localization.t('header_message')}
        </PetText>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'email is required' },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'value does not match email format',
            },
          }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <PetTextInput
              testID="login-email-input"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder={localization.t('header_login_form_email')}
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <PetText
            testID="login-email-input-error"
            type="smallText"
            style={{ color: 'red', fontSize: 11, margin: -5 }}>
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
              testID="login-password-input"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
              placeholder={localization.t('header_login_form_password')}
              autoCapitalize="none"
            />
          )}
        />
        {errors.password && (
          <PetText
            testID="login-password-input-error"
            type="smallText"
            style={{ color: 'red', fontSize: 11, margin: -5 }}>
            {errors.password.message}
          </PetText>
        )}
        <PetButton
          iconName="log-in"
          buttonName={localization.t('header_log_in')}
          onPress={handleSubmit(LogInWithEmail)}
        />
        <PetView style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <PetText>{localization.t('header_no_account_message')}</PetText>
          <TouchableOpacity testID="redirect-to-signup-label" onPress={goToSignUp}>
            <PetTitle type="link" style={{ textDecorationLine: 'underline' }}>
              {localization.t('header_sign_up')}
            </PetTitle>
          </TouchableOpacity>
        </PetView>
      </PetView>
    </PetView>
  );
}
