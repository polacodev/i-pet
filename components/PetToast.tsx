import React from 'react';
import Toast from 'react-native-root-toast';

import { PetText } from './PetText';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useToastStore } from '@/store/store';

export const PetToast = () => {
  const { toast, setToast } = useToastStore();

  const backgroundColor = useThemeColor({ light: '#121212', dark: '#f6f6f6' }, 'background');
  const color = useThemeColor({ light: '#ecedee', dark: '#11181C' }, 'text');

  if (toast.isVisible) {
    setTimeout(() => setToast({ isVisible: false, message: '' }), 5000);
  }

  return (
    <Toast
      visible={toast.isVisible}
      position={-20}
      shadow={false}
      animation={false}
      hideOnPress
      backgroundColor={backgroundColor}
      textColor={color}>
      <PetText testID="pet-toast" style={{ color }}>
        {toast.message}
      </PetText>
    </Toast>
  );
};
