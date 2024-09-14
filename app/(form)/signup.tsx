import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';

import { PetButton } from '@/components/PetButton';
import { PetText } from '@/components/PetText';
import { PetTextInput } from '@/components/PetTextInput';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { signUpWithEmailPassword, saveUserProfile } from '@/lib/api';
import { localization } from '@/localizations/localization';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');

  const onSignUp = async () => {
    const {
      data: { session },
      error,
    } = await signUpWithEmailPassword(email, password);

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');

    if (session) {
      await saveProfile(session.user.id, email, countryCode, phone);
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
        <PetTextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder={localization.t('header_sign_up_form_email')}
          autoCapitalize="none"
        />
        <PetTextInput
          onChangeText={(text) => setCountryCode(text)}
          value={countryCode}
          placeholder={localization.t('header_sign_up_form_country_code')}
          autoCapitalize="none"
        />
        <PetTextInput
          onChangeText={(text) => setPhone(text)}
          value={phone}
          placeholder={localization.t('header_sign_up_form_phone')}
          autoCapitalize="none"
        />
        <PetTextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder={localization.t('header_sign_up_form_password')}
          autoCapitalize="none"
        />
        <PetButton
          iconName="log-in"
          buttonName={localization.t('header_sign_up')}
          onPress={onSignUp}
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
