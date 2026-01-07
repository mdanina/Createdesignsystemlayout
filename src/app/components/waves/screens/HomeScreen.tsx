import React, { useState } from 'react';
import { Flame, Play, Info } from 'lucide-react';
import { StreakBadge } from '../../design-system/StreakBadge';
import { PillButton } from '../../design-system/PillButton';

interface HomeScreenProps {
  childName?: string;
  profileType: 'waves' | 'waves-kids';
  onProfileTypeChange: (type: 'waves' | 'waves-kids') => void;
  onStartTraining: (type: string) => void;
  onTutorial?: () => void;
  streak?: number;
  recommendedTraining?: {
    type: string;
    frequency: string;
  };
}

export function HomeScreen({
  childName = 'Миша',
  profileType,
  onProfileTypeChange,
  onStartTraining,
  onTutorial,
  streak = 5,
  recommendedTraining = {
    type: 'TBR (Theta/Beta 4-7 / 15-20 Hz)',
    frequency: '15-20 мин',
  },
}: HomeScreenProps) {
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Шапка */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3">
        <h1 className="text-xl font-bold text-gray-900">Сегодня</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center justify-center">
            <StreakBadge days={streak} />
          </div>
        )}

        {/* Карточка инструктажа для новых */}
        {showTutorial && onTutorial && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 relative">
            <button
              onClick={() => setShowTutorial(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Пройти инструктаж</h3>
                <p className="text-sm text-gray-600">Узнайте, как работает нейрофидбек</p>
              </div>
              <button
                onClick={onTutorial}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Начать
              </button>
            </div>
          </div>
        )}

        {/* Рекомендуемая тренировка */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Рекомендуемая тренировка</h2>
          <p className="text-sm text-gray-600 mb-4">{recommendedTraining.type}</p>
          <PillButton
            onClick={() => onStartTraining('tbr')}
            variant="coral"
            className="w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            Начать
          </PillButton>
        </div>

        {/* Карточки тренировок по типам */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Типы тренировок</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onStartTraining('tbr')}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 text-left"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Концентрация</h3>
              <p className="text-xs text-gray-500">TBR</p>
            </button>
            <button
              onClick={() => onStartTraining('alpha')}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 text-left"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Спокойствие</h3>
              <p className="text-xs text-gray-500">Alpha</p>
            </button>
            <button
              onClick={() => onStartTraining('smr')}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 text-left"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Фокус</h3>
              <p className="text-xs text-gray-500">SMR</p>
            </button>
            <button
              onClick={() => onStartTraining('breathing')}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 text-left"
            >
              <h3 className="font-semibold text-gray-900 mb-1">Дыхание</h3>
              <p className="text-xs text-gray-500">Без устройства</p>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

