import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { type ImageProps } from 'react-native';

type PetIconProps = ImageProps & {
  name?:
    | 'stop'
    | 'trash'
    | 'add-circle'
    | 'heart'
    | 'star'
    | 'camera'
    | 'logo-whatsapp'
    | 'close-circle'
    | 'save'
    | 'list'
    | 'paw'
    | 'person'
    | 'information-circle'
    | 'albums'
    | 'home'
    | 'qr-code'
    | 'log-in'
    | 'log-out';
  color?: string;
  size?: number;
  onPress?: () => void;
};

export const PetIcon: React.FC<PetIconProps> = ({
  style,
  name = 'stop',
  color = '#ffffff',
  size = 30,
  onPress,
  ...rest
}) => {
  return (
    <Ionicons
      testID="pet-icon"
      name={name}
      size={size}
      color={color}
      style={[style]}
      onPress={onPress}
      {...rest}
    />
  );
};
