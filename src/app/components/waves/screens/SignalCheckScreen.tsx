import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

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
      
      // Очищаем предыдущий таймер, если был
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      
      // Автопереход через 3 секунды согласно ТЗ
      transitionTimerRef.current = setTimeout(() => {
        onAllGood();
      }, 3000);
      
      // Счетчик обратного отсчета
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownInterval);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        if (transitionTimerRef.current) {
          clearTimeout(transitionTimerRef.current);
        }
        clearInterval(countdownInterval);
      };
    } else if (!allAreGood && allGood) {
      // Если хотя бы один не зеленый - сбрасываем
      setAllGood(false);
      setCountdown(null);
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }
    }
  }, [signals, allGood, onAllGood]);

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
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Проверка сигнала</h1>
        <button className="text-gray-600 hover:text-gray-900">
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
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="font-semibold text-gray-900 mb-1">
              Поправьте датчик {sensorNames[poorSensorIndex].toLowerCase()}
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Как улучшить контакт?
            </button>
          </div>
        )}

        {allGood && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-center">
            <p className="font-semibold text-green-900">Все датчики подключены!</p>
            {countdown !== null && countdown > 0 ? (
              <p className="text-sm text-green-700 mt-1">
                Начинаем тренировку через {countdown}...
              </p>
            ) : (
              <p className="text-sm text-green-700 mt-1">Начинаем тренировку...</p>
            )}
          </div>
        )}

        {/* Список датчиков */}
        <div className="space-y-2 mb-6">
          {sensorNames.map((name, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-900">{name}</span>
              <span className="text-2xl">{getSignalEmoji(signals[index])}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
