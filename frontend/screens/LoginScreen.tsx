import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic ignored per request - Navigate to Tabs
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView style={[styles.bg, { backgroundColor: '#e8f5f0' }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={[styles.logoCircle, { backgroundColor: theme.tint }]}>
            <Text style={styles.logoEmoji}>🏔</Text>
          </View>
          <Text style={styles.title}>Welcome to Outty</Text>
          <Text style={styles.subtitle}>Find your perfect adventure partner</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="you@example.com" 
            value={email} 
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••" 
            secureTextEntry 
            value={password} 
            onChangeText={setPassword}
          />

          <TouchableOpacity style={[styles.loginBtn, { backgroundColor: theme.tint }]} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don&apos;t have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={[styles.signupLink, { color: theme.tint }]}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 28, width: '100%', maxWidth: 420, alignItems: 'center', elevation: 6 },
  logoCircle: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  logoEmoji: { fontSize: 28 },
  title: { fontSize: 26, fontWeight: '700', color: '#1a1a1a', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  label: { alignSelf: 'flex-start', fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4 },
  input: { width: '100%', borderRadius: 10, backgroundColor: '#f5f5f5', padding: 14, fontSize: 15, marginBottom: 14 },
  loginBtn: { width: '100%', borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  signupRow: { flexDirection: 'row', marginTop: 12 },
  signupText: { color: '#666' },
  signupLink: { fontWeight: '700' }
});