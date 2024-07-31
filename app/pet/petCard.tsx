import React from 'react'
import { View, Text, Image, TouchableOpacity, Linking, useColorScheme } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FontAwesome } from '@expo/vector-icons';
import { PetTitle } from '@/components/PetTitle'
import { PetText } from '@/components/PetText';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

import { Pet } from './[id]';

type PetDetailsProps = {
  pet: Pet | undefined;
};

const PetCard: React.FC<PetDetailsProps> = ({ pet }) => {
  const theme = useColorScheme() ?? 'light';

  const callWhatsappOwner = () => {
    Linking.openURL(`http://api.whatsapp.com/send?phone=591${pet?.ownerPhone}`)
  }

  const goToQRPet = () => {
    router.push("/pet/petQr")
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 16 }}>
      {/* HEADER */}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View>
            <PetTitle type='default'>iPet</PetTitle>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="pets" size={24} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
          </View>
        </View>
      </View>
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
          <View style={{ alignItems: 'center', paddingTop: 8 }}>
            <PetText type='default'>Name: {pet?.petName}</PetText>
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
        <View style={{ alignItems: 'center', margin: 8 }}>
          <TouchableOpacity onPress={callWhatsappOwner}
            style={{ padding: 8, backgroundColor: '#075E54', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, width: '60%', borderRadius: 8 }}
          >
            <FontAwesome name="whatsapp" size={30} color="#ffffff" />
            <Text style={{ color: "#ffffff" }}>Chat Owner</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', margin: 8 }} >
          <TouchableOpacity onPress={goToQRPet}
            style={{ padding: 8, backgroundColor: '#0e7490', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, width: '60%', borderRadius: 8 }}
          >
            <FontAwesome name="camera" size={30} color="#ffffff" />
            <Text style={{ color: "#ffffff" }}>Scan New QR</Text>
          </TouchableOpacity>
        </View>
        {/* FOOTER */}
        <View style={{ alignItems: 'center', paddingTop: 15 }}>
          <PetText type='smallText' style={{ color: theme === 'light' ? Colors.light.smallText : Colors.dark.smallText }}>Your Pet is part of your family.</PetText>
          <PetText type='smallText' style={{ color: theme === 'light' ? Colors.light.smallText : Colors.dark.smallText }}>😻Take care of them!🐾</PetText>
        </View>
      </View>
    </View>
  )
}

export default PetCard
