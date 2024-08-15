import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, StatusBar, Image, useColorScheme } from 'react-native';

import { PetIcon } from '@/components/PetIcon';
import { PetText } from '@/components/PetText';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { Colors } from '@/constants/Colors';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Felipe',
    breed: 'bulldog',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Blanco',
    breed: 'mestizo',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Chiquitin',
    breed: 'pequinez',
  },
];

type ItemProps = { title: string; breed: string };

const Item = ({ title, breed }: ItemProps) => {
  const theme = useColorScheme() ?? 'light';
  const colorText = theme === 'light' ? Colors.light.smallText : Colors.dark.smallText;
  return (
    <PetView
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'rgb(209 213 219)',
        borderBottomWidth: 1,
        padding: 5,
      }}>
      <PetView style={{ flexDirection: 'row', alignItems: 'center' }}>
        <PetView style={{ alignItems: 'center', paddingRight: 10 }}>
          <Image
            source={{
              uri: 'https://imgs.search.brave.com/Y2WtUyRRcQkDizOjI8FsJPtqqtVfzi0KqTMD5hoanls/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTg1/MzMwMzMzL3Bob3Rv/L2RhY2hzaHVuZC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/V0FrMTE5RjhMWWNP/NXl6N0x3N3pHSE1U/aTJaQUlrQjI5anp4/TVJkRlpuQT0',
            }}
            resizeMode="cover"
            style={{ width: 40, height: 40, borderRadius: 9999 }}
          />
        </PetView>
        <PetView>
          <PetText type="smallText" style={{ fontWeight: '500' }}>
            {title}
          </PetText>
          <PetText type="smallText" style={{ color: colorText }}>
            {breed}
          </PetText>
        </PetView>
      </PetView>
      <PetIcon name="trash" size={20} color={colorText} />
    </PetView>
  );
};

export default function PetList() {
  return (
    <SafeAreaView style={styles.container}>
      <PetView style={{ alignItems: 'center', justifyContent: 'center' }}>
        <PetTitle type="subtitle">Pet List</PetTitle>
      </PetView>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} breed={item.breed} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width: '90%',
  },
});
