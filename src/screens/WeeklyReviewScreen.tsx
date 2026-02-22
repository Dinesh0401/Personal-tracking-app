import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { fetchWeeklyReport } from '@/services/weeklyReport';
import { WeeklyReport } from '@/types/domain';
import { palette } from '@/theme/palette';

export function WeeklyReviewScreen() {
  const [report, setReport] = useState<WeeklyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSunday = useMemo(() => new Date().getDay() === 0, []);

  const loadReport = async () => {
    if (!isSunday) {
      setError('Weekly report unlocks on Sunday. Keep executing through the week.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeeklyReport('local-user');
      setReport(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load weekly review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AI Weekly Review</Text>
      <Text style={styles.subtitle}>{isSunday ? 'Report window is open today.' : 'Report runs once per week on Sunday.'}</Text>
      <Pressable style={styles.button} onPress={loadReport}><Text style={styles.buttonText}>Generate Weekly Report</Text></Pressable>
      {loading && <ActivityIndicator color={palette.primary} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {!!report && (
        <View style={styles.card}>
          <Text style={styles.title}>Score: {report.weekly_score}%</Text>
          <Text style={styles.block}>Strengths: {report.strengths.join(', ') || '-'}</Text>
          <Text style={styles.block}>Weaknesses: {report.weaknesses.join(', ') || '-'}</Text>
          <Text style={styles.block}>Action Plan: {report.recommended_actions.join(', ') || '-'}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.bg, padding: 16, gap: 12 },
  header: { color: palette.text, fontSize: 24, fontWeight: '800' },
  subtitle: { color: palette.muted },
  button: { backgroundColor: palette.primary, borderRadius: 12, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 10 },
  buttonText: { color: '#05141f', fontWeight: '800' },
  error: { color: palette.danger },
  card: { borderRadius: 16, backgroundColor: palette.card, borderColor: palette.border, borderWidth: 1, padding: 12, gap: 8 },
  title: { color: palette.text, fontWeight: '800' },
  block: { color: palette.muted }
});
