import * as historyApi from '@/api/history';
import type {
  HistoryEntry,
  TodayStats,
  LifetimeStats,
} from '@/api/history';

export class HistoryService {
  static async getAll(): Promise<HistoryEntry[]> {
    try {
      const history = await historyApi.getHistory();
      return history;
    } catch (error) {
      console.error('Erro ao obter histórico:', error);
      return [];
    }
  }

  static async getTodayStats(): Promise<TodayStats> {
    try {
      const stats = await historyApi.getTodayStats();
      return stats;
    } catch (error) {
      console.error('Erro ao obter estatísticas de hoje:', error);
      // Retorna valores padrão em caso de erro
      return {
        sessionsToday: 0,
        focusedTimeToday: 0,
        reflectionsToday: 0,
      };
    }
  }

  static async getLifetimeStats(): Promise<LifetimeStats> {
    try {
      const stats = await historyApi.getLifetimeStats();
      return stats;
    } catch (error) {
      console.error('Erro ao obter estatísticas gerais:', error);
      // Retorna valores padrão em caso de erro
      return {
        totalSessions: 0,
        totalTimeElapsed: 0,
        thisWeekSessions: 0,
        topicsStudied: 0,
      };
    }
  }

  // Função auxiliar para formatar tempo
  static formatTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${remainingMinutes}min`;
  }
}

