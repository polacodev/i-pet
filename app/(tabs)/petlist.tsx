import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, StatusBar, Image, useColorScheme } from 'react-native';

import { PetIcon } from '@/components/PetIcon';
import { PetText } from '@/components/PetText';
import { PetView } from '@/components/PetView';
import { Colors } from '@/constants/Colors';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Felipe',
    breed: 'bulldog',
    age: '3 years',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Blanco',
    breed: 'dalmata',
    age: '2 months',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Chiquitin',
    breed: 'mestizo',
    age: '9 months',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    title: 'Felipe',
    breed: 'chapi',
    age: '5 years',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
    title: 'Blanco',
    breed: 'pitbull',
    age: '10 years',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba9',
    title: 'Felipe',
    breed: 'lobo',
    age: '1 year',
  },
];

type ItemProps = { title: string; breed: string; age: string };

const Item = ({ title, breed, age }: ItemProps) => {
  const theme = useColorScheme() ?? 'light';
  const colorText = theme === 'light' ? Colors.light.smallText : Colors.dark.smallText;
  const colorBorderCard = theme === 'light' ? '#d1d1d1' : '#3d3d3d';

  return (
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
          {title}
        </PetText>
        <PetText type="smallText" style={{ color: colorText }}>
          {breed}
        </PetText>
        <PetText type="smallText" style={{ color: colorText }}>
          {age}
        </PetText>
      </PetView>
    </PetView>
  );
};

export default function PetList() {
  const goToPetRegiter = () => {
    router.navigate('/register');
  };

  return (
    <PetView style={{ flex: 1 }}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} breed={item.breed} age={item.age} />}
        keyExtractor={(item) => item.id}
      />
      <PetIcon
        onPress={goToPetRegiter}
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
