import { useGlobalSearchParams } from 'expo-router';
import { Alert } from 'react-native';

import PetCard from './petCard';

import { localization } from '@/localizations/localization';
import { PetProps, PetObj } from '@/types/pet.type';

const PetPage = () => {
  const { petData } = useGlobalSearchParams();

  let petInfo: PetProps = PetObj;
  if (petData) {
    try {
      petInfo = JSON.parse(petData as string);
    } catch (e) {
      Alert.alert(localization.t('id_parse_data_error'));
    }
  }

  return <PetCard petInfo={petInfo} />;
};

export default PetPage;
