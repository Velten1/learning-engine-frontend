import * as reflectionApi from '@/api/reflection';
import type {
  CreateReflectionData,
  UpdateReflectionData,
  Reflection,
} from '@/api/reflection';

export class ReflectionService {
  static async create(data: CreateReflectionData) {
    try {
      const reflection = await reflectionApi.createReflection(data);
      return {
        success: true,
        data: reflection,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao criar reflexão',
      };
    }
  }

  static async getById(id: string) {
    try {
      const reflection = await reflectionApi.getReflection(id);
      return {
        success: true,
        data: reflection,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao obter reflexão',
      };
    }
  }

  static async getByPomodoroId(pomodoroId: string) {
    try {
      const reflection = await reflectionApi.getReflectionByPomodoroId(
        pomodoroId
      );
      return {
        success: true,
        data: reflection,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao obter reflexão',
      };
    }
  }

  static async getAll(): Promise<Reflection[]> {
    try {
      const reflections = await reflectionApi.getReflections();
      return reflections;
    } catch (error) {
      console.error('Erro ao obter reflexões:', error);
      return [];
    }
  }

  static async update(id: string, data: UpdateReflectionData) {
    try {
      const reflection = await reflectionApi.updateReflection(id, data);
      return {
        success: true,
        data: reflection,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao atualizar reflexão',
      };
    }
  }

  static async delete(id: string) {
    try {
      await reflectionApi.deleteReflection(id);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Erro ao deletar reflexão',
      };
    }
  }
}

