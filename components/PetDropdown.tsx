import React from 'react';
import { StyleSheet, type TextInputProps } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { PetView } from './PetView';

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

const DropdownComponent = ({
  lightColor,
  darkColor,
  onChange,
  value,
  data,
  placeholder,
}: PetDropdownProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const placeholderColor = useThemeColor({ light: '#8e8e8e', dark: '#5d5d5d' }, 'text');

  return (
    <PetView style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          { borderColor: 'rgb(34 211 238)', borderWidth: 1, borderRadius: 10 },
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

export default DropdownComponent;

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
