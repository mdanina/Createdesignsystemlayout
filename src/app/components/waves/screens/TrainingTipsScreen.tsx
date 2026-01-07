import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface TrainingTipsScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export function TrainingTipsScreen({ onBack, onContinue }: TrainingTipsScreenProps) {
  const tips = [
    { icon: '🎧', text: 'Выберите тихое и комфортное место' },
    { icon: '🧘', text: 'Минимизируйте движения головой и телом' },
    { icon: '👁️', text: 'Расслабьте лицо, шею и плечи, старайтесь реже моргать' },
    { icon: '📵', text: 'Включите режим «Не беспокоить» на телефоне' },
  ];

  const reminders = [
    'Поссать!',
    'Пожрать!',
    'Попить!',
    'Проветрить помещение',
    'Родитель не мешай!',
    'Так удобно, чтобы просидеть 16 минут',
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Советы</h1>
      </div>

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="space-y-4 mb-6">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <span className="text-2xl">{tip.icon}</span>
              <p className="text-gray-700 flex-1">{tip.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700 font-medium mb-2">Перед тренировкой:</p>
          <ul className="space-y-1">
            {reminders.map((reminder, index) => (
              <li key={index} className="text-sm text-gray-600">
                • {reminder}
              </li>
            ))}
          </ul>
        </div>

        <PillButton onClick={onContinue} variant="coral" className="w-full">
          Понятно
        </PillButton>
      </div>
    </div>
  );
}

