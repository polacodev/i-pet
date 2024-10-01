import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { PetIcon } from '@/components/PetIcon';
import { PetText } from '@/components/PetText';
import { PetTitle } from '@/components/PetTitle';
import { PetView } from '@/components/PetView';
import { useUser } from '@/components/context/UserContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getPetList, deletePetById, deletePetImage } from '@/lib/api';
import { localization } from '@/localizations/localization';
import { useToastStore, usePetStore } from '@/store/store';
import { PetProps } from '@/types/pet';
import { extractPathFromUrl } from '@/utilities/utilities';

type PetListProps = {
  lightColor?: string;
  darkColor?: string;
};

export default function PetList({ lightColor, darkColor }: PetListProps) {
  const colorText = useThemeColor({ light: lightColor, dark: darkColor }, 'smallText');
  const colorBorderCard = useThemeColor({ light: lightColor, dark: darkColor }, 'borderCard');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setPetList, pets, removePetFromStore } = usePetStore();
  const { setToast } = useToastStore();

  const { session, user } = useUser();

  const goToPetDetails = (pet: PetProps) => {
    router.push({ pathname: `/details/${pet.id}`, params: { petData: JSON.stringify(pet) } });
  };

  const goToPetRegister = () => {
    router.navigate('/register');
  };

  const getPetsByIDFromDB = async () => {
    setLoading(true);
    const { data, error } = await getPetList(user?.id ?? null);
    if (error) Alert.alert(error.message);

    setPetList(data);
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

  const onDeletePetById = async (petId: string, petImageURL: string) => {
    Alert.alert('', 'Are you sure to delete?', [
      {
        text: 'Cancel',
        onPress: () => ({}),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deletePet(petId, petImageURL) },
    ]);
  };

  const deletePet = async (petId: string, petImageURL: string) => {
    const { pathname } = extractPathFromUrl(petImageURL);
    const petImageName = pathname?.split('/').pop();
    const deletePetByIdPromise = deletePetById(petId);
    const deletePetImagePromise = deletePetImage(petImageName);

    try {
      const [deletePetByIdResult, deletePetImageResult] = await Promise.all([
        deletePetByIdPromise,
        deletePetImagePromise,
      ]);

      if (deletePetByIdResult.error) Alert.alert('Error', deletePetByIdResult.error.message);
      if (deletePetImageResult.error) Alert.alert('Error', deletePetImageResult.error.message);

      removePetFromStore(petId);
      setToast({ isVisible: true, message: 'Pet has been deleted successfully!' });
    } catch (error) {
      if (error instanceof Error) Alert.alert('Error', error.message);
    }
  };

  return (
    <PetView style={{ flex: 1 }}>
      {session ? (
        pets?.length === 0 ? (
          <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <PetIcon name="albums" color="#0891b2" />
            <PetTitle type="subtitle">{localization.t('pet_list_message_1')}</PetTitle>
            <TouchableOpacity
              testID="pet-button-register"
              onPress={goToPetRegister}
              style={styles.plusButton}>
              <PetIcon name="add-circle" color="#0891b2" size={60} />
            </TouchableOpacity>
          </PetView>
        ) : (
          <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
              testID="pet-list"
              style={{ width: '100%' }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refreshingPetList} />
              }
              data={pets}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item: pet }) => (
                <TouchableOpacity testID="pet-details-card" onPress={() => goToPetDetails(pet)}>
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
                      <TouchableOpacity
                        testID="pet-delete-card-icon"
                        style={{
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end',
                          width: '15%',
                        }}
                        onPress={() => onDeletePetById(pet?.id, pet?.pet_image)}>
                        <PetIcon name="trash" size={20} color={colorText} />
                      </TouchableOpacity>
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
                        <PetIcon testID="pet-icon-aux" name="image" size={70} />
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
            <TouchableOpacity
              testID="pet-button-register-with-empty-data"
              onPress={goToPetRegister}
              style={styles.plusButton}>
              <PetIcon name="add-circle" color="#0891b2" size={60} />
            </TouchableOpacity>
          </PetView>
        )
      ) : (
        <PetView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <PetIcon name="information-circle" color="#0891b2" />
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
