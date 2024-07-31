import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { type ImageProps } from 'react-native';

type PetIconProps = ImageProps & {
  name?: "question" | "heart" | "star" | "camera" | "whatsapp",
  color?: string
  size?: number
}

export const PetIcon: React.FC<PetIconProps> = ({
  style,
  name = "question",
  color = "#ffffff",
  size = 30,
  ...rest
}) => {
  return (
    <FontAwesome name={name} size={size} color={color} style={[style]} {...rest} />
  )
}
