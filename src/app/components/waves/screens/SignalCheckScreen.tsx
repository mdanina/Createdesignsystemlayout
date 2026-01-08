import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { GradientBackground } from '../../design-system/GradientBackground';

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

  const getSignalColor = (quality: SignalQuality) => {
    switch (quality) {
      case 'good':
        return 'bg-green-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
    }
  };

  const getSignalEmoji = (quality: SignalQuality) => {
    switch (quality) {
      case 'good':
        return '🟢';
      case 'medium':
        return '🟡';
      case 'poor':
        return '🔴';
    }
  };

  const sensorNames = ['Левый висок', 'Правый висок', 'За левым ухом', 'За правым ухом'];
  const needsAdjustment = signals.some((s) => s !== 'good');
  const poorSensorIndex = signals.findIndex((s) => s === 'poor');

  return (
    <GradientBackground variant="cream" className="flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
        <button onClick={onBack} className="text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <SerifHeading size="xl">Проверка сигнала</SerifHeading>
        <button className="text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
          <Volume2 className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 px-6 py-8">
        {/* Схема головы */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full"></div>
          </div>
          {/* Датчики */}
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`absolute w-8 h-8 rounded-full border-2 border-white ${getSignalColor(signals[index])}`}
              style={{
                top: index < 2 ? '20%' : '60%',
                left: index % 2 === 0 ? '20%' : '70%',
              }}
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs">
                {getSignalEmoji(signals[index])}
              </span>
            </div>
          ))}
        </div>

        {/* Динамическая подсказка */}
        {needsAdjustment && poorSensorIndex !== -1 && (
          <WellnessCard gradient="coral" className="p-4 mb-6">
            <p className="font-semibold text-[#1a1a1a] mb-1">
              Поправьте датчик {sensorNames[poorSensorIndex].toLowerCase()}
            </p>
            <button className="text-sm text-[#a8d8ea] hover:text-[#8bc9e0]">
              Как улучшить контакт?
            </button>
          </WellnessCard>
        )}

        {allGood && (
          <WellnessCard gradient="blue" className="p-4 mb-6 text-center">
            <p className="font-semibold text-[#1a1a1a]">Все датчики подключены!</p>
            {countdown !== null && countdown > 0 ? (
              <p className="text-sm text-[#1a1a1a]/70 mt-1">
                Начинаем тренировку через {countdown}...
              </p>
            ) : (
              <p className="text-sm text-[#1a1a1a]/70 mt-1">Начинаем тренировку...</p>
            )}
          </WellnessCard>
        )}

        {/* Список датчиков */}
        <div className="space-y-2 mb-6">
          {sensorNames.map((name, index) => (
            <WellnessCard key={index} className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-[#1a1a1a]">{name}</span>
                <span className="text-2xl">{getSignalEmoji(signals[index])}</span>
              </div>
            </WellnessCard>
          ))}
        </div>
      </div>
    </GradientBackground>
  );
}
