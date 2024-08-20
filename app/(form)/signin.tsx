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

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
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
      async_storage.storeData('access_token', session.access_token);
      router.back();
    }
    setLoading(false);
  };

  const goToSignUp = () => {
    router.navigate('/signup');
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
        <PetButton buttonName="Sign in" onPress={signInWithEmail} />
        <PetView style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <PetText>Do not have an account yet?</PetText>
          <PetTitle type="link" onPress={goToSignUp} style={{ textDecorationLine: 'underline' }}>
            Sign up
          </PetTitle>
        </PetView>
      </PetView>
    </PetView>
  );
}
