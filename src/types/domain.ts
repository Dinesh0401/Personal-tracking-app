export type DailyTaskId = 'dsa' | 'ai' | 'output';

export type DailyTask = {
  id: DailyTaskId;
  title: string;
  description: string;
  completed: boolean;
  targetLabel: string;
};

export type DayRecord = {
  date: string;
  dsaSolved: number;
  aiMinutes: number;
  commitCount: number;
  xp: number;
  completedTasksCount: number;
};

export type WeeklyReport = {
  strengths: string[];
  weaknesses: string[];
  recommended_actions: string[];
  weekly_score: number;
};

export type AppSettings = {
  githubUsername: string;
};
