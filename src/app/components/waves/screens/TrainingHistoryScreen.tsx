import React, { useState } from 'react';
import { ArrowLeft, Filter, TrendingUp } from 'lucide-react';

interface TrainingSession {
  id: string;
  date: string;
  type: string;
  duration: number;
  timeInZone: number;
  points?: number;
}

interface TrainingHistoryScreenProps {
  onBack: () => void;
}

export function TrainingHistoryScreen({ onBack }: TrainingHistoryScreenProps) {
  const [filter, setFilter] = useState<'all' | 'tbr' | 'alpha' | 'smr' | 'breathing'>('all');
  const [period, setPeriod] = useState<'all' | 'week' | 'month'>('all');

  // Mock данные
  const sessions: TrainingSession[] = [
    { id: '1', date: '05.01.2026', type: 'TBR', duration: 16, timeInZone: 68, points: 850 },
    { id: '2', date: '04.01.2026', type: 'Alpha', duration: 16, timeInZone: 72, points: 920 },
    { id: '3', date: '03.01.2026', type: 'SMR', duration: 16, timeInZone: 65, points: 780 },
    { id: '4', date: '02.01.2026', type: 'TBR', duration: 16, timeInZone: 70, points: 880 },
    { id: '5', date: '01.01.2026', type: 'Дыхание', duration: 10, timeInZone: 0 },
  ];

  const filteredSessions = sessions.filter((session) => {
    if (filter !== 'all' && session.type.toLowerCase() !== filter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">История тренировок</h1>
      </div>

      <div className="flex-1 px-6 py-6">
        {/* Фильтры */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <option value="all">Все типы</option>
              <option value="tbr">TBR</option>
              <option value="alpha">Alpha</option>
              <option value="smr">SMR</option>
              <option value="breathing">Дыхание</option>
            </select>
          </div>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as any)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <option value="all">За всё время</option>
            <option value="week">За неделю</option>
            <option value="month">За месяц</option>
          </select>
        </div>

        {/* Список тренировок */}
        <div className="space-y-3">
          {filteredSessions.map((session) => (
            <div key={session.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{session.date}</p>
                  <p className="text-sm text-gray-600">{session.type}</p>
                </div>
                {session.points && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Очки</p>
                    <p className="font-semibold text-gray-900">{session.points}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span>{session.duration} мин</span>
                {session.timeInZone > 0 && (
                  <>
                    <span>•</span>
                    <span>{session.timeInZone}% в зоне</span>
                  </>
                )}
              </div>
              {session.timeInZone > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${session.timeInZone}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

