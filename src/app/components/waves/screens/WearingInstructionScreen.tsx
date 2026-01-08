import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { GradientBackground } from '../../design-system/GradientBackground';

interface WearingInstructionScreenProps {
  onBack: () => void;
  onReady: () => void;
}

export function WearingInstructionScreen({ onBack, onReady }: WearingInstructionScreenProps) {
  return (
    <GradientBackground variant="cream" className="flex flex-col">
      <div className="flex items-center px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
        <button onClick={onBack} className="mr-4 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <SerifHeading size="xl">Инструкция</SerifHeading>
      </div>

      <div className="flex-1 px-6 py-8">
        {/* Видео/GIF placeholder */}
        <div className="w-full h-64 bg-gradient-to-br from-[#a8d8ea]/30 to-[#b8a0d6]/30 rounded-2xl mb-6 flex items-center justify-center">
          <span className="text-6xl">📹</span>
        </div>

        <SerifHeading size="xl" className="mb-4">Наденьте устройство на ребёнка</SerifHeading>

        <div className="space-y-4 mb-6">
          <WellnessCard gradient="blue" className="p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">👂</span>
              <p className="text-[#1a1a1a]/80">Датчики за ушами — на кожу</p>
            </div>
          </WellnessCard>

          <WellnessCard gradient="lavender" className="p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💇</span>
              <div>
                <p className="text-[#1a1a1a]/80 mb-1">Длинные волосы?</p>
                <button className="text-[#a8d8ea] hover:text-[#8bc9e0] text-sm">
                  Смотреть дополнительные инструкции
                </button>
              </div>
            </div>
          </WellnessCard>
        </div>

        <PillButton onClick={onReady} variant="coral" className="w-full mb-3">
          Готово
        </PillButton>
        
        <button
          onClick={onBack}
          className="w-full text-center text-[#1a1a1a]/70 hover:text-[#1a1a1a] py-3 text-sm transition-colors"
        >
          Назад
        </button>
      </div>
    </GradientBackground>
  );
}

