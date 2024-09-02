import { Session } from '@supabase/supabase-js';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { PetButton } from '@/components/PetButton';
import { PetText } from '@/components/PetText';
import { PetView } from '@/components/PetView';
import { Colors } from '@/constants/Colors';
import { supabase } from '@/lib/supabase';

export default function Profile() {
  const [session, setSession] = useState<Session | null>(null);
  const theme = useColorScheme() ?? 'light';
  const colorText = theme === 'light' ? Colors.light.smallText : Colors.dark.smallText;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.navigate('/');
  };

  return (
    <PetView style={{ width: '100%' }}>
      <PetView style={{ alignItems: 'center', justifyContent: 'center', gap: 5 }}>
        <PetText style={{ paddingHorizontal: 50, paddingTop: 20 }}>
          Thank you for being part of iPet, we hope you come back soon.
        </PetText>
        <PetText type="smallText" style={{ color: colorText }}>
          {session?.user.email}
        </PetText>
        <PetButton buttonName="Log Out" onPress={signOut} />
      </PetView>
    </PetView>
  );
}
