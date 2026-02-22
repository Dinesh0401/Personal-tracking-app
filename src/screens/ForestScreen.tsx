import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '@/store/AppContext';
import { palette } from '@/theme/palette';

export function ForestScreen() {
  const { history, today } = useAppState();
  const records = [...history, today].filter((d) => d.completedTasksCount > 0);
  const healthy = records.filter((d) => d.completedTasksCount === 3);
  const dry = records.filter((d) => d.completedTasksCount !== 3);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Forest Discipline View</Text>
      <Text style={styles.meta}>Healthy {healthy.length} · Dry {dry.length}</Text>
      <View style={styles.grid}>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>🌲 Healthy Days</Text>
          {healthy.length === 0 ? <Text style={styles.empty}>No healthy trees yet.</Text> : healthy.map((item) => (
            <Text key={item.date} style={styles.item}>🌲 {item.date}</Text>
          ))}
        </View>

        <View style={styles.column}>
          <Text style={styles.columnTitle}>🌳 Dry Days</Text>
          {dry.length === 0 ? <Text style={styles.empty}>No dry trees. Keep pushing.</Text> : dry.map((item) => (
            <Text key={item.date} style={styles.item}>🌳 {item.date}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: palette.bg, padding: 16, gap: 12, paddingBottom: 100 },
  header: { color: palette.text, fontSize: 24, fontWeight: '800' },
  meta: { color: palette.muted },
  grid: { flexDirection: 'row', gap: 12 },
  column: { flex: 1, borderRadius: 16, backgroundColor: palette.card, borderWidth: 1, borderColor: palette.border, padding: 12, minHeight: 240 },
  columnTitle: { color: palette.text, fontWeight: '700', marginBottom: 8 },
  item: { color: palette.muted, marginBottom: 6 },
  empty: { color: palette.muted, fontSize: 12 }
});
