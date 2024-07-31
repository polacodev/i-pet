import React from 'react'
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, Camera } from 'expo-camera';
import { SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PetTitle } from '@/components/PetTitle'

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
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        {/* <TouchableOpacity onPress={closeIPetCamera} style={{backgroundColor: '#292524', borderRadius: 9999 }}> */}
          <SimpleLineIcons name="close" size={50} color="#fff" backgroundColor='#292524' borderRadius={10}  onPress={closeIPetCamera} />
        {/* </TouchableOpacity> */}
      </View>
    </View>
  )
}

export default petQr