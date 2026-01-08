import React from 'react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { GradientBackground } from '../../design-system/GradientBackground';

interface PermissionsExplanationScreenProps {
  onContinue: () => void;
}

export function PermissionsExplanationScreen({ onContinue }: PermissionsExplanationScreenProps) {
  return (
    <GradientBackground variant="peach" className="flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm text-center">
          {/* Изображение Flex4 */}
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#a8d8ea]/30 to-[#b8a0d6]/30 rounded-full flex items-center justify-center">
            <span className="text-5xl">📱</span>
          </div>

          <SerifHeading size="xl" className="mb-4">
            Для подключения устройства нужны разрешения
          </SerifHeading>

          <div className="space-y-3 mb-8 text-left">
            <WellnessCard gradient="blue" className="p-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📡</span>
                <div>
                  <p className="font-semibold text-[#1a1a1a]">Bluetooth</p>
                  <p className="text-sm text-[#1a1a1a]/70">для связи с Flex4</p>
                </div>
              </div>
            </WellnessCard>

            <WellnessCard gradient="lavender" className="p-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-[#1a1a1a]">Геолокация</p>
                  <p className="text-sm text-[#1a1a1a]/70">требуется для BT на Android</p>
                </div>
              </div>
            </WellnessCard>
          </div>

          <PillButton onClick={onContinue} variant="coral" className="w-full">
            Понятно
          </PillButton>
        </div>
      </div>
    </GradientBackground>
  );
}

