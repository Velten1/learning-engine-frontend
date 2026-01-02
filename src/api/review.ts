import { apiRequest } from './config';
import type { Card } from './card';

export type ReviewRating = 'WRONG' | 'GOOD' | 'EASY';

export interface ReviewCardData {
  cardId: string;
  rating: ReviewRating;
}

export interface ReviewCardResponse extends Card {}

// Revisar um card
export async function reviewCard(data: ReviewCardData): Promise<ReviewCardResponse> {
  return apiRequest<ReviewCardResponse>('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Obter cards prontos para revisão
export async function getCardsDueForReview(): Promise<Card[]> {
  return apiRequest<Card[]>('/api/reviews/due', {
    method: 'GET',
  });
}

