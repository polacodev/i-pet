import { render } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

import { PetText } from '@/components/PetText';

describe('<PetText />', () => {
  test('Text renders correctly on PetText with default type props', () => {
    const { getByTestId } = render(<PetText type="default">defaultText</PetText>);
    expect(getByTestId('pet-text')).toHaveStyle({ fontSize: 16, lineHeight: 24 });
  });

  test('Text renders correctly on PetText with smallText type props', () => {
    const { getByTestId } = render(<PetText type="smallText">smallText</PetText>);
    expect(getByTestId('pet-text')).toHaveStyle({ fontSize: 14, lineHeight: 20 });
  });

  test('PetText renders correctly Snapshot', () => {
    const tree = render(<PetText style={{ padding: 5 }}>iPet</PetText>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
