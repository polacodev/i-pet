import { CameraView, BarcodeScanningResult } from 'expo-camera';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { PetIcon } from '@/components/PetIcon';
import { PetTitle } from '@/components/PetTitle';
import { localization } from '@/localizations/localization';
import { extractPathFromUrl, isValidPath } from '@/utilities/utilities';

const PetQr = () => {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
    setScanned(true);

    const path = extractPathFromUrl(scanningResult.data);
    if (path && isValidPath(path)) {
      router.navigate(path);
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <PetTitle style={{ paddingBottom: 50, color: '#ffffff' }}>iPet</PetTitle>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 320,
          height: 320,
          borderRadius: 24,
          borderColor: '#ffffff',
          borderWidth: 4,
          borderStyle: 'dotted',
        }}
      />
      <View style={{ paddingTop: 80 }}>
        <PetIcon name="close-circle" size={50} onPress={closeIPetCamera} />
      </View>
    </View>
  );
};

export default PetQr;
