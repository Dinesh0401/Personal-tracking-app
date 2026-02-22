import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProgressCard } from '@/components/ProgressCard';
import { useAppState } from '@/store/AppContext';
import { buildDailyTasks } from '@/services/xp';
import { palette } from '@/theme/palette';

export function HomeScreen() {
  const { today, setToday, submitDay, warning, currentStreak } = useAppState();
  const tasks = buildDailyTasks(today);

  const quickActions = [
    { label: '+1 DSA', onPress: () => setToday({ dsaSolved: today.dsaSolved + 1 }) },
    { label: '+15m AI', onPress: () => setToday({ aiMinutes: today.aiMinutes + 15 }) },
    { label: '+1 Commit', onPress: () => setToday({ commitCount: today.commitCount + 1 }) }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Discipline OS</Text>
      <Text style={styles.subHeader}>Current streak: {currentStreak} day(s)</Text>
      <ProgressCard xp={today.xp} />
      {!!warning && <Text style={styles.warning}>{warning}</Text>}

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Quick Capture</Text>
        <View style={styles.quickRow}>
          {quickActions.map((action) => (
            <Pressable key={action.label} style={styles.quickAction} onPress={action.onPress}>
              <Text style={styles.quickText}>{action.label}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.metrics}>DSA {today.dsaSolved} · AI {today.aiMinutes}m · Commits {today.commitCount}</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Mandatory Checklist</Text>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskRow}>
            <View style={[styles.badge, task.completed ? styles.badgeDone : styles.badgePending]}>
              <Text style={styles.badgeText}>{task.completed ? 'DONE' : task.targetLabel}</Text>
            </View>
            <View style={styles.taskInfo}>
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
          Alert.alert('Saved', today.completedTasksCount === 3 ? 'Perfect day. Streak grows 🌲' : 'Recorded. Missed tasks create dry tree 🌳');
        }}
      >
        <Text style={styles.submitText}>Submit End of Day</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 14, backgroundColor: palette.bg, paddingBottom: 120 },
  header: { color: palette.text, fontSize: 28, fontWeight: '800' },
  subHeader: { color: palette.muted, marginTop: -8 },
  warning: { color: '#f8cb73', fontSize: 12 },
  formCard: { backgroundColor: palette.card, borderColor: palette.border, borderWidth: 1, borderRadius: 16, padding: 14, gap: 10 },
  sectionTitle: { color: palette.text, fontWeight: '700', fontSize: 17 },
  quickRow: { flexDirection: 'row', gap: 8 },
  quickAction: { backgroundColor: '#111a2c', borderColor: palette.border, borderWidth: 1, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10 },
  quickText: { color: palette.text, fontSize: 12, fontWeight: '700' },
  metrics: { color: palette.muted, fontSize: 12 },
  taskRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  badge: { borderRadius: 8, paddingVertical: 6, paddingHorizontal: 8, minWidth: 72, alignItems: 'center' },
  badgeDone: { backgroundColor: '#16342a' },
  badgePending: { backgroundColor: '#2a2230' },
  badgeText: { color: palette.text, fontSize: 10, fontWeight: '800' },
  taskInfo: { flex: 1 },
  taskTitle: { color: palette.text, fontWeight: '600' },
  taskDesc: { color: palette.muted, fontSize: 12 },
  submit: { backgroundColor: palette.primary, borderRadius: 12, alignItems: 'center', paddingVertical: 14, marginTop: 8 },
  submitText: { color: '#06111c', fontWeight: '800' }
});
