import React from 'react';
import { Play, X } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface TrainingPauseScreenProps {
  reason?: string;
  onResume: () => void;
  onFinish: () => void;
}

export function TrainingPauseScreen({ reason, onResume, onFinish }: TrainingPauseScreenProps) {
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Пауза</h1>
        {reason && (
          <p className="text-gray-600 mb-6">Причина: {reason}</p>
        )}

        <div className="space-y-3">
          <PillButton onClick={onResume} variant="coral" className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Продолжить
          </PillButton>
          <PillButton onClick={onFinish} variant="secondary" className="w-full">
            <X className="w-4 h-4 mr-2" />
            Завершить
          </PillButton>
        </div>
      </div>
    </div>
  );
}

