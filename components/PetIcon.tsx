import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { type ImageProps } from 'react-native';

type PetIconProps = ImageProps & {
  name?: "question" | "heart" | "star" | "camera" | "whatsapp" | "close" | "save",
  color?: string
  size?: number
  onPress?: () => void
}

export const PetIcon: React.FC<PetIconProps> = ({
  style,
  name = "question",
  color = "#ffffff",
  size = 30,
  onPress,
  ...rest
}) => {
  return (
    <FontAwesome name={name} size={size} color={color} style={[style]} onPress={onPress} {...rest} />
  )
}
