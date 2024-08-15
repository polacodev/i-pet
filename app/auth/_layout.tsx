import { router, Slot } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PetText } from '@/components/PetText';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';

export default function Page() {
  const insets = useSafeAreaInsets();

  const goToPetHome = () => {
    router.navigate('/details/pethome');
  };

  return (
    <PetView style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Slot />
        <PetText>Do you want to use it without an</PetText>
        <PetView style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <PetText>iPet account?</PetText>
          <PetTitle type="link" onPress={goToPetHome} style={{ textDecorationLine: 'underline' }}>
            Scan Qr Code
          </PetTitle>
        </PetView>
      </PetView>
    </PetView>
  );
}
