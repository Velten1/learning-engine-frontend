import * as reviewApi from '@/api/review';
import { ReviewRating } from '@/api/review';

export class ReviewService {
  // Revisar um card
  static async reviewCard(cardId: string, rating: ReviewRating) {
    try {
      const card = await reviewApi.reviewCard({ cardId, rating });
      return {
        success: true,
        data: card,
        message: 'Card revisado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao revisar card',
      };
    }
  }

  // Obter cards prontos para revisão
  static async getCardsDueForReview() {
    try {
      const cards = await reviewApi.getCardsDueForReview();
      return {
        success: true,
        data: cards,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao obter cards para revisão',
        data: [] as reviewApi.Card[],
      };
    }
  }
}

