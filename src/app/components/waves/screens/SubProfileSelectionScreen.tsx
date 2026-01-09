import React from 'react';
import { Plus } from 'lucide-react';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';

interface SubProfile {
  id: string;
  name: string;
  age?: number;
  avatar?: string;
}

interface SubProfileSelectionScreenProps {
  profiles: SubProfile[];
  profileType: 'waves' | 'waves-kids';
  onSelect: (profileId: string) => void;
  onAdd?: () => void;
  onBack?: () => void;
  onLogout?: () => void;
  canAdd?: boolean;
}

export function SubProfileSelectionScreen({
  profiles,
  profileType,
  onSelect,
  onAdd,
  onBack,
  onLogout,
  canAdd = false,
}: SubProfileSelectionScreenProps) {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <SerifHeading size="2xl" className="mb-8 text-center">
            Выберите пользователя
          </SerifHeading>

          <div className="space-y-4 mb-6">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => onSelect(profile.id)}
                className="w-full text-left transition-all hover:scale-[1.02]"
              >
                <WellnessCard hover>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{profile.name}</h3>
                    {profile.age && (
                      <p className="text-[#1a1a1a]/70">{profile.age} лет</p>
                    )}
                  </div>
                </WellnessCard>
              </button>
            ))}

            {canAdd && onAdd && (
              <button
                onClick={onAdd}
                className="w-full text-left transition-all hover:scale-[1.02]"
              >
                <WellnessCard hover>
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-[#1a1a1a]/70" />
                    <span className="text-xl font-semibold text-[#1a1a1a]">Добавить пользователя</span>
                  </div>
                </WellnessCard>
              </button>
            )}
          </div>

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

