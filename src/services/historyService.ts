import * as historyApi from '@/api/history';
import type { HistoryEntry } from '@/api/history';

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
}

