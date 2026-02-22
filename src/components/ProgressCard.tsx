import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '@/theme/palette';

export function ProgressCard({ xp, goal = 100 }: { xp: number; goal?: number }) {
  const pct = Math.min(100, Math.round((xp / goal) * 100));

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>Today XP</Text>
        <Text style={styles.value}>{xp}/{goal}</Text>
      </View>
      <View style={styles.track}>
        <LinearGradient
          colors={[palette.primary, '#5ca9ff']}
          style={[styles.fill, { width: `${pct}%` }]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </View>
      <Text style={styles.caption}>{pct}% of today goal completed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: palette.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: palette.border, gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { color: palette.text, fontSize: 17, fontWeight: '700' },
  value: { color: palette.accent, fontWeight: '700' },
  track: { height: 10, borderRadius: 999, backgroundColor: '#222b3f', overflow: 'hidden' },
  fill: { height: 10, borderRadius: 999 },
  caption: { color: palette.muted, fontSize: 12 }
});
