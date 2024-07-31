import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type PetTitleProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'subtitle' | 'link';
};

export const PetTitle = ({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: PetTitleProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'title');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
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
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
