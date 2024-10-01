import { fireEvent, render, waitFor } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

import Signup from '@/app/(form)/signup';

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
  signUpWithEmailPassword: jest.fn(),
  saveUserProfile: jest.fn(),
}));

describe('<Signup />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    // useStateMock.mockImplementation((init: boolean) => [init, setState]);
    (router.navigate as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('Signup renders correctly and Snapshot', () => {
    const { toJSON } = render(<Signup />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('goToLogIn is called when login label is pressed', () => {
    const { getByTestId } = render(<Signup />);

    fireEvent.press(getByTestId('redirect-to-login-label'), 'onClick');

    expect(router.navigate).toHaveBeenCalledWith('/login');
  });

  test('Email, Password, Phone: Change event are called correctly with valid Data to call signUpWithEmailPassword and redirect to Home', async () => {
    require('@/lib/api').signUpWithEmailPassword.mockReturnValue({
      data: {
        session: {
          user: {
            id: 'testId',
            email: 'test@test.com',
            country_code: '+1',
            phone: '123456',
          },
        },
      },
      error: null,
    });

    const { getByTestId, queryByTestId } = render(<Signup />);

    // Valid Data
    const email = 'test@test.com';
    const password = 'password';
    const phone = '12345678';

    fireEvent.changeText(getByTestId('signup-email-input'), email);
    fireEvent.changeText(getByTestId('signup-password-input'), password);
    fireEvent.changeText(getByTestId('signup-phone-input'), phone);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    // does not render the errors because the form is submitted correctly
    expect(queryByTestId('signup-email-input-error')).toBeFalsy();
    expect(queryByTestId('signup-password-input-error')).toBeFalsy();
    expect(queryByTestId('signup-phone-input-error')).toBeFalsy();

    // got the session instance to redirect Home after a successfully signup
    expect(router.navigate).toHaveBeenCalledWith('/');
  });

  test('Email, Password, Phone: Change event are called correctly with invalid Data, the form fails because the validations and Snapshot', async () => {
    require('@/lib/api').signUpWithEmailPassword.mockReturnValue({
      data: {
        session: {
          user: {
            id: 'testId',
            email: 'test@test.com',
            country_code: '+1',
            phone: '123456',
          },
        },
      },
      error: null,
    });

    const { getByTestId, queryByTestId, toJSON } = render(<Signup />);

    // Invalid Data to make the form fail
    const email = 'test';
    const password = 'pass';
    const phone = 'abc';

    fireEvent.changeText(getByTestId('signup-email-input'), email);
    fireEvent.changeText(getByTestId('signup-password-input'), password);
    fireEvent.changeText(getByTestId('signup-phone-input'), phone);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    expect(toJSON()).toMatchSnapshot();

    // Error section render the errors because the form is not submitted
    expect(queryByTestId('signup-email-input-error')).toBeTruthy();
    expect(queryByTestId('signup-password-input-error')).toBeTruthy();
    expect(queryByTestId('signup-phone-input-error')).toBeTruthy();

    // got the session instance but does not navigate because the validations
    expect(router.navigate).not.toHaveBeenCalled();
  });

  test('signUpWithEmailPassword is called but the session does not contain Data, is null. Alert is displayed and does not navigate', async () => {
    require('@/lib/api').signUpWithEmailPassword.mockReturnValue({
      data: {
        session: null,
      },
      error: new Error('signUpWithEmailPassword error'),
    });

    const AlertErrorSpy = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<Signup />);

    // Valid Data
    const email = 'test@test.com';
    const password = 'password';
    const phone = '12345678';

    fireEvent.changeText(getByTestId('signup-email-input'), email);
    fireEvent.changeText(getByTestId('signup-password-input'), password);
    fireEvent.changeText(getByTestId('signup-phone-input'), phone);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    expect(AlertErrorSpy).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  test('saveUserProfile is user profile is created successfully', async () => {
    require('@/lib/api').signUpWithEmailPassword.mockReturnValue({
      data: {
        session: {
          user: {
            id: 'testId',
            email: 'test@test.com',
            country_code: '+1',
            phone: '123456',
          },
        },
      },
      error: null,
    });

    require('@/lib/api').saveUserProfile.mockReturnValue({
      error: null,
    });

    const AlertErrorSpy = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<Signup />);

    // Valid Data
    const email = 'test@test.com';
    const password = 'password';
    const phone = '12345678';

    fireEvent.changeText(getByTestId('signup-email-input'), email);
    fireEvent.changeText(getByTestId('signup-password-input'), password);
    fireEvent.changeText(getByTestId('signup-phone-input'), phone);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    expect(AlertErrorSpy).not.toHaveBeenCalled();
  });

  test('saveUserProfile request fails and return an Error', async () => {
    require('@/lib/api').signUpWithEmailPassword.mockReturnValue({
      data: {
        session: {
          user: {
            id: 'testId',
            email: 'test@test.com',
            country_code: '+1',
            phone: '123456',
          },
        },
      },
      error: null,
    });

    // saveUserProfile request fails and return an Error
    require('@/lib/api').saveUserProfile.mockReturnValue({
      error: new Error('saveUserProfile error'),
    });

    // AlertErrorSpy to get the error when saveUserProfile fails
    const AlertErrorSpy = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<Signup />);

    // Valid Data
    const email = 'test@test.com';
    const password = 'password';
    const phone = '12345678';

    fireEvent.changeText(getByTestId('signup-email-input'), email);
    fireEvent.changeText(getByTestId('signup-password-input'), password);
    fireEvent.changeText(getByTestId('signup-phone-input'), phone);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    expect(AlertErrorSpy).toHaveBeenCalledTimes(1);
  });

  test('saveUserProfile request fails because is rejected the request and return a Catch Error and error is Instance of Error)', async () => {
    require('@/lib/api').signUpWithEmailPassword.mockReturnValue({
      data: {
        session: {
          user: {
            id: 'testId',
            email: 'test@test.com',
            country_code: '+1',
            phone: '123456',
          },
        },
      },
      error: null,
    });

    // saveUserProfile request fails and return an Error and is an Instance of Error
    require('@/lib/api').saveUserProfile.mockRejectedValue(
      new Error('saveUserProfile rejected error'),
    );

    // AlertErrorSpy to get the error when saveUserProfile fails
    const AlertErrorSpy = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<Signup />);

    // Valid Data
    const email = 'test@test.com';
    const password = 'password';
    const phone = '12345678';

    fireEvent.changeText(getByTestId('signup-email-input'), email);
    fireEvent.changeText(getByTestId('signup-password-input'), password);
    fireEvent.changeText(getByTestId('signup-phone-input'), phone);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    // Catch Alert is active to show the error
    expect(AlertErrorSpy).toHaveBeenCalledTimes(1);
  });

  test('saveUserProfile request fails because is rejected the request and return a Catch Error and error is not Instance of Error)', async () => {
    require('@/lib/api').signUpWithEmailPassword.mockReturnValue({
      data: {
        session: {
          user: {
            id: 'testId',
            email: 'test@test.com',
            country_code: '+1',
            phone: '123456',
          },
        },
      },
      error: null,
    });

    // saveUserProfile request fails and return an Error and is not an Instance of Error
    require('@/lib/api').saveUserProfile.mockRejectedValue('not and instance of error');

    // AlertErrorSpy to get the error when saveUserProfile fails
    const AlertErrorSpy = jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(<Signup />);

    // Valid Data
    const email = 'test@test.com';
    const password = 'password';
    const phone = '12345678';

    fireEvent.changeText(getByTestId('signup-email-input'), email);
    fireEvent.changeText(getByTestId('signup-password-input'), password);
    fireEvent.changeText(getByTestId('signup-phone-input'), phone);

    await waitFor(() => {
      fireEvent.press(getByTestId('pet-button'), 'onClick');
    });

    // Catch Alert is not active because the Error is not an Instance of Error
    expect(AlertErrorSpy).not.toHaveBeenCalledTimes(1);
  });
});
