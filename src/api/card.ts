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

