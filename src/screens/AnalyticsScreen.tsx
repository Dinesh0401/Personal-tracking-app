import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppState } from '@/store/AppContext';
import { palette } from '@/theme/palette';

export function AnalyticsScreen() {
  const { history, today, totalXp, currentStreak, longestStreak } = useAppState();
  const last7 = [...history, today].slice(-7);
  const weeklyXp = last7.reduce((sum, day) => sum + day.xp, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Analytics</Text>
      <View style={styles.card}><Text style={styles.title}>Current streak</Text><Text style={styles.value}>{currentStreak} days</Text></View>
      <View style={styles.card}><Text style={styles.title}>Longest streak</Text><Text style={styles.value}>{longestStreak} days</Text></View>
      <View style={styles.card}><Text style={styles.title}>Weekly XP</Text><Text style={styles.value}>{weeklyXp}</Text></View>
      <View style={styles.card}><Text style={styles.title}>Total XP</Text><Text style={styles.value}>{totalXp}</Text></View>
      <View style={styles.card}><Text style={styles.title}>Last 7 Days</Text><Text style={styles.sub}>{last7.map((d) => `${d.date}: ${d.xp}XP`).join('\n') || 'No activity yet.'}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bg, padding: 16, gap: 12 },
  header: { color: palette.text, fontSize: 24, fontWeight: '800' },
  card: { backgroundColor: palette.card, borderRadius: 16, borderWidth: 1, borderColor: palette.border, padding: 12, gap: 6 },
  title: { color: palette.muted, fontSize: 12 },
  value: { color: palette.text, fontSize: 24, fontWeight: '800' },
  sub: { color: palette.text }
});
