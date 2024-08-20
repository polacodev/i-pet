import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';

import { PetButton } from '@/components/PetButton';
import { PetText } from '@/components/PetText';
import { PetTextInput } from '@/components/PetTextInput';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { supabase } from '@/lib/supabase';
import * as async_storage from '@/utilities/async-storage';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');

    if (session) {
      async_storage.storeData('access_token', session?.access_token);
      router.back();
    }

    setLoading(false);
  };

  const goToSignIn = () => {
    router.navigate('/signin');
  };

  return (
    <PetView style={{ width: '100%' }}>
      <PetView style={{ alignItems: 'center', justifyContent: 'center', gap: 5 }}>
        <PetTextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
        <PetTextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
        <PetButton buttonName="Sign up" onPress={signUpWithEmail} />
        <PetView style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <PetText>Already have an account?</PetText>
          <PetTitle type="link" onPress={goToSignIn} style={{ textDecorationLine: 'underline' }}>
            Sign in
          </PetTitle>
        </PetView>
      </PetView>
    </PetView>
  );
}
