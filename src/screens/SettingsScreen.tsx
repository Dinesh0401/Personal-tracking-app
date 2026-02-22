import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '@/theme/palette';

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.card}>
        <Text style={styles.text}>- Configure GitHub username</Text>
        <Text style={styles.text}>- Manage Supabase session</Text>
        <Text style={styles.text}>- Theme and notification preferences</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bg, padding: 16, gap: 12 },
  header: { color: palette.text, fontSize: 24, fontWeight: '800' },
  card: { backgroundColor: palette.card, borderRadius: 12, borderColor: palette.border, borderWidth: 1, padding: 12, gap: 8 },
  text: { color: palette.text }
});
