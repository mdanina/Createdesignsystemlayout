import React, { useState } from 'react';
import { X } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { GradientBackground } from '../../design-system/GradientBackground';

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
    <GradientBackground variant="lavender" className="flex flex-col">
      <div className="flex-1 px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <SerifHeading size="2xl">
            Как {childName} себя чувствует после тренировки?
          </SerifHeading>
          <button onClick={onSkip} className="text-[#1a1a1a]/40 hover:text-[#1a1a1a]/60">
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
                    ? 'border-[#a8d8ea] bg-gradient-to-br from-[#a8d8ea]/30 to-[#a8d8ea]/20 scale-110'
                    : 'border-[#1a1a1a]/10 bg-white/50 hover:border-[#a8d8ea]/30'
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

        {/* Понравилась тренировка */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Понравилась тренировка?</h2>
          <div className="relative">
            {/* Slider track */}
            <div className="relative h-2 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
              {/* Fill */}
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-200"
                style={{
                  width: `${((rating || 3) - 1) / 4 * 100}%`,
                  background: `linear-gradient(to right, #F3B83A, #F3B83A80)`,
                  boxShadow: `0 0 20px #F3B83A30`,
                }}
              />
            </div>
            
            {/* Thumb */}
            <div
              className="absolute w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center pointer-events-none -mt-3"
              style={{
                left: `calc(${((rating || 3) - 1) / 4 * 100}% - 16px)`,
                background: `radial-gradient(circle at 30% 30%, #F3B83Aff, #F3B83Acc, #F3B83A99)`,
                boxShadow: `0 6px 20px #F3B83A50, 0 2px 8px #F3B83A40, inset 0 1px 2px rgba(255,255,255,0.3)`,
              }}
            >
              <div className="w-2 h-2 bg-white/90 rounded-full shadow-sm" />
            </div>
            
            {/* Input */}
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={rating || 3}
              onChange={(e) => setRating(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
            />
            
            {/* Labels */}
            <div className="flex justify-between mt-4 text-xs text-gray-500">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
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

        <button onClick={onSkip} className="w-full text-center text-[#1a1a1a]/50 hover:text-[#1a1a1a]/70 text-sm">
          Пропустить
        </button>
      </div>
    </GradientBackground>
  );
}

