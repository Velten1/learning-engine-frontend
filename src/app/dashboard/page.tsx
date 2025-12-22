import HistoryList from '@/components/HistoryList';

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto fade-in">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-[#0f172a]">Histórico</h1>
            <p className="text-lg text-[#64748b]">
              Revise suas reflexões e acompanhe seu progresso de aprendizado
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-[#0369a1]">12</div>
              <div className="text-sm text-[#64748b] mt-1">Total de sessões</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-[#0369a1]">5h</div>
              <div className="text-sm text-[#64748b] mt-1">Tempo total</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-[#0369a1]">8</div>
              <div className="text-sm text-[#64748b] mt-1">Esta semana</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-[#0369a1]">3</div>
              <div className="text-sm text-[#64748b] mt-1">Tópicos únicos</div>
            </div>
          </div>

          {/* History List */}
          <HistoryList />
        </div>
      </div>
    </div>
  );
}
