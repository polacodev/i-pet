import { render, screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import React from 'react';
import { Linking } from 'react-native';

import PetCard from '@/app/details/petCard';

const petObjNoImage = {
  id: '00000000-0000-0000-0000-000000000000',
  inserted_at: 'testInsertedId',
  pet_image: null,
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

jest.mock('@/localizations/localization', () => ({
  localization: {
    t: jest.fn((key) => {
      const translations = {
        pet_qr_alert_title: 'Error',
        pet_qr_alert_message: 'Error Message',
        pet_qr_alert_dismiss: 'Dismiss',
      };
      return translations[key] || key;
    }),
  },
}));
jest.mock('expo-camera', () => {
  const ReactNative = jest.requireActual('react-native');
  return {
    ...jest.requireActual('react-native'),
    Modal: ({ onRequestClose, ...props }) => (
      <ReactNative.View testID="pet-modal-card" {...props} onRequestClose={onRequestClose} />
    ),
  };
});

describe('<PetCard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('PetCard renders the Card with image and Snapshot', () => {
    const { getByTestId, toJSON } = render(<PetCard petInfo={petObj} />);

    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId('pet-image')).toBeTruthy();
  });

  test('PetCard renders the Card with no image and Snapshot', () => {
    const { getAllByTestId, toJSON } = render(<PetCard petInfo={petObjNoImage} />);

    expect(toJSON()).toMatchSnapshot();
    expect(getAllByTestId('pet-icon')).toBeTruthy();
  });

  test('callWhatsappOwner event is called when whatsapp button is pressed', () => {
    const callWhatsappOwnerSpy = jest.spyOn(Linking, 'openURL');

    render(<PetCard petInfo={petObj} />);

    const button = screen.getAllByTestId('pet-button');

    // Press the callWhatsappOwner button to redirect to whatsapp chat
    fireEvent.press(button[0], 'onClick');

    expect(callWhatsappOwnerSpy).toHaveBeenCalled();
  });

  test('modalVisible change to true when QR Code button is pressed and Modal Snapshot', () => {
    const setModalVisibleStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setModalVisibleStateMock];

    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    render(<PetCard petInfo={petObj} />);

    const button = screen.getAllByTestId('pet-button');

    // Press the QR Code button to enabled the QR Modal
    fireEvent.press(button[1], 'onClick');

    expect(screen.toJSON()).toMatchSnapshot();
    expect(screen.getByTestId('pet-modal-card')).toBeTruthy();
  });

  test('pet-close-modal button is pressed when the Modal Card is enabled', () => {
    const setModalVisibleStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setModalVisibleStateMock];

    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    render(<PetCard petInfo={petObj} />);

    const button = screen.getAllByTestId('pet-button');

    // Press the QR Code button to enabled the QR Modal
    fireEvent.press(button[1], 'onClick');
    expect(screen.getByTestId('pet-modal-card')).toBeTruthy();

    // Press close icon to hide the QR Modal
    fireEvent.press(screen.getByTestId('pet-close-modal'), 'onClick');

    // QR modal should be hidden
    expect(screen.queryByTestId('pet-modal-card')).toBeNull();
  });

  test('onRequestClose event is called when hardware back button is pressed', async () => {
    const setModalVisibleStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setModalVisibleStateMock];

    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    render(<PetCard petInfo={petObj} />);

    const button = screen.getAllByTestId('pet-button');
    // Press the QR Code button to enabled the QR Modal
    fireEvent.press(button[1], 'onClick');
    await waitFor(() => {
      expect(screen.getByTestId('pet-modal-card')).toBeTruthy();
    });

    // mimic the user pressing the hardware back button
    act(() => {
      fireEvent(screen.getByTestId('pet-modal-card'), 'onRequestClose');
    });

    // QR modal should be hidden
    expect(screen.queryByTestId('pet-modal-card')).toBeNull();
  });
});
