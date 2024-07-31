import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { PetView } from '@/components/PetView';
import { PetText } from '@/components/PetText';
import { PetHome } from '@/svgIcons/home';
import { PetIcon } from '@/components/PetIcon';
import { PetTitle } from '@/components/PetTitle';
import { PetButton } from '@/components/PetButton';

export default function Page() {

  const theme = useColorScheme() ?? 'light';
  const colorText = theme === 'light' ? Colors.light.smallText : Colors.dark.smallText;

  const insets = useSafeAreaInsets();

  const goToQrPet = () => {
    router.push("/pet/petQr")
  }

  return (
    <PetView style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <PetTitle type='default'>iPet</PetTitle>
        <PetView style={{ backgroundColor: '#0891b2', borderTopEndRadius: 50, borderBottomStartRadius: 50, marginVertical: 20 }}>
          <PetHome />
        </PetView>
        <PetButton goToQrPet={goToQrPet} iconName='camera' buttonName="Scan QR Code" />
        <PetText type='smallText' style={{ color: colorText }}>Your Pet is part of your family.</PetText>
        <PetText type='smallText' style={{ color: colorText, paddingBottom: 30 }}>
          <PetIcon name='star' size={15} color='#eab308' />
          Take care of them!.
          <PetIcon name='heart' size={15} color='#ef4444' />
        </PetText>
        {/* <Link href="/pet/550e8400-e29b-41d4-a716-446655440000">Go to pet 446655440000</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440001">Go to pet 446655440001</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440002">Go to pet 446655440002</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440003">Go to pet 446655440003</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440004">Go to pet 446655440004</Link> */}
      </PetView>
    </PetView>
  );
}
