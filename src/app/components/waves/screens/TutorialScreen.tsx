import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle2 } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { GradientBackground } from '../../design-system/GradientBackground';
import { Logo } from '../../design-system/Logo';

interface TutorialScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export function TutorialScreen({ onBack, onComplete }: TutorialScreenProps) {
  const [step, setStep] = useState<'video' | 'explanation' | 'demo' | 'complete'>('video');
  const [demoCompleted, setDemoCompleted] = useState(false);

  if (step === 'video') {
    return (
      <GradientBackground variant="lavender" className="flex flex-col">
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
          <PillButton onClick={() => setStep('explanation')} variant="coral" className="w-full">
            Далее
          </PillButton>
        </div>
      </GradientBackground>
    );
  }

  if (step === 'explanation') {
    return (
      <GradientBackground variant="lavender" className="flex flex-col">
        <div className="flex items-center px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
          <button onClick={() => setStep('video')} className="mr-4 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <SerifHeading size="xl">Объяснение</SerifHeading>
        </div>

        <div className="flex-1 px-6 py-8">
          <div className="space-y-4 mb-6">
            <WellnessCard gradient="blue" className="p-4">
              <p className="font-semibold text-[#1a1a1a] mb-2">Будем тренировать волну SMR</p>
            </WellnessCard>
            <WellnessCard gradient="lavender" className="p-4">
              <p className="font-semibold text-[#1a1a1a] mb-2">Линия идёт вверх, когда ты сосредоточен</p>
            </WellnessCard>
            <WellnessCard gradient="pink" className="p-4">
              <p className="font-semibold text-[#1a1a1a] mb-2">Расслабься и наблюдай</p>
            </WellnessCard>
          </div>
          <PillButton onClick={() => setStep('demo')} variant="coral" className="w-full">
            Далее
          </PillButton>
        </div>
      </GradientBackground>
    );
  }

  if (step === 'demo') {
    return (
      <GradientBackground variant="lavender" className="flex flex-col">
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
            variant="coral"
            className="w-full"
          >
            <Play className="w-4 h-4 mr-2" />
            Начать демо
          </PillButton>
        </div>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground variant="peach" className="flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#a8d8ea]/30 to-[#a8d8ea]/50 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-16 h-16 text-[#a8d8ea]" />
        </div>
        <SerifHeading size="2xl" className="mb-4">
          Отлично! Теперь ты готов к настоящим тренировкам 👏
        </SerifHeading>
        <PillButton onClick={onComplete} variant="coral" className="w-full">
          Начать тренировку
        </PillButton>
      </div>
    </GradientBackground>
  );
}

