import React from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';

import { BORDER_COLOR_FORM } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

type PetTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  defaultValue?: string;
};
const borderColorForm = BORDER_COLOR_FORM;

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
  const placeholderColor = useThemeColor({ light: lightColor, dark: lightColor }, 'placeholder');

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
    borderColor: borderColorForm,
    borderRadius: 10,
    width: '85%',
    paddingLeft: 25,
    paddingRight: 25,
  },
});
