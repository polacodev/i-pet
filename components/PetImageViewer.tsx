import React from 'react';
import { StyleSheet, Image, ImageSourcePropType } from 'react-native';

type PetImageViewerProps = {
  placeholderImageSource: ImageSourcePropType;
  selectedImage: string | null;
};

export const PetImageViewer: React.FC<PetImageViewerProps> = ({
  placeholderImageSource,
  selectedImage,
}) => {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;
  return <Image testID="pet-image" source={imageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
