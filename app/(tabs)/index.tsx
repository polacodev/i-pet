import { useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PetButton } from '@/components/PetButton';
import { PetIcon } from '@/components/PetIcon';
import { PetText } from '@/components/PetText';
import { PetTitle } from '@/components/PetTitle';
import { PetToast } from '@/components/PetToast';
import { PetView } from '@/components/PetView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { localization } from '@/localizations/localization';
import { PetHome } from '@/svgIcons/home';

type HomeScreenProps = {
  lightColor?: string;
  darkColor?: string;
};

export default function HomeScreen({ lightColor, darkColor }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const colorText = useThemeColor({ light: lightColor, dark: darkColor }, 'smallText');
  const colorHighLightText = useThemeColor({ light: lightColor, dark: darkColor }, 'highlightText');

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
          <PetTitle style={{ color: colorHighLightText }}>
            {` ${localization.t('welcome_line2')} `}
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
        <PetToast />
      </PetView>
    </PetView>
  );
}
