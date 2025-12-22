import { apiRequest } from './config';

export interface PomodoroSession {
  id: string;
  userId: string;
  startedAt: string;
  endedAt: string | null;
  duration: number;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  abandonmentReason: string | null;
  expiresAt: string;
  remainingMinutes?: number;
  isExpired?: boolean;
  isCompleted?: boolean;
}

export interface StartPomodoroResponse {
  id: string;
  userId: string;
  startedAt: string;
  status: 'ACTIVE';
  expiresAt: string;
}

export interface CurrentPomodoroResponse extends PomodoroSession {
  remainingMinutes?: number;
  isExpired?: boolean;
}

// Iniciar uma sessão de Pomodoro
export async function startPomodoro(): Promise<StartPomodoroResponse> {
  return apiRequest<StartPomodoroResponse>('/api/pomodoro/start', {
    method: 'POST',
  });
}

// Abandonar uma sessão de Pomodoro
export async function abandonPomodoro(
  abandonmentReason: string
): Promise<PomodoroSession> {
  return apiRequest<PomodoroSession>('/api/pomodoro/abandon', {
    method: 'POST',
    body: JSON.stringify({ abandonmentReason }),
  });
}

// Obter Pomodoro atual (ativo)
export async function getCurrentPomodoro(): Promise<CurrentPomodoroResponse | null> {
  return apiRequest<CurrentPomodoroResponse | null>('/api/pomodoro/current', {
    method: 'GET',
  });
}

// Completar uma sessão de Pomodoro
export async function completePomodoro(): Promise<PomodoroSession> {
  return apiRequest<PomodoroSession>('/api/pomodoro/complete', {
    method: 'POST',
  });
}

