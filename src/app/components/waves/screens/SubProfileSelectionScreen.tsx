import React from 'react';
import { Plus, ArrowLeft, LogOut } from 'lucide-react';
import { Avatar } from '../../design-system/Avatar';
import { PillButton } from '../../design-system/PillButton';

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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Шапка с кнопкой назад */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Назад</span>
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-900 flex-1 text-center">Выберите пользователя</h1>
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
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all text-left flex items-center gap-4"
            >
              <Avatar
                size="lg"
                name={profile.name}
                src={profile.avatar}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                {profile.age && (
                  <p className="text-sm text-gray-500">{profile.age} лет</p>
                )}
              </div>
            </button>
          ))}
        </div>

        {canAdd && onAdd && (
          <button
            onClick={onAdd}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <Plus className="w-5 h-5" />
            <span>Добавить пользователя</span>
          </button>
        )}
      </div>
    </div>
  );
}

