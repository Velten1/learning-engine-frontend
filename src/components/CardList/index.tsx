'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { Card as CardType } from '@/api/card';

interface CardListProps {
  cards: CardType[];
  onEdit: (card: CardType) => void;
  onDelete: (cardId: string) => void;
  isLoading?: boolean;
}

export default function CardList({ cards, onEdit, onDelete, isLoading }: CardListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-[#64748b] dark:text-[#94a3b8]">
        Carregando cards...
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-[#64748b] dark:text-[#94a3b8] mb-4">
          Este deck ainda não tem cards
        </p>
        <p className="text-sm text-[#94a3b8] dark:text-[#64748b]">
          Clique em "Novo Card" para adicionar o primeiro
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card key={card.id} className="hover:shadow-lg transition-shadow">
          <div className="flex flex-col h-full">
            <div className="flex-1 mb-4">
              <div className="mb-3">
                <div className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8] mb-1">
                  Frente
                </div>
                <p className="text-sm text-[#0f172a] dark:text-[#f1f5f9] line-clamp-2">
                  {card.front}
                </p>
              </div>
              <div>
                <div className="text-xs font-medium text-[#64748b] dark:text-[#94a3b8] mb-1">
                  Verso
                </div>
                <p className="text-sm text-[#475569] dark:text-[#cbd5e1] line-clamp-2 blur-md select-none pointer-events-none">
                  {card.back}
                </p>
              </div>
            </div>
            <div className="flex gap-2 pt-4 border-t border-white/20 dark:border-slate-700/30">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => onEdit(card)}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(card.id)}
              >
                Deletar
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}


