import React from 'react';
import { Plus, ArrowLeft, LogOut } from 'lucide-react';
import { Avatar } from '../../design-system/Avatar';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { GradientBackground } from '../../design-system/GradientBackground';

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
    <GradientBackground variant="cream" className="flex flex-col">
      {/* Шапка с кнопкой назад */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a]"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Назад</span>
          </button>
        )}
        <SerifHeading size="xl" className="flex-1 text-center">Выберите пользователя</SerifHeading>
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            title="Выйти из аккаунта"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
        {!onBack && !onLogout && <div className="w-16"></div>}
      </div>

      <div className="flex-1 px-6 py-8">

        <div className="space-y-3 mb-6">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => onSelect(profile.id)}
              className="w-full text-left transition-all hover:scale-[1.02]"
            >
              <WellnessCard hover>
                <div className="flex items-center gap-4">
                  <Avatar
                    size="lg"
                    name={profile.name}
                    src={profile.avatar}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1a1a1a]">{profile.name}</h3>
                    {profile.age && (
                      <p className="text-sm text-[#1a1a1a]/50">{profile.age} лет</p>
                    )}
                  </div>
                </div>
              </WellnessCard>
            </button>
          ))}
        </div>

        {canAdd && onAdd && (
          <button
            onClick={onAdd}
            className="w-full transition-all hover:scale-[1.02]"
          >
            <WellnessCard gradient="blue" hover>
              <div className="flex items-center justify-center gap-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
                <Plus className="w-5 h-5" />
                <span>Добавить пользователя</span>
              </div>
            </WellnessCard>
          </button>
        )}
      </div>
    </GradientBackground>
  );
}

