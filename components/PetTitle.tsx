import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type PetTitleProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'subtitle' | 'link';
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
        type === 'title' ? styles.title : undefined,
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
    fontSize: 24, //text-2xl
    fontWeight: '700',
    lineHeight: 26,
  },
  title: {
    fontSize: 20, //text-xl
    fontWeight: 'bold',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 18, //text-lg
    fontWeight: 'bold',
    lineHeight: 28
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
