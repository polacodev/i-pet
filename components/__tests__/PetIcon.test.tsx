import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

import { PetIcon } from '@/components/PetIcon';

describe('<PetIcon />', () => {
  const onPressMock = jest.fn();
  test('Icon renders correctly on PetIcon', () => {
    const { getAllByText } = render(<PetIcon />);
    const iconText = getAllByText(' ', { exact: true });
    expect(iconText.length).toBe(1);
  });

  test('onPress, fire event on PetIcon', () => {
    const eventData = {
      nativeEvent: {
        pageX: 20,
        pageY: 30,
      },
    };

    render(<PetIcon name="star" onPress={onPressMock} size={20} color="red" />);

    fireEvent.press(screen.getByTestId('pet-icon'), eventData);
    expect(onPressMock).toHaveBeenCalledWith(eventData);
    expect(onPressMock).toHaveBeenCalledTimes(1);
    expect(onPressMock).toHaveBeenCalled();
  });

  test('PetIcon renders correctly Snapshot', () => {
    const tree = render(
      <PetIcon name="star" onPress={onPressMock} size={20} color="red" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
