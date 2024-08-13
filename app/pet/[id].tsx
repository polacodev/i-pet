import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';

import PetCard from './petCard';

import { getPets } from '@/lib/api';

export type Pet = {
  id: string;
  petName: string;
  petType: string;
  petAge: number;
  petBreed: string;
  petGender: string;
  petMedicalCondition: string;
  ownerName: string;
  ownerPhone: string;
};

const PetPage: React.FC = () => {
  const { id } = useLocalSearchParams();
  const [pet, setPet] = useState<Pet | undefined>({
    id: '',
    petName: '',
    petType: '',
    petAge: 0,
    petBreed: '',
    petGender: '',
    petMedicalCondition: '',
    ownerName: '',
    ownerPhone: '',
  });

  const getPetById = async () => {
    const data = await getPets();
    const petFound = data?.find((item) => item.id === id);
    setPet(petFound);
  };

  useEffect(() => {
    getPetById();
  }, []);

  return <PetCard pet={pet} />;
};

export default PetPage;
