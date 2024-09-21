import { CameraView, BarcodeScanningResult } from 'expo-camera';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';

import { PetIcon } from '@/components/PetIcon';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { getPetById } from '@/lib/api';
import { localization } from '@/localizations/localization';
import { extractPathFromUrl, isValidPath } from '@/utilities/utilities';

const PetQr = () => {
  const [mountCamera, setMountCamera] = useState(true);

  const handleBarCodeScanned = async (scanningResult: BarcodeScanningResult) => {
    const path = extractPathFromUrl(scanningResult.data);
    if (path && isValidPath(path)) {
      const id = path.split('/').pop();
      const { data, error } = await getPetById(id as string);

      if (error) {
        Alert.alert(localization.t('pet_qr_alert_request'));
        closeIPetCamera(true);
      } else {
        closeIPetCamera(false);
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
      closeIPetCamera(true);
    }
  };

  const closeIPetCamera = async (backToHome: boolean) => {
    try {
      const unmountCameraPromise = new Promise((resolve, reject) => {
        resolve(setMountCamera(false));
        reject(new Error('camera could not be unmounted'));
      });
      await unmountCameraPromise;
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message, [
          {
            text: localization.t('pet_qr_alert_dismiss'),
            onPress: () => ({}),
            style: 'cancel',
          },
        ]);
      }
    } finally {
      if (backToHome) router.back();
    }
  };

  useFocusEffect(
    useCallback(() => {
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
            <TouchableOpacity onPress={() => closeIPetCamera(true)}>
              <PetIcon name="close-circle" size={50} />
            </TouchableOpacity>
          </PetView>
        </CameraView>
      ) : (
        <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </PetView>
      )}
    </PetView>
  );
};

export default PetQr;
