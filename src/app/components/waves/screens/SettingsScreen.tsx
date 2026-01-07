import React from 'react';
import { ChevronRight, User, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Toggle } from '../../design-system/Toggle';

interface SettingsScreenProps {
  profileType: 'waves' | 'waves-kids';
  onProfileTypeChange: (type: 'waves' | 'waves-kids') => void;
  onSwitchProfile: () => void;
  onLogout: () => void;
}

export function SettingsScreen({
  profileType,
  onProfileTypeChange,
  onSwitchProfile,
  onLogout,
}: SettingsScreenProps) {
  const [notifications, setNotifications] = React.useState(true);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        </div>

        {/* Переключатель профилей */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-gray-900">Тип профиля</p>
            <div className="flex items-center gap-2 bg-white rounded-full p-1">
              <button
                onClick={() => onProfileTypeChange('waves')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  profileType === 'waves'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600'
                }`}
              >
                Waves
              </button>
              <button
                onClick={() => onProfileTypeChange('waves-kids')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  profileType === 'waves-kids'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600'
                }`}
              >
                Waves Kids
              </button>
            </div>
          </div>
          <button
            onClick={onSwitchProfile}
            className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900">Сменить пользователя</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Профиль */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Профиль</h2>
          <div className="bg-gray-50 rounded-xl space-y-1">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-100 rounded-xl">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Профиль</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-100 rounded-xl">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Безопасность</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Уведомления */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Уведомления</h2>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Push-уведомления</span>
              </div>
              <Toggle checked={notifications} onChange={setNotifications} />
            </div>
          </div>
        </div>

        {/* Помощь */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Помощь</h2>
          <div className="bg-gray-50 rounded-xl">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-100 rounded-xl">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Помощь и поддержка</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Выход */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 p-4 text-red-600 hover:bg-red-50 rounded-xl"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Выйти из аккаунта</span>
        </button>
      </div>
    </div>
  );
}

