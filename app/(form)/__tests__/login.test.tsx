import { fireEvent, render, waitFor } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

import Login from '@/app/(form)/login';

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

jest.mock('@/localizations/localization', () => ({
  localization: {
    t: jest.fn().mockImplementation((key) => key),
  },
}));

jest.mock('@/lib/api', () => ({
  signInWithPassword: jest.fn(),
}));

describe('<Login />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (router.navigate as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Login renders correctly and Snapshot', () => {
    const { toJSON } = render(<Login />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('goToSignUp is called when signup label is pressed', () => {
    const { getByTestId } = render(<Login />);

    fireEvent.press(getByTestId('redirect-to-signup-label'), 'onClick');

    expect(router.navigate).toHaveBeenCalledWith('/signup');
  });

  test('Email, Password change event are called correctly with valid Data to call signInWithPassword and redirect to Home', async () => {
    require('@/lib/api').signInWithPassword.mockReturnValue({
      data: {
        session: 'test@example.com',
      },
      error: null,
    });

    const { getByTestId, queryByTestId } = render(<Login />);

    // Valid Data for a success request
    const email = 'test@test.com';
    const password = 'password';

    fireEvent.changeText(getByTestId('login-email-input'), email);
    fireEvent.changeText(getByTestId('login-password-input'), password);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    // does not render the errors because the form is submitted correctly
    expect(queryByTestId('login-email-input-error')).toBeFalsy();
    expect(queryByTestId('login-password-input-error')).toBeFalsy();

    // got the session instance to redirect Home after a successfully login
    expect(router.navigate).toHaveBeenCalledWith('/');
  });

  test('Email, Password change event are called correctly with invalid Data, the form fails because the validations and Snapshot', async () => {
    require('@/lib/api').signInWithPassword.mockReturnValue({
      data: {
        session: 'test@example.com',
      },
      error: null,
    });

    const { getByTestId, queryByTestId, toJSON } = render(<Login />);

    // Invalid Data to make the form fail
    const email = 'test';
    const password = 'pass';

    fireEvent.changeText(getByTestId('login-email-input'), email);
    fireEvent.changeText(getByTestId('login-password-input'), password);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    expect(toJSON()).toMatchSnapshot();

    // Error section render the errors because the form is not submitted
    expect(queryByTestId('login-email-input-error')).toBeTruthy();
    expect(queryByTestId('login-password-input-error')).toBeTruthy();

    // got the session instance but does not navigate because the validations
    expect(router.navigate).not.toHaveBeenCalled();
  });

  test('signInWithPassword is called but the session does not contain Data, is null', async () => {
    require('@/lib/api').signInWithPassword.mockReturnValue({
      data: {
        session: null,
      },
      error: null,
    });

    const { getByTestId } = render(<Login />);

    // Valid Data for a success request
    const email = 'test@test.com';
    const password = 'password';

    fireEvent.changeText(getByTestId('login-email-input'), email);
    fireEvent.changeText(getByTestId('login-password-input'), password);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    expect(router.navigate).not.toHaveBeenCalled();
  });

  test('signInWithPassword is called but return an Alert error', async () => {
    require('@/lib/api').signInWithPassword.mockReturnValue({
      data: {
        session: 'test@example.com',
      },
      error: new Error('signInWithPassword error'),
    });

    const AlertErrorSpy = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<Login />);

    // Valid Data for a success request
    const email = 'test@test.com';
    const password = 'password';

    fireEvent.changeText(getByTestId('login-email-input'), email);
    fireEvent.changeText(getByTestId('login-password-input'), password);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    expect(AlertErrorSpy).toHaveBeenCalled();
  });
});
