import * as cardApi from '@/api/card';
import { CreateCardData, UpdateCardData } from '@/api/card';

export class CardService {
  // Criar novo card
  static async create(data: CreateCardData) {
    try {
      const card = await cardApi.createCard(data);
      return {
        success: true,
        data: card,
        message: 'Card criado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar card',
      };
    }
  }

  // Obter card por ID
  static async getById(id: string) {
    try {
      const card = await cardApi.getCardById(id);
      return {
        success: true,
        data: card,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao obter card',
      };
    }
  }

  // Obter cards de um deck
  static async getByDeckId(deckId: string) {
    try {
      const cards = await cardApi.getCardsByDeckId(deckId);
      return {
        success: true,
        data: cards,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao obter cards',
        data: [] as cardApi.Card[],
      };
    }
  }

  // Atualizar card
  static async update(id: string, data: UpdateCardData) {
    try {
      const card = await cardApi.updateCard(id, data);
      return {
        success: true,
        data: card,
        message: 'Card atualizado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar card',
      };
    }
  }

  // Deletar card
  static async delete(id: string) {
    try {
      const card = await cardApi.deleteCard(id);
      return {
        success: true,
        data: card,
        message: 'Card deletado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao deletar card',
      };
    }
  }

  // Obter cards novos
  static async getNewCards() {
    try {
      const cards = await cardApi.getNewCards();
      return {
        success: true,
        data: cards,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao obter cards novos',
        data: [] as cardApi.Card[],
      };
    }
  }

  // Obter cards em aprendizado
  static async getCardsInLearning() {
    try {
      const cards = await cardApi.getCardsInLearning();
      return {
        success: true,
        data: cards,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao obter cards em aprendizado',
        data: [] as cardApi.Card[],
      };
    }
  }

  // Obter cards prontos para revisão
  static async getCardsDueForReview() {
    try {
      const cards = await cardApi.getCardsDueForReview();
      return {
        success: true,
        data: cards,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao obter cards para revisão',
        data: [] as cardApi.Card[],
      };
    }
  }

  // Obter estatísticas de um deck específico
  static async getDeckStats(deckId: string) {
    try {
      const stats = await cardApi.getDeckStats(deckId);
      return {
        success: true,
        data: stats,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao obter estatísticas do deck',
      };
    }
  }

  // Obter todos os decks com suas estatísticas
  static async getDecksWithStats() {
    try {
      const decks = await cardApi.getDecksWithStats();
      return {
        success: true,
        data: decks,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao obter decks com estatísticas',
        data: [] as cardApi.DeckWithStats[],
      };
    }
  }
}
