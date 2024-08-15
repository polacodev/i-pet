import 'react-native-url-polyfill/auto';
import { Session } from '@supabase/supabase-js';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { supabase } from '@/lib/supabase';

import * as async_storage from '@/utilities/async-storage';

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session);
    // });

    // supabase.auth.onAuthStateChange((_event, session) => {
    //   setSession(session);
    // });
    getUserSession();
  }, []);

  const getUserSession = async () => {
    const token = await async_storage.getData('access_token');
    console.log("--->", token)
    if (token) {
      router.navigate('/pet/petlist');
    }
  };

  const goToSignIn = () => {
    router.navigate('/auth/signin');
  };

  return (
    <PetView style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      <PetView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* <SignIn />
         */}
        <PetTitle type="link" onPress={goToSignIn}>
          got register
        </PetTitle>
        {/* {session && session.user && <Text>{session.user.id}</Text>} */}
      </PetView>
    </PetView>
  );
}
