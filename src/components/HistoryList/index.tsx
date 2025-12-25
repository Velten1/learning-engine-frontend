'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import SearchInput from '@/components/ui/SearchInput';
import { ReflectionService } from '@/services/reflectionService';
import type { Reflection } from '@/api/reflection';

export default function HistoryList() {
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [filteredReflections, setFilteredReflections] = useState<Reflection[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReflections();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredReflections(reflections);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = reflections.filter(
        (reflection) =>
          reflection.topic.toLowerCase().includes(query) ||
          reflection.summary.toLowerCase().includes(query)
      );
      setFilteredReflections(filtered);
    }
  }, [searchQuery, reflections]);

  const loadReflections = async () => {
    setIsLoading(true);
    try {
      const data = await ReflectionService.getAll();
      setReflections(data);
      setFilteredReflections(data);
    } catch (error) {
      console.error('Erro ao carregar reflexões:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="max-w-md">
        <SearchInput
          placeholder="Buscar por tópico, resumo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <p className="text-[#64748b] dark:text-[#94a3b8]">Carregando reflexões...</p>
        </div>
      )}

      {/* List */}
      {!isLoading && (
        <div className="space-y-4">
          {filteredReflections.map((reflection) => (
            <Card key={reflection.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                {/* Header */}
                <div>
                    <h3 className="text-lg font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-1">
                      {reflection.topic}
                    </h3>
                    <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                      {formatDate(reflection.createdAt)}
                    </p>
                </div>

                {/* Summary */}
                <p className="text-[#475569] dark:text-[#cbd5e1] leading-relaxed">
                  {reflection.summary}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/20 dark:border-slate-700/30">
                  <Link
                    href={`/reflection/${reflection.id}`}
                    className="text-sm text-[#0369a1] dark:text-[#7dd3fc] hover:text-[#0284c7] dark:hover:text-[#bae6fd] transition-colors"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredReflections.length === 0 && (
        <Card className="text-center py-12">
          <div className="space-y-3">
            <svg
              className="w-16 h-16 mx-auto text-[#94a3b8] dark:text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-[#64748b] dark:text-[#94a3b8]">Nenhuma reflexão encontrada</p>
            <p className="text-sm text-[#94a3b8] dark:text-slate-500">
              Comece uma sessão de estudo para criar sua primeira reflexão
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
