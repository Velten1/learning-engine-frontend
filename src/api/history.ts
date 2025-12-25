import { apiRequest } from './config';

export interface HistoryEntry {
  id: string;
  pomodoroSessionId: string;
  reflectionId: string | null;
  userId: string;
  topic: string;
  duration: number;
  status: 'COMPLETED' | 'ABANDONED';
  createdAt: string;
}

export interface TodayStats {
  sessionsToday: number;
  focusedTimeToday: number; // em minutos
  reflectionsToday: number;
}

// Obter histórico do usuário
export async function getHistory(): Promise<HistoryEntry[]> {
  return apiRequest<HistoryEntry[]>('/api/history', {
    method: 'GET',
  });
}

export interface LifetimeStats {
  totalSessions: number;
  totalTimeElapsed: number; // em minutos
  thisWeekSessions: number;
  topicsStudied: number;
}

// Obter estatísticas de hoje
export async function getTodayStats(): Promise<TodayStats> {
  return apiRequest<TodayStats>('/api/history/today', {
    method: 'GET',
  });
}

// Obter estatísticas gerais (lifetime)
export async function getLifetimeStats(): Promise<LifetimeStats> {
  return apiRequest<LifetimeStats>('/api/history/lifetime', {
    method: 'GET',
  });
}

