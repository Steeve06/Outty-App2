import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

// Constants for Step 2 and 3
const ADVENTURE_TYPES = ['Hiking', 'Kayaking', 'Rock Climbing', 'Skiing', 'Backpacking', 'Camping', 'Cycling', 'Surfing', 'Mountaineering', 'Travel'];
const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const ATTITUDES = ['Relaxed', 'Moderate', 'Intense', 'Extreme'];

export default function SignupScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  // State for all form data
  const [formData, setFormData] = useState({
    name: '', age: '', location: '', bio: '', email: '', password: '',
    adventures: [] as string[],
    skillLevel: '', attitude: '', maxDistance: 50,
    instagram: '', facebook: '', twitter: ''
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView style={styles.bg} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.topBar}>
        <View style={[styles.miniLogoCircle, { backgroundColor: theme.tint }]}>
          <Text style={styles.miniLogoEmoji}>🏔</Text>
        </View>
        <View style={styles.progressTrack}>
           <View style={[styles.progressFill, { width: `${(step / 4) * 100}%`, backgroundColor: theme.tint }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.stepTitle}>
            {step === 1 && "Basic Information"}
            {step === 2 && "Your Adventures"}
            {step === 3 && "Experience"}
            {step === 4 && "Social Media"}
          </Text>
          <Text style={styles.stepSubtitle}>Step {step} of 4</Text>

          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <View style={styles.form}>
              <Text style={styles.label}>Name</Text>
              <TextInput style={styles.input} placeholder="Your name" value={formData.name} onChangeText={v => updateField('name', v)} />
              <Text style={styles.label}>Age</Text>
              <TextInput style={styles.input} placeholder="Your age" keyboardType="number-pad" value={formData.age} onChangeText={v => updateField('age', v)} />
              <Text style={styles.label}>Email</Text>
              <TextInput style={styles.input} placeholder="you@example.com" autoCapitalize="none" value={formData.email} onChangeText={v => updateField('email', v)} />
              <Text style={styles.label}>Password</Text>
              <TextInput style={styles.input} placeholder="••••••••" secureTextEntry value={formData.password} onChangeText={v => updateField('password', v)} />
            </View>
          )}

          {/* STEP 2: ADVENTURES */}
          {step === 2 && (
            <View style={styles.chipWrap}>
              {ADVENTURE_TYPES.map(item => {
                const selected = formData.adventures.includes(item);
                return (
                  <TouchableOpacity 
                    key={item} 
                    style={[styles.chip, selected && { backgroundColor: theme.tint, borderColor: theme.tint }]}
                    onPress={() => {
                      const next = selected ? formData.adventures.filter(a => a !== item) : [...formData.adventures, item];
                      updateField('adventures', next);
                    }}
                  >
                    <Text style={[styles.chipText, selected && { color: '#fff' }]}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* STEP 3: SKILLS */}
          {step === 3 && (
            <View style={styles.form}>
              <Text style={styles.label}>Skill Level</Text>
              <View style={styles.grid}>
                {SKILL_LEVELS.map(lvl => (
                  <TouchableOpacity 
                    key={lvl} 
                    style={[styles.gridBtn, formData.skillLevel === lvl && { backgroundColor: theme.tint, borderColor: theme.tint }]}
                    onPress={() => updateField('skillLevel', lvl)}
                  >
                    <Text style={[styles.gridBtnText, formData.skillLevel === lvl && { color: '#fff' }]}>{lvl}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* STEP 4: SOCIAL */}
          {step === 4 && (
            <View style={styles.form}>
              <Text style={styles.label}>Instagram</Text>
              <TextInput style={styles.input} placeholder="@username" value={formData.instagram} onChangeText={v => updateField('instagram', v)} />
              <Text style={styles.label}>Twitter</Text>
              <TextInput style={styles.input} placeholder="@username" value={formData.twitter} onChangeText={v => updateField('twitter', v)} />
            </View>
          )}

          <View style={styles.btnRow}>
            {step > 1 && (
              <TouchableOpacity style={styles.backBtn} onPress={() => setStep(step - 1)}>
                <Text style={styles.backBtnText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={[styles.nextBtn, { backgroundColor: theme.tint }]} 
              onPress={() => step < 4 ? setStep(step + 1) : router.replace('/login')}
            >
              <Text style={styles.nextBtnText}>{step === 4 ? 'Complete' : 'Next'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#e8f5f0' },
  topBar: { paddingTop: 60, paddingHorizontal: 20, alignItems: 'center' },
  miniLogoCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  miniLogoEmoji: { fontSize: 20 },
  progressTrack: { width: '100%', height: 6, backgroundColor: '#d0e8dc', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  scroll: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 24, elevation: 5 },
  stepTitle: { fontSize: 22, fontWeight: '700' },
  stepSubtitle: { color: '#888', marginBottom: 20 },
  form: { width: '100%' },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4, marginTop: 10 },
  input: { width: '100%', borderRadius: 10, backgroundColor: '#f5f5f5', padding: 12, fontSize: 15, marginBottom: 10 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1.5, borderColor: '#ccc', borderRadius: 20, paddingVertical: 7, paddingHorizontal: 14 },
  chipText: { fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridBtn: { flex: 1, minWidth: '45%', borderWidth: 1.5, borderColor: '#ccc', borderRadius: 10, padding: 12, alignItems: 'center' },
  gridBtnText: { fontWeight: '600' },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 30 },
  backBtn: { flex: 1, borderWidth: 1.5, borderColor: '#ccc', borderRadius: 10, padding: 15, alignItems: 'center' },
  backBtnText: { fontWeight: '600' },
  nextBtn: { flex: 2, borderRadius: 10, padding: 15, alignItems: 'center' },
  nextBtnText: { color: '#fff', fontWeight: '700' }
});