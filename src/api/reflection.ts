import { apiRequest } from './config';

export interface Reflection {
  id: string;
  pomodoroId: string;
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
  pomodoroId: string;
  topic: string;
  whatIThought: string;
  whatItActuallyIs: string;
  summary: string;
  mandatoryQuestion: string;
  optionalQuestion?: string | null;
}

export interface UpdateReflectionData {
  topic?: string;
  whatIThought?: string;
  whatItActuallyIs?: string;
  summary?: string;
  mandatoryQuestion?: string;
  optionalQuestion?: string | null;
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

// Obter reflexão por pomodoroId
export async function getReflectionByPomodoroId(
  pomodoroId: string
): Promise<Reflection> {
  return apiRequest<Reflection>(`/api/reflections/pomodoro/${pomodoroId}`, {
    method: 'GET',
  });
}

// Listar todas as reflexões do usuário
export async function getReflections(): Promise<Reflection[]> {
  return apiRequest<Reflection[]>('/api/reflections/user/all', {
    method: 'GET',
  });
}

// Atualizar uma reflexão
export async function updateReflection(
  id: string,
  data: UpdateReflectionData
): Promise<Reflection> {
  return apiRequest<Reflection>(`/api/reflections/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Deletar uma reflexão
export async function deleteReflection(id: string): Promise<void> {
  return apiRequest<void>(`/api/reflections/${id}`, {
    method: 'DELETE',
  });
}

