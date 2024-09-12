import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

import { PetButton } from '@/components/PetButton';

describe('<PetButton />', () => {
  const onPressMock = jest.fn();

  test('Text renders correctly on PetButton', () => {
    const { getByTestId } = render(
      <PetButton onPress={onPressMock} iconName="qr-code" buttonName="ButtonName" />,
    );
    expect(getByTestId('pet-button')).toHaveTextContent('ButtonName');
  });

  test('Text Styles renders correctly on PetButton', () => {
    const { getByTestId } = render(
      <PetButton onPress={onPressMock} iconName="qr-code" buttonName="ButtonName" />,
    );
    expect(getByTestId('pet-button')).toHaveStyle({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      padding: 8,
      gap: 8,
      width: '80%',
      margin: 6,
    });
  });

  test('onPress, fire event on PetButton', () => {
    const eventData = {
      nativeEvent: {
        pageX: 20,
        pageY: 30,
      },
    };

    render(<PetButton onPress={onPressMock} iconName="log-in" buttonName="ButtonName" />);

    fireEvent.press(screen.getByTestId('pet-button'), eventData);
    expect(onPressMock).toHaveBeenCalledWith(eventData);
    expect(onPressMock).toHaveBeenCalledTimes(1);
    expect(onPressMock).toHaveBeenCalled();
  });

  test('PetButton renders correctly Snapshot', () => {
    const tree = render(
      <PetButton onPress={onPressMock} iconName="qr-code" buttonName="ButtonName" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
