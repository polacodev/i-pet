import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import React from 'react';

import { PetTitle } from '@/components/PetTitle';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Layout() {
  const colorScheme = useColorScheme();

  const goToSignin = () => {
    router.navigate('/signin');
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerTintColor: '#0891b2',
          headerTitle: 'iPet',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <PetTitle type="link" onPress={goToSignin}>
              Sign in
            </PetTitle>
          ),
        }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
