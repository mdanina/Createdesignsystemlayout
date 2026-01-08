import React from 'react';
import { MapPin } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { GradientBackground } from '../../design-system/GradientBackground';

interface LocationOffScreenProps {
  onOpenSettings: () => void;
}

export function LocationOffScreen({ onOpenSettings }: LocationOffScreenProps) {
  return (
    <GradientBackground variant="pink" className="flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#ff8a65]/30 to-[#ff8a65]/50 rounded-full flex items-center justify-center">
          <MapPin className="w-16 h-16 text-[#ff8a65]" />
        </div>

        <SerifHeading size="2xl" className="mb-4">Геолокация</SerifHeading>
        <p className="text-[#1a1a1a]/70 mb-6">
          Требуется для Bluetooth. Мы не отслеживаем ваше местоположение.
        </p>

        <PillButton onClick={onOpenSettings} variant="coral" className="w-full">
          Открыть настройки
        </PillButton>
      </div>
    </GradientBackground>
  );
}

