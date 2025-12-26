import * as questionApi from '@/api/question';
import type { Question } from '@/api/question';

export class QuestionService {
  static async getRandom(): Promise<Question | null> {
    try {
      const question = await questionApi.getRandomQuestion();
      return question;
    } catch (error) {
      console.error('Erro ao obter pergunta aleatória:', error);
      return null;
    }
  }

  static async getAll(): Promise<Question[]> {
    try {
      const questions = await questionApi.getAllQuestions();
      return questions;
    } catch (error) {
      console.error('Erro ao obter todas as perguntas:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<Question | null> {
    try {
      const question = await questionApi.getQuestionById(id);
      return question;
    } catch (error) {
      console.error('Erro ao obter pergunta por ID:', error);
      return null;
    }
  }
}

