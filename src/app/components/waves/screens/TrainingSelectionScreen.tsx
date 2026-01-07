import React, { useState } from 'react';
import { Info, Play, Zap } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { Tag } from '../../design-system/Tag';

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
}

export function TrainingSelectionScreen({
  currentProgram,
  onStart,
  onChangeProgram,
  onQuickSession,
}: TrainingSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 py-8">
        {/* Изображение головы с Flex4 */}
        <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center relative">
          <span className="text-6xl">🧠</span>
          <div className="absolute top-4 left-4">
            <Tag
              label={currentProgram.eyesOpen ? '👁 Глаза открыты' : '👁 Глаза закрыты'}
              gradient="blue"
            />
          </div>
        </div>

        {/* Текущая программа */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900">Текущая программа</h2>
            <button
              onClick={onChangeProgram}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Сменить
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{currentProgram.name}</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <Info className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Тренируемые волны: {currentProgram.waves}</p>
              <p>Длительность: {currentProgram.duration} мин</p>
            </div>
          </div>
        </div>

        <PillButton onClick={onStart} variant="coral" className="w-full mb-4">
          <Play className="w-4 h-4 mr-2" />
          Начать тренировку
        </PillButton>

        {onQuickSession && (
          <button
            onClick={onQuickSession}
            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 py-2"
          >
            <Zap className="w-4 h-4" />
            <span className="text-sm">Мало времени? Быстрая сессия</span>
          </button>
        )}
      </div>
    </div>
  );
}

