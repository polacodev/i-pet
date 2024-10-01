import { render, act } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

import { PetToast } from '@/components/PetToast';

jest.mock('@/store/store', () => ({
  useToastStore: jest.fn(),
}));

describe('<PetToast />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('PetToast renders toast with the correct message when visible and setTimeout is not called', () => {
    const mockSetToast = jest.fn();
    require('@/store/store').useToastStore.mockReturnValue({
      toast: { isVisible: false, message: '' },
      setToast: mockSetToast,
    });

    render(<PetToast />);

    expect(mockSetToast).toHaveBeenCalledTimes(0);
  });

  test('PetToast renders toast with the correct message when visible then is hidden after setTimeout is called', () => {
    const mockSetToast = jest.fn();
    require('@/store/store').useToastStore.mockReturnValue({
      toast: { isVisible: true, message: 'Test message' },
      setToast: mockSetToast,
    });

    render(<PetToast />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockSetToast).toHaveBeenCalledWith({ isVisible: false, message: '' });
  });

  test('PetToast renders correctly Snapshot', () => {
    const { toJSON } = render(<PetToast />);
    expect(toJSON()).toMatchSnapshot();
  });
});
