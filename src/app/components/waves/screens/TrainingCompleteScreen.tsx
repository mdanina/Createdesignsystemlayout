import React from 'react';
import { Flame } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { StreakBadge } from '../../design-system/StreakBadge';

type TrainingEndReason = 'completed' | 'early' | 'technical';

interface TrainingCompleteScreenProps {
  userName: string;
  duration: number;
  timeInZone: number;
  streak: number;
  endReason?: TrainingEndReason; // Причина завершения тренировки
  technicalIssue?: string; // Описание технической проблемы (если есть)
  onComplete: () => void;
}

export function TrainingCompleteScreen({
  userName,
  duration,
  timeInZone,
  streak,
  endReason = 'completed',
  technicalIssue,
  onComplete,
}: TrainingCompleteScreenProps) {
  const isCompleted = endReason === 'completed';
  const isTechnical = endReason === 'technical';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        {/* Анимация */}
        {isCompleted ? (
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
        ) : isTechnical ? (
          <div className="text-8xl mb-6">⚠️</div>
        ) : (
          <div className="text-8xl mb-6">👍</div>
        )}

        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          {isCompleted
            ? `Отличная тренировка, ${userName}!`
            : isTechnical
            ? `Тренировка прервана, ${userName}`
            : `Тренировка завершена, ${userName}`}
        </h1>

        {/* Статистика */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Длительность</span>
              <span className="font-semibold text-gray-900">{duration} мин</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Время «в зоне»</span>
              <span className="font-semibold text-gray-900">{timeInZone}%</span>
            </div>
          </div>
        </div>

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
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-red-900 mb-2">
              Техническая проблема
            </p>
            <p className="text-sm text-red-800">
              {technicalIssue || 'Потерян сигнал с устройства. Проверьте подключение электродов и попробуйте снова.'}
            </p>
          </div>
        )}

        {/* Сообщение для досрочно завершенной тренировки */}
        {endReason === 'early' && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-sm text-yellow-800">
              Тренировка была завершена досрочно. Для лучших результатов рекомендуется проходить тренировку полностью.
            </p>
          </div>
        )}

        <PillButton onClick={onComplete} variant="coral" className="w-full">
          Готово
        </PillButton>
      </div>
    </div>
  );
}

