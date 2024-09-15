import React from 'react';
import Toast from 'react-native-root-toast';

import { PetText } from './PetText';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useToastStore } from '@/store/store';

export const PetToast = () => {
  const { isToastVisible, toastMessage, setToast } = useToastStore();

  const backgroundColor = useThemeColor({ light: '#121212', dark: '#f6f6f6' }, 'background');
  const color = useThemeColor({ light: '#ecedee', dark: '#11181C' }, 'text');

  if (isToastVisible) {
    setTimeout(() => setToast({ isVisible: false, message: '' }), 5000);
  }

  return (
    <Toast
      visible={isToastVisible}
      position={-20}
      shadow={false}
      animation={false}
      backgroundColor={backgroundColor}
      textColor={color}
      hideOnPress>
      <PetText style={{ color }}>{toastMessage}</PetText>
    </Toast>
  );
};
