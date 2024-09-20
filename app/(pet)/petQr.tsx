import { CameraView, BarcodeScanningResult } from 'expo-camera';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Alert, TouchableOpacity } from 'react-native';

import { PetIcon } from '@/components/PetIcon';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { getPetById } from '@/lib/api';
import { localization } from '@/localizations/localization';
import { extractPathFromUrl, isValidPath } from '@/utilities/utilities';

const PetQr = () => {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = async (scanningResult: BarcodeScanningResult) => {
    setScanned(true);

    const path = extractPathFromUrl(scanningResult.data);
    if (path && isValidPath(path)) {
      const id = path.split('/').pop();
      const { data, error } = await getPetById(id as string);

      if (error) {
        router.back();
        Alert.alert(localization.t('pet_qr_alert_request'));
      } else {
        router.push({
          pathname: `/details/${id}`,
          params: { petData: JSON.stringify(data) },
        });
      }
    } else {
      Alert.alert(localization.t('pet_qr_alert_title'), localization.t('pet_qr_alert_message'), [
        {
          text: localization.t('pet_qr_alert_dismiss'),
          onPress: () => {
            setScanned(false);
          },
          style: 'cancel',
        },
      ]);
      router.back();
    }
  };

  const closeIPetCamera = () => {
    router.back();
  };

  return (
    <PetView style={{ flex: 1, width: '100%' }}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        style={[{ alignItems: 'center', justifyContent: 'center' }, StyleSheet.absoluteFillObject]}>
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
          <TouchableOpacity onPress={closeIPetCamera}>
            <PetIcon name="close-circle" size={50} />
          </TouchableOpacity>
        </PetView>
      </CameraView>
    </PetView>
  );
};

export default PetQr;
