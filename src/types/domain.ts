export type DailyTask = {
  id: 'dsa' | 'ai' | 'output';
  title: string;
  description: string;
  completed: boolean;
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
