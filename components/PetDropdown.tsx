import React from 'react';
import { StyleSheet, type TextInputProps } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { PetView } from './PetView';

import { BORDER_COLOR_FORM } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { DropdownProps } from '@/types/dropdown';

type PetDropdownProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  onChange: (text: string) => void;
  value: string;
  data: DropdownProps[];
  placeholder: string;
};

export const PetDropdown = ({
  lightColor,
  darkColor,
  onChange,
  value,
  data,
  placeholder,
}: PetDropdownProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const placeholderColor = useThemeColor({ light: lightColor, dark: lightColor }, 'placeholder');
  const borderColorForm = BORDER_COLOR_FORM;

  return (
    <PetView style={styles.container}>
      <Dropdown
        testID="pet-dropdown"
        style={[
          styles.dropdown,
          { borderColor: borderColorForm, borderWidth: 1, borderRadius: 10 },
        ]}
        placeholderStyle={[{ color: placeholderColor }, styles.placeholderStyle]}
        selectedTextStyle={[{ color }, styles.selectedTextStyle]}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={(item) => {
          onChange(item.value);
        }}
      />
    </PetView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    paddingLeft: 17,
    fontSize: 14,
    fontWeight: 'normal',
  },
  selectedTextStyle: {
    paddingLeft: 17,
    fontSize: 14,
  },
});
