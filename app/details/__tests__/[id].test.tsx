import { render, screen } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import React from 'react';
import { Alert } from 'react-native';

import PetPage from '@/app/details/[id]';

const petObj = {
  id: '00000000-0000-0000-0000-000000000000',
  inserted_at: 'testInsertedId',
  pet_image: 'https://fakeurl/fakeimage/test.png',
  pet_age: 'testPetAge',
  pet_breed: 'testPetBreed',
  pet_gender: 'testPetGender',
  pet_medical_condition: 'testPetMC',
  pet_name: 'testPetName',
  pet_type: 'testPetType',
  profiles: {
    country_code: 'testProfileCountryCode',
    email: 'testProfileEmail',
    id: 'testProfileId',
    phone: 'testProfilePhone',
  },
  user_id: 'testUserId',
};

const petObjInvalid =
  '{"id":"00000000-0000-0000-0000-000000000000","inserted_at":testInse rtedId,"pet_image":"https://fakeurl/fakeimage/test.png","pet_age":"testPetAge","pet_breed":"testPetBreed","pet_gender":"testPetGender","pet_medical_condition":"testPetMC","pet_name":"testPetName","pet_type":"testPetType","profiles":{"country_code":"testProfileCountryCode","email":"testProfileEmail","id":"testProfileId","phone":"testProfilePhone"},"user_id":"testUserId"}';

jest.mock('expo-router', () => ({
  useGlobalSearchParams: jest.fn(),
}));

jest.mock('@/localizations/localization', () => ({
  localization: {
    t: jest.fn().mockImplementation((key) => key),
  },
}));

jest.mock('@/localizations/localization', () => ({
  localization: {
    t: jest.fn((key) => {
      const translations = {
        id_error_alert_title: 'Error',
        id_error_alert_message: 'Error Message',
      };
      return translations[key] || key;
    }),
  },
}));

describe('<PetPage />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('PetPage renders the PetCard with valid petData and Snapshot', () => {
    require('expo-router').useGlobalSearchParams.mockReturnValue({
      petData: JSON.stringify(petObj),
    });
    const { toJSON } = render(<PetPage />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('PetPage renders the PetCard with invalid petData and Snapshot', () => {
    require('expo-router').useGlobalSearchParams.mockReturnValue({
      petData: petObjInvalid,
    });
    const parseAlertError = jest.spyOn(Alert, 'alert');
    render(<PetPage />);
    expect(parseAlertError).toHaveBeenCalled();
  });

  test('PetPage fails the JSON parse and shows up the alert and Snapshot', () => {
    require('expo-router').useGlobalSearchParams.mockReturnValue({
      petData: null,
    });
    render(<PetPage />);
    const textForm = screen.getAllByTestId('pet-text');
    expect(screen.toJSON()).toMatchSnapshot();
    expect(textForm[0]).toHaveTextContent(' : ');
  });
});
