import * as pomodoroApi from '@/api/pomodoro';
import type {
  PomodoroSession,
  CurrentPomodoroResponse,
} from '@/api/pomodoro';

export class PomodoroService {
  static async start() {
    try {
      const pomodoro = await pomodoroApi.startPomodoro();
      return {
        success: true,
        data: pomodoro,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao iniciar pomodoro',
      };
    }
  }

  static async abandon(reason: string) {
    try {
      const pomodoro = await pomodoroApi.abandonPomodoro(reason);
      return {
        success: true,
        data: pomodoro,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao abandonar pomodoro',
      };
    }
  }

  static async getCurrent(): Promise<CurrentPomodoroResponse | null> {
    try {
      const pomodoro = await pomodoroApi.getCurrentPomodoro();
      return pomodoro;
    } catch (error) {
      console.error('Erro ao obter pomodoro atual:', error);
      return null;
    }
  }

  static async complete() {
    try {
      const pomodoro = await pomodoroApi.completePomodoro();
      return {
        success: true,
        data: pomodoro,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao completar pomodoro',
      };
    }
  }

  static async reset() {
    try {
      const pomodoro = await pomodoroApi.resetPomodoro();
      return {
        success: true,
        data: pomodoro,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao resetar pomodoro',
      };
    }
  }
}

