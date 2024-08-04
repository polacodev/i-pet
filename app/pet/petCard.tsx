import React from 'react'
import { Image, Linking } from 'react-native'
import { PetTitle } from '@/components/PetTitle'
import { PetText } from '@/components/PetText';
import { router } from 'expo-router';
// import QRCode from 'react-native-qrcode-svg';

import { Pet } from './[id]';
import { PetButton } from '@/components/PetButton';
import { PetView } from '@/components/PetView';

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
    <PetView style={{ width: '100%' }}>
      <PetView style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/* PET IMAGE */}
        <PetView style={{ alignItems: 'center' }}>
          <Image
            source={{
              uri: "https://imgs.search.brave.com/Y2WtUyRRcQkDizOjI8FsJPtqqtVfzi0KqTMD5hoanls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg1/MzMwMzMzL3Bob3Rv/L2RhY2hzaHVuZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/V0FrMTE5RjhMWWNP/NXl6N0x3N3pHSE1U/aTJaQUlrQjI5anp4/TVJkRlpuQT0",
            }}
            resizeMode='cover'
            style={{ width: 80, height: 80, borderRadius: 9999 }}
          />
        </PetView>

        {/** PET DETAIL */}
        <PetTitle type='subtitle' style={{ paddingTop: 8 }}>Pet Details</PetTitle>
        <PetText type='default'>Name: {pet?.petName}</PetText>
        <PetText type='default'>Type: {pet?.petType}</PetText>
        <PetText type='default'>Gender: {pet?.petGender}</PetText>
        <PetText type='default'>Breed: {pet?.petBreed}</PetText>
        <PetText type='default'>Age: {pet?.petAge} years</PetText>
        <PetText type='default'>Medical Conditions: {pet?.petMedicalCondition}</PetText>

        {/** OWNER INFO */}
        <PetTitle type='subtitle' style={{ paddingTop: 8 }}>Owner's Contact Info</PetTitle>
        <PetText type='default'>Name: {pet?.ownerName}</PetText>
        <PetText type='default'>Phone: {pet?.ownerPhone}</PetText>

        {/** BUTTONS */}
        <PetButton goToQrPet={callWhatsappOwner} iconName='whatsapp' color='#075E54' buttonName="Chat Owner" />
        <PetButton goToQrPet={goToQRPet} iconName='camera' buttonName="Scan New QR Code" />

        {/** FOOTER */}
        <PetTitle type='link' onPress={goToHome} style={{ textDecorationLine: 'underline' }}>Back to Home</PetTitle>
        {/* <QRCode value={petUrl} /> */}
      </PetView>
    </PetView>
  )
}

export default PetCard
