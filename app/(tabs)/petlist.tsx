import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  useColorScheme,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { PetIcon } from '@/components/PetIcon';
import { PetText } from '@/components/PetText';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { useUser } from '@/components/context/UserContext';
import { Colors } from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import { localization } from '@/localizations/localization';
import { PetProps } from '@/types/pet.type';

export default function PetList() {
  const theme = useColorScheme() ?? 'light';
  const colorText = theme === 'light' ? Colors.light.smallText : Colors.dark.smallText;
  const colorBorderCard = theme === 'light' ? '#d1d1d1' : '#3d3d3d';
  const [pets, setPets] = useState<PetProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { session, user } = useUser();

  const goToPetDetails = (pet: PetProps) => {
    router.push({ pathname: `/details/${pet.id}`, params: { petData: JSON.stringify(pet) } });
  };

  const goToPetRegister = () => {
    router.navigate('/register');
  };

  const getPetsByIDFromDB = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pets')
      .select(
        `
          id,
          inserted_at,
          pet_image,
          pet_age,
          pet_breed,
          pet_gender,
          pet_medical_condition,
          pet_name,
          pet_type,
          user_id,
          profiles (
            id,
            email,
            country_code,
            phone
          )
        `,
      )
      .eq('user_id', user?.id);

    if (error) Alert.alert(error.message);

    setPets(data ?? []);
    setLoading(false);
  };

  const refreshingPetList = () => {
    setRefreshing(true);
    setTimeout(() => {
      getPetsByIDFromDB();
      setRefreshing(false);
    }, 500);
  };

  useEffect(() => {
    if (session?.user) getPetsByIDFromDB();
  }, []);

  if (loading) {
    return (
      <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <PetText>{localization.t('pet_list_loading')}</PetText>
      </PetView>
    );
  }

  return (
    <PetView style={{ flex: 1 }}>
      {session ? (
        pets?.length === 0 ? (
          <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <PetIcon onPress={goToPetRegister} name="albums" color="#0891b2" />
            <PetTitle type="subtitle">{localization.t('pet_list_message_1')}</PetTitle>
            <PetIcon
              onPress={goToPetRegister}
              name="add-circle"
              color="#0891b2"
              size={60}
              style={styles.plusButton}
            />
          </PetView>
        ) : (
          <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
              style={{ width: '100%' }}
              refreshing={refreshing}
              onRefresh={refreshingPetList}
              data={pets}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item: pet }) => (
                <TouchableOpacity onPress={() => goToPetDetails(pet)}>
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
                      {pet.pet_image ? (
                        <Image
                          source={{
                            uri: `${pet.pet_image}`,
                          }}
                          resizeMode="cover"
                          style={{ width: 70, height: 70, borderRadius: 50 }}
                        />
                      ) : (
                        <PetIcon name="image" size={70} />
                      )}
                    </PetView>
                    <PetView
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        marginHorizontal: 10,
                      }}>
                      <PetText type="smallText" style={{ fontWeight: '500' }}>
                        {pet.pet_name}
                      </PetText>
                      <PetText type="smallText" style={{ color: colorText }}>
                        {pet.pet_breed}
                      </PetText>
                      <PetText type="smallText" style={{ color: colorText }}>
                        {pet.pet_age}
                      </PetText>
                    </PetView>
                  </PetView>
                </TouchableOpacity>
              )}
            />
            <PetIcon
              onPress={goToPetRegister}
              name="add-circle"
              color="#0891b2"
              size={60}
              style={styles.plusButton}
            />
          </PetView>
        )
      ) : (
        <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <PetIcon onPress={goToPetRegister} name="information-circle" color="#0891b2" />
          <PetTitle type="subtitle">{localization.t('pet_list_message_2')}</PetTitle>
          <PetTitle type="subtitle">{localization.t('pet_list_message_3')}</PetTitle>
        </PetView>
      )}
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
