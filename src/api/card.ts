import { apiRequest } from './config';

export interface Card {
  id: string;
  deckId: string;
  front: string;
  back: string;
  nextReviewAt: string;
  createdAt: string;
  updatedAt: string;
  deck?: {
    id: string;
    name: string;
    userId: string;
  };
}

export interface CreateCardData {
  deckId: string;
  front: string;
  back: string;
}

export interface UpdateCardData {
  front?: string;
  back?: string;
}

export interface CardResponse {
  id: string;
  deckId: string;
  front: string;
  back: string;
  nextReviewAt: string;
  createdAt: string;
  updatedAt: string;
  deck?: {
    id: string;
    name: string;
    userId: string;
  };
}

export interface DeckStats {
  deck: {
    id: string;
    name: string;
    description: string | null;
  };
  stats: {
    new: number;
    learning: number;
    due: number;
  };
}

export interface DeckWithStats {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  stats: {
    new: number;
    learning: number;
    due: number;
  };
}

// Criar novo card
export async function createCard(data: CreateCardData): Promise<CardResponse> {
  return apiRequest<CardResponse>('/api/cards', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Obter card por ID
export async function getCardById(id: string): Promise<CardResponse> {
  return apiRequest<CardResponse>(`/api/cards/${id}`, {
    method: 'GET',
  });
}

// Obter cards de um deck
export async function getCardsByDeckId(deckId: string): Promise<CardResponse[]> {
  return apiRequest<CardResponse[]>(`/api/cards/deck/${deckId}`, {
    method: 'GET',
  });
}

// Atualizar card
export async function updateCard(
  id: string,
  data: UpdateCardData
): Promise<CardResponse> {
  return apiRequest<CardResponse>(`/api/cards/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// Deletar card
export async function deleteCard(id: string): Promise<CardResponse> {
  return apiRequest<CardResponse>(`/api/cards/${id}`, {
    method: 'DELETE',
  });
}

// Obter cards novos (nunca revisados)
export async function getNewCards(): Promise<CardResponse[]> {
  return apiRequest<CardResponse[]>('/api/cards/stats/new', {
    method: 'GET',
  });
}

// Obter cards em aprendizado
export async function getCardsInLearning(): Promise<CardResponse[]> {
  return apiRequest<CardResponse[]>('/api/cards/stats/learning', {
    method: 'GET',
  });
}

// Obter cards prontos para revisão
export async function getCardsDueForReview(): Promise<CardResponse[]> {
  return apiRequest<CardResponse[]>('/api/cards/stats/due', {
    method: 'GET',
  });
}

// Obter estatísticas de um deck específico
export async function getDeckStats(deckId: string): Promise<DeckStats> {
  return apiRequest<DeckStats>(`/api/cards/deck/${deckId}/stats`, {
    method: 'GET',
  });
}

// Obter todos os decks com suas estatísticas
export async function getDecksWithStats(): Promise<DeckWithStats[]> {
  return apiRequest<DeckWithStats[]>('/api/cards/decks/stats', {
    method: 'GET',
  });
}
