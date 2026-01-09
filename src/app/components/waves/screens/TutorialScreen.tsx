import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle2 } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { Logo } from '../../design-system/Logo';
import { CardStack } from '../../design-system/CardStack';

interface TutorialScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export function TutorialScreen({ onBack, onComplete }: TutorialScreenProps) {
  const [step, setStep] = useState<'video' | 'explanation' | 'demo' | 'complete'>('video');
  const [demoCompleted, setDemoCompleted] = useState(false);

  if (step === 'video') {
    return (
      <div className="flex flex-col bg-white min-h-screen">
        <div className="flex items-center px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
          <button onClick={onBack} className="mr-4 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <SerifHeading size="xl">Инструктаж</SerifHeading>
        </div>

        <div className="flex-1 px-6 py-8">
          <div className="w-full h-64 bg-gradient-to-br from-[#a8d8ea]/30 to-[#b8a0d6]/30 rounded-2xl mb-6 flex items-center justify-center">
            <span className="text-6xl">📹</span>
          </div>
          <p className="text-center text-[#1a1a1a]/70 mb-6">
            Видео: что такое нейрофидбек (1-2 мин)
          </p>
          <PillButton onClick={() => setStep('explanation')} variant="gradientMesh" className="w-full">
            Далее
          </PillButton>
        </div>
      </div>
    );
  }

  if (step === 'explanation') {
    const explanationCards = [
      {
        id: 1,
        title: 'Будем тренировать волну Фокус (Low-Beta)',
        gradient: 'blue' as const,
        tag: 'Фокус',
      },
      {
        id: 2,
        title: 'Линия идёт вверх, когда ты сосредоточен',
        gradient: 'lavender' as const,
        tag: 'Сосредоточенность',
      },
      {
        id: 3,
        title: 'Расслабься и наблюдай',
        gradient: 'pink' as const,
        tag: 'Расслабление',
      },
    ];

    return (
      <div className="flex flex-col bg-white min-h-screen">
        <div className="flex items-center px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
          <button onClick={() => setStep('video')} className="mr-4 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <SerifHeading size="xl">Объяснение</SerifHeading>
        </div>

        <div className="flex-1 px-6 py-8 overflow-y-auto">
          <div className="mb-6">
            <p className="text-sm text-[#666666] text-center mb-6">
              Прокрутите карточки, чтобы узнать, как работает нейрофидбек
            </p>
            <div className="flex justify-center">
              <CardStack items={explanationCards} />
            </div>
          </div>
          <PillButton onClick={() => setStep('demo')} variant="gradientMesh" className="w-full">
            Далее
          </PillButton>
        </div>
      </div>
    );
  }

  if (step === 'demo') {
    return (
      <div className="flex flex-col bg-white min-h-screen">
        <div className="flex items-center px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
          <button onClick={() => setStep('explanation')} className="mr-4 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <SerifHeading size="xl">Демо-тренировка</SerifHeading>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          <div className="mb-6">
            <Logo size="xl" variant="default" />
          </div>
          <p className="text-center text-[#1a1a1a]/70 mb-6">Демо-тренировка (2-3 мин)</p>
          <PillButton
            onClick={() => {
              setDemoCompleted(true);
              setTimeout(() => setStep('complete'), 2000);
            }}
            variant="gradientMesh"
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
    <div className="flex flex-col items-center justify-center px-6 py-12 bg-white min-h-screen">
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#a8d8ea]/30 to-[#a8d8ea]/50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-16 h-16 text-[#a8d8ea]" />
        </div>
        <SerifHeading size="2xl" className="mb-4">
          Отлично! Теперь ты готов к настоящим тренировкам 👏
        </SerifHeading>
        <PillButton onClick={onComplete} variant="gradientMesh" className="w-full">
          Начать тренировку
        </PillButton>
      </div>
    </div>
  );
}

