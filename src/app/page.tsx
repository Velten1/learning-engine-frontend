'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PomodoroTimer from '@/components/PomodoroTimer';
import { HistoryService } from '@/services/historyService';
import type { TodayStats } from '@/api/history';

export default function Home() {
  const [todayStats, setTodayStats] = useState<TodayStats>({
    sessionsToday: 0,
    focusedTimeToday: 0,
    reflectionsToday: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTodayStats = async () => {
      try {
        setIsLoading(true);
        const stats = await HistoryService.getTodayStats();
        setTodayStats(stats);
      } catch (error) {
        console.error('Erro ao carregar estatísticas de hoje:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodayStats();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl fade-in">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">
              Learning Engine
            </h1>
            <p className="text-lg text-[#64748b] dark:text-[#94a3b8] max-w-md mx-auto">
              Foque profundamente. Aprenda continuamente. Evolua constantemente.
            </p>
          </div>

          {/* Pomodoro Timer */}
          <PomodoroTimer />

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[#0369a1] dark:text-[#7dd3fc]">
                {isLoading ? '...' : todayStats.sessionsToday}
              </div>
              <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">Sessões hoje</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[#0369a1] dark:text-[#7dd3fc]">
                {isLoading ? '...' : HistoryService.formatTime(todayStats.focusedTimeToday)}
              </div>
              <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">Tempo focado hoje</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-[#0369a1] dark:text-[#7dd3fc]">
                {isLoading ? '...' : todayStats.reflectionsToday}
              </div>
              <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">Reflexões hoje</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}
