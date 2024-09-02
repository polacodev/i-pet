import { router } from 'expo-router';
import { useColorScheme } from 'react-native';

import { PetIcon } from './PetIcon';
import { PetTitle } from './PetTitle';
import { PetView } from './PetView';
import { useUser } from './context/UserContext';

export const PetHeader = () => {
  const theme = useColorScheme() ?? 'light';
  const headerInfoBackgroundColor = theme === 'light' ? '#ffffff' : '#121212';

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
        <PetIcon onPress={goToProfile} name="person" size={24} color="#0891b2" />
      ) : (
        <PetTitle type="link" onPress={goToLogin}>
          Log In
        </PetTitle>
      )}
    </PetView>
  );
};
