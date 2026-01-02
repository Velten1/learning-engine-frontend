import { apiRequest } from './config';

export interface Deck {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeckData {
  name: string;
  description?: string | null;
}

export interface UpdateDeckData {
  name?: string;
  description?: string | null;
}

export interface DeckResponse {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

// Criar novo deck
export async function createDeck(data: CreateDeckData): Promise<DeckResponse> {
  return apiRequest<DeckResponse>('/api/decks', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Obter todos os decks do usuário
export async function getDecks(): Promise<DeckResponse[]> {
  return apiRequest<DeckResponse[]>('/api/decks', {
    method: 'GET',
  });
}

// Obter deck por ID
export async function getDeckById(id: string): Promise<DeckResponse> {
  return apiRequest<DeckResponse>(`/api/decks/${id}`, {
    method: 'GET',
  });
}

// Atualizar deck
export async function updateDeck(
  id: string,
  data: UpdateDeckData
): Promise<DeckResponse> {
  return apiRequest<DeckResponse>(`/api/decks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Deletar deck
export async function deleteDeck(id: string): Promise<DeckResponse> {
  return apiRequest<DeckResponse>(`/api/decks/${id}`, {
    method: 'DELETE',
  });
}



