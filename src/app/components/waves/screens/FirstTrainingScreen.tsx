import React from 'react';
import { CheckCircle2, Circle, Play } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface FirstTrainingScreenProps {
  onStartTutorial: () => void;
}

export function FirstTrainingScreen({ onStartTutorial }: FirstTrainingScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="text-6xl mb-6">🎉</div>

          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Всё готово для первой тренировки!
          </h1>

          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <span className="text-gray-900">Устройство получено</span>
              </div>
              <div className="flex items-center gap-3">
                <Circle className="w-6 h-6 text-gray-300" />
                <span className="text-gray-600">Пройти инструктаж (~5 мин)</span>
              </div>
              <div className="flex items-center gap-3">
                <Circle className="w-6 h-6 text-gray-300" />
                <span className="text-gray-600">Первая тренировка (~15 мин)</span>
              </div>
            </div>
          </div>

          <PillButton onClick={onStartTutorial} variant="coral" className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Начать инструктаж
          </PillButton>
        </div>
      </div>
    </div>
  );
}

