import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type PetTitleProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'subtitle';
};

export function PetTitle({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: PetTitleProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'title');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
