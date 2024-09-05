import { Tabs } from 'expo-router';

import { PetIcon } from '@/components/PetIcon';
import { localization } from '@/localizations/localization';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0891b2', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: localization.t('tab_home'),
          tabBarIcon: ({ color, size }) => <PetIcon name="paw" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="petlist"
        options={{
          tabBarLabel: localization.t('tab_list'),
          headerTitle: 'Pet List',
          tabBarIcon: ({ color, size }) => <PetIcon name="list" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
