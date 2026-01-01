'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { Card as CardType } from '@/api/card';

interface CardReviewProps {
  card: CardType;
  onRate: (rating: 'WRONG' | 'GOOD' | 'EASY') => Promise<void>;
  onNext?: () => void;
  isLoading?: boolean;
}

type ReviewState = 'front' | 'back';

export default function CardReview({ card, onRate, onNext, isLoading }: CardReviewProps) {
  const [state, setState] = useState<ReviewState>('front');
  const [selectedRating, setSelectedRating] = useState<'WRONG' | 'GOOD' | 'EASY' | null>(null);

  const handleShowAnswer = () => {
    setState('back');
  };

  const handleRate = async (rating: 'WRONG' | 'GOOD' | 'EASY') => {
    setSelectedRating(rating);
    await onRate(rating);
    if (onNext) {
      setTimeout(() => {
        setState('front');
        setSelectedRating(null);
        onNext();
      }, 300);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="min-h-[400px] flex flex-col">
        {/* Card Content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full text-center">
            {state === 'front' ? (
              <div className="space-y-4">
                <div className="text-sm font-medium text-[#64748b] dark:text-[#94a3b8] mb-4">
                  Frente
                </div>
                <p className="text-2xl md:text-3xl font-medium text-[#0f172a] dark:text-[#f1f5f9] leading-relaxed whitespace-pre-wrap">
                  {card.front}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-sm font-medium text-[#64748b] dark:text-[#94a3b8] mb-4">
                  Verso
                </div>
                <p className="text-2xl md:text-3xl font-medium text-[#0f172a] dark:text-[#f1f5f9] leading-relaxed whitespace-pre-wrap">
                  {card.back}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-white/20 dark:border-slate-700/30 p-6">
          {state === 'front' ? (
            <Button
              onClick={handleShowAnswer}
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              Mostrar Resposta
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="text-sm text-center text-[#64748b] dark:text-[#94a3b8] mb-4">
                Como foi sua resposta?
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="danger"
                  onClick={() => handleRate('WRONG')}
                  disabled={isLoading || selectedRating !== null}
                  className="py-3"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">Errado</span>
                    <span className="text-xs opacity-75">3 min</span>
                  </div>
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => handleRate('GOOD')}
                  disabled={isLoading || selectedRating !== null}
                  className="py-3"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">Bom</span>
                    <span className="text-xs opacity-75">10 min</span>
                  </div>
                </Button>
                <Button
                  onClick={() => handleRate('EASY')}
                  disabled={isLoading || selectedRating !== null}
                  className="py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">Fácil</span>
                    <span className="text-xs opacity-75">1 dia</span>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

