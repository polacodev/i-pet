import React from 'react'
import { TouchableOpacity } from 'react-native'
import { PetText } from './PetText';
import { PetIcon } from './PetIcon';

type PetButtonProps = {
  goToQrPet: () => void
  iconName: "heart" | "star" | "camera" | "whatsapp",
  buttonName: string,
  color?: '#0e7490' | '#075E54'
};

export const PetButton: React.FC<PetButtonProps> = ({
  goToQrPet,
  iconName,
  buttonName,
  color = '#0e7490',
}) => {
  return (
    <TouchableOpacity onPress={goToQrPet} style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color,
      borderRadius: 8,
      padding: 8,
      gap: 8,
      width: '80%',
      margin: 6
    }} >
      <PetIcon name={iconName} size={30} color="#ffffff" />
      <PetText type='default' style={{ color: "#ffffff" }}>{buttonName}</PetText>
    </TouchableOpacity>
  )
}
