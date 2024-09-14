import { useGlobalSearchParams } from 'expo-router';
import { Alert } from 'react-native';

import PetCard from './petCard';

import { PetProps, PetObj } from '@/types/pet.type';

const PetPage = () => {
  const { petData } = useGlobalSearchParams();

  let petInfo: PetProps = PetObj;
  if (petData) {
    try {
      petInfo = JSON.parse(petData as string);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.name, error.message);
      }
    }
  }

  return <PetCard petInfo={petInfo} />;
};

export default PetPage;
