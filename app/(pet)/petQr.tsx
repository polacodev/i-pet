import { CameraView, BarcodeScanningResult } from 'expo-camera';
import { router, useFocusEffect } from 'expo-router';
import React from 'react';
import { StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';

import { PetIcon } from '@/components/PetIcon';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { getPetById } from '@/lib/api';
import { localization } from '@/localizations/localization';
import { extractPathFromUrl, isValidPath } from '@/utilities/utilities';

const PetQr = () => {
  const [mountCamera, setMountCamera] = React.useState(true);

  const handleBarCodeScanned = async (scanningResult: BarcodeScanningResult) => {
    const { pathname } = extractPathFromUrl(scanningResult.data);
    if (pathname && isValidPath(pathname)) {
      const id = pathname.split('/').pop();
      const { data, error } = await getPetById(id as string);

      if (error) {
        Alert.alert(localization.t('pet_qr_alert_request'));
        await closeIPetCamera(true);
      } else {
        await closeIPetCamera(false);
        router.push({
          pathname: `/details/${id}`,
          params: { petData: JSON.stringify(data) },
        });
      }
    } else {
      Alert.alert(localization.t('pet_qr_alert_title'), localization.t('pet_qr_alert_message'), [
        {
          text: localization.t('pet_qr_alert_dismiss'),
          onPress: () => ({}),
          style: 'cancel',
        },
      ]);
      await closeIPetCamera(true);
    }
  };

  const closeIPetCamera = async (backToHome: boolean) => {
    const unmountCameraPromise: boolean = await new Promise<boolean>((resolve) => {
      resolve(false);
    });
    setMountCamera(unmountCameraPromise);
    if (backToHome) router.back();
  };

  useFocusEffect(
    React.useCallback(() => {
      setMountCamera(true);
      return () => {
        setMountCamera(false);
      };
    }, []),
  );

  return (
    <PetView style={{ flex: 1, width: '100%' }}>
      {mountCamera ? (
        <CameraView
          testID="pet-camera-view"
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          style={[
            { alignItems: 'center', justifyContent: 'center' },
            StyleSheet.absoluteFillObject,
          ]}>
          <PetView
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'transparent',
              gap: 30,
            }}>
            <PetTitle style={{ color: '#ffffff' }}>iPet</PetTitle>
            <PetView
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 320,
                backgroundColor: 'transparent',
                height: 320,
                borderRadius: 24,
                borderColor: '#ffffff',
                borderWidth: 2,
                borderStyle: 'dotted',
              }}
            />
            <TouchableOpacity testID="pet-close-camera" onPress={() => closeIPetCamera(true)}>
              <PetIcon name="close-circle" size={50} />
            </TouchableOpacity>
          </PetView>
        </CameraView>
      ) : (
        <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator testID="pet-activity-indicator" />
        </PetView>
      )}
    </PetView>
  );
};

export default PetQr;
