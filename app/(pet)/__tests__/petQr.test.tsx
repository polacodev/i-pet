import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import ER, { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

import PetQr from '@/app/(pet)/petQr';

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

jest.mock('expo-camera', () => {
  const ReactNative = jest.requireActual('react-native');
  return {
    ...jest.requireActual('expo-camera'),
    CameraView: ({ onBarcodeScanned, ...props }) => (
      <ReactNative.View testID="pet-camera-view" {...props} onBarcodeScanned={onBarcodeScanned} />
    ),
  };
});

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    back: jest.fn(),
  },
  useFocusEffect: jest.fn(),
}));

jest.mock('@/lib/api', () => ({
  getPetById: jest.fn(),
}));

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

describe('<PetQr />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('PetQr call useFocusEffect, useCallback, useState, and unmount renders correctly and Snapshot', () => {
    const setMountStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setMountStateMock];

    // useFocusEffect when the page is render
    jest.spyOn(ER, 'useFocusEffect').mockImplementationOnce((f) => f());
    // useCallback then unmount is called
    jest.spyOn(React, 'useCallback').mockImplementation((f) => f());
    // setMountStateMock is false
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId, toJSON } = render(<PetQr />);

    expect(toJSON()).toMatchSnapshot();
    expect(setMountStateMock).toHaveBeenCalledWith(false);
    expect(getByTestId('pet-camera-view')).toBeTruthy();
  });

  test('PetQr, ActivityIndicator renders when mountCamera is false and Snapshot', () => {
    const setMountStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setMountStateMock];

    // setMountStateMock is false
    jest.spyOn(React, 'useState').mockImplementation(() => [false, useStateMock]);

    const { getByTestId, toJSON } = render(<PetQr />);

    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId('pet-activity-indicator')).toBeTruthy();
  });

  test('Camera is unmounted when closeIPetCamera (close-circle) icon is pressed', async () => {
    const setMountStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setMountStateMock];

    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(<PetQr />);

    fireEvent.press(getByTestId('pet-close-camera'), 'onClick');

    await waitFor(() => {
      expect(setMountStateMock).toHaveBeenCalledWith(false);
    });
  });

  test('Camera is unmounted and back to Home when closeIPetCamera (close-circle) icon is pressed', async () => {
    const setMountStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setMountStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const backToHome = jest.fn();

    const { getByTestId } = render(<PetQr />);

    fireEvent.press(getByTestId('pet-close-camera'), 'onClick');
    jest.spyOn(router, 'back').mockImplementation(backToHome);
    await waitFor(() => {
      expect(backToHome).toHaveBeenCalled();
      expect(router.back).toHaveBeenCalledWith();
    });
  });

  test('onBarcodeScanned event is called with an invalid QR Data', async () => {
    const setMountStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setMountStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { getByTestId } = render(<PetQr />);
    act(() => {
      fireEvent(getByTestId('pet-camera-view'), 'onBarcodeScanned', {
        type: 'qr',
        data: 'http://fakeurl/invalidRoute/00000000-0000-0000-0000-000000000000',
      });
    });

    await waitFor(() => {
      expect(router.back).toHaveBeenCalledWith();
    });
  });

  test('onBarcodeScanned event throws an error because an invalid QR Data', () => {
    const setMountStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setMountStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const alertError = jest.spyOn(Alert, 'alert');
    const onDismissPress = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<PetQr />);

    act(() => {
      fireEvent(getByTestId('pet-camera-view'), 'onBarcodeScanned', {
        type: 'qr',
        data: 'http://fakeurl/invalidRoute/00000000-0000-0000-0000-000000000000',
      });
    });

    expect(alertError).toHaveBeenCalled();
    const onDismiss = alertError.mock.calls[0]?.[2]?.[0];
    onDismiss?.onPress();

    expect(onDismissPress).toHaveBeenCalled();
  });

  test('onBarcodeScanned event is called with an Valid QR Data but return an Error', async () => {
    const setMountStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setMountStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    require('@/lib/api').getPetById.mockReturnValue({
      data: null,
      error: new Error('error message'),
    });
    const alertError = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<PetQr />);

    act(() => {
      fireEvent(getByTestId('pet-camera-view'), 'onBarcodeScanned', {
        type: 'qr',
        data: 'http://validurl/details/00000000-0000-0000-0000-000000000000',
      });
    });

    await waitFor(() => {
      expect(router.back).toHaveBeenCalledWith();
    });

    expect(alertError).toHaveBeenCalled();
  });

  test('onBarcodeScanned event is called with an Valid QR Data and return Data', async () => {
    const setMountStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setMountStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    require('@/lib/api').getPetById.mockReturnValue({
      data: petObj,
      error: null,
    });

    const { getByTestId } = render(<PetQr />);

    act(() => {
      fireEvent(getByTestId('pet-camera-view'), 'onBarcodeScanned', {
        type: 'qr',
        data: 'http://validurl/details/00000000-0000-0000-0000-000000000000',
      });
    });

    await waitFor(() => {
      expect(router.back).toHaveBeenCalledTimes(0);
    });
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/details/00000000-0000-0000-0000-000000000000',
      params: { petData: JSON.stringify(petObj) },
    });
  });
});
