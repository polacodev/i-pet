import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import '@testing-library/react-native/extend-expect';

import HomeScreen from '@/app/(tabs)/index';

jest.mock('expo-camera', () => ({
  useCameraPermissions: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

jest.mock('@/localizations/localization', () => ({
  localization: {
    t: jest.fn().mockImplementation((key) => key),
  },
}));

describe('<HomeScreen />', () => {
  const mockRequestPermission = jest.fn();

  beforeEach(() => {
    (useCameraPermissions as jest.Mock).mockReturnValue([null, mockRequestPermission]);
    (useSafeAreaInsets as jest.Mock).mockReturnValue({ top: 10, bottom: 10 });
    mockRequestPermission.mockClear();
    (router.push as jest.Mock).mockClear();
  });

  test('HomeScreen renders correctly', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('welcome_button')).toBeTruthy();
  });

  test('HomeScreen requests camera permission when the button is pressed', async () => {
    const { getByText } = render(<HomeScreen />);

    const cameraButton = getByText('welcome_button');
    fireEvent.press(cameraButton);

    expect(mockRequestPermission).toHaveBeenCalled();
  });

  test('HomeScreen navigates to /petQr when permission is granted', async () => {
    mockRequestPermission.mockResolvedValueOnce({ granted: true });
    const { getByText } = render(<HomeScreen />);

    const cameraButton = getByText('welcome_button');
    fireEvent.press(cameraButton);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/petQr');
    });
  });

  test('HomeScreen shows an alert when permission is denied', async () => {
    mockRequestPermission.mockResolvedValueOnce({ granted: false });

    const alertSpy = jest.spyOn(Alert, 'alert');

    const { getByText } = render(<HomeScreen />);

    const cameraButton = getByText('welcome_button');
    fireEvent.press(cameraButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'welcome_alert_title',
        'welcome_alert_message',
        expect.any(Array),
      );
    });
    alertSpy.mockRestore();
  });

  test('PetDropdown renders correctly Snapshot', () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
