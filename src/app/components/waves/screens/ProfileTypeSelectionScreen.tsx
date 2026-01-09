import React from 'react';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';

interface ProfileTypeSelectionScreenProps {
  onSelect: (type: 'waves' | 'waves-kids') => void;
}

export function ProfileTypeSelectionScreen({ onSelect }: ProfileTypeSelectionScreenProps) {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <SerifHeading size="2xl" className="mb-8 text-center">
            Выберите профиль
          </SerifHeading>

          <div className="space-y-4">
            <button
              onClick={() => onSelect('waves')}
              className="w-full text-left transition-all hover:scale-[1.02]"
            >
              <WellnessCard gradient="blue" hover>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[#1a1a1a] mb-2">Waves</h2>
                    <p className="text-[#1a1a1a]/70">Для взрослых</p>
                  </div>
                </div>
              </WellnessCard>
            </button>

            <button
              onClick={() => onSelect('waves-kids')}
              className="w-full text-left transition-all hover:scale-[1.02]"
            >
              <WellnessCard gradient="pink" hover>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[#1a1a1a] mb-2">Waves Kids</h2>
                    <p className="text-[#1a1a1a]/70">Для детей</p>
                  </div>
                </div>
              </WellnessCard>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

