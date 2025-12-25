'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ReflectionService } from '@/services/reflectionService';
import type { Reflection } from '@/api/reflection';
import ReflectionForm from '@/components/ReflectionForm';

export default function ReflectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reflectionId = params.id as string;
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReflection();
  }, [reflectionId]);

  const loadReflection = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await ReflectionService.getById(reflectionId);
      if (result.success && result.data) {
        setReflection(result.data);
      } else {
        setError(result.error || 'Reflexão não encontrada');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar reflexão');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!reflection) return;
    if (!confirm('Tem certeza que deseja deletar esta reflexão?')) return;

    const result = await ReflectionService.delete(reflection.id);
    if (result.success) {
      router.push('/history');
    } else {
      setError(result.error || 'Erro ao deletar reflexão');
    }
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    loadReflection();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="text-center py-12">
            <p className="text-[#64748b] dark:text-[#94a3b8]">Carregando...</p>
          </Card>
        </div>
      </div>
    );
  }

  if (error && !reflection) {
    return (
      <div className="min-h-screen px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button
              variant="secondary"
              onClick={() => router.push('/history')}
              className="mt-4"
            >
              Voltar
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!reflection) {
    return null;
  }

  if (isEditing) {
    return (
      <div className="min-h-screen px-4 py-12">
        <div className="max-w-3xl mx-auto fade-in">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                Editar Reflexão
              </h1>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </div>
            <ReflectionForm
              reflectionId={reflection.id}
              pomodoroId={reflection.pomodoroId}
              initialData={{
                topic: reflection.topic,
                whatIThought: reflection.whatIThought,
                whatItActuallyIs: reflection.whatItActuallyIs,
                summary: reflection.summary,
                mandatoryQuestion: reflection.mandatoryQuestion,
                optionalQuestion: reflection.optionalQuestion,
              }}
              onSuccess={handleEditSuccess}
              onCancel={() => setIsEditing(false)}
              showCancelButton={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-3xl mx-auto fade-in">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                Reflexão
              </h1>
              <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-2">
                Criada em {formatDate(reflection.createdAt)}
                {reflection.updatedAt !== reflection.createdAt &&
                  ` • Atualizada em ${formatDate(reflection.updatedAt)}`}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Deletar
              </Button>
            </div>
          </div>

          {/* Reflection Content */}
          <Card className="space-y-6">
            {/* Topic */}
            <div>
              <h2 className="text-sm font-semibold text-[#64748b] dark:text-[#94a3b8] mb-2">
                Tópico estudado
              </h2>
              <p className="text-lg font-medium text-[#0f172a] dark:text-[#f1f5f9]">
                {reflection.topic}
              </p>
            </div>

            {/* What I Thought */}
            <div>
              <h2 className="text-sm font-semibold text-[#64748b] dark:text-[#94a3b8] mb-2">
                O que eu pensava que era
              </h2>
              <p className="text-[#475569] dark:text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">
                {reflection.whatIThought}
              </p>
            </div>

            {/* What It Actually Is */}
            <div>
              <h2 className="text-sm font-semibold text-[#64748b] dark:text-[#94a3b8] mb-2">
                O que realmente é
              </h2>
              <p className="text-[#475569] dark:text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">
                {reflection.whatItActuallyIs}
              </p>
            </div>

            {/* Summary */}
            <div>
              <h2 className="text-sm font-semibold text-[#64748b] dark:text-[#94a3b8] mb-2">
                Resumo
              </h2>
              <p className="text-[#475569] dark:text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">
                {reflection.summary}
              </p>
            </div>

            {/* Mandatory Question */}
            <div>
              <h2 className="text-sm font-semibold text-[#64748b] dark:text-[#94a3b8] mb-2">
                Explique como se estivesse explicando para um iniciante
              </h2>
              <p className="text-[#475569] dark:text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">
                {reflection.mandatoryQuestion}
              </p>
            </div>

            {/* Optional Question */}
            {reflection.optionalQuestion && (
              <div>
                <h2 className="text-sm font-semibold text-[#64748b] dark:text-[#94a3b8] mb-2">
                  Questão adicional
                </h2>
                <p className="text-[#475569] dark:text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">
                  {reflection.optionalQuestion}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </Card>

          {/* Back Button */}
          <div className="flex justify-start">
            <Button variant="secondary" onClick={() => router.push('/history')}>
              Voltar para histórico
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

