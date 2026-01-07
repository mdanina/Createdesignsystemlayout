import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface WearingInstructionScreenProps {
  onBack: () => void;
  onReady: () => void;
}

export function WearingInstructionScreen({ onBack, onReady }: WearingInstructionScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Инструкция</h1>
      </div>

      <div className="flex-1 px-6 py-8">
        {/* Видео/GIF placeholder */}
        <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6 flex items-center justify-center">
          <span className="text-6xl">📹</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Наденьте устройство на ребёнка</h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👂</span>
            <p className="text-gray-700">Датчики за ушами — на кожу</p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">💇</span>
            <div>
              <p className="text-gray-700 mb-1">Длинные волосы?</p>
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                Смотреть дополнительные инструкции
              </button>
            </div>
          </div>
        </div>

        <PillButton onClick={onReady} variant="coral" className="w-full">
          Готово
        </PillButton>
      </div>
    </div>
  );
}

