import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { PetIcon } from './PetIcon';
import { PetText } from './PetText';

type PetButtonProps = {
  onPress: () => void;
  iconName?:
    | 'heart'
    | 'star'
    | 'camera'
    | 'logo-whatsapp'
    | 'save'
    | 'qr-code'
    | 'log-in'
    | 'log-out';
  buttonName?: string;
  color?: '#0e7490' | '#075E54';
};

export const PetButton: React.FC<PetButtonProps> = ({
  onPress,
  iconName,
  buttonName,
  color = '#0e7490',
}) => {
  return (
    <TouchableOpacity
      testID="pet-button"
      onPress={onPress}
      style={[styles.buttonContainer, { backgroundColor: color }]}>
      {iconName && <PetIcon name={iconName} size={30} color="#ffffff" />}
      <PetText type="default" style={{ color: '#ffffff' }}>
        {buttonName}
      </PetText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 8,
    gap: 8,
    width: '85%',
    margin: 6,
  },
});
