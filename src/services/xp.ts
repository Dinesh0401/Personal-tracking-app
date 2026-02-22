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
      description: 'Solve at least 2 DSA problems',
      completed: record.dsaSolved >= 2
    },
    {
      id: 'ai',
      title: 'AI Learning',
      description: 'Complete one AI learning session',
      completed: record.aiMinutes > 0
    },
    {
      id: 'output',
      title: 'Output / Commit',
      description: 'Push at least one commit/project output',
      completed: record.commitCount > 0
    }
  ];
}

export function calculateStreak(last7: DayRecord[]): number {
  let streak = 0;
  for (let i = last7.length - 1; i >= 0; i -= 1) {
    if (last7[i].completedTasksCount === 3) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}
