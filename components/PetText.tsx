import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type PetTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'smallText';
};

export const PetText = ({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: PetTextProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  let textType = undefined;
  switch (type) {
    case 'default':
      textType = styles.default;
      break;
    case 'smallText':
      textType = styles.smallText;
      break;
  }

  return <Text testID="pet-text" style={[{ color }, textType, style]} {...rest} />;
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  smallText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
