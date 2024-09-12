import { render } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

import { PetTitle } from '@/components/PetTitle';

describe('<PetTitle />', () => {
  test('Text renders correctly on PetTitle with default type props', () => {
    const { getByTestId } = render(<PetTitle type="default">defaultText</PetTitle>);
    expect(getByTestId('pet-title')).toHaveStyle({
      fontSize: 24,
      fontWeight: '700',
      lineHeight: 26,
    });
  });

  test('Text renders correctly on PetTitle with titleText type props', () => {
    const { getByTestId } = render(<PetTitle type="title">titleText</PetTitle>);
    expect(getByTestId('pet-title')).toHaveStyle({
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 28,
    });
  });

  test('Text renders correctly on PetTitle with subtitleText type props', () => {
    const { getByTestId } = render(<PetTitle type="subtitle">subtitleText</PetTitle>);
    expect(getByTestId('pet-title')).toHaveStyle({
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: 28,
    });
  });

  test('Text renders correctly on PetTitle with linkText type props', () => {
    const { getByTestId } = render(<PetTitle type="link">linkText</PetTitle>);
    expect(getByTestId('pet-title')).toHaveStyle({
      lineHeight: 30,
      fontSize: 16,
      color: '#0a7ea4',
    });
  });

  test('PetTitle renders correctly Snapshot', () => {
    const tree = render(<PetTitle style={{ padding: 5 }}>iPet</PetTitle>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
