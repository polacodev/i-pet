import { fireEvent, render, waitFor } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import { router } from 'expo-router';
import React from 'react';

import Profile from '@/app/(form)/profile';

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
  signOut: jest.fn(),
  getSession: jest.fn(),
  onAuthStateChange: jest.fn(),
}));

describe('<Profile />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (router.navigate as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Profile renders correctly and Snapshot', async () => {
    require('@/lib/api').getSession.mockReturnValue({
      data: {
        session: {
          user: {
            email: 'test@example.com',
          },
        },
      },
    });

    const setSessionStateMock = jest.fn();
    const useStateMock: any = (useState: any) => [useState, setSessionStateMock];

    const useEffectSpy = jest.spyOn(React, 'useEffect');
    const useStateSpy = jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    const { toJSON } = render(<Profile />);

    await waitFor(() => {
      expect(useEffectSpy).toHaveBeenCalled();
      expect(useStateSpy).toHaveBeenCalled();
    });

    expect(toJSON()).toMatchSnapshot();
  });

  test('onSignOut event is called when log-out icon is pressed', async () => {
    require('@/lib/api').getSession.mockReturnValue({
      data: {
        session: {
          user: {
            email: 'test@example.com',
          },
        },
      },
    });

    const { getByTestId } = render(<Profile />);

    fireEvent.press(getByTestId('pet-button'), 'onClick');

    await waitFor(() => {
      expect(router.navigate).toHaveBeenCalledWith('/');
    });
  });
});
