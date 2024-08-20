import { Tabs } from 'expo-router';

import { PetIcon } from '@/components/PetIcon';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#0891b2', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <PetIcon name="paw-sharp" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="petlist"
        options={{
          tabBarLabel: 'List',
          headerTitle: 'Pet List',
          tabBarIcon: ({ color, size }) => <PetIcon name="list" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
