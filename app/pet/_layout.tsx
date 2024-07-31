import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PetView } from '@/components/PetView';
import { Slot } from 'expo-router';
import { Text } from 'react-native';

export default function Page() {
  const insets = useSafeAreaInsets();

  return (
    <PetView style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Slot />
      </PetView>
    </PetView>
  );
}
