import { supabase } from '@/services/supabase';
import { WeeklyReport } from '@/types/domain';

export async function fetchWeeklyReport(userId: string): Promise<WeeklyReport> {
  const { data, error } = await supabase.functions.invoke('weekly_report', {
    body: { userId }
  });

  if (error) {
    throw new Error('Unable to load weekly AI review.');
  }

  return data as WeeklyReport;
}
