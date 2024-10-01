import '@testing-library/react-native/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { router } from 'expo-router';

import { PetHeader } from '@/components/PetHeader';

jest.mock('expo-router', () => ({
  router: {
    navigate: jest.fn(),
  },
}));

jest.mock('@/components/context/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('@/localizations/localization', () => ({
  localization: {
    t: jest.fn(),
  },
}));

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('<PetHeader />', () => {
  beforeEach(() => {
    const { localization } = require('@/localizations/localization');
    localization.t.mockReturnValue('Log In');
    (router.navigate as jest.Mock).mockClear();
  });

  describe('PetHeader with Null User Session values', () => {
    test('PetHeader renders Log In text in light mode, and Snapshot', () => {
      require('../context/UserContext').useUser.mockReturnValue({
        session: null,
      });
      require('@/hooks/useThemeColor').useThemeColor.mockReturnValue('#ffffff');

      const { getByText, toJSON } = render(<PetHeader />);
      const loginText = getByText('Log In');

      expect(loginText).toBeTruthy();
      expect(toJSON()).toMatchSnapshot();
    });

    test('onPress, fireEvent when Log In is pressed', () => {
      require('../context/UserContext').useUser.mockReturnValue({
        session: null,
      });
      render(<PetHeader />);
      fireEvent.press(screen.getByText('Log In'), 'onPress');

      expect(router.navigate).toHaveBeenCalledWith('/login');
    });
  });

  describe('PetHeader with User Session Values', () => {
    test('PetHeader renders profile icon in dark mode, and Snapshot', () => {
      require('../context/UserContext').useUser.mockReturnValue({
        session: { user: 'user test' },
      });
      require('@/hooks/useThemeColor').useThemeColor.mockReturnValue('#121212');

      const { toJSON } = render(<PetHeader />);

      expect(toJSON()).toMatchSnapshot();
    });

    test('onPress, fireEvent when profile icon is pressed', () => {
      require('../context/UserContext').useUser.mockReturnValue({
        session: { user: 'user test' },
      });
      render(<PetHeader />);
      fireEvent.press(screen.getByTestId('pet-icon'), 'onPress');

      expect(router.navigate).toHaveBeenCalledWith('/profile');
    });
  });
});
