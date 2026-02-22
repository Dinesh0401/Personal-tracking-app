import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DayRecord } from '@/types/domain';
import { calculateXp } from '@/services/xp';

const STORAGE_KEY = 'pta.records';

type AppState = {
  today: DayRecord;
  history: DayRecord[];
  setToday: (update: Partial<DayRecord>) => void;
  submitDay: () => Promise<void>;
  isOnline: boolean;
  warning?: string;
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

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<DayRecord[]>([]);
  const [today, setTodayState] = useState<DayRecord>(defaultRecord());
  const [isOnline, setIsOnline] = useState(true);
  const [warning, setWarning] = useState<string>();

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (!saved) return;
      const parsed = JSON.parse(saved) as DayRecord[];
      setHistory(parsed.filter((d) => d.date !== todayKey()));
      const current = parsed.find((d) => d.date === todayKey());
      if (current) {
        setTodayState(current);
      }
    });
  }, []);

  useEffect(() => {
    Network.getNetworkStateAsync().then((state) => {
      setIsOnline(Boolean(state.isConnected));
      if (!state.isConnected) {
        setWarning('Offline mode active. Your progress will sync when internet returns.');
      } else {
        setWarning(undefined);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...history, today]));
  }, [history, today]);

  const setToday = (update: Partial<DayRecord>) => {
    setTodayState((prev) => {
      const next = { ...prev, ...update };
      const completedTasksCount = [next.dsaSolved >= 2, next.aiMinutes > 0, next.commitCount > 0].filter(Boolean).length;
      return {
        ...next,
        completedTasksCount,
        xp: calculateXp(next.dsaSolved, next.aiMinutes, next.commitCount)
      };
    });
  };

  const submitDay = async () => {
    const withoutToday = history.filter((d) => d.date !== today.date);
    setHistory([...withoutToday, today].sort((a, b) => a.date.localeCompare(b.date)));
  };

  const value = useMemo(
    () => ({ today, history, setToday, submitDay, isOnline, warning }),
    [today, history, isOnline, warning]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used inside AppProvider');
  }
  return context;
}
