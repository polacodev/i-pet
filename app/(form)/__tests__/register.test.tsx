import { fireEvent, render, waitFor, act } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import { router } from 'expo-router';
import React from 'react';
import { Alert, useColorScheme } from 'react-native';

import PetRegister from '@/app/(form)/register';

jest.mock('@/components/PetDropdown', () => {
  const ReactNative = jest.requireActual('react-native');
  return {
    ...jest.requireActual('@/components/PetDropdown'),
    PetDropdown: ({ onChange, value, data, placeholder, ...props }) => (
      <ReactNative.View
        testID="pet-dropdown"
        onChange={onChange}
        value={value}
        data={['1', '2']}
        placeholder="test type placeholder"
        {...props}
      />
    ),
  };
});

jest.mock('react-native/Libraries/Utilities/useColorScheme');

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: { Images: 'Images' },
}));

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}));

jest.mock('@/localizations/localization', () => ({
  localization: {
    t: jest.fn().mockImplementation((key) => key),
  },
}));

jest.mock('@/lib/api', () => ({
  getPetList: jest.fn(),
  insertPet: jest.fn(),
  storePetImage: jest.fn(),
}));

jest.mock('@/store/store', () => ({
  usePetStore: jest.fn(),
  useToastStore: jest.fn(),
}));

