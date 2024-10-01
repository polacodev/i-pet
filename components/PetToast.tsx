import React from 'react';
import Toast from 'react-native-root-toast';

import { PetText } from './PetText';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useToastStore } from '@/store/store';

type PetToastProps = {
  lightColor?: string;
  darkColor?: string;
};

export const PetToast = ({ lightColor, darkColor }: PetToastProps) => {
  const { toast, setToast } = useToastStore();

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundToast');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'textToast');

  if (toast.isVisible) {
    setTimeout(() => setToast({ isVisible: false, message: '' }), 5000);
  }

  return (
    <Toast
      testID="pet-toast-container"
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
