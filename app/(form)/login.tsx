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
        <PetText style={{ paddingHorizontal: 50, paddingVertical: 20 }}>
          Log in to iPet to see your list and details of the pets you have created.
        </PetText>
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
        <PetButton buttonName="Log In" onPress={LogInWithEmail} />
        <PetView style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <PetText>Do not have an account yet?</PetText>
          <PetTitle type="link" onPress={goToSignUp} style={{ textDecorationLine: 'underline' }}>
            Sign Up
          </PetTitle>
        </PetView>
      </PetView>
    </PetView>
  );
}
