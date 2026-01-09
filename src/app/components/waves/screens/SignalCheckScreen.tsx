import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';

type SignalQuality = 'good' | 'medium' | 'poor';

interface SignalCheckScreenProps {
  onBack: () => void;
  onAllGood: () => void;
}

export function SignalCheckScreen({ onBack, onAllGood }: SignalCheckScreenProps) {
  const [signals, setSignals] = useState<SignalQuality[]>(['good', 'medium', 'poor', 'good']);
  const [allGood, setAllGood] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Симуляция улучшения сигнала
    const timer = setInterval(() => {
      setSignals((prev) => {
        const newSignals = prev.map((s) => {
          if (s === 'poor') return 'medium';
          if (s === 'medium') return 'good';
          return s;
        });
        return newSignals;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Проверяем, все ли датчики зеленые
    const allAreGood = signals.every((s) => s === 'good');
    
    if (allAreGood && !allGood) {
      // Впервые все стали зелеными
      setAllGood(true);
      setCountdown(3);
    } else if (!allAreGood && allGood) {
      // Если хотя бы один не зеленый - сбрасываем
      setAllGood(false);
      setCountdown(null);
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    }
  }, [signals, allGood]);

  // Отдельный эффект для обратного отсчета
  useEffect(() => {
    if (allGood && countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            // Когда отсчет закончился, переходим на тренировку
            onAllGood();
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [allGood, countdown, onAllGood]);


  const sensorNames = ['Левый висок', 'Правый висок', 'За левым ухом', 'За правым ухом'];
  const needsAdjustment = signals.some((s) => s !== 'good');
  const poorSensorIndex = signals.findIndex((s) => s === 'poor');

  const getSignalStatus = (quality: SignalQuality) => {
    switch (quality) {
      case 'good':
        return { color: 'text-green-600', bg: 'bg-green-50', dot: 'bg-green-500' };
      case 'medium':
        return { color: 'text-yellow-600', bg: 'bg-yellow-50', dot: 'bg-yellow-500' };
      case 'poor':
        return { color: 'text-red-600', bg: 'bg-red-50', dot: 'bg-red-500' };
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
        <button onClick={onBack} className="text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <SerifHeading size="xl">Проверка сигнала</SerifHeading>
        <button className="text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
          <Volume2 className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-16 py-8">
        {/* Схема головы */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-[#1a1a1a]/5 rounded-full"></div>
          </div>
          {/* Датчики */}
          {[0, 1, 2, 3].map((index) => {
            const status = getSignalStatus(signals[index]);
            // Симметричное расположение относительно центра (128px = половина от 256px)
            const positions = [
              { top: '15%', left: '15%' }, // Левый висок
              { top: '15%', left: '85%' }, // Правый висок
              { top: '85%', left: '15%' }, // За левым ухом
              { top: '85%', left: '85%' }, // За правым ухом
            ];
            return (
              <div
                key={index}
                className="absolute"
                style={{
                  ...positions[index],
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className={`w-10 h-10 rounded-full ${status.bg} border-2 border-white flex items-center justify-center shadow-md`}>
                  <div className={`w-4 h-4 rounded-full ${status.dot}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Динамическая подсказка */}
        {needsAdjustment && poorSensorIndex !== -1 && (
          <WellnessCard gradient="blue" className="p-4 mb-6">
            <p className="font-semibold text-[#1a1a1a] mb-2">
              Поправьте датчик {sensorNames[poorSensorIndex].toLowerCase()}
            </p>
            <button className="text-sm text-[#1a1a1a]/70 hover:text-[#1a1a1a] underline">
              Как улучшить контакт?
            </button>
          </WellnessCard>
        )}

        {allGood && (
          <WellnessCard gradient="blue" className="p-4 mb-6 text-center">
            <p className="font-semibold text-[#1a1a1a] mb-1">Все датчики подключены!</p>
            {countdown !== null && countdown > 0 ? (
              <p className="text-sm text-[#1a1a1a]/70">
                Начинаем тренировку через {countdown}...
              </p>
            ) : (
              <p className="text-sm text-[#1a1a1a]/70">Начинаем тренировку...</p>
            )}
          </WellnessCard>
        )}

        {/* Список датчиков */}
        <div className="space-y-3 mb-6">
          {sensorNames.map((name, index) => {
            const status = getSignalStatus(signals[index]);
            return (
              <WellnessCard key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#1a1a1a]">{name}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${status.dot}`}></div>
                    <span className={`text-sm font-medium ${status.color}`}>
                      {signals[index] === 'good' ? 'Хорошо' : signals[index] === 'medium' ? 'Средне' : 'Плохо'}
                    </span>
                  </div>
                </div>
              </WellnessCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
