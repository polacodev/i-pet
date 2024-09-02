import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';

import { PetButton } from '@/components/PetButton';
import { PetText } from '@/components/PetText';
import { PetTextInput } from '@/components/PetTextInput';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { supabase } from '@/lib/supabase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');

    if (session) {
      await saveProfile(session.user.id, phone);
      router.navigate('/');
    }

    setLoading(false);
  };

  const saveProfile = async (userId: string, userPhone: string) => {
    try {
      const userProfile = {
        id: userId,
        phone: userPhone,
        updated_at: new Date(),
      };
      const { error } = await supabase.from('profiles').upsert(userProfile);
      if (error) {
        throw error;
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
          Sign up on iPet to add a new pet to your list.
        </PetText>
        <PetTextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
        <PetTextInput
          onChangeText={(text) => setPhone(text)}
          value={phone}
          placeholder="Phone"
          autoCapitalize="none"
        />
        <PetTextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
        />
        <PetButton buttonName="Sign Up" onPress={signUpWithEmail} />
        <PetView style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <PetText>Already have an account?</PetText>
          <PetTitle type="link" onPress={goToLogIn} style={{ textDecorationLine: 'underline' }}>
            Log In
          </PetTitle>
        </PetView>
      </PetView>
    </PetView>
  );
}
