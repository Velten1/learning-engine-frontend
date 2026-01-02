'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { Card as CardType } from '@/api/card';
import { ReviewRating } from '@/api/review';

interface CardReviewProps {
  card: CardType;
  onRate: (rating: ReviewRating) => Promise<void>;
  onNext?: () => void;
  isLoading?: boolean;
  cardNumber?: number;
  totalCards?: number;
}

type ReviewState = 'front' | 'back';

export default function CardReview({ 
  card, 
  onRate, 
  onNext, 
  isLoading,
  cardNumber,
  totalCards 
}: CardReviewProps) {
  const [state, setState] = useState<ReviewState>('front');
  const [selectedRating, setSelectedRating] = useState<ReviewRating | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleShowAnswer = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setState('back');
      setIsFlipping(false);
    }, 150);
  };

  const handleRate = async (rating: ReviewRating) => {
    setSelectedRating(rating);
    await onRate(rating);
    if (onNext) {
      setTimeout(() => {
        setState('front');
        setSelectedRating(null);
        setIsFlipping(false);
        onNext();
      }, 300);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      {totalCards !== undefined && cardNumber !== undefined && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-[#64748b] dark:text-[#94a3b8] mb-2">
            <span>Card {cardNumber} de {totalCards}</span>
            <span>{Math.round((cardNumber / totalCards) * 100)}%</span>
          </div>
          <div className="w-full bg-[#e2e8f0] dark:bg-[#334155] rounded-full h-2">
            <div
              className="bg-[#0369a1] dark:bg-[#7dd3fc] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(cardNumber / totalCards) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Card */}
      <Card 
        className={`
          min-h-[500px] flex flex-col transition-all duration-300
          ${isFlipping ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
        `}
      >
        {/* Deck Name */}
        {card.deck && (
          <div className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8] mb-4 px-6 pt-6">
            {card.deck.name}
          </div>
        )}

        {/* Card Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full text-center">
            {state === 'front' ? (
              <div className="space-y-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8] mb-6">
                  Pergunta
                </div>
                <p className="text-3xl md:text-4xl font-medium text-[#0f172a] dark:text-[#f1f5f9] leading-relaxed whitespace-pre-wrap break-words">
                  {card.front}
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8] mb-6">
                  Resposta
                </div>
                <p className="text-3xl md:text-4xl font-medium text-[#0f172a] dark:text-[#f1f5f9] leading-relaxed whitespace-pre-wrap break-words">
                  {card.back}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-white/20 dark:border-slate-700/30 p-6 bg-[#f8fafc] dark:bg-[#0f172a]">
          {state === 'front' ? (
            <Button
              onClick={handleShowAnswer}
              className="w-full py-4 text-lg font-semibold"
              size="lg"
              disabled={isLoading}
            >
              Mostrar Resposta
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="text-sm font-medium text-center text-[#64748b] dark:text-[#94a3b8] mb-2">
                Como foi sua resposta?
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="danger"
                  onClick={() => handleRate('WRONG')}
                  disabled={isLoading || selectedRating !== null}
                  className="py-4 h-auto flex flex-col items-center justify-center gap-1"
                >
                  <span className="font-bold text-base">Errado</span>
                  <span className="text-xs opacity-75 font-normal">3 min</span>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleRate('GOOD')}
                  disabled={isLoading || selectedRating !== null}
                  className="py-4 h-auto flex flex-col items-center justify-center gap-1"
                >
                  <span className="font-bold text-base">Bom</span>
                  <span className="text-xs opacity-75 font-normal">10 min</span>
                </Button>
                <Button
                  onClick={() => handleRate('EASY')}
                  disabled={isLoading || selectedRating !== null}
                  className="py-4 h-auto flex flex-col items-center justify-center gap-1 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                >
                  <span className="font-bold text-base">Fácil</span>
                  <span className="text-xs opacity-75 font-normal">1 dia</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
