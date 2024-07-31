import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type PetViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function PetView({ style, lightColor, darkColor, ...otherProps }: PetViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
