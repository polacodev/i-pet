import { render, screen } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

import { PetImageViewer } from '@/components/PetImageViewer';

describe('<PetImageViewer />', () => {
  const placeholderImageDark = require('../../assets/images/pet-image-dark.png');
  const placeholderImageLight = require('../../assets/images/pet-image-light.png');

  test('Image renders correctly on PetImageViewer', () => {
    const selectedImage = 'test.png';
    render(
      <PetImageViewer
        selectedImage={selectedImage}
        placeholderImageSource={placeholderImageLight}
      />,
    );

    const image = screen.getByTestId('pet-image');
    expect(image.props.source).toEqual({ uri: selectedImage });
  });

  test('Image styles applied correctly on PetImageViewer', () => {
    const selectedImage = '';
    const styles = { image: { width: 80, height: 80, borderRadius: 50 } };

    render(
      <PetImageViewer
        selectedImage={selectedImage}
        placeholderImageSource={placeholderImageDark}
      />,
    );

    const image = screen.getByTestId('pet-image');
    expect(image.props.style).toMatchObject(styles.image);
  });

  test('PetImageViewer renders correctly Snapshot', () => {
    const selectedImage = 'test.png';
    const tree = render(
      <PetImageViewer
        selectedImage={selectedImage}
        placeholderImageSource={placeholderImageDark}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
