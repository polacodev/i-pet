import React from 'react'
import { View, Image, Linking, useColorScheme } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PetTitle } from '@/components/PetTitle'
import { PetText } from '@/components/PetText';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
// import QRCode from 'react-native-qrcode-svg';

import { Pet } from './[id]';
import { PetButton } from '@/components/PetButton';

type PetDetailsProps = {
  pet: Pet | undefined;
};

const PetCard: React.FC<PetDetailsProps> = ({ pet }) => {
  // const petUrl = `exp://192.168.100.19:8081/pet/${pet?.id}`

  const callWhatsappOwner = () => {
    Linking.openURL(`http://api.whatsapp.com/send?phone=591${pet?.ownerPhone}`)
  }

  const goToQRPet = () => {
    router.push("/pet/petQr")
  }

  const goToHome = () => {
    router.push("/")
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 16 }}>
      {/* HEADER */}
      {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View>
            <PetTitle type='default'>iPet</PetTitle>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="pets" size={24} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
          </View>
        </View>
      </View> */}
      {/* BODY */}
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 16, gap: 8, width: 400 }}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{
                uri: "https://imgs.search.brave.com/Y2WtUyRRcQkDizOjI8FsJPtqqtVfzi0KqTMD5hoanls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg1/MzMwMzMzL3Bob3Rv/L2RhY2hzaHVuZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/V0FrMTE5RjhMWWNP/NXl6N0x3N3pHSE1U/aTJaQUlrQjI5anp4/TVJkRlpuQT0",
              }}
              resizeMode='cover'
              style={{ width: 80, height: 80, borderRadius: 9999 }}
            />
          </View>
          <View style={{ alignItems: 'center', paddingTop: 8 }}>
            <PetTitle type='subtitle'>Pet Details</PetTitle>
          </View>
          <View style={{ alignItems: 'center' }}>
            <PetText type='default'>Name: {pet?.petName}</PetText>
            <PetText type='default'>Type: {pet?.petType}</PetText>
            <PetText type='default'>Gender: {pet?.petGender}</PetText>
            <PetText type='default'>Breed: {pet?.petBreed}</PetText>
            <PetText type='default'>Age: {pet?.petAge} years</PetText>
            <PetText type='default'>Medical Conditions: {pet?.petMedicalCondition}</PetText>
          </View>
        </View>
        <View style={{ paddingTop: 16, paddingBottom: 8 }}>
          <View style={{ alignItems: 'center' }}>
            <PetTitle
              type='subtitle'
              style={{ paddingVertical: 8, }}
            >Owner's Contact Info</PetTitle>
          </View>
          <View style={{ alignItems: 'center' }}>
            <PetText type='default'>Name: {pet?.ownerName}</PetText>
            <PetText type='default'>Phone: {pet?.ownerPhone}</PetText>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <PetButton goToQrPet={callWhatsappOwner} iconName='whatsapp' color='#075E54' buttonName="Chat Owner" />
        </View>
        <View style={{ alignItems: 'center' }} >
          <PetButton goToQrPet={goToQRPet} iconName='camera' buttonName="Scan New QR Code" />
        </View>

        {/* FOOTER */}
        <View style={{ alignItems: 'center', paddingTop: 15 }}>
          <PetTitle onPress={goToHome} type='link' >Go Home</PetTitle>
          {/* <QRCode value={petUrl} /> */}
        </View>
      </View>
    </View>
  )
}

export default PetCard
