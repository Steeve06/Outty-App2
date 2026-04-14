import { Redirect } from 'expo-router';

// This is a common pattern if you want the first tab to be something else,
// or you can just import your Discover screen here.
export default function TabIndex() {
  return <Redirect href="/explore" />; 
}