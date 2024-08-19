import { Tabs } from 'expo-router';

import { PetIcon } from '@/components/PetIcon';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0891b2', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'iPet',
          tabBarIcon: ({ color }) => <PetIcon size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="petlist"
        options={{
          title: 'Pet List',
          tabBarIcon: ({ color }) => <PetIcon size={28} name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
