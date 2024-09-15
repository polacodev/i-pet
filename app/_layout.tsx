import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';

import { PetHeader } from '@/components/PetHeader';
import { UserContextProvider } from '@/components/context/UserContext';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Layout() {
  const colorScheme = useColorScheme();

  return (
    <RootSiblingParent>
      <UserContextProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack
            screenOptions={{
              headerTintColor: '#0891b2',
              headerTitle: 'iPet',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight: () => <PetHeader />,
            }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </UserContextProvider>
    </RootSiblingParent>
  );
}
