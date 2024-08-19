import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router/stack';
import React from 'react';

import { PetText } from '@/components/PetText';
import { PetTitle } from '@/components/PetTitle';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => <PetTitle type="link">Sign in</PetTitle>,
        }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            headerTitle: () => (
              <PetText type="default" style={{ fontSize: 20, fontWeight: '600' }}>
                iPet
              </PetText>
            ),
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
