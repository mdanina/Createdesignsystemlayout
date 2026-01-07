import React, { useState } from 'react';
import { PillButton } from '../../design-system/PillButton';

interface CheckInScreenProps {
  childName?: string;
  onContinue: (data: { emotion: string; concentration: number }) => void;
}

const emotions = [
  { emoji: '😊', label: 'Доволен', value: 'happy' },
  { emoji: '😰', label: 'Тревожно', value: 'anxious' },
  { emoji: '😔', label: 'Подавлен', value: 'sad' },
  { emoji: '😃', label: 'Мотивирован', value: 'motivated' },
  { emoji: '😑', label: 'Без мотивации', value: 'unmotivated' },
  { emoji: '😢', label: 'Грустно', value: 'sad' },
  { emoji: '😤', label: 'Раздражён', value: 'irritated' },
  { emoji: '😄', label: 'Счастлив', value: 'very_happy' },
  { emoji: '😱', label: 'Паника', value: 'panic' },
  { emoji: '⚡', label: 'Энергичен', value: 'energetic' },
];

const concentrationLevels = [
  { emoji: '😵', label: 'Рассеян', value: 1 },
  { emoji: '😐', label: 'Немного', value: 2 },
  { emoji: '🙂', label: 'Нормально', value: 3 },
  { emoji: '😊', label: 'Хорошо', value: 4 },
  { emoji: '🤓', label: 'Отлично', value: 5 },
];

export function CheckInScreen({ childName = 'ребёнок', onContinue }: CheckInScreenProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [concentration, setConcentration] = useState<number | null>(null);

  const canContinue = selectedEmotion !== null && concentration !== null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Как {childName} себя чувствует сейчас?
        </h1>

        {/* Секция Эмоции */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Эмоции</h2>
          <div className="grid grid-cols-5 gap-3">
            {emotions.map((emotion) => (
              <button
                key={emotion.value}
                onClick={() => setSelectedEmotion(emotion.value)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedEmotion === emotion.value
                    ? 'border-blue-500 bg-blue-50 scale-110'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-1">{emotion.emoji}</div>
                <div className="text-xs text-gray-600">{emotion.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Секция Концентрация */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Концентрация</h2>
          <div className="flex items-center justify-between gap-2">
            {concentrationLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setConcentration(level.value)}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  concentration === level.value
                    ? 'border-blue-500 bg-blue-50 scale-110'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-1">{level.emoji}</div>
                <div className="text-xs text-gray-600">{level.label}</div>
              </button>
            ))}
          </div>
        </div>

        <PillButton
          onClick={() => {
            if (canContinue) {
              onContinue({
                emotion: selectedEmotion!,
                concentration: concentration!,
              });
            }
          }}
          variant="coral"
          className="w-full"
          disabled={!canContinue}
        >
          Продолжить
        </PillButton>
      </div>
    </div>
  );
}

