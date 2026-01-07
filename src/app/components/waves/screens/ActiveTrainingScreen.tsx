import React, { useState, useEffect, useRef } from 'react';
import { Clock, X } from 'lucide-react';

type TrainingEndReason = 'completed' | 'early' | 'technical';

interface ActiveTrainingScreenProps {
  trainingType?: string;
  duration?: number; // в секундах, по умолчанию 4 минуты (240 сек)
  onPause: () => void;
  onComplete: (reason: TrainingEndReason, timeElapsed: number) => void;
  onTechnicalIssue?: () => void; // Обработчик технических проблем (потеря сигнала, отвалились электроды)
}

export function ActiveTrainingScreen({
  trainingType = 'tbr',
  duration = 240, // 4 минуты по умолчанию
  onPause,
  onComplete,
  onTechnicalIssue,
}: ActiveTrainingScreenProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  const hideTimerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeElapsed < duration) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => {
          if (prev + 1 >= duration) {
            onComplete('completed', duration); // Полное завершение
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeElapsed, duration, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeElapsed / duration) * 100;

  const handleTimerClick = () => {
    // Очищаем предыдущий таймер скрытия, если был
    if (hideTimerTimeoutRef.current) {
      clearTimeout(hideTimerTimeoutRef.current);
    }

    // Показываем плашку
    setShowTimer(true);

    // Через секунду скрываем плавно
    hideTimerTimeoutRef.current = setTimeout(() => {
      setShowTimer(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Визуальная обратная связь - видео/анимация */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="text-8xl">🌊</span>
        </div>
      </div>

      {/* Закладки вверху */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {/* Закладка с часами */}
        <button
          onClick={handleTimerClick}
          className="bg-black/30 backdrop-blur-sm rounded-b-xl px-3 py-2 flex items-center justify-center text-white hover:bg-black/40 transition-all"
        >
          <Clock className="w-4 h-4" />
        </button>
        {/* Закладка завершения тренировки */}
        <button
          onClick={() => onComplete('early', timeElapsed)}
          className="bg-black/30 backdrop-blur-sm rounded-b-xl px-3 py-2 flex items-center justify-center text-white hover:bg-black/40 transition-all"
          title="Завершить тренировку"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Плашка с таймером - выдвигается сверху */}
      <div
        className={`absolute top-0 left-0 right-0 z-10 transition-transform duration-300 ${
          showTimer ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="bg-black/70 backdrop-blur-md rounded-b-2xl p-6 text-white">
          <div className="text-center">
            <p className="text-3xl font-mono mb-3">
              {formatTime(timeElapsed)} / {formatTime(duration)}
            </p>
            <div className="w-full bg-white/20 rounded-full h-2.5 mb-2">
              <div
                className="bg-white h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-white/70">
              {Math.round(progress)}% завершено
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

