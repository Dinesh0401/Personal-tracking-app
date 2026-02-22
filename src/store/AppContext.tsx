import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DayRecord, AppSettings } from '@/types/domain';
import { calculateCurrentStreak, calculateXp, getCompletedTasksCount } from '@/services/xp';

const STORAGE_KEY = 'pta.records';
const SETTINGS_KEY = 'pta.settings';

type AppState = {
  today: DayRecord;
  history: DayRecord[];
  setToday: (update: Partial<DayRecord>) => void;
  submitDay: () => Promise<void>;
  isOnline: boolean;
  warning?: string;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  settings: AppSettings;
  setSettings: (update: Partial<AppSettings>) => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

const defaultRecord = (): DayRecord => ({
  date: todayKey(),
  dsaSolved: 0,
  aiMinutes: 0,
  commitCount: 0,
  xp: 0,
  completedTasksCount: 0
});

const defaultSettings: AppSettings = { githubUsername: '' };

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<DayRecord[]>([]);
  const [today, setTodayState] = useState<DayRecord>(defaultRecord());
  const [settings, setSettingsState] = useState<AppSettings>(defaultSettings);
  const [isOnline, setIsOnline] = useState(true);
  const [warning, setWarning] = useState<string>();

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (!saved) return;
      const parsed = JSON.parse(saved) as DayRecord[];
      setHistory(parsed.filter((d) => d.date !== todayKey()));
      const current = parsed.find((d) => d.date === todayKey());
      if (current) setTodayState(current);
    });
    AsyncStorage.getItem(SETTINGS_KEY).then((saved) => {
      if (saved) setSettingsState({ ...defaultSettings, ...(JSON.parse(saved) as AppSettings) });
    });
  }, []);

  useEffect(() => {
    Network.getNetworkStateAsync().then((state) => {
      const connected = Boolean(state.isConnected);
      setIsOnline(connected);
      setWarning(connected ? undefined : 'Offline mode active. Changes are cached and sync later.');
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...history, today]));
  }, [history, today]);

  useEffect(() => {
    AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const setToday = (update: Partial<DayRecord>) => {
    setTodayState((prev) => {
      const next = { ...prev, ...update };
      const completedTasksCount = getCompletedTasksCount(next);
      return {
        ...next,
        completedTasksCount,
        xp: calculateXp(next.dsaSolved, next.aiMinutes, next.commitCount)
      };
    });
  };

  const submitDay = async () => {
    setHistory((prev) => [...prev.filter((d) => d.date !== today.date), today].sort((a, b) => a.date.localeCompare(b.date)));
  };

  const allRecords = useMemo(() => [...history, today], [history, today]);
  const currentStreak = useMemo(() => calculateCurrentStreak(allRecords), [allRecords]);
  const longestStreak = useMemo(() => {
    let best = 0;
    let running = 0;
    const sorted = [...allRecords].sort((a, b) => a.date.localeCompare(b.date));
    sorted.forEach((day) => {
      if (day.completedTasksCount === 3) {
        running += 1;
        best = Math.max(best, running);
      } else {
        running = 0;
      }
    });
    return best;
  }, [allRecords]);

  const totalXp = useMemo(() => allRecords.reduce((sum, day) => sum + day.xp, 0), [allRecords]);

  const setSettings = (update: Partial<AppSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...update }));
  };

  const value = useMemo(
    () => ({
      today,
      history,
      setToday,
      submitDay,
      isOnline,
      warning,
      currentStreak,
      longestStreak,
      totalXp,
      settings,
      setSettings
    }),
    [today, history, isOnline, warning, currentStreak, longestStreak, totalXp, settings]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppState must be used inside AppProvider');
  return context;
}
