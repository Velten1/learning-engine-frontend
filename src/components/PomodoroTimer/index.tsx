'use client';

import { useState, useEffect, useCallback } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Textarea from '@/components/ui/Textarea';
import { PomodoroService } from '@/services/pomodoroService';
import type { CurrentPomodoroResponse } from '@/api/pomodoro';
import { isAuthenticated } from '@/api/config';
import ReflectionModal from '@/components/ReflectionModal';

export default function PomodoroTimer() {
  const [currentPomodoro, setCurrentPomodoro] =
    useState<CurrentPomodoroResponse | null>(null);
  const [time, setTime] = useState(5); // 5 segundos para testes
  const [showAbandonModal, setShowAbandonModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [completedPomodoroId, setCompletedPomodoroId] = useState<string | null>(null);
  const [abandonReason, setAbandonReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRunning = currentPomodoro?.status === 'ACTIVE';

  // Buscar pomodoro atual ao carregar
  useEffect(() => {
    loadCurrentPomodoro();
  }, []);

  // Atualizar timer a cada segundo
  useEffect(() => {
    if (!isRunning || !currentPomodoro?.expiresAt) return;

    let checkCount = 0;

    const interval = setInterval(() => {
      // Verificar autenticação a cada 5 segundos
      checkCount++;
      if (checkCount >= 5) {
        checkCount = 0;
        if (!isAuthenticated()) {
          // Sem token, parar timer e resetar estados
          clearInterval(interval);
          setCurrentPomodoro(null);
          setTime(5);
          return;
        }
      }

      const now = new Date();
      const expiresAt = new Date(currentPomodoro.expiresAt);
      const remainingSeconds = Math.max(
        0,
        Math.floor((expiresAt.getTime() - now.getTime()) / 1000)
      );

      setTime(remainingSeconds);

      // Se o tempo acabou, parar o timer e não recarregar automaticamente
      // O usuário deve clicar no botão "Completar" manualmente
      if (remainingSeconds === 0) {
        clearInterval(interval);
        // Não chamar loadCurrentPomodoro() aqui para evitar que o timer continue
        // O botão "Completar" já está visível quando time === 0
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, currentPomodoro?.expiresAt]);

  const loadCurrentPomodoro = async () => {
    try {
      const pomodoro = await PomodoroService.getCurrent();
      setCurrentPomodoro(pomodoro);

      if (pomodoro && pomodoro.status === 'ACTIVE' && pomodoro.expiresAt) {
        const now = new Date();
        const expiresAt = new Date(pomodoro.expiresAt);
        const remainingSeconds = Math.max(
          0,
          Math.floor((expiresAt.getTime() - now.getTime()) / 1000)
        );
        setTime(remainingSeconds);
      } else {
        setTime(5);
      }
    } catch (err) {
      console.error('Erro ao carregar pomodoro:', err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = async () => {
    setIsLoading(true);
    setError(null);

    const result = await PomodoroService.start();

    if (result.success && result.data) {
      const expiresAt = new Date(result.data.expiresAt);
      const now = new Date();
      const remainingSeconds = Math.floor(
        (expiresAt.getTime() - now.getTime()) / 1000
      );
      setTime(remainingSeconds);
      await loadCurrentPomodoro();
    } else {
      setError(result.error || 'Erro ao iniciar pomodoro');
    }

    setIsLoading(false);
  };

  const handleAbandon = () => {
    setShowAbandonModal(true);
  };

  const handleConfirmAbandon = async () => {
    if (!abandonReason.trim()) {
      setError('Por favor, informe o motivo da desistência');
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await PomodoroService.abandon(abandonReason);

    if (result.success) {
      setTime(20 * 60);
      setShowAbandonModal(false);
      setAbandonReason('');
      setCurrentPomodoro(null);
      await loadCurrentPomodoro();
    } else {
      setError(result.error || 'Erro ao abandonar pomodoro');
    }

    setIsLoading(false);
  };

  const handleCancelAbandon = () => {
    setShowAbandonModal(false);
    setAbandonReason('');
  };

  const handleReset = () => {
    setShowResetModal(true);
  };

  const handleConfirmReset = async () => {
    setIsLoading(true);
    setError(null);

    const result = await PomodoroService.reset();

    if (result.success && result.data) {
      const expiresAt = new Date(result.data.expiresAt);
      const now = new Date();
      const remainingSeconds = Math.floor(
        (expiresAt.getTime() - now.getTime()) / 1000
      );
      setTime(remainingSeconds);
      setShowResetModal(false);
      await loadCurrentPomodoro();
    } else {
      setError(result.error || 'Erro ao resetar pomodoro');
    }

    setIsLoading(false);
  };

  const handleCancelReset = () => {
    setShowResetModal(false);
  };

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);

    const result = await PomodoroService.complete();

    if (result.success && result.data) {
      // Salvar o ID do pomodoro completado
      const pomodoroId = result.data.id;
      setCompletedPomodoroId(pomodoroId);
      setTime(20 * 60);
      setCurrentPomodoro(null);
      await loadCurrentPomodoro();
      // Abrir modal de reflection
      setShowReflectionModal(true);
    } else {
      setError(result.error || 'Erro ao completar pomodoro');
    }

    setIsLoading(false);
  };

  const handleReflectionModalClose = () => {
    setShowReflectionModal(false);
    setCompletedPomodoroId(null);
  };

  const handleReflectionSuccess = () => {
    setShowReflectionModal(false);
    setCompletedPomodoroId(null);
    // Opcional: mostrar mensagem de sucesso ou atualizar estado
  };

  return (
    <>
      <Card className="text-center space-y-8">
        {/* Timer Display */}
        <div className="space-y-4">
          <div className="text-7xl md:text-8xl font-light text-[#0369a1] dark:text-[#7dd3fc] tracking-tight">
            {formatTime(time)}
          </div>
          <p className="text-[#64748b] dark:text-[#94a3b8] text-lg">
            {isRunning ? 'Foco profundo' : 'Pronto para começar'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          {!isRunning ? (
            <Button
              size="lg"
              onClick={handleStart}
              disabled={isLoading}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {isLoading ? 'Iniciando...' : 'Iniciar'}
              </span>
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="danger" size="lg" onClick={handleAbandon} disabled={isLoading}>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Desistir
                </span>
              </Button>
              <Button variant="secondary" size="lg" onClick={handleReset} disabled={isLoading}>
                <span className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Resetar
                </span>
              </Button>
              {time === 0 && (
                <Button size="lg" onClick={handleComplete} disabled={isLoading}>
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Completar
                  </span>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        {isRunning && (
          <div className="w-full max-w-xs mx-auto">
            <div className="h-1 bg-[#e2e8f0] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0369a1] to-[#0284c7] rounded-full transition-all duration-1000"
                style={{ width: `${((5 - time) / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
      </Card>

      {/* Abandon Modal */}
      <Modal
        isOpen={showAbandonModal}
        onClose={handleCancelAbandon}
        title="Desistir da sessão?"
        footer={
          <>
            <Button variant="secondary" onClick={handleCancelAbandon}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmAbandon}>
              Confirmar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-[#64748b]">
            Você está prestes a desistir desta sessão de foco. Deseja continuar?
          </p>
          <Textarea
            label="Motivo (obrigatório)"
            placeholder="Por que você está desistindo?"
            value={abandonReason}
            onChange={(e) => setAbandonReason(e.target.value)}
            rows={3}
            required
          />
        </div>
      </Modal>

      {/* Reset Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={handleCancelReset}
        title="Resetar cronômetro?"
        footer={
          <>
            <Button variant="secondary" onClick={handleCancelReset}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirmReset} disabled={isLoading}>
              {isLoading ? 'Resetando...' : 'Confirmar'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-[#64748b]">
            Você tem certeza que deseja resetar o cronômetro? O tempo será reiniciado para 5 segundos.
          </p>
        </div>
      </Modal>

      {/* Reflection Modal */}
      {completedPomodoroId && (
        <ReflectionModal
          isOpen={showReflectionModal}
          onClose={handleReflectionModalClose}
          pomodoroId={completedPomodoroId}
          onSuccess={handleReflectionSuccess}
        />
      )}
    </>
  );
}
