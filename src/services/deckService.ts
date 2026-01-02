import * as deckApi from '@/api/deck';
import { CreateDeckData, UpdateDeckData } from '@/api/deck';

export class DeckService {
  // Criar novo deck
  static async create(data: CreateDeckData) {
    try {
      const deck = await deckApi.createDeck(data);
      return {
        success: true,
        data: deck,
        message: 'Deck criado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao criar deck',
      };
    }
  }

  // Obter todos os decks do usuário
  static async getAll() {
    try {
      const decks = await deckApi.getDecks();
      return {
        success: true,
        data: decks,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao obter decks',
        data: [] as deckApi.Deck[],
      };
    }
  }

  // Obter deck por ID
  static async getById(id: string) {
    try {
      const deck = await deckApi.getDeckById(id);
      return {
        success: true,
        data: deck,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao obter deck',
      };
    }
  }

  // Atualizar deck
  static async update(id: string, data: UpdateDeckData) {
    try {
      const deck = await deckApi.updateDeck(id, data);
      return {
        success: true,
        data: deck,
        message: 'Deck atualizado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar deck',
      };
    }
  }

  // Deletar deck
  static async delete(id: string) {
    try {
      const deck = await deckApi.deleteDeck(id);
      return {
        success: true,
        data: deck,
        message: 'Deck deletado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro ao deletar deck',
      };
    }
  }
}



