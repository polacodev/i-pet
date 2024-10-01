import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { PetIcon } from './PetIcon';
import { PetTitle } from './PetTitle';
import { PetView } from './PetView';
import { useUser } from './context/UserContext';

import { useThemeColor } from '@/hooks/useThemeColor';
import { localization } from '@/localizations/localization';

type PetHeaderProps = {
  lightColor?: string;
  darkColor?: string;
};

export const PetHeader = ({ lightColor, darkColor }: PetHeaderProps) => {
  const headerInfoBackgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'backgroundHeaderIcon',
  );

  const { session } = useUser();

  const goToLogin = () => {
    router.navigate('/login');
  };

  const goToProfile = () => {
    router.navigate('/profile');
  };

  return (
    <PetView style={{ backgroundColor: headerInfoBackgroundColor }}>
      {session?.user ? (
        <TouchableOpacity onPress={goToProfile}>
          <PetIcon name="person" size={24} color="#0891b2" />
        </TouchableOpacity>
      ) : (
        <PetTitle type="link" onPress={goToLogin}>
          {localization.t('header_log_in')}
        </PetTitle>
      )}
    </PetView>
  );
};
