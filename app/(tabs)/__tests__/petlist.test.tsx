import { jest, test } from '@jest/globals';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { router } from 'expo-router';
import '@testing-library/react-native/extend-expect';
import React, { useState as useStateMock } from 'react';
import { Alert, RefreshControl } from 'react-native';

import PetList from '@/app/(tabs)/petlist';

const petObj = {
  pet: {
    id: 'testId',
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
  },
};

const petObjNoImage = {
  pet: {
    id: 'testId',
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
  },
};

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockReturnThis(),
    })),
  },
}));

jest.mock('@/lib/api', () => ({
  getPetList: jest.fn(),
  deletePetById: jest.fn(),
  deletePetImage: jest.fn(),
}));

const setState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@/store/store', () => ({
  usePetStore: jest.fn(),
  useToastStore: jest.fn(),
}));

jest.mock('@/components/context/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
    push: jest.fn(),
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  AsyncStorage: jest.fn(),
}));

jest.mock('@/localizations/localization', () => ({
  localization: {
    t: jest.fn().mockImplementation((key) => key),
  },
}));

describe('<PetList />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    useStateMock.mockImplementation((init: boolean) => [init, setState]);
    (router.navigate as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('PetList with No User Session renders correctly and Snapshot', () => {
    useStateMock.mockImplementationOnce((init: boolean) => [init, setState]);
    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: [],
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: null,
    });

    const { getByText, toJSON } = render(<PetList />);
    expect(getByText('pet_list_message_3')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  test('PetList Data empty with User Session renders correctly and Snapshot', () => {
    useStateMock.mockImplementationOnce(() => [true, setState]);

    require('@/lib/api').getPetList.mockReturnValue({
      data: [],
      error: jest.fn(),
    });

    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: [],
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: { user: 'user-test1' },
    });

    const { toJSON } = render(<PetList />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('navigate to /register event is being called when add-circle button is pressed', () => {
    useStateMock.mockImplementationOnce(() => [true, setState]);

    require('@/lib/api').getPetList.mockReturnValue({
      data: [],
      error: jest.fn(),
    });

    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: [],
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: { user: 'user-test1' },
      user: { id: 'user-id1' },
    });

    const { getByTestId } = render(<PetList />);

    act(() => {
      fireEvent.press(getByTestId('pet-button-register'), 'onClick');
    });

    expect(router.navigate).toHaveBeenCalledWith('/register');
  });

  test('setLoading true makes appear the ActivityIndicator and Snapshot', () => {
    useStateMock.mockImplementationOnce(() => [true, setState]);
    useStateMock.mockImplementationOnce(() => [true, setState]);

    require('@/lib/api').getPetList.mockReturnValue({
      data: [],
      error: jest.fn(),
    });

    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: [],
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: { user: 'user-test1' },
    });

    const { getByText, toJSON } = render(<PetList />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('goToPetRegister is called with User Session and PetList and Snapshot', () => {
    require('@/lib/api').getPetList.mockReturnValue({
      data: Object.values(petObj),
      error: jest.fn(),
    });

    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: Object.values(petObj),
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: { user: 'user-test1' },
    });

    const { getByTestId, toJSON } = render(<PetList />);

    act(() => {
      fireEvent.press(getByTestId('pet-button-register-with-empty-data'), 'onClick');
    });

    expect(getByTestId('pet-button-register-with-empty-data')).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith('/register');
    expect(toJSON()).toMatchSnapshot();
  });

  test('goToPetDetails is called when Pet Card is pressed', () => {
    require('@/lib/api').getPetList.mockReturnValue({
      data: Object.values(petObj),
      error: jest.fn(),
    });

    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: Object.values(petObj),
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: { user: 'user-test1' },
    });

    const { getByTestId } = render(<PetList />);

    act(() => {
      fireEvent.press(getByTestId('pet-details-card'), 'onClick');
    });

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/details/testId',
      params: { petData: JSON.stringify(Object.values(petObj)[0]) },
    });
  });

  test('PetCard does not contain a Pet Image instead of it renders an aux icon', () => {
    require('@/lib/api').getPetList.mockReturnValue({
      data: Object.values(petObjNoImage),
      error: jest.fn(),
    });

    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: Object.values(petObjNoImage),
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: { user: 'user-test1' },
    });

    const { getByTestId } = render(<PetList />);

    expect(getByTestId('pet-icon-aux')).toBeTruthy();
  });

  test('refreshingPetList is called then refreshing event is enabled', async () => {
    require('@/lib/api').getPetList.mockReturnValue({
      data: Object.values(petObj),
      error: jest.fn(),
    });

    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: Object.values(petObj),
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: { user: 'user-test1' },
    });

    const { UNSAFE_getByType } = render(<PetList />);
    const refreshControl = UNSAFE_getByType(RefreshControl);
    expect(refreshControl.props.refreshing).toBe(false);

    fireEvent(refreshControl, 'refresh');

    await waitFor(() => expect(refreshControl.props.refreshing).toBe(false));
  });

  test('onDeletePetById event and Alert (Dismiss, Ok) events are called when delete card icon is pressed', async () => {
    require('@/lib/api').getPetList.mockReturnValue({
      data: Object.values(petObj),
      error: jest.fn(),
    });

    require('@/lib/api').deletePetById.mockReturnValue({
      data: null,
      error: new Error('deletePetById test error'),
    });

    require('@/lib/api').deletePetImage.mockReturnValue({
      data: null,
      error: new Error('deletePetById test error'),
    });

    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: Object.values(petObj),
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: { user: 'user-test1' },
    });

    const deleteAlert = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<PetList />);

    const onOKPress = jest.spyOn(Alert, 'alert');

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-delete-card-icon'), 'onClick');
    });
    expect(deleteAlert).toHaveBeenCalled();

    const onOK = deleteAlert.mock.calls[0]?.[2]?.[1];
    const onCancel = deleteAlert.mock.calls[0]?.[2]?.[0];
    onOK?.onPress();
    onCancel?.onPress();

    expect(onOKPress).toHaveBeenCalled();
  });

  test('deletePetById, deletePetImage are called when Alert Ok event is pressed', async () => {
    require('@/lib/api').getPetList.mockReturnValue({
      data: Object.values(petObj),
      error: null,
    });

    require('@/lib/api').deletePetById.mockReturnValue({
      data: jest.fn(),
      error: null,
    });

    require('@/lib/api').deletePetImage.mockReturnValue({
      data: jest.fn(),
      error: null,
    });

    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: Object.values(petObj),
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: { user: 'user-test1' },
    });

    const deleteAlert = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<PetList />);

    const onOKPress = jest.spyOn(Alert, 'alert');

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-delete-card-icon'), 'onClick');
    });
    expect(deleteAlert).toHaveBeenCalled();

    const onOK = deleteAlert.mock.calls[0]?.[2]?.[1];
    onOK?.onPress();

    expect(onOKPress).toHaveBeenCalled();
  });

  test('deletePetById throws an error that is not an instance of ERROR ', async () => {
    require('@/lib/api').getPetList.mockReturnValue({
      data: Object.values(petObj),
      error: null,
    });

    // deletePetById catch and ERROR is not instance of ERROR
    require('@/lib/api').deletePetById.mockRejectedValue(123);

    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: Object.values(petObj),
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: { user: 'user-test1' },
      user: { id: 'test-id' },
    });

    const deleteAlert = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<PetList />);

    const onOKPress = jest.spyOn(Alert, 'alert');

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-delete-card-icon'), 'onClick');
    });
    expect(deleteAlert).toHaveBeenCalled();

    const onOK = deleteAlert.mock.calls[0]?.[2]?.[1];
    onOK?.onPress();

    expect(onOKPress).toHaveBeenCalled();
  });

  test('deletePetById throws an error that is an instance of ERROR ', async () => {
    require('@/lib/api').getPetList.mockReturnValue({
      data: Object.values(petObj),
      error: null,
    });

    // deletePetById catch and ERROR is instance of ERROR
    require('@/lib/api').deletePetById.mockRejectedValue(new Error('test error message'));

    require('@/store/store').usePetStore.mockReturnValue({
      setPetList: jest.fn(),
      pets: Object.values(petObj),
      removePetFromStore: jest.fn(),
    });

    require('@/store/store').useToastStore.mockReturnValue({
      setToast: jest.fn(),
    });

    require('@/components/context/UserContext').useUser.mockReturnValue({
      session: { user: 'user-test1' },
    });

    const deleteAlert = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<PetList />);

    const onOKPress = jest.spyOn(Alert, 'alert');

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-delete-card-icon'), 'onClick');
    });
    expect(deleteAlert).toHaveBeenCalled();

    const onOK = deleteAlert.mock.calls[0]?.[2]?.[1];
    onOK?.onPress();

    expect(onOKPress).toHaveBeenCalled();
  });
});
