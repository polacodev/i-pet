import { useGlobalSearchParams } from 'expo-router';
import { Alert } from 'react-native';

import PetCard from './petCard';

import { PetProps } from '@/types/pet';

const PetObj = {
  id: '',
  inserted_at: '',
  pet_image: '',
  pet_age: '',
  pet_breed: '',
  pet_gender: '',
  pet_medical_condition: '',
  pet_name: '',
  pet_type: '',
  profiles: {
    country_code: '',
    email: '',
    id: '',
    phone: '',
  },
  user_id: '',
};

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
