'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import type { Card } from '@/api/card';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { front: string; back: string }) => Promise<void>;
  card?: Card | null;
  isLoading?: boolean;
  error?: string | null;
}

export default function CardModal({
  isOpen,
  onClose,
  onSubmit,
  card,
  isLoading = false,
  error,
}: CardModalProps) {
  const [formData, setFormData] = useState({
    front: card?.front || '',
    back: card?.back || '',
  });

  // Reset form when card changes
  useEffect(() => {
    if (card) {
      setFormData({
        front: card.front,
        back: card.back,
      });
    } else {
      setFormData({
        front: '',
        back: '',
      });
    }
  }, [card]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={card ? 'Editar Card' : 'Criar Novo Card'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Salvando...' : card ? 'Salvar' : 'Criar'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#475569] dark:text-[#cbd5e1] mb-2">
            Frente (Pergunta)
          </label>
          <Textarea
            placeholder="Digite a pergunta ou frente do card..."
            value={formData.front}
            onChange={(e) => setFormData({ ...formData, front: e.target.value })}
            required
            rows={4}
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#475569] dark:text-[#cbd5e1] mb-2">
            Verso (Resposta)
          </label>
          <Textarea
            placeholder="Digite a resposta ou verso do card..."
            value={formData.back}
            onChange={(e) => setFormData({ ...formData, back: e.target.value })}
            required
            rows={4}
            disabled={isLoading}
          />
        </div>
      </form>
    </Modal>
  );
}

