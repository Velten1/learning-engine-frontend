import { apiRequest } from './config';

export interface Reflection {
  id: string;
  pomodoroSessionId: string;
  userId: string;
  topic: string;
  whatIThought: string;
  whatItActuallyIs: string;
  summary: string;
  mandatoryQuestion: string;
  optionalQuestion: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReflectionData {
  pomodoroSessionId: string;
  topic: string;
  whatIThought: string;
  whatItActuallyIs: string;
  summary: string;
  mandatoryQuestion: string;
  optionalQuestion?: string;
}

// Criar uma reflexão
export async function createReflection(
  data: CreateReflectionData
): Promise<Reflection> {
  return apiRequest<Reflection>('/api/reflections', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Obter uma reflexão por ID
export async function getReflection(id: string): Promise<Reflection> {
  return apiRequest<Reflection>(`/api/reflections/${id}`, {
    method: 'GET',
  });
}

// Listar todas as reflexões do usuário
export async function getReflections(): Promise<Reflection[]> {
  return apiRequest<Reflection[]>('/api/reflections', {
    method: 'GET',
  });
}

