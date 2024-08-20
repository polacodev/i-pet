import { Slot, Stack } from 'expo-router';

import KeyboardScrollView from '@/components/KeyboardScrollView';
import { PetView } from '@/components/PetView';

export default function Page() {
  return (
    <KeyboardScrollView>
      <PetView style={{ flex: 1 }}>
        <PetView style={{ flex: 1, alignItems: 'center' }}>
          <Stack.Screen
            options={{
              headerTitle: '',
              headerRight: () => '',
            }}
          />
          <Slot />
        </PetView>
      </PetView>
    </KeyboardScrollView>
  );
}