jest.mock('@/components/context/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('<PetRegister />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (router.back as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('PetRegister renders correctly (dark mode set) and Snapshot', () => {
    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      user: { id: 'test-id' },
    });

    const mockedUsedColorScheme = useColorScheme as jest.Mock;
    mockedUsedColorScheme.mockReturnValue('dark');

    const { toJSON } = render(<PetRegister />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('Pet name, type, gender, breed, age: Change event are called correctly with Invalid Data, onSubmit is called but it the request fails because the validation errors, and Snapshot', async () => {
    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      user: { id: 'test-id' },
    });

    const { getByTestId, getAllByTestId, queryByTestId, toJSON } = render(<PetRegister />);

    // Invalid Data
    const pet_name = '';
    const pet_type = '';
    const pet_gender = '';
    const pet_breed = '';
    const pet_age = '';
    const pet_medical_condition = '';

    fireEvent.changeText(getByTestId('register-pet-name'), pet_name);
    fireEvent.changeText(getAllByTestId('pet-dropdown')[0], pet_type);
    fireEvent.changeText(getAllByTestId('pet-dropdown')[1], pet_gender);
    fireEvent.changeText(getByTestId('register-pet-breed'), pet_breed);
    fireEvent.changeText(getByTestId('register-pet-age'), pet_age);
    fireEvent.changeText(getByTestId('register-pet-medical-condition'), pet_medical_condition);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    // does not render the errors because the form is submitted correctly
    expect(queryByTestId('register-pet-name-error')).toBeTruthy();
    expect(queryByTestId('register-pet-type-error')).toBeTruthy();
    expect(queryByTestId('register-pet-gender-error')).toBeTruthy();
    expect(queryByTestId('register-pet-breed-error')).toBeTruthy();
    expect(queryByTestId('register-pet-age-error')).toBeTruthy();

    // got the session instance to redirect Home after a successfully signup
    expect(toJSON()).toMatchSnapshot();
  });

  test('Pet image(fail on Submit): Change event are called correctly with Valid Data, onSubmit is called but it the request fails because the Image validation error, and Snapshot', async () => {
    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      user: { id: 'test-id' },
    });

    const { getByTestId, getAllByTestId, queryByTestId, toJSON } = render(<PetRegister />);

    // Valid Data
    const pet_name = 'pet name test';
    const pet_type = '1'; // 1: dog, 2: cat
    const pet_gender = '2'; // 1: male, 2: female
    const pet_breed = 'pet breed test';
    const pet_age = 'pet age test';
    const pet_medical_condition = 'none';

    fireEvent.changeText(getByTestId('register-pet-name'), pet_name);
    act(() => {
      fireEvent(getAllByTestId('pet-dropdown')[0], 'onChange', pet_type);
      fireEvent(getAllByTestId('pet-dropdown')[1], 'onChange', pet_gender);
    });
    fireEvent.changeText(getByTestId('register-pet-breed'), pet_breed);
    fireEvent.changeText(getByTestId('register-pet-age'), pet_age);
    fireEvent.changeText(getByTestId('register-pet-medical-condition'), pet_medical_condition);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    // does not render the errors because the form is submitted correctly
    expect(queryByTestId('register-pet-name-error')).not.toBeTruthy();
    expect(queryByTestId('register-pet-type-error')).not.toBeTruthy();
    expect(queryByTestId('register-pet-gender-error')).not.toBeTruthy();
    expect(queryByTestId('register-pet-breed-error')).not.toBeTruthy();
    expect(queryByTestId('register-pet-age-error')).not.toBeTruthy();

    // Image error and onSubmit request fail, because no image was selected
    expect(queryByTestId('register-pet-image-error')).toBeTruthy();

    // got the session instance to redirect Home after a successfully signup
    expect(toJSON()).toMatchSnapshot();
  });

  test('Pet image(alert on pickImageAsync): because no Image has been selected', async () => {
    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      user: { id: 'test-id' },
    });

    require('expo-image-picker').launchImageLibraryAsync.mockReturnValue({
      canceled: true,
      assets: null,
    });

    const pickImageAlertSpy = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<PetRegister />);

    await waitFor(() => {
      fireEvent.press(getByTestId('register-pet-image'), 'onClick');
    });

    // Image Alert is active because the Image was not selected successfully
    expect(pickImageAlertSpy).toHaveBeenCalledTimes(1);
  });

  test('Pet image(correct on pickImageAsync): because the Image has been selected successfully', async () => {
    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      user: { id: 'test-id' },
    });

    require('expo-image-picker').launchImageLibraryAsync.mockReturnValue({
      canceled: false,
      assets: [
        {
          assetId: null,
          base64: null,
          duration: null,
          exif: null,
          fileName: null,
          fileSize: 3378710,
          height: 3025,
          mimeType: 'image/jpeg',
          type: 'image',
          uri: 'test.jpg',
          width: 3024,
        },
      ],
    });

    const pickImageAlertSpy = jest.spyOn(Alert, 'alert');

    const { getByTestId, queryByTestId } = render(<PetRegister />);

    await waitFor(() => {
      fireEvent.press(getByTestId('register-pet-image'), 'onClick');
    });

    // pet image error is hidden because the image is VALID
    expect(queryByTestId('register-pet-image-error')).not.toBeTruthy();

    // Image Alert is not active because the Image was selected successfully
    expect(pickImageAlertSpy).not.toHaveBeenCalled();
  });

  test('Pet Form(correct on onSubmit): Change event are called correctly with Valid Data, onSubmit is called and Pet is created successfully', async () => {
    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      user: { id: 'test-id' },
    });

    require('expo-image-picker').launchImageLibraryAsync.mockReturnValue({
      canceled: false,
      assets: [
        {
          assetId: null,
          base64: null,
          duration: null,
          exif: null,
          fileName: null,
          fileSize: 3378710,
          height: 3025,
          mimeType: 'image/jpeg',
          type: 'image',
          uri: 'test.jpg',
          width: 3024,
        },
      ],
    });

    require('@/lib/api').storePetImage.mockReturnValue({
      error: null,
    });

    require('@/lib/api').insertPet.mockReturnValue({
      error: null,
    });

    require('@/lib/api').getPetList.mockReturnValue({
      data: [],
      error: null,
    });

    const { getByTestId, getAllByTestId, queryByTestId, toJSON } = render(<PetRegister />);

    // Valid Data
    const pet_name = 'pet name test';
    const pet_type = '1'; // 1: dog, 2: cat
    const pet_gender = '2'; // 1: male, 2: female
    const pet_breed = 'pet breed test';
    const pet_age = 'pet age test';
    const pet_medical_condition = 'none';

    fireEvent.changeText(getByTestId('register-pet-name'), pet_name);
    act(() => {
      fireEvent(getAllByTestId('pet-dropdown')[0], 'onChange', pet_type);
      fireEvent(getAllByTestId('pet-dropdown')[1], 'onChange', pet_gender);
    });
    fireEvent.changeText(getByTestId('register-pet-breed'), pet_breed);
    fireEvent.changeText(getByTestId('register-pet-age'), pet_age);
    fireEvent.changeText(getByTestId('register-pet-medical-condition'), pet_medical_condition);

    await waitFor(() => {
      fireEvent.press(getByTestId('register-pet-image'), 'onClick');
    });

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    // does not render the errors because the form is submitted correctly
    expect(queryByTestId('register-pet-name-error')).not.toBeTruthy();
    expect(queryByTestId('register-pet-type-error')).not.toBeTruthy();
    expect(queryByTestId('register-pet-gender-error')).not.toBeTruthy();
    expect(queryByTestId('register-pet-breed-error')).not.toBeTruthy();
    expect(queryByTestId('register-pet-age-error')).not.toBeTruthy();

    // pet image error is hidden because the image is VALID
    expect(toJSON()).toMatchSnapshot();
  });

  test('Pet Form(error on onSubmit): Change event are called correctly with Valid Data, onSubmit is called but the request fails because storePetImage, insertPet, getPetList requests returns error', async () => {
    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      user: { id: 'test-id' },
    });

    require('expo-image-picker').launchImageLibraryAsync.mockReturnValue({
      canceled: false,
      assets: [
        {
          assetId: null,
          base64: null,
          duration: null,
          exif: null,
          fileName: null,
          fileSize: 3378710,
          height: 3025,
          mimeType: 'image/jpeg',
          type: 'image',
          uri: 'test.jpg',
          width: 3024,
        },
      ],
    });

    require('@/lib/api').storePetImage.mockReturnValue({
      error: {
        errorImage: {
          message: 'storePetImage error',
        },
      },
    });

    require('@/lib/api').insertPet.mockReturnValue({
      error: {
        message: 'insertPet error',
      },
    });

    require('@/lib/api').getPetList.mockReturnValue({
      data: [],
      error: {
        message: 'getPetList error',
      },
    });

    const petRequestAlertSpy = jest.spyOn(Alert, 'alert');

    const { getByTestId, getAllByTestId } = render(<PetRegister />);

    // Valid Data
    const pet_name = 'pet name test';
    const pet_type = '1'; // 1: dog, 2: cat
    const pet_gender = '2'; // 1: male, 2: female
    const pet_breed = 'pet breed test';
    const pet_age = 'pet age test';
    const pet_medical_condition = 'none';

    fireEvent.changeText(getByTestId('register-pet-name'), pet_name);
    act(() => {
      fireEvent(getAllByTestId('pet-dropdown')[0], 'onChange', pet_type);
      fireEvent(getAllByTestId('pet-dropdown')[1], 'onChange', pet_gender);
    });
    fireEvent.changeText(getByTestId('register-pet-breed'), pet_breed);
    fireEvent.changeText(getByTestId('register-pet-age'), pet_age);
    fireEvent.changeText(getByTestId('register-pet-medical-condition'), pet_medical_condition);

    await waitFor(() => {
      fireEvent.press(getByTestId('register-pet-image'), 'onClick');
    });

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    // onSubmit request shows three Error Alerts, storePetImage(alert error), insertPet(alert error), getPetList(alert error)
    expect(petRequestAlertSpy).toHaveBeenCalledTimes(3);
  });

  test('Pet Form(error on onSubmit): Change event are called correctly with Valid Data, onSubmit is called but the request fails because storePetImage and getPetList requests returns error and insertPet catch and rejected request, error is instance of Error', async () => {
    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      user: { id: 'test-id' },
    });

    require('expo-image-picker').launchImageLibraryAsync.mockReturnValue({
      canceled: false,
      assets: [
        {
          assetId: null,
          base64: null,
          duration: null,
          exif: null,
          fileName: null,
          fileSize: 3378710,
          height: 3025,
          mimeType: 'image/jpeg',
          type: 'image',
          uri: 'test.jpg',
          width: 3024,
        },
      ],
    });

    require('@/lib/api').storePetImage.mockReturnValue({
      error: {
        errorImage: {
          message: 'storePetImage error',
        },
      },
    });

    // insertPet request fails and return an error instance of Error
    require('@/lib/api').insertPet.mockRejectedValue(new Error('insertPet Error Catch'));

    require('@/lib/api').getPetList.mockReturnValue({
      data: [],
      error: {
        message: 'getPetList error',
      },
    });

    const petRequestAlertSpy = jest.spyOn(Alert, 'alert');

    const { getByTestId, getAllByTestId } = render(<PetRegister />);

    // Valid Data
    const pet_name = 'pet name test';
    const pet_type = '1'; // 1: dog, 2: cat
    const pet_gender = '2'; // 1: male, 2: female
    const pet_breed = 'pet breed test';
    const pet_age = 'pet age test';
    const pet_medical_condition = 'none';

    fireEvent.changeText(getByTestId('register-pet-name'), pet_name);
    act(() => {
      fireEvent(getAllByTestId('pet-dropdown')[0], 'onChange', pet_type);
      fireEvent(getAllByTestId('pet-dropdown')[1], 'onChange', pet_gender);
    });
    fireEvent.changeText(getByTestId('register-pet-breed'), pet_breed);
    fireEvent.changeText(getByTestId('register-pet-age'), pet_age);
    fireEvent.changeText(getByTestId('register-pet-medical-condition'), pet_medical_condition);

    await waitFor(() => {
      fireEvent.press(getByTestId('register-pet-image'), 'onClick');
    });

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    // onSubmit request shows three Error Alerts, storePetImage(alert error), insertPet(catch alert error), getPetList(alert error)
    expect(petRequestAlertSpy).toHaveBeenCalledTimes(3);
  });

  test('Pet Form(error on onSubmit): Change event are called correctly with Valid Data, onSubmit is called but the request fails because storePetImage and getPetList requests returns error and insertPet catch and rejected request, error is not instance of Error', async () => {
    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      user: { id: 'test-id' },
    });

    require('expo-image-picker').launchImageLibraryAsync.mockReturnValue({
      canceled: false,
      assets: [
        {
          assetId: null,
          base64: null,
          duration: null,
          exif: null,
          fileName: null,
          fileSize: 3378710,
          height: 3025,
          mimeType: 'image/jpeg',
          type: 'image',
          uri: 'test.jpg',
          width: 3024,
        },
      ],
    });

    require('@/lib/api').storePetImage.mockReturnValue({
      error: {
        errorImage: {
          message: 'storePetImage error',
        },
      },
    });

    // insertPet request fails and return an error instance of Error
    require('@/lib/api').insertPet.mockRejectedValue(123456);

    require('@/lib/api').getPetList.mockReturnValue({
      data: [],
      error: {
        message: 'getPetList error',
      },
    });

    const petRequestAlertSpy = jest.spyOn(Alert, 'alert');

    const { getByTestId, getAllByTestId } = render(<PetRegister />);

    // Valid Data
    const pet_name = 'pet name test';
    const pet_type = '1'; // 1: dog, 2: cat
    const pet_gender = '2'; // 1: male, 2: female
    const pet_breed = 'pet breed test';
    const pet_age = 'pet age test';
    const pet_medical_condition = 'none';

    fireEvent.changeText(getByTestId('register-pet-name'), pet_name);
    act(() => {
      fireEvent(getAllByTestId('pet-dropdown')[0], 'onChange', pet_type);
      fireEvent(getAllByTestId('pet-dropdown')[1], 'onChange', pet_gender);
    });
    fireEvent.changeText(getByTestId('register-pet-breed'), pet_breed);
    fireEvent.changeText(getByTestId('register-pet-age'), pet_age);
    fireEvent.changeText(getByTestId('register-pet-medical-condition'), pet_medical_condition);

    await waitFor(() => {
      fireEvent.press(getByTestId('register-pet-image'), 'onClick');
    });

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    // onSubmit request shows two Error Alerts, storePetImage(alert error), insertPet(catch error is not instance of Error), getPetList(alert error)
    expect(petRequestAlertSpy).toHaveBeenCalledTimes(2);
  });
});
