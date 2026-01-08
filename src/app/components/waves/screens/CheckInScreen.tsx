import React, { useState } from 'react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { GradientBackground } from '../../design-system/GradientBackground';

interface CheckInScreenProps {
  childName?: string;
  onContinue: (data: { emotion: string; concentration: number }) => void;
  onBack?: () => void;
}

const emotions = [
  { emoji: '😊', label: 'Доволен', value: 'happy' },
  { emoji: '😰', label: 'Тревожно', value: 'anxious' },
  { emoji: '😔', label: 'Подавлен', value: 'depressed' },
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

export function CheckInScreen({ childName = 'ребёнок', onContinue, onBack }: CheckInScreenProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [concentration, setConcentration] = useState<number | null>(null);

  const canContinue = selectedEmotion !== null && concentration !== null;

  return (
    <GradientBackground variant="cream" className="flex flex-col">
      <div className="flex-1 px-6 py-8">
        <SerifHeading size="2xl" className="mb-8">
          Как {childName} себя чувствует сейчас?
        </SerifHeading>

        {/* Секция Эмоции */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Эмоции</h2>
          <div className="grid grid-cols-5 gap-3">
            {emotions.map((emotion) => {
              const isSelected = selectedEmotion === emotion.value;
              return (
                <button
                  key={emotion.value}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedEmotion(null);
                    } else {
                      setSelectedEmotion(emotion.value);
                    }
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-[#a8d8ea] bg-gradient-to-br from-[#a8d8ea]/30 to-[#a8d8ea]/20 scale-110'
                      : 'border-[#1a1a1a]/10 bg-white/50 hover:border-[#a8d8ea]/30'
                  }`}
                >
                  <div className="text-3xl mb-1">{emotion.emoji}</div>
                  <div className="text-xs text-gray-600">{emotion.label}</div>
                </button>
              );
            })}
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
                    ? 'border-[#a8d8ea] bg-gradient-to-br from-[#a8d8ea]/30 to-[#a8d8ea]/20 scale-110'
                    : 'border-[#1a1a1a]/10 bg-white/50 hover:border-[#a8d8ea]/30'
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
          className="w-full mb-3"
          disabled={!canContinue}
        >
          Продолжить
        </PillButton>
        
        {onBack && (
          <button
            onClick={onBack}
            className="w-full text-center text-[#1a1a1a]/70 hover:text-[#1a1a1a] py-3 text-sm transition-colors"
          >
            Назад
          </button>
        )}
      </div>
    </GradientBackground>
  );
}

