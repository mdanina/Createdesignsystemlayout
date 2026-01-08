import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { GradientBackground } from '../../design-system/GradientBackground';

interface TrainingTipsScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export function TrainingTipsScreen({ onBack, onContinue }: TrainingTipsScreenProps) {
  const tips = [
    { icon: '🎧', text: 'Выберите тихое и комфортное место' },
    { icon: '🧘', text: 'Минимизируйте движения головой и телом' },
    { icon: '👁️', text: 'Расслабьте лицо, шею и плечи, старайтесь реже моргать' },
    { icon: '📵', text: 'Включите режим «Не беспокоить» на телефоне' },
  ];

  const reminders = [
    'Поссать!',
    'Пожрать!',
    'Попить!',
    'Проветрить помещение',
    'Родитель не мешай!',
    'Так удобно, чтобы просидеть 16 минут',
  ];

  return (
    <GradientBackground variant="cream" className="flex flex-col">
      <div className="flex items-center px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
        <button onClick={onBack} className="mr-4 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <SerifHeading size="xl">Советы</SerifHeading>
      </div>

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        <div className="space-y-4 mb-6">
          {tips.map((tip, index) => (
            <WellnessCard key={index} gradient={index % 2 === 0 ? 'blue' : 'lavender'} className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tip.icon}</span>
                <p className="text-[#1a1a1a]/80 flex-1">{tip.text}</p>
              </div>
            </WellnessCard>
          ))}
        </div>

        <WellnessCard gradient="pink" className="p-4 mb-6">
          <p className="text-sm text-[#1a1a1a]/80 font-medium mb-2">Перед тренировкой:</p>
          <ul className="space-y-1">
            {reminders.map((reminder, index) => (
              <li key={index} className="text-sm text-[#1a1a1a]/60">
                • {reminder}
              </li>
            ))}
          </ul>
        </WellnessCard>

        <PillButton onClick={onContinue} variant="coral" className="w-full mb-3">
          Понятно
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

