import { render, screen, fireEvent, act } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

import { PetPickCountryCode } from '@/components/PetPickCountryCode';

describe('<PetPickCountryCode />', () => {
  test('onChange event is called correctly on PetPickCountryCode', () => {
    const onChange = jest.fn();
    const value = '+1';
    const eventData = '+1';

    render(<PetPickCountryCode onChange={onChange} value={value} />);

    fireEvent.press(screen.getByTestId('pet-pick-country'), eventData);

    expect(onChange).toHaveBeenCalledWith(eventData);
    expect(onChange).toHaveBeenCalled();
  });

  test('pickerButtonOnPress event renders correctly the CountryPicker', () => {
    const onChange = jest.fn();
    const value = '+1';
    const eventData = '+1';

    jest.useFakeTimers();
    render(<PetPickCountryCode onChange={onChange} value={value} />);

    act(() => {
      fireEvent.press(screen.getByTestId('pet-pick-country'), eventData);
      jest.runAllTimers();
    });

    act(() => {
      fireEvent.press(screen.getAllByTestId('countryCodesPickerCountryButton')[5], eventData);
      jest.runAllTimers();
    });
    expect(onChange).toHaveBeenCalledWith('+1');
    expect(onChange).toHaveBeenCalledWith('+376');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  test('PetPickCountryCode renders correctly Snapshot', () => {
    const onChange = jest.fn();
    const value = '+1';
    const eventData = '+1';

    jest.useFakeTimers();
    const tree = render(<PetPickCountryCode onChange={onChange} value={value} />);

    act(() => {
      fireEvent.press(screen.getByTestId('pet-pick-country'), eventData);
      jest.runAllTimers();
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
