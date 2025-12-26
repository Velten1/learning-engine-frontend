'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { ReflectionService } from '@/services/reflectionService';
import { PomodoroService } from '@/services/pomodoroService';
import { QuestionService } from '@/services/questionService';

interface ReflectionFormProps {
  pomodoroId?: string;
  reflectionId?: string;
  initialData?: {
    topic?: string;
    whatIThought?: string;
    whatItActuallyIs?: string;
    summary?: string;
    mandatoryQuestion?: string;
    optionalQuestion?: string | null;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  showCard?: boolean;
  showHeader?: boolean;
}

export default function ReflectionForm({
  pomodoroId: propPomodoroId,
  reflectionId,
  initialData,
  onSuccess,
  onCancel,
  showCancelButton = true,
  showCard = true,
  showHeader = true,
}: ReflectionFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    topic: initialData?.topic || '',
    whatIThought: initialData?.whatIThought || '',
    whatItActuallyIs: initialData?.whatItActuallyIs || '',
    summary: initialData?.summary || '',
    mandatoryQuestion: initialData?.mandatoryQuestion || '',
    optionalQuestion: initialData?.optionalQuestion || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pomodoroId, setPomodoroId] = useState<string | null>(
    propPomodoroId || null
  );
  const [randomQuestion, setRandomQuestion] = useState<string>('');
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);

  // Buscar pergunta aleatória quando componente monta e pomodoroId está disponível
  useEffect(() => {
    const fetchRandomQuestion = async () => {
      // Só busca se pomodoroId estiver disponível e não houver initialData.optionalQuestion
      if (pomodoroId && !initialData?.optionalQuestion) {
        setIsLoadingQuestion(true);
        try {
          const question = await QuestionService.getRandom();
          if (question) {
            setRandomQuestion(question.text);
          }
        } catch (error) {
          console.error('Erro ao buscar pergunta aleatória:', error);
        } finally {
          setIsLoadingQuestion(false);
        }
      }
    };

    fetchRandomQuestion();
  }, [pomodoroId, initialData?.optionalQuestion]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Se não tiver pomodoroId, tentar buscar o último completado
      let sessionId = pomodoroId;
      
      if (!sessionId) {
        // Buscar pomodoro atual (pode estar completado)
        const currentPomodoro = await PomodoroService.getCurrent();
        if (currentPomodoro && currentPomodoro.status === 'COMPLETED') {
          sessionId = currentPomodoro.id;
        } else {
          setError(
            'Nenhuma sessão de Pomodoro completada encontrada. Complete uma sessão primeiro.'
          );
          setIsLoading(false);
          return;
        }
      }

      if (!sessionId) {
        setError(
          'É necessário ter uma sessão de Pomodoro completada para criar uma reflexão.'
        );
        setIsLoading(false);
        return;
      }

      let result;
      
      // Se tiver reflectionId, atualizar; caso contrário, criar
      if (reflectionId) {
        result = await ReflectionService.update(reflectionId, {
          topic: formData.topic,
          whatIThought: formData.whatIThought,
          whatItActuallyIs: formData.whatItActuallyIs,
          summary: formData.summary,
          mandatoryQuestion: formData.mandatoryQuestion,
          optionalQuestion: formData.optionalQuestion || null,
        });
      } else {
        result = await ReflectionService.create({
          pomodoroId: sessionId,
        topic: formData.topic,
        whatIThought: formData.whatIThought,
        whatItActuallyIs: formData.whatItActuallyIs,
        summary: formData.summary,
        mandatoryQuestion: formData.mandatoryQuestion,
          optionalQuestion: formData.optionalQuestion || null,
      });
      }

      if (result.success) {
        // Se tiver callback onSuccess, chamar (usado em modal)
        if (onSuccess) {
          onSuccess();
        } else {
          // Caso contrário, redirecionar (comportamento padrão)
                router.push('/history');
        }
      } else {
        setError(result.error || 'Erro ao salvar reflexão');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar reflexão');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const formContent = (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
      {showHeader && (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">
            Reflexão sobre o aprendizado
          </h2>
          <p className="text-[#64748b] dark:text-[#94a3b8]">
            Registre seus pensamentos e insights sobre o que você estudou
          </p>
        </div>
      )}

        {/* Topic */}
        <Input
          type="text"
          name="topic"
          label="Tópico estudado"
          placeholder="Ex: React Hooks, Algoritmos de ordenação..."
          value={formData.topic}
          onChange={handleChange}
          required
        />

        {/* What I Thought */}
        <Textarea
          name="whatIThought"
          label="O que eu pensava que era"
          placeholder="Descreva sua compreensão inicial ou expectativa sobre o tópico..."
          value={formData.whatIThought}
          onChange={handleChange}
          rows={4}
          required
        />

        {/* What It Actually Is */}
        <Textarea
          name="whatItActuallyIs"
          label="O que realmente é"
          placeholder="Descreva o que você descobriu que realmente é..."
          value={formData.whatItActuallyIs}
          onChange={handleChange}
          rows={4}
          required
        />

        {/* Summary */}
        <Textarea
          name="summary"
          label="Resumo"
          placeholder="Faça um resumo conciso do que você aprendeu..."
          value={formData.summary}
          onChange={handleChange}
          rows={3}
          required
        />

        {/* Mandatory Question */}
        <Input
          type="text"
          name="mandatoryQuestion"
          label="Explique como se estivesse explicando para um iniciante"
          placeholder="Explique da forma que preferir, mas que um iniciante possa entender"
          value={formData.mandatoryQuestion}
          onChange={handleChange}
          required
        />

        {/* Optional Question */}
        <Input
          type="text"
          name="optionalQuestion"
          label={
            isLoadingQuestion
              ? 'Carregando pergunta...'
              : randomQuestion || 'Pergunta opcional'
          }
          placeholder={
            isLoadingQuestion
              ? 'Carregando pergunta...'
              : randomQuestion || 'Responda a pergunta acima'
          }
          value={formData.optionalQuestion}
          onChange={handleChange}
        />

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
        {showCancelButton && (
          <Button
            type="button"
            variant="secondary"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        )}
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? 'Salvando...' : 'Salvar reflexão'}
          </Button>
        </div>
      </form>
  );

  if (showCard) {
    return <Card>{formContent}</Card>;
  }

  return formContent;
}
