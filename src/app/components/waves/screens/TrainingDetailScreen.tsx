import React, { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { MoodChart } from '../../design-system/MoodChart';
import { GradientBackground } from '../../design-system/GradientBackground';

interface TrainingSession {
  id: string;
  date: string;
  type: string;
  duration: number; // в минутах
  timeElapsed: number; // в секундах
  timeInZone: number;
  endReason: 'completed' | 'early' | 'technical';
  technicalIssue?: string;
  points?: number;
}

interface TrainingDetailScreenProps {
  session: TrainingSession | null;
  onBack: () => void;
}

export function TrainingDetailScreen({ session, onBack }: TrainingDetailScreenProps) {
  // Генерируем данные для графика динамики (симуляция данных за сессию)
  // В реальном приложении эти данные будут приходить с сервера
  const chartData = useMemo(() => {
    if (!session) return [];
    
    const data = [];
    const intervals = Math.floor(session.duration / 2); // Точка каждые 2 минуты
    // Используем ID сессии как seed для стабильной генерации
    const seed = parseInt(session.id) || 0;
    
    for (let i = 0; i <= intervals; i++) {
      const time = i * 2;
      // Псевдослучайное значение на основе seed и времени
      const pseudoRandom = ((seed + time) * 9301 + 49297) % 233280 / 233280;
      // Симулируем динамику: начинаем низко, поднимаемся, затем стабилизируемся
      const value = Math.min(10, Math.max(0, 
        3 + (time / session.duration) * 5 + Math.sin(time / 3) * 1.5 + (pseudoRandom - 0.5) * 1
      ));
      data.push({
        time: `${time} мин`,
        value: Math.round(value * 10) / 10,
      });
    }
    return data;
  }, [session]);

  if (!session) {
    return (
      <GradientBackground variant="cream" className="flex flex-col min-h-screen">
        <div className="flex items-center px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
          <button onClick={onBack} className="mr-4 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <SerifHeading size="xl">Детали тренировки</SerifHeading>
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <p className="text-[#1a1a1a]/70">Тренировка не найдена</p>
        </div>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground variant="cream" className="flex flex-col min-h-screen">
      <div className="flex items-center px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
        <button onClick={onBack} className="mr-4 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <SerifHeading size="xl">Детали тренировки</SerifHeading>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {/* Основная информация */}
        <WellnessCard className="mb-6">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-[#1a1a1a]/70 mb-1">Дата</p>
                <p className="font-semibold text-[#1a1a1a]">{session.date}</p>
              </div>
              <div>
                <p className="text-sm text-[#1a1a1a]/70 mb-1">Тип тренировки</p>
                <p className="font-semibold text-[#1a1a1a]">{session.type}</p>
              </div>
              <div>
                <p className="text-sm text-[#1a1a1a]/70 mb-1">Длительность</p>
                <p className="font-semibold text-[#1a1a1a]">{session.duration} мин</p>
              </div>
            </div>
            {session.endReason === 'early' && session.type !== 'Дыхание' && (
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800">Тренировка завершена досрочно</p>
              </div>
            )}
            {session.endReason === 'technical' && (
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  {session.technicalIssue || 'Тренировка прервана из-за технических проблем'}
                </p>
              </div>
            )}
          </div>
        </WellnessCard>

        {/* График динамики */}
        {session.timeInZone > 0 && (
          <WellnessCard className="mb-6">
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Динамика в течение сессии</h3>
            <MoodChart
              data={chartData.map(d => ({ day: d.time, mood: d.value }))}
              color="#a8d8ea"
            />
            <div className="mt-4 flex items-center justify-between text-sm text-[#1a1a1a]/70">
              <span>Время</span>
              <span>Уровень концентрации</span>
            </div>
          </WellnessCard>
        )}

        {/* Прогресс-бар времени в зоне */}
        {session.timeInZone > 0 && (
          <WellnessCard>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Время в зоне</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#1a1a1a]/70">Процент времени выше порога</span>
                <span className="font-semibold text-[#1a1a1a]">{session.timeInZone}%</span>
              </div>
              <div className="w-full bg-[#1a1a1a]/10 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-[#a8d8ea] to-[#6ab9e7] h-4 rounded-full transition-all"
                  style={{ width: `${session.timeInZone}%` }}
                ></div>
              </div>
              {session.points && (
                <p className="text-sm text-[#1a1a1a]/60 mt-2">
                  Абсолютное время над порогом: {Math.round((session.duration * 60 * session.timeInZone) / 100)} сек
                </p>
              )}
            </div>
          </WellnessCard>
        )}
      </div>
    </GradientBackground>
  );
}

