import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle2 } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface TutorialScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export function TutorialScreen({ onBack, onComplete }: TutorialScreenProps) {
  const [step, setStep] = useState<'video' | 'explanation' | 'demo' | 'complete'>('video');
  const [demoCompleted, setDemoCompleted] = useState(false);

  if (step === 'video') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex items-center px-4 py-4 border-b border-gray-100">
          <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Инструктаж</h1>
        </div>

        <div className="flex-1 px-6 py-8">
          <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6 flex items-center justify-center">
            <span className="text-6xl">📹</span>
          </div>
          <p className="text-center text-gray-600 mb-6">
            Видео: что такое нейрофидбек (1-2 мин)
          </p>
          <PillButton onClick={() => setStep('explanation')} variant="coral" className="w-full">
            Далее
          </PillButton>
        </div>
      </div>
    );
  }

  if (step === 'explanation') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex items-center px-4 py-4 border-b border-gray-100">
          <button onClick={() => setStep('video')} className="mr-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Объяснение</h1>
        </div>

        <div className="flex-1 px-6 py-8">
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="font-semibold text-gray-900 mb-2">Будем тренировать волну SMR</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="font-semibold text-gray-900 mb-2">Линия идёт вверх, когда ты сосредоточен</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="font-semibold text-gray-900 mb-2">Расслабься и наблюдай</p>
            </div>
          </div>
          <PillButton onClick={() => setStep('demo')} variant="coral" className="w-full">
            Далее
          </PillButton>
        </div>
      </div>
    );
  }

  if (step === 'demo') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex items-center px-4 py-4 border-b border-gray-100">
          <button onClick={() => setStep('explanation')} className="mr-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Демо-тренировка</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <div className="w-64 h-64 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 rounded-full flex items-center justify-center mb-6">
            <span className="text-8xl">🌊</span>
          </div>
          <p className="text-center text-gray-600 mb-6">Демо-тренировка (2-3 мин)</p>
          <PillButton
            onClick={() => {
              setDemoCompleted(true);
              setTimeout(() => setStep('complete'), 2000);
            }}
            variant="coral"
            className="w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            Начать демо
          </PillButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Отлично! Теперь ты готов к настоящим тренировкам 👏
        </h1>
        <PillButton onClick={onComplete} variant="coral" className="w-full">
          Начать тренировку
        </PillButton>
      </div>
    </div>
  );
}

