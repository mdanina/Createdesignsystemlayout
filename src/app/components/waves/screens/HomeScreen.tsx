import React, { useState } from 'react';
import { Flame, Play, Info } from 'lucide-react';
import { StreakBadge } from '../../design-system/StreakBadge';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';

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
    type: 'Концентрация (Theta/Beta 4-7 / 15-20 Hz)',
    frequency: '15-20 мин',
  },
}: HomeScreenProps) {
  const [showTutorial, setShowTutorial] = useState(true);

  return (
    <div 
      className="min-h-screen pb-20"
      style={{
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="px-12 py-6 space-y-6">
        {/* Центральный заголовок */}
        <div className="flex justify-center pt-6">
          <SerifHeading size="3xl" className="text-center">
            Привет, {childName}, хороший день для тренировки!
          </SerifHeading>
        </div>
        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center justify-center">
            <StreakBadge days={streak} />
          </div>
        )}

        {/* Карточка инструктажа для новых */}
        {showTutorial && onTutorial && (
          <button
            onClick={onTutorial}
            className="w-full text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <WellnessCard className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTutorial(false);
                }}
                className="absolute top-2 right-2 text-[#1a1a1a]/40 hover:text-[#1a1a1a]/60 z-10"
              >
                ×
              </button>
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-[#1a1a1a]/70" />
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1a1a1a]">Пройти инструктаж</h3>
                  <p className="text-sm text-[#1a1a1a]/70">Узнайте, как работает нейрофидбек</p>
                </div>
              </div>
            </WellnessCard>
          </button>
        )}

        {/* Рекомендуемая тренировка */}
        <WellnessCard>
          <h2 className="text-lg font-semibold text-[#1a1a1a] mb-2">Рекомендуемая тренировка</h2>
          <p className="text-sm text-[#1a1a1a]/70 mb-4">{recommendedTraining.type}</p>
          <PillButton
            onClick={() => onStartTraining('tbr')}
            variant="gradientMesh"
            className="w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            Начать
          </PillButton>
        </WellnessCard>

        {/* Карточки тренировок по типам */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Типы тренировок</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onStartTraining('tbr')}
              className="text-left transition-all hover:scale-[1.02]"
            >
              <WellnessCard gradient="blue" hover>
                <h3 className="font-semibold text-[#1a1a1a] mb-1">Концентрация</h3>
                <p className="text-xs text-[#1a1a1a]/50">Theta/Beta (4-7 / 15-20 Hz)</p>
              </WellnessCard>
            </button>
            <button
              onClick={() => onStartTraining('alpha')}
              className="text-left transition-all hover:scale-[1.02]"
            >
              <WellnessCard gradient="lavender" hover>
                <h3 className="font-semibold text-[#1a1a1a] mb-1">Спокойствие</h3>
                <p className="text-xs text-[#1a1a1a]/50">Alpha (8-12 Hz)</p>
              </WellnessCard>
            </button>
            <button
              onClick={() => onStartTraining('smr')}
              className="text-left transition-all hover:scale-[1.02]"
            >
              <WellnessCard gradient="pink" hover>
                <h3 className="font-semibold text-[#1a1a1a] mb-1">Фокус</h3>
                <p className="text-xs text-[#1a1a1a]/50">Low-Beta (12-15 Hz)</p>
              </WellnessCard>
            </button>
            <button
              onClick={() => onStartTraining('breathing')}
              className="text-left transition-all hover:scale-[1.02]"
            >
              <WellnessCard gradient="coral" hover>
                <h3 className="font-semibold text-[#1a1a1a] mb-1">Дыхание</h3>
                <p className="text-xs text-[#1a1a1a]/50">Без устройства</p>
              </WellnessCard>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

