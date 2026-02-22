import { DayRecord, DailyTask } from '@/types/domain';

export const DAILY_XP_CAP = 100;

export function calculateXp(dsaSolved: number, aiMinutes: number, commitCount: number): number {
  const dsaXp = dsaSolved >= 2 ? 20 : 0;
  const aiXp = aiMinutes > 0 ? 15 : 0;
  const commitXp = commitCount > 0 ? 10 : 0;
  return Math.min(DAILY_XP_CAP, dsaXp + aiXp + commitXp);
}

export function buildDailyTasks(record: DayRecord): DailyTask[] {
  return [
    {
      id: 'dsa',
      title: 'DSA Problems',
      description: 'Solve at least 2 focused problems',
      targetLabel: '2+ solved',
      completed: record.dsaSolved >= 2
    },
    {
      id: 'ai',
      title: 'AI Learning Session',
      description: 'Do one intentional AI learning sprint',
      targetLabel: '1+ session',
      completed: record.aiMinutes > 0
    },
    {
      id: 'output',
      title: 'Output / Commit',
      description: 'Ship one public output or commit',
      targetLabel: '1+ commit',
      completed: record.commitCount > 0
    }
  ];
}

export function getCompletedTasksCount(record: Pick<DayRecord, 'dsaSolved' | 'aiMinutes' | 'commitCount'>): number {
  return [record.dsaSolved >= 2, record.aiMinutes > 0, record.commitCount > 0].filter(Boolean).length;
}

export function calculateCurrentStreak(history: DayRecord[]): number {
  let streak = 0;
  const sorted = [...history].sort((a, b) => a.date.localeCompare(b.date));
  for (let i = sorted.length - 1; i >= 0; i -= 1) {
    if (sorted[i].completedTasksCount === 3) streak += 1;
    else break;
  }
  return streak;
}
