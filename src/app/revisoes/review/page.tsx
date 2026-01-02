'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import CardReview from '@/components/CardReview';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ReviewService } from '@/services/reviewService';
import { CardService } from '@/services/cardService';
import type { Card as CardType } from '@/api/card';
import { ReviewRating } from '@/api/review';

export default function ReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = searchParams?.get('deckId') || null;
  
  const [cards, setCards] = useState<CardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [sessionStartTime] = useState<Date>(new Date());

  useEffect(() => {
    loadCards();
  }, [deckId]);

  const loadCards = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let result;
      if (deckId) {
        // Load cards for specific deck
        const cardsResult = await CardService.getCardsDueForReview();
        if (cardsResult.success && cardsResult.data) {
          // Filter cards by deckId
          const deckCards = cardsResult.data.filter(card => card.deckId === deckId);
          setCards(deckCards);
          if (deckCards.length === 0) {
            setError('Nenhum card disponível para revisão neste deck no momento.');
          }
        } else {
          setError(cardsResult.error || 'Erro ao carregar cards para revisão');
        }
      } else {
        // Load all cards
        result = await ReviewService.getCardsDueForReview();
        if (result.success && result.data) {
          setCards(result.data);
          if (result.data.length === 0) {
            setError('Nenhum card disponível para revisão no momento.');
          }
        } else {
          setError(result.error || 'Erro ao carregar cards para revisão');
        }
      }
    } catch (err) {
      setError('Erro ao carregar cards para revisão');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRate = async (rating: ReviewRating) => {
    if (!cards[currentCardIndex]) return;

    setIsSubmitting(true);
    try {
      const result = await ReviewService.reviewCard(cards[currentCardIndex].id, rating);
      if (result.success) {
        setReviewedCount(prev => prev + 1);
        // Remove o card da lista após revisar
        setCards(prev => prev.filter((_, index) => index !== currentCardIndex));
        // Não incrementa o índice, pois o próximo card já está na posição atual
      } else {
        setError(result.error || 'Erro ao revisar card');
      }
    } catch (err) {
      setError('Erro ao revisar card');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    // Se não há mais cards, mostra tela de conclusão
    if (cards.length === 0) {
      return;
    }
    // O card já foi removido da lista, então não precisa incrementar o índice
  };

  const handleFinish = () => {
    router.push('/revisoes');
  };

  const getSessionDuration = () => {
    const now = new Date();
    const diff = now.getTime() - sessionStartTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-2">
              Carregando cards...
            </div>
            <p className="text-[#64748b] dark:text-[#94a3b8]">
              Preparando sua sessão de revisão
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error && cards.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4">
          <Card className="max-w-md w-full text-center p-8">
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-2">
              Nenhum card para revisar
            </h2>
            <p className="text-[#64748b] dark:text-[#94a3b8] mb-6">
              {error}
            </p>
            <Button onClick={() => router.push('/revisoes')}>
              Voltar para Revisões
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  // Completion state
  if (cards.length === 0 && reviewedCount > 0) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center px-4">
          <Card className="max-w-md w-full text-center p-8">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mb-4">
              Revisão Concluída!
            </h2>
            <div className="space-y-3 mb-6">
              <div className="text-lg text-[#64748b] dark:text-[#94a3b8]">
                <span className="font-semibold text-[#0369a1] dark:text-[#7dd3fc]">
                  {reviewedCount}
                </span>{' '}
                {reviewedCount === 1 ? 'card revisado' : 'cards revisados'}
              </div>
              <div className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                Tempo de sessão: {getSessionDuration()}
              </div>
            </div>
            <Button onClick={handleFinish} size="lg" className="w-full">
              Voltar para Revisões
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  // Review state
  const currentCard = cards[currentCardIndex];
  if (!currentCard) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto fade-in">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mb-2">
                Revisão
              </h1>
              <p className="text-[#64748b] dark:text-[#94a3b8]">
                {cards.length} {cards.length === 1 ? 'card restante' : 'cards restantes'}
              </p>
            </div>
            <Button variant="ghost" onClick={() => router.push('/revisoes')}>
              Sair
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Card Review Component */}
          <CardReview
            card={currentCard}
            onRate={handleRate}
            onNext={handleNext}
            isLoading={isSubmitting}
            cardNumber={reviewedCount + 1}
            totalCards={reviewedCount + cards.length}
          />
        </div>
      </div>
    </Layout>
  );
}

