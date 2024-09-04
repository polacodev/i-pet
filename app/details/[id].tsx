import { useGlobalSearchParams } from 'expo-router';

import PetCard from './petCard';

import { PetProps, PetObj } from '@/types/pet.type';

const PetPage = () => {
  const { petData } = useGlobalSearchParams();

  let petInfo: PetProps = PetObj;
  if (petData) {
    petInfo = JSON.parse(petData as string);
  }

  return <PetCard {...petInfo} />;
};

export default PetPage;
