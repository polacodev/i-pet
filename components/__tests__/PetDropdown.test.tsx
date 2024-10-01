import { render, screen, fireEvent } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

import { PetDropdown } from '@/components/PetDropdown';
import { petTypeData, petGenderData } from '@/constants/constants';

describe('<PetDropdown />', () => {
  const onChange = jest.fn();
  const placeholder = 'placeholder test';
  const value = 'label_1';

  test('Styles renders correctly on PetDropdown', () => {
    const styles = {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    };
    render(
      <PetDropdown
        onChange={onChange}
        value={value}
        data={Object.values(petTypeData)}
        placeholder={placeholder}
      />,
    );

    const dropdown = screen.getByTestId('pet-dropdown');
    expect(dropdown.props.style).toMatchObject(styles);
  });

  test('onChange event is called correctly on PetDropdown', () => {
    render(
      <PetDropdown
        onChange={onChange}
        value={value}
        data={Object.values(petGenderData)}
        placeholder={placeholder}
      />,
    );
    fireEvent(screen.getByText('placeholder test'), 'onChange', 'value_1');
    expect(onChange).toHaveBeenCalled();
  });

  test('PetDropdown renders correctly Snapshot', () => {
    const tree = render(
      <PetDropdown
        onChange={onChange}
        value={value}
        data={Object.values(petGenderData)}
        placeholder={placeholder}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
