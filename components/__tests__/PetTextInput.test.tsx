import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

import { PetTextInput } from '@/components/PetTextInput';

describe('<PetTextInput />', () => {
  const placeholder = 'placeholder test';
  const onChangeText = jest.fn();
  const onBlur = jest.fn();
  const value = 'coco';

  test('Input value renders correctly on PetTextInput', () => {
    const { getByTestId } = render(
      <PetTextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />,
    );
    expect(getByTestId('pet-text-input')).toBeEnabled();
  });

  test('Input styles renders correctly on PetTextInput', () => {
    const { getByTestId } = render(
      <PetTextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />,
    );
    expect(getByTestId('pet-text-input')).toHaveStyle({
      height: 40,
      borderWidth: 1,
      borderColor: 'rgb(34 211 238)',
      borderRadius: 10,
      width: '85%',
      paddingLeft: 25,
    });
  });

  test('onBlur, onChangeText fire events on PetTextInput', () => {
    render(
      <PetTextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />,
    );
    fireEvent(screen.getByPlaceholderText('placeholder test'), 'blur');
    fireEvent(screen.getByPlaceholderText('placeholder test'), 'onChangeText', 'ab');
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onChangeText).toHaveBeenCalledWith('ab');
  });

  test('PetTextInput renders correctly Snapshot', () => {
    const tree = render(
      <PetTextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        style={{ backgroundColor: '#ffffff' }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});