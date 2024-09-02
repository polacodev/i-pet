import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';

import { PetButton } from '@/components/PetButton';
import { PetText } from '@/components/PetText';
import { PetTextInput } from '@/components/PetTextInput';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { supabase } from '@/lib/supabase';
import { localization } from '@/localizations/localization';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const LogInWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);

    if (session) {
      router.navigate('/');
    }
    setLoading(false);
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
        <PetTextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder={localization.t('header_login_form_email')}
          autoCapitalize="none"
        />
        <PetTextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder={localization.t('header_login_form_password')}
          autoCapitalize="none"
        />
        <PetButton buttonName={localization.t('header_log_in')} onPress={LogInWithEmail} />
        <PetView style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <PetText>{localization.t('header_no_account_message')}</PetText>
          <PetTitle type="link" onPress={goToSignUp} style={{ textDecorationLine: 'underline' }}>
            {localization.t('header_sign_up')}
          </PetTitle>
        </PetView>
      </PetView>
    </PetView>
  );
}
