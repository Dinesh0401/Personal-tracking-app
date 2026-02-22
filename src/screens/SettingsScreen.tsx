import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { palette } from '@/theme/palette';
import { useAppState } from '@/store/AppContext';

export function SettingsScreen() {
  const { settings, setSettings } = useAppState();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.card}>
        <Text style={styles.label}>GitHub Username</Text>
        <TextInput
          value={settings.githubUsername}
          onChangeText={(text) => setSettings({ githubUsername: text.trim() })}
          placeholder="your-github"
          placeholderTextColor={palette.muted}
          style={styles.input}
        />
        <Text style={styles.note}>Used for commit tracking sync and analytics.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bg, padding: 16, gap: 12 },
  header: { color: palette.text, fontSize: 24, fontWeight: '800' },
  card: { backgroundColor: palette.card, borderRadius: 12, borderColor: palette.border, borderWidth: 1, padding: 12, gap: 8 },
  label: { color: palette.text, fontWeight: '700' },
  input: { backgroundColor: '#0f1422', borderRadius: 10, borderWidth: 1, borderColor: palette.border, color: palette.text, paddingHorizontal: 10, height: 40 },
  note: { color: palette.muted, fontSize: 12 }
});
