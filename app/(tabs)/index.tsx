import { useCameraPermissions } from 'expo-camera';
import { Link, router, Stack } from 'expo-router';
import React from 'react';
import { useColorScheme, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PetButton } from '@/components/PetButton';
import { PetIcon } from '@/components/PetIcon';
import { PetText } from '@/components/PetText';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { Colors } from '@/constants/Colors';
import { localization } from '@/localizations/localization';
import { PetHome } from '@/svgIcons/home';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? 'light';
  const colorText = theme === 'light' ? Colors.light.smallText : Colors.dark.smallText;

  const [status, requestPermission] = useCameraPermissions();

  const requestCameraPermission = async () => {
    const cameraPermissionStatus = await requestPermission();
    if (cameraPermissionStatus?.granted) {
      router.push('/petQr');
    } else {
      Alert.alert(localization.t('welcome_alert_title'), localization.t('welcome_alert_message'), [
        {
          text: localization.t('welcome_alert_cancel'),
          style: 'cancel',
        },
      ]);
    }
  };

  const gotToPetRegister = () => {
    router.navigate('/register');
  };
  return (
    <PetView style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <PetView
          style={{
            backgroundColor: '#0891b2',
            borderTopEndRadius: 50,
            borderBottomStartRadius: 50,
          }}>
          <PetHome />
        </PetView>
        <PetTitle type="default" style={{ marginTop: 8 }}>
          {localization.t('welcome_line1')}
          <PetTitle style={{ color: theme === 'light' ? 'rgb(34 211 238)' : '#fff' }}>
            {' '}
            {localization.t('welcome_line2')}{' '}
          </PetTitle>
          {localization.t('welcome_line3')}
        </PetTitle>
        <PetTitle type="default" style={{ marginBottom: 8 }}>
          {localization.t('welcome_line4')}
        </PetTitle>
        <PetButton
          onPress={requestCameraPermission}
          iconName="camera"
          buttonName={localization.t('welcome_button')}
        />
        <PetText type="smallText" style={{ color: colorText }}>
          {localization.t('welcome_advice_line1')}
        </PetText>
        <PetText type="smallText" style={{ color: colorText }}>
          <PetIcon name="star" size={15} color="#eab308" />
          {localization.t('welcome_advice_line2')}
          <PetIcon name="heart" size={15} color="#ef4444" />
        </PetText>
        {/* <PetTitle
          type="link"
          onPress={gotToPetRegister}
          style={{ textDecorationLine: 'underline' }}>
          {localization.t('welcome_register_pet')}
        </PetTitle> */}
        {/* <Link href="/pet/550e8400-e29b-41d4-a716-446655440000">Go to pet 446655440000</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440001">Go to pet 446655440001</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440002">Go to pet 446655440002</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440003">Go to pet 446655440003</Link>
        <Link href="/pet/550e8400-e29b-41d4-a716-446655440004">Go to pet 446655440004</Link> */}
      </PetView>
    </PetView>
  );
}
