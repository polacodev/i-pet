import { render } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

import { PetText } from '@/components/PetText';
import { PetView } from '@/components/PetView';

describe('<PetView />', () => {
  test('Text renders correctly on PetView', () => {
    const { getAllByText } = render(
      <PetView>
        <PetText style={{ padding: 5 }}>iPet</PetText>
      </PetView>,
    );
    const petChildren = getAllByText('iPet', { exact: true });
    expect(petChildren[0].props.children).toBe('iPet'); // First "Hello" text
  });

  test('PetView renders correctly Snapshot', () => {
    const tree = render(
      <PetView style={{ padding: 5 }}>
        <PetText style={{ padding: 5 }}>iPet</PetText>
      </PetView>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
