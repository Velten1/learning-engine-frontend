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
}

