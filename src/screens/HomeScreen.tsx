import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ProgressCard } from '@/components/ProgressCard';
import { useAppState } from '@/store/AppContext';
import { buildDailyTasks } from '@/services/xp';
import { palette } from '@/theme/palette';

export function HomeScreen() {
  const { today, setToday, submitDay, warning } = useAppState();
  const tasks = buildDailyTasks(today);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Disciplined Execution Tracker</Text>
      <ProgressCard xp={today.xp} />
      {!!warning && <Text style={styles.warning}>{warning}</Text>}

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Daily Inputs</Text>

        <Text style={styles.label}>DSA solved</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(today.dsaSolved)}
          onChangeText={(text) => setToday({ dsaSolved: Number(text || 0) })}
        />

        <Text style={styles.label}>AI learning minutes</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(today.aiMinutes)}
          onChangeText={(text) => setToday({ aiMinutes: Number(text || 0) })}
        />

        <Text style={styles.label}>Commit count</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(today.commitCount)}
          onChangeText={(text) => setToday({ commitCount: Number(text || 0) })}
        />
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Mandatory Checklist</Text>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskRow}>
            <Text style={styles.taskIcon}>{task.completed ? '✅' : '⬜'}</Text>
            <View>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDesc}>{task.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <Pressable
        style={styles.submit}
        onPress={async () => {
          await submitDay();
          Alert.alert('Saved', 'Day submitted. Forest and analytics are updated.');
        }}
      >
        <Text style={styles.submitText}>Submit End of Day</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 14, backgroundColor: palette.bg, paddingBottom: 120 },
  header: { color: palette.text, fontSize: 24, fontWeight: '800' },
  warning: { color: '#f8cb73', fontSize: 12 },
  formCard: { backgroundColor: palette.card, borderColor: palette.border, borderWidth: 1, borderRadius: 16, padding: 14, gap: 8 },
  sectionTitle: { color: palette.text, fontWeight: '700', fontSize: 17, marginBottom: 2 },
  label: { color: palette.muted, fontSize: 12 },
  input: { backgroundColor: '#0f1422', color: palette.text, borderRadius: 10, borderColor: palette.border, borderWidth: 1, paddingHorizontal: 12, height: 40 },
  taskRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', paddingVertical: 6 },
  taskIcon: { color: palette.text, fontSize: 20 },
  taskTitle: { color: palette.text, fontWeight: '600' },
  taskDesc: { color: palette.muted, fontSize: 12 },
  submit: { backgroundColor: palette.primary, borderRadius: 12, alignItems: 'center', paddingVertical: 14, marginTop: 8 },
  submitText: { color: '#06111c', fontWeight: '800' }
});
