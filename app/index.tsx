import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme, Alert } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { PetView } from '@/components/PetView';
import { PetText } from '@/components/PetText';
import { PetHome } from '@/svgIcons/home';
import { PetIcon } from '@/components/PetIcon';
import { PetTitle } from '@/components/PetTitle';
import { PetButton } from '@/components/PetButton';

export default function Page() {

  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? 'light';
  const colorText = theme === 'light' ? Colors.light.smallText : Colors.dark.smallText;

  const [status, requestPermission] = useCameraPermissions()

  const requestCameraPermission = async () => {
    const cameraPermissionStatus = await requestPermission();
    if (cameraPermissionStatus?.granted) {
      router.push("/pet/petQr")
    } else {
      Alert.alert('Error', 'Camera Permission is required!', [
        {
          text: 'Dismiss',
          style: 'cancel',
        }]);
    }
  }

  return (
    <PetView style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <PetView style={{ backgroundColor: '#0891b2', borderTopEndRadius: 50, borderBottomStartRadius: 50 }}>
          <PetHome />
        </PetView>
        <PetTitle type='default' style={{ marginTop: 8 }}>Scan a
          <PetTitle style={{ color: theme === 'light' ? 'rgb(34 211 238)' : '#fff' }}> QR Code </PetTitle>to</PetTitle>
        <PetTitle type='default' style={{ marginBottom: 8 }}>learn about your pet!</PetTitle>
        <PetButton goToQrPet={requestCameraPermission} iconName='camera' buttonName="Scan QR Code" />
        <PetText type='smallText' style={{ color: colorText }}>Your Pet is part of your family.</PetText>
        <PetText type='smallText' style={{ color: colorText }}>
          <PetIcon name='star' size={15} color='#eab308' />
          Take care of them!
          <PetIcon name='heart' size={15} color='#ef4444' />
        </PetText>
        <PetTitle type='link' style={{ textDecorationLine: 'underline' }}>Register Pet</PetTitle>
        {/* <Link href="/pet/550e8400-e29b-41d4-a716-446655440000">Go to pet 446655440000</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440001">Go to pet 446655440001</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440002">Go to pet 446655440002</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440003">Go to pet 446655440003</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440004">Go to pet 446655440004</Link> */}
      </PetView>
    </PetView>
  );
}
