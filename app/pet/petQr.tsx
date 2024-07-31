import React from 'react'
import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CameraView, Camera } from 'expo-camera';
import { router } from 'expo-router';
import { PetTitle } from '@/components/PetTitle'
import { extractPetIdFromUrl } from '@/utilities/utilities';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const petQr = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const petIdPath = extractPetIdFromUrl(data)
    console.log("type=>", type)
    console.log("data=>", data)
    router.push(`${petIdPath}`)
  };

  if (hasPermission === null) {
    return <View><Text>Requesting for camera permission</Text></View>;
  }

  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  const closeIPetCamera = () => {
    router.back()
  }
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}
    >
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <PetTitle style={{ paddingBottom: 50, color: '#ffffff' }}>iPet</PetTitle>
      <View
        style={{ alignItems: 'center', justifyContent: 'center', width: 320, height: 320, borderRadius: 24, borderColor: '#ffffff', borderWidth: 4, borderStyle: 'dotted' }}
      >
      </View>
      <View style={{ paddingTop: 80 }}>
        <FontAwesome name="close" size={30} color="#ffffff" onPress={closeIPetCamera} />
      </View>
    </View>
  )
}

export default petQr
