import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface PostTrainingCheckoutScreenProps {
  childName?: string;
  onComplete: (data: { mood: string; concentration: number; rating: number }) => void;
  onSkip: () => void;
}

const moodOptions = [
  { emoji: '😊', label: 'Лучше', value: 'better' },
  { emoji: '😐', label: 'Так же', value: 'same' },
  { emoji: '😟', label: 'Хуже', value: 'worse' },
];

const concentrationLevels = [
  { emoji: '😵', label: 'Рассеян', value: 1 },
  { emoji: '😐', label: 'Немного', value: 2 },
  { emoji: '🙂', label: 'Нормально', value: 3 },
  { emoji: '😊', label: 'Хорошо', value: 4 },
  { emoji: '🤓', label: 'Отлично', value: 5 },
];

export function PostTrainingCheckoutScreen({
  childName = 'ребёнок',
  onComplete,
  onSkip,
}: PostTrainingCheckoutScreenProps) {
  const [mood, setMood] = useState<string | null>(null);
  const [concentration, setConcentration] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  const canComplete = mood !== null && concentration !== null && rating !== null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Как {childName} себя чувствует после тренировки?
          </h1>
          <button onClick={onSkip} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Настроение */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Настроение</h2>
          <div className="flex items-center justify-between gap-2">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setMood(option.value)}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  mood === option.value
                    ? 'border-blue-500 bg-blue-50 scale-110'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-1">{option.emoji}</div>
                <div className="text-xs text-gray-600">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Концентрация */}
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

        {/* Понравилась тренировка */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Понравилась тренировка?</h2>
          <div className="flex items-center justify-between gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                  rating === value
                    ? 'border-blue-500 bg-blue-50 scale-110'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl">{value === 5 ? '⭐' : '⭐'.repeat(value)}</div>
              </button>
            ))}
          </div>
        </div>

        <PillButton
          onClick={() => {
            if (canComplete) {
              onComplete({
                mood: mood!,
                concentration: concentration!,
                rating: rating!,
              });
            }
          }}
          variant="coral"
          className="w-full mb-4"
          disabled={!canComplete}
        >
          Готово
        </PillButton>

        <button onClick={onSkip} className="w-full text-center text-gray-500 hover:text-gray-700 text-sm">
          Пропустить
        </button>
      </div>
    </div>
  );
}

