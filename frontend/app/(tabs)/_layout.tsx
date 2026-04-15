import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
      }}>
      
      {/* 1. LEFT: Discover (Dashboard) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => <Ionicons name="compass-outline" size={28} color={color} />,
        }}
      />

      {/* 2. MIDDLE: Matches (Chat List) */}
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles-outline" size={28} color={color} />,
        }}
      />

      {/* 3. RIGHT: Profile */}
      <Tabs.Screen
        name="explore" // This maps to your explore.tsx which holds ProfileScreen
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}