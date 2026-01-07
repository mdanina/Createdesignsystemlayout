import React from 'react';
import { TrendingUp, Play } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface InsightsEmptyScreenProps {
  onStartTraining: () => void;
}

export function InsightsEmptyScreen({ onStartTraining }: InsightsEmptyScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-20 h-20 text-gray-400" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Пока нет данных для аналитики</h1>
          <p className="text-gray-600 mb-6">
            Завершите несколько тренировок, и здесь появятся:
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
            <ul className="space-y-2 text-gray-700">
              <li>• Прогресс по сессиям</li>
              <li>• Тренды улучшения</li>
            </ul>
          </div>

          <PillButton onClick={onStartTraining} variant="coral" className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Начать тренировку
          </PillButton>
        </div>
      </div>
    </div>
  );
}

