import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '@/services/supabase';
import { palette } from '@/theme/palette';

export function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const runAuth = async (mode: 'login' | 'signup') => {
    try {
      setLoading(true);
      const action = mode === 'login' ? supabase.auth.signInWithPassword : supabase.auth.signUp;
      const { error } = await action({ email: email.trim(), password });
      if (error) throw error;
      Alert.alert(mode === 'login' ? 'Welcome back' : 'Account created', 'Authentication successful.');
    } catch (error) {
      Alert.alert('Auth failed', error instanceof Error ? error.message : 'Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Tracking</Text>
      <Text style={styles.subtitle}>Execution > motivation. Sign in to continue.</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={palette.muted} autoCapitalize="none" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={palette.muted} secureTextEntry />
      <Pressable style={styles.primary} disabled={loading} onPress={() => runAuth('login')}><Text style={styles.primaryText}>{loading ? 'Please wait...' : 'Log In'}</Text></Pressable>
      <Pressable style={styles.secondary} disabled={loading} onPress={() => runAuth('signup')}><Text style={styles.secondaryText}>Create Account</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bg, justifyContent: 'center', padding: 20, gap: 10 },
  title: { color: palette.text, fontSize: 30, fontWeight: '800' },
  subtitle: { color: palette.muted, marginBottom: 8 },
  input: { height: 44, borderRadius: 10, borderColor: palette.border, borderWidth: 1, backgroundColor: palette.card, color: palette.text, paddingHorizontal: 12 },
  primary: { marginTop: 8, borderRadius: 10, backgroundColor: palette.primary, paddingVertical: 12, alignItems: 'center' },
  primaryText: { color: '#051620', fontWeight: '800' },
  secondary: { borderRadius: 10, borderColor: palette.border, borderWidth: 1, paddingVertical: 12, alignItems: 'center' },
  secondaryText: { color: palette.text, fontWeight: '700' }
});
