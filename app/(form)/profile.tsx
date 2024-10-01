import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { PetButton } from '@/components/PetButton';
import { PetText } from '@/components/PetText';
import { PetView } from '@/components/PetView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { signOut, getSession, onAuthStateChange } from '@/lib/api';
import { localization } from '@/localizations/localization';
import { Session } from '@/types/session';

type ProfileProps = {
  lightColor?: string;
  darkColor?: string;
};

export default function Profile({ lightColor, darkColor }: ProfileProps) {
  const [session, setSession] = useState<Session | null>(null);
  const colorText = useThemeColor({ light: lightColor, dark: darkColor }, 'smallText');

  useEffect(() => {
    const getSessionData = async () => {
      const {
        data: { session },
      } = await getSession();
      setSession(session);
    };
    getSessionData();

    onAuthStateChange(setSession);
  }, []);

  const onSignOut = async () => {
    await signOut();
    router.navigate('/');
  };

  return (
    <PetView style={{ width: '100%' }}>
      <PetView style={{ alignItems: 'center', justifyContent: 'center', gap: 5 }}>
        <PetText style={{ paddingHorizontal: 50, paddingTop: 20 }}>
          {localization.t('header_log_out_message')}
        </PetText>
        <PetText type="smallText" style={{ color: colorText }}>
          {session?.user.email}
        </PetText>
        <PetButton
          iconName="log-out"
          buttonName={localization.t('header_log_out')}
          onPress={onSignOut}
        />
      </PetView>
    </PetView>
  );
}
