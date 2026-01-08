import React from 'react';
import { Flame, AlertTriangle } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { StreakBadge } from '../../design-system/StreakBadge';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { GradientBackground } from '../../design-system/GradientBackground';

type TrainingEndReason = 'completed' | 'early' | 'technical';

interface TrainingCompleteScreenProps {
  userName: string;
  duration: number; // Длительность в минутах (для отображения)
  timeElapsed: number; // Реальное время тренировки в секундах
  timeInZone: number;
  streak: number;
  endReason?: TrainingEndReason; // Причина завершения тренировки
  technicalIssue?: string; // Описание технической проблемы (если есть)
  onComplete: () => void;
}

export function TrainingCompleteScreen({
  userName,
  duration,
  timeElapsed,
  timeInZone,
  streak,
  endReason = 'completed',
  technicalIssue,
  onComplete,
}: TrainingCompleteScreenProps) {
  const isCompleted = endReason === 'completed';
  const isTechnical = endReason === 'technical';
  const isEarly = endReason === 'early';
  
  // Форматируем время для отображения: минуты и секунды
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) {
      return `${secs} сек`;
    }
    if (secs === 0) {
      return `${mins} мин`;
    }
    return `${mins} мин ${secs} сек`;
  };

  return (
    <GradientBackground variant="lavender" className="flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        {/* Анимация */}
        {isCompleted ? (
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
        ) : isTechnical ? (
          <div className="text-8xl mb-6">⚠️</div>
        ) : (
          <div className="text-8xl mb-6">👍</div>
        )}

        <SerifHeading size="2xl" className="mb-8">
          {isCompleted
            ? `Отличная тренировка, ${userName}!`
            : isTechnical
            ? `Тренировка прервана, ${userName}`
            : `Тренировка завершена, ${userName}`}
        </SerifHeading>

        {/* Статистика */}
        <WellnessCard className="mb-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#1a1a1a]/70">Длительность</span>
              <span className="font-semibold text-[#1a1a1a]">{formatTime(timeElapsed)}</span>
            </div>
            {isCompleted && (
              <div className="flex justify-between items-center">
                <span className="text-[#1a1a1a]/70">Время «в зоне»</span>
                <span className="font-semibold text-[#1a1a1a]">{timeInZone}%</span>
              </div>
            )}
          </div>
        </WellnessCard>

        {/* Streak - показываем только если тренировка завершена полностью */}
        {isCompleted && streak > 0 && (
          <div className="mb-6">
            <StreakBadge days={streak} />
            {streak >= 4 && (
              <p className="text-sm text-gray-600 mt-2">
                Завтра будет {streak + 1}!
              </p>
            )}
          </div>
        )}

        {/* Сообщение для технических проблем */}
        {isTechnical && (
          <WellnessCard gradient="coral" className="mb-6">
            <p className="text-sm font-semibold text-[#1a1a1a] mb-2">
              Техническая проблема
            </p>
            <p className="text-sm text-[#1a1a1a]/80">
              {technicalIssue || 'Потерян сигнал с устройства. Проверьте подключение электродов и попробуйте снова.'}
            </p>
          </WellnessCard>
        )}

        {/* Сообщение для досрочно завершенной тренировки */}
        {endReason === 'early' && (
          <WellnessCard gradient="pink" className="mb-6">
            <p className="text-sm text-[#1a1a1a]/80">
              Тренировка была завершена досрочно. Для лучших результатов рекомендуется проходить тренировку полностью.
            </p>
          </WellnessCard>
        )}

        <PillButton onClick={onComplete} variant="coral" className="w-full">
          Готово
        </PillButton>
      </div>
    </GradientBackground>
  );
}

