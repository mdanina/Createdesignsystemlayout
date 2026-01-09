import React, { useState } from 'react';
import { Info, Play, Zap } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { Tag } from '../../design-system/Tag';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';

interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  waves: string;
  duration: number;
  eyesOpen: boolean;
  current?: boolean;
}

interface TrainingSelectionScreenProps {
  currentProgram: TrainingProgram;
  onStart: () => void;
  onChangeProgram: () => void;
  onQuickSession?: () => void;
  onBack?: () => void;
}

export function TrainingSelectionScreen({
  currentProgram,
  onStart,
  onChangeProgram,
  onQuickSession,
  onBack,
}: TrainingSelectionScreenProps) {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="flex-1 px-16 py-8">
        {/* Изображение головы с Flex4 */}
        <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-[#a8d8ea]/30 to-[#b8a0d6]/30 rounded-full flex flex-col items-center justify-center relative">
          <span className="text-6xl mb-2">🧠</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-[#1a1a1a] font-medium px-3 py-1.5 text-sm shadow-sm">
            {currentProgram.eyesOpen ? '👁 Глаза открыты' : '👁 Глаза закрыты'}
          </span>
        </div>

        {/* Текущая программа */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <SerifHeading size="xl">Текущая программа</SerifHeading>
            <button
              onClick={onChangeProgram}
              className="text-sm text-[#a8d8ea] hover:text-[#8bc9e0]"
            >
              Сменить
            </button>
          </div>
          <WellnessCard gradient="blue" className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-[#1a1a1a]">{currentProgram.name}</h3>
              <button className="text-[#1a1a1a]/40 hover:text-[#1a1a1a]/60">
                <Info className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1 text-sm text-[#1a1a1a]/70">
              <p>Тренируемые волны: {currentProgram.waves}</p>
              <p>Длительность: {currentProgram.duration} мин</p>
            </div>
          </WellnessCard>
        </div>

        <PillButton onClick={onStart} variant="gradientMesh" className="w-full mb-3">
          <Play className="w-4 h-4 mr-2" />
          Начать тренировку
        </PillButton>

        {onBack && (
          <button
            onClick={onBack}
            className="w-full text-center text-[#1a1a1a]/70 hover:text-[#1a1a1a] py-3 text-sm transition-colors mb-3"
          >
            Назад
          </button>
        )}

        {onQuickSession && (
          <button
            onClick={onQuickSession}
            className="w-full flex items-center justify-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] py-2"
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm">Мало времени? Быстрая сессия</span>
          </button>
        )}
      </div>
    </div>
  );
}

