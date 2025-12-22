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

// Obter histórico do usuário
export async function getHistory(): Promise<HistoryEntry[]> {
  return apiRequest<HistoryEntry[]>('/api/history', {
    method: 'GET',
  });
}

