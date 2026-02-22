import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '@/store/AppContext';
import { palette } from '@/theme/palette';

export function ForestScreen() {
  const { history } = useAppState();
  const healthy = history.filter((d) => d.completedTasksCount === 3);
  const dry = history.filter((d) => d.completedTasksCount !== 3);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Forest Discipline View</Text>
      <View style={styles.grid}>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>🌲 Healthy Trees ({healthy.length})</Text>
          {healthy.map((item) => (
            <Text key={item.date} style={styles.item}>🌲 {item.date}</Text>
          ))}
        </View>

        <View style={styles.column}>
          <Text style={styles.columnTitle}>🌳 Dry Trees ({dry.length})</Text>
          {dry.map((item) => (
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
  grid: { flexDirection: 'row', gap: 12 },
  column: { flex: 1, borderRadius: 16, backgroundColor: palette.card, borderWidth: 1, borderColor: palette.border, padding: 12, minHeight: 240 },
  columnTitle: { color: palette.text, fontWeight: '700', marginBottom: 8 },
  item: { color: palette.muted, marginBottom: 6 }
});
