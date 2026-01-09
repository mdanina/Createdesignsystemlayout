import React from 'react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';

interface PermissionsExplanationScreenProps {
  onContinue: () => void;
  onBack?: () => void;
}

export function PermissionsExplanationScreen({ onContinue, onBack }: PermissionsExplanationScreenProps) {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm text-center">
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

          <PillButton onClick={onContinue} variant="gradientMesh" className="w-full mb-3">
            Понятно
          </PillButton>
          
          {onBack && (
            <button
              onClick={onBack}
              className="w-full text-center text-[#1a1a1a]/70 hover:text-[#1a1a1a] py-3 text-sm transition-colors"
            >
              Назад
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

