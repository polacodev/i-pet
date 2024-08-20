import { Slot, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PetView } from '@/components/PetView';

export default function Page() {
  const insets = useSafeAreaInsets();

  return (
    <PetView style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <Slot />
      </PetView>
    </PetView>
  );
}
