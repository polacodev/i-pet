import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Image, useColorScheme, TouchableOpacity } from 'react-native';

import { Pet } from '@/app/details/[id]';
import { PetIcon } from '@/components/PetIcon';
import { PetText } from '@/components/PetText';
import { PetView } from '@/components/PetView';
import { Colors } from '@/constants/Colors';
import { getPets } from '@/lib/api';

const Item = ({ pet }: any) => {
  const theme = useColorScheme() ?? 'light';
  const colorText = theme === 'light' ? Colors.light.smallText : Colors.dark.smallText;
  const colorBorderCard = theme === 'light' ? '#d1d1d1' : '#3d3d3d';

  const goToPetDetails = () => {
    router.navigate(`/details/${pet.id}`);
  };

  return (
    <TouchableOpacity onPress={goToPetDetails}>
      <PetView
        style={{
          borderWidth: 1,
          borderColor: colorBorderCard,
          marginHorizontal: 10,
          marginVertical: 5,
          paddingTop: 4,
          paddingBottom: 10,
          borderRadius: 10,
          gap: 5,
        }}>
        <PetView
          style={{
            alignItems: 'flex-end',
            marginHorizontal: 10,
          }}>
          <PetIcon name="trash" size={20} color={colorText} />
        </PetView>
        <PetView style={{ alignItems: 'center', marginHorizontal: 10 }}>
          <Image
            source={{
              uri: 'https://imgs.search.brave.com/Y2WtUyRRcQkDizOjI8FsJPtqqtVfzi0KqTMD5hoanls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg1/MzMwMzMzL3Bob3Rv/L2RhY2hzaHVuZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/V0FrMTE5RjhMWWNP/NXl6N0x3N3pHSE1U/aTJaQUlrQjI5anp4/TVJkRlpuQT0',
            }}
            resizeMode="cover"
            style={{ width: 70, height: 70, borderRadius: 50 }}
          />
        </PetView>
        <PetView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginHorizontal: 10,
          }}>
          <PetText type="smallText" style={{ fontWeight: '500' }}>
            {pet.petName}
          </PetText>
          <PetText type="smallText" style={{ color: colorText }}>
            {pet.petBreed}
          </PetText>
          <PetText type="smallText" style={{ color: colorText }}>
            {pet.petAge}
          </PetText>
        </PetView>
      </PetView>
    </TouchableOpacity>
  );
};

export default function PetList() {
  const [pets, setPets] = useState<Pet[] | undefined>();

  const goToPetRegister = () => {
    router.navigate('/register');
  };

  const getPetById = async () => {
    const data = await getPets();
    setPets(data);
  };

  useEffect(() => {
    getPetById();
  }, []);

  return (
    <PetView style={{ flex: 1 }}>
      <FlatList
        data={pets}
        renderItem={({ item }) => <Item pet={item} />}
        keyExtractor={(item) => item.id}
      />
      <PetIcon
        onPress={goToPetRegister}
        name="add-circle"
        color="#0891b2"
        size={60}
        style={styles.plusButton}
      />
    </PetView>
  );
}

const styles = StyleSheet.create({
  plusButton: {
    position: 'absolute',
    right: 50,
    bottom: 30,
  },
});
