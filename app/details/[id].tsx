import { useGlobalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import PetCard from './petCard';

import { localization } from '@/localizations/localization';
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
  const [parsedData, setParsedData] = useState<PetProps>(PetObj);
  const { petData } = useGlobalSearchParams();

  const processSearchParams = () => {
    if (petData) {
      try {
        const parsed = JSON.parse(petData as string);
        setParsedData(parsed);
      } catch (error) {
        Alert.alert(
          localization.t('id_error_alert_title'),
          localization.t('id_error_alert_message'),
        );
      }
    }
  };

  useEffect(() => {
    processSearchParams();
  }, [petData]);

  return <PetCard petInfo={parsedData} />;
};

export default PetPage;
