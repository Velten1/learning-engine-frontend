'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { ReflectionService } from '@/services/reflectionService';
import { DeckService } from '@/services/deckService';
import { CardService } from '@/services/cardService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import CardList from '@/components/CardList';
import CardModal from '@/components/CardModal';
import type { Reflection } from '@/api/reflection';
import type { Deck } from '@/api/deck';
import type { Card as CardType } from '@/api/card';
import Link from 'next/link';

type TabType = 'reflections' | 'decks';
type DeckViewType = 'list' | 'detail';

export default function RevisoesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('decks');
  const [deckView, setDeckView] = useState<DeckViewType>('list');
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
  
  // Reflections state
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [isLoadingReflections, setIsLoadingReflections] = useState(false);
  
  // Decks state
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoadingDecks, setIsLoadingDecks] = useState(false);
  
  // Cards state
  const [cards, setCards] = useState<CardType[]>([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  
  // Deck modal state
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [isSubmittingDeck, setIsSubmittingDeck] = useState(false);
  const [deckFormData, setDeckFormData] = useState({
    name: '',
    description: '',
  });
  const [deckError, setDeckError] = useState<string | null>(null);

  // Card modal state
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [isSubmittingCard, setIsSubmittingCard] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'reflections') {
      loadReflections();
    } else {
      loadDecks();
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedDeck && deckView === 'detail') {
      loadCards();
    }
  }, [selectedDeck, deckView]);

  // Load reflections
  const loadReflections = async () => {
    setIsLoadingReflections(true);
    try {
      const reflections = await ReflectionService.getAll();
      setReflections(reflections);
    } catch (err) {
      console.error('Erro ao carregar revisões:', err);
      setReflections([]);
    } finally {
      setIsLoadingReflections(false);
    }
  };

  // Load decks
  const loadDecks = async () => {
    setIsLoadingDecks(true);
    try {
      const result = await DeckService.getAll();
      if (result.success && result.data) {
        setDecks(result.data);
      }
    } catch (err) {
      console.error('Erro ao carregar decks:', err);
    } finally {
      setIsLoadingDecks(false);
    }
  };

  // Load cards
  const loadCards = async () => {
    if (!selectedDeck) return;
    
    setIsLoadingCards(true);
    try {
      const result = await CardService.getByDeckId(selectedDeck.id);
      if (result.success && result.data) {
        setCards(result.data);
      }
    } catch (err) {
      console.error('Erro ao carregar cards:', err);
      setCards([]);
    } finally {
      setIsLoadingCards(false);
    }
  };

  // Deck handlers
  const handleOpenDeckModal = (deck?: Deck) => {
    if (deck) {
      setEditingDeck(deck);
      setDeckFormData({
        name: deck.name,
        description: deck.description || '',
      });
    } else {
      setEditingDeck(null);
      setDeckFormData({ name: '', description: '' });
    }
    setDeckError(null);
    setIsDeckModalOpen(true);
  };

  const handleCloseDeckModal = () => {
    setIsDeckModalOpen(false);
    setEditingDeck(null);
    setDeckFormData({ name: '', description: '' });
    setDeckError(null);
  };

  const handleDeckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeckError(null);
    setIsSubmittingDeck(true);

    try {
      const data = {
        name: deckFormData.name.trim(),
        description: deckFormData.description.trim() || null,
      };

      let result;
      if (editingDeck) {
        result = await DeckService.update(editingDeck.id, data);
      } else {
        result = await DeckService.create(data);
      }

      if (result.success) {
        handleCloseDeckModal();
        loadDecks();
      } else {
        setDeckError(result.error || 'Erro ao salvar deck');
      }
    } catch (error) {
      setDeckError('Erro ao salvar deck');
    } finally {
      setIsSubmittingDeck(false);
    }
  };

  const handleDeleteDeck = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este deck? Todos os cards serão deletados também.')) {
      return;
    }

    try {
      const result = await DeckService.delete(id);
      if (result.success) {
        if (selectedDeck?.id === id) {
          setSelectedDeck(null);
          setDeckView('list');
        }
        loadDecks();
      } else {
        alert(result.error || 'Erro ao deletar deck');
      }
    } catch (error) {
      alert('Erro ao deletar deck');
    }
  };

  const handleOpenDeck = (deck: Deck) => {
    setSelectedDeck(deck);
    setDeckView('detail');
  };

  const handleBackToDecks = () => {
    setSelectedDeck(null);
    setDeckView('list');
    setCards([]);
  };

  // Card handlers
  const handleOpenCardModal = (card?: CardType) => {
    if (card) {
      setEditingCard(card);
    } else {
      setEditingCard(null);
    }
    setCardError(null);
    setIsCardModalOpen(true);
  };

  const handleCloseCardModal = () => {
    setIsCardModalOpen(false);
    setEditingCard(null);
    setCardError(null);
  };

  const handleCardSubmit = async (data: { front: string; back: string }) => {
    if (!selectedDeck) return;

    setCardError(null);
    setIsSubmittingCard(true);

    try {
      let result;
      if (editingCard) {
        result = await CardService.update(editingCard.id, data);
      } else {
        result = await CardService.create({
          deckId: selectedDeck.id,
          ...data,
        });
      }

      if (result.success) {
        handleCloseCardModal();
        loadCards();
      } else {
        setCardError(result.error || 'Erro ao salvar card');
      }
    } catch (error) {
      setCardError('Erro ao salvar card');
    } finally {
      setIsSubmittingCard(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm('Tem certeza que deseja deletar este card?')) {
      return;
    }

    try {
      const result = await CardService.delete(cardId);
      if (result.success) {
        loadCards();
      } else {
        alert(result.error || 'Erro ao deletar card');
      }
    } catch (error) {
      alert('Erro ao deletar card');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Deck Detail View
  if (deckView === 'detail' && selectedDeck) {
    return (
      <Layout>
        <div className="min-h-screen px-4 py-12">
          <div className="max-w-7xl mx-auto fade-in">
            {/* Header */}
            <div className="mb-6">
              <Button variant="ghost" onClick={handleBackToDecks} className="mb-4">
                ← Voltar para Decks
              </Button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                    {selectedDeck.name}
                  </h1>
                  {selectedDeck.description && (
                    <p className="text-[#64748b] dark:text-[#94a3b8] mt-2">
                      {selectedDeck.description}
                    </p>
                  )}
                </div>
                <Button onClick={() => handleOpenCardModal()} size="lg">
                  + Novo Card
                </Button>
              </div>
            </div>

            {/* Cards List */}
            <CardList
              cards={cards}
              onEdit={handleOpenCardModal}
              onDelete={handleDeleteCard}
              isLoading={isLoadingCards}
            />

            {/* Card Modal */}
            <CardModal
              isOpen={isCardModalOpen}
              onClose={handleCloseCardModal}
              onSubmit={handleCardSubmit}
              card={editingCard}
              isLoading={isSubmittingCard}
              error={cardError}
            />
          </div>
        </div>
      </Layout>
    );
  }

  // Main View
  return (
    <Layout>
      <div className="min-h-screen px-4 py-12">
        <div className="max-w-7xl mx-auto fade-in">
          {/* Header */}
          <div className="mb-8 space-y-3">
            <h1 className="text-4xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">
              Revisões
            </h1>
            <p className="text-lg text-[#64748b] dark:text-[#94a3b8]">
              Gerencie seus decks de estudo e revise suas reflexões
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-[#e2e8f0] dark:border-[#334155]">
            <button
              onClick={() => setActiveTab('decks')}
              className={`
                px-6 py-3 font-medium transition-colors border-b-2
                ${
                  activeTab === 'decks'
                    ? 'border-[#0369a1] text-[#0369a1] dark:border-[#7dd3fc] dark:text-[#7dd3fc]'
                    : 'border-transparent text-[#64748b] dark:text-[#94a3b8] hover:text-[#0369a1] dark:hover:text-[#7dd3fc]'
                }
              `}
            >
              Decks
            </button>
            <button
              onClick={() => setActiveTab('reflections')}
              className={`
                px-6 py-3 font-medium transition-colors border-b-2
                ${
                  activeTab === 'reflections'
                    ? 'border-[#0369a1] text-[#0369a1] dark:border-[#7dd3fc] dark:text-[#7dd3fc]'
                    : 'border-transparent text-[#64748b] dark:text-[#94a3b8] hover:text-[#0369a1] dark:hover:text-[#7dd3fc]'
                }
              `}
            >
              Reflexões
            </button>
          </div>

          {/* Decks Tab */}
          {activeTab === 'decks' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
                  Meus Decks
                </h2>
                <Button onClick={() => handleOpenDeckModal()} size="lg">
                  + Novo Deck
                </Button>
              </div>

              {isLoadingDecks ? (
                <div className="text-center py-12 text-[#64748b] dark:text-[#94a3b8]">
                  Carregando decks...
                </div>
              ) : decks.length === 0 ? (
                <Card className="text-center py-12">
                  <p className="text-[#64748b] dark:text-[#94a3b8] mb-4">
                    Você ainda não tem nenhum deck
                  </p>
                  <Button onClick={() => handleOpenDeckModal()}>Criar primeiro deck</Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {decks.map((deck) => (
                    <Card key={deck.id} className="hover:shadow-lg transition-shadow">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-2">
                            {deck.name}
                          </h3>
                          {deck.description && (
                            <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mb-4 line-clamp-3">
                              {deck.description}
                            </p>
                          )}
                          <div className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                            Criado em {new Date(deck.createdAt).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 pt-4 border-t border-white/20 dark:border-slate-700/30">
                          <Button
                            variant="primary"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleOpenDeck(deck)}
                          >
                            Abrir
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleOpenDeckModal(deck)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteDeck(deck.id)}
                          >
                            Deletar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Reflections Tab */}
          {activeTab === 'reflections' && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
                  Minhas Reflexões
                </h2>
              </div>

              {isLoadingReflections ? (
                <div className="text-center py-12 text-[#64748b] dark:text-[#94a3b8]">
                  Carregando revisões...
                </div>
              ) : reflections.length === 0 ? (
                <Card>
                  <div className="text-center py-12">
                    <p className="text-[#64748b] dark:text-[#94a3b8] text-lg">
                      Nenhuma revisão encontrada
                    </p>
                    <p className="text-[#94a3b8] dark:text-[#64748b] text-sm mt-2">
                      Complete pomodoros e crie reflexões para vê-las aqui
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {reflections.map((reflection) => (
                    <Card key={reflection.id} className="hover:shadow-lg transition-shadow">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-2">
                            {reflection.topic}
                          </h3>
                          <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                            {formatDate(reflection.createdAt)}
                          </p>
                        </div>

                        {reflection.summary && (
                          <p className="text-[#475569] dark:text-[#cbd5e1] line-clamp-3">
                            {reflection.summary}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0] dark:border-[#334155]">
                          <Link
                            href={`/reflection/${reflection.id}`}
                            className="text-sm text-[#0369a1] dark:text-[#7dd3fc] hover:text-[#0284c7] dark:hover:text-[#bae6fd] transition-colors font-medium"
                          >
                            Ver detalhes →
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Create/Edit Deck Modal */}
          <Modal
            isOpen={isDeckModalOpen}
            onClose={handleCloseDeckModal}
            title={editingDeck ? 'Editar Deck' : 'Criar Novo Deck'}
            footer={
              <>
                <Button variant="ghost" onClick={handleCloseDeckModal} disabled={isSubmittingDeck}>
                  Cancelar
                </Button>
                <Button onClick={handleDeckSubmit} disabled={isSubmittingDeck}>
                  {isSubmittingDeck ? 'Salvando...' : editingDeck ? 'Salvar' : 'Criar'}
                </Button>
              </>
            }
          >
            <form onSubmit={handleDeckSubmit} className="space-y-4">
              {deckError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {deckError}
                </div>
              )}

              <Input
                label="Nome do Deck"
                placeholder="Ex: Vocabulário Inglês"
                value={deckFormData.name}
                onChange={(e) => setDeckFormData({ ...deckFormData, name: e.target.value })}
                required
                maxLength={100}
                disabled={isSubmittingDeck}
              />

              <Textarea
                label="Descrição (opcional)"
                placeholder="Descreva o propósito deste deck..."
                value={deckFormData.description}
                onChange={(e) => setDeckFormData({ ...deckFormData, description: e.target.value })}
                rows={4}
                disabled={isSubmittingDeck}
              />
            </form>
          </Modal>
        </div>
      </div>
    </Layout>
  );
}
