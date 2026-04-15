import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* index is our redirector, so it doesn't need a header */}
      <Stack.Screen name="index" />
      
      {/* Auth screens */}
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      
      {/* Main App */}
      <Stack.Screen name="(tabs)" />
      
      {/* Modals usually need a header for the 'Close' button on iOS */}
      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: 'modal', 
          headerShown: true,
          title: 'Details' 
        }} 
      />
    </Stack>
  );
}