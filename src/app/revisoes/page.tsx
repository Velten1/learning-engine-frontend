'use client';

import { useState, useEffect } from 'react';
import { ReflectionService } from '@/services/reflectionService';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { Reflection } from '@/api/reflection';
import Link from 'next/link';

export default function RevisoesPage() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReflections();
  }, []);

  const loadReflections = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await ReflectionService.getAll();
      if (result.success && result.data) {
        setReflections(result.data);
      } else {
        setError(result.error || 'Erro ao carregar revisões');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar revisões');
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-12">
        <div className="max-w-7xl mx-auto fade-in">
          <div className="text-center">
            <p className="text-[#64748b] dark:text-[#94a3b8]">Carregando revisões...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen px-4 py-12">
        <div className="max-w-7xl mx-auto fade-in">
          <div className="text-center text-red-500">
            <p>{error}</p>
            <Button onClick={loadReflections} className="mt-4">
              Tentar novamente
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-7xl mx-auto fade-in">
        {/* Header */}
        <div className="mb-8 space-y-3">
          <h1 className="text-4xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">
            Revisões
          </h1>
          <p className="text-lg text-[#64748b] dark:text-[#94a3b8]">
            Revise suas reflexões e aprendizados anteriores
          </p>
        </div>

        {/* Reflections List */}
        {reflections.length === 0 ? (
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
      </div>
    </div>
  );
}

