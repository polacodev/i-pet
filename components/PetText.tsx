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

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'smallText' ? styles.smallText : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

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
