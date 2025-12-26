'use client';

import { useState, useEffect } from 'react';
import HistoryList from '@/components/HistoryList';
import { HistoryService } from '@/services/historyService';

export default function HistoryPage() {
  const [todayStats, setTodayStats] = useState({
    sessionsToday: 0,
    focusedTimeToday: 0,
    reflectionsToday: 0,
  });
  const [lifetimeStats, setLifetimeStats] = useState({
    totalSessions: 0,
    totalTimeElapsed: 0,
    thisWeekSessions: 0,
    topicsStudied: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const [today, lifetime] = await Promise.all([
        HistoryService.getTodayStats(),
        HistoryService.getLifetimeStats(),
      ]);
      setTodayStats(today);
      setLifetimeStats(lifetime);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto fade-in">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">
              Histórico
            </h1>
            <p className="text-lg text-[#64748b] dark:text-[#94a3b8]">
              Revise suas reflexões e acompanhe seu progresso de aprendizado
            </p>
          </div>

          {/* Stats Today */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
              Hoje
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-[#0369a1] dark:text-[#7dd3fc]">
                  {isLoading ? '...' : todayStats.sessionsToday}
                </div>
                <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">
                  Sessões hoje
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-[#0369a1] dark:text-[#7dd3fc]">
                  {isLoading
                    ? '...'
                    : HistoryService.formatTime(todayStats.focusedTimeToday)}
                </div>
                <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">
                  Tempo focado hoje
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-[#0369a1] dark:text-[#7dd3fc]">
                  {isLoading ? '...' : todayStats.reflectionsToday}
                </div>
                <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">
                  Reflexões hoje
                </div>
              </div>
            </div>
          </div>

          {/* Stats Lifetime */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
              Geral
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-[#0369a1] dark:text-[#7dd3fc]">
                  {isLoading ? '...' : lifetimeStats.totalSessions}
                </div>
                <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">
                  Total de sessões
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-[#0369a1] dark:text-[#7dd3fc]">
                  {isLoading
                    ? '...'
                    : HistoryService.formatTime(lifetimeStats.totalTimeElapsed)}
                </div>
                <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">
                  Tempo total
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-[#0369a1] dark:text-[#7dd3fc]">
                  {isLoading ? '...' : lifetimeStats.thisWeekSessions}
                </div>
                <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">
                  Pomodoros esta semana
                </div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-2xl font-bold text-[#0369a1] dark:text-[#7dd3fc]">
                  {isLoading ? '...' : lifetimeStats.topicsStudied}
                </div>
                <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">
                  Tópicos estudados
                </div>
              </div>
            </div>
          </div>

          {/* History List */}
          <HistoryList />
        </div>
      </div>
    </div>
  );
}
