import { apiRequest } from './config';

export interface Question {
  id: string;
  text: string;
  category?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Obter pergunta aleatória
export async function getRandomQuestion(): Promise<Question> {
  return apiRequest<Question>('/api/questions/random', {
    method: 'GET',
  });
}

// Obter todas as perguntas
export async function getAllQuestions(): Promise<Question[]> {
  return apiRequest<Question[]>('/api/questions', {
    method: 'GET',
  });
}

// Obter pergunta por ID
export async function getQuestionById(id: string): Promise<Question> {
  return apiRequest<Question>(`/api/questions/${id}`, {
    method: 'GET',
  });
}

