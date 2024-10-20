import '@testing-library/react-native/extend-expect';

import { useThemeColor } from '@/hooks/useThemeColor';

jest.mock('react-native', () => ({
  useColorScheme: jest.fn(),
}));

describe('useThemeColor', () => {
  test('get the color from colorFromProps', () => {
    const colorFromProps = useThemeColor({ light: 'green', dark: 'yellow' }, 'text');

    expect(colorFromProps).toEqual('green');
  });
});
