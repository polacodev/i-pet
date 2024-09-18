import React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

type PetTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  defaultValue?: string;
};

export const PetTextInput = ({
  style,
  lightColor,
  darkColor,
  onChangeText,
  placeholder,
  defaultValue = '',
  ...rest
}: PetTextInputProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const placeholderColor = useThemeColor({ light: '#8e8e8e', dark: '#5d5d5d' }, 'text');

  return (
    <TextInput
      testID="pet-text-input"
      style={[{ color }, styles.input, style]}
      placeholderTextColor={placeholderColor}
      placeholder={placeholder}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: 'rgb(34 211 238)',
    borderRadius: 10,
    width: '85%',
    paddingLeft: 25,
    paddingRight: 25,
  },
});
