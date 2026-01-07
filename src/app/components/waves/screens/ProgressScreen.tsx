import React from 'react';
import { TrendingUp, Award, Calendar, Home } from 'lucide-react';

interface ProgressScreenProps {
  userName?: string;
  onBack?: () => void;
}

export function ProgressScreen({ userName, onBack }: ProgressScreenProps) {
  // Mock данные
  const level = 5;
  const sessionsCompleted = 24;
  const totalMinutes = 384;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Прогресс</h1>
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              title="На главный экран"
            >
              <Home className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Уровень */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Уровень</p>
                <p className="text-3xl font-bold text-gray-900">{level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">До следующего уровня</p>
              <p className="text-lg font-semibold text-gray-900">3 тренировки</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <p className="text-sm text-gray-600">Тренировок</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{sessionsCompleted}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <p className="text-sm text-gray-600">Минут</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalMinutes}</p>
          </div>
        </div>

        {/* История тренировок */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">История тренировок</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-900">Тренировка #{sessionsCompleted - i + 1}</p>
                  <p className="text-sm text-gray-600">2 дня назад</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>16 мин</span>
                  <span>•</span>
                  <span>68% в зоне</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

