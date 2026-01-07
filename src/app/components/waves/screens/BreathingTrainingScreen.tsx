import React, { useState, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'hold2';

interface BreathingTrainingScreenProps {
  pattern: { inhale: number; hold: number; exhale: number; hold2: number };
  onPause: () => void;
  onComplete: (endReason: 'completed' | 'early' | 'technical', timeElapsed: number, technicalIssue?: string) => void;
}

export function BreathingTrainingScreen({
  pattern,
  onPause,
  onComplete,
}: BreathingTrainingScreenProps) {
  const [phase, setPhase] = useState<BreathingPhase>('inhale');
  const [countdown, setCountdown] = useState(pattern.inhale);
  const [isPaused, setIsPaused] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Переход к следующей фазе
            const nextPhase = getNextPhase(phase);
            setPhase(nextPhase);
            return getPhaseDuration(nextPhase);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase, isPaused]);

  const getNextPhase = (current: BreathingPhase): BreathingPhase => {
    switch (current) {
      case 'inhale':
        return 'hold';
      case 'hold':
        return 'exhale';
      case 'exhale':
        return 'hold2';
      case 'hold2':
        setCycle((prev) => prev + 1);
        return 'inhale';
    }
  };

  const getPhaseDuration = (p: BreathingPhase): number => {
    return pattern[p];
  };

  const getPhaseText = (p: BreathingPhase): string => {
    switch (p) {
      case 'inhale':
        return 'Вдох';
      case 'hold':
        return 'Задержка';
      case 'exhale':
        return 'Выдох';
      case 'hold2':
        return 'Задержка';
    }
  };

  const getCircleSize = (): number => {
    switch (phase) {
      case 'inhale':
        return 200;
      case 'hold':
        return 200;
      case 'exhale':
        return 100;
      case 'hold2':
        return 100;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center px-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{getPhaseText(phase)}</h1>
        <p className="text-4xl font-mono text-gray-600 mb-4">{countdown}</p>
        <p className="text-sm text-gray-500">
          Паттерн: {pattern.inhale}-{pattern.hold}-{pattern.exhale}-{pattern.hold2}
        </p>
      </div>

      {/* Анимация круга */}
      <div
        className="bg-blue-500 rounded-full transition-all duration-1000 ease-in-out mb-8"
        style={{
          width: `${getCircleSize()}px`,
          height: `${getCircleSize()}px`,
        }}
      ></div>

      {/* Кнопка паузы */}
      <button
        onClick={() => {
          setIsPaused(!isPaused);
          onPause();
        }}
        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
      >
        {isPaused ? <Play className="w-8 h-8 text-blue-600" /> : <Pause className="w-8 h-8 text-blue-600" />}
      </button>
    </div>
  );
}

