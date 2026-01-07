import React from 'react';
import { Settings } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface PermissionsDeniedScreenProps {
  onOpenSettings: () => void;
  onCancel: () => void;
}

export function PermissionsDeniedScreen({ onOpenSettings, onCancel }: PermissionsDeniedScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
          <Settings className="w-16 h-16 text-orange-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Нужны разрешения</h1>
        <p className="text-gray-600 mb-6">
          Для работы приложения необходимы разрешения на Bluetooth и геолокацию.
          Без них мы не сможем подключить устройство Flex4.
        </p>

        <div className="space-y-3">
          <PillButton onClick={onOpenSettings} variant="coral" className="w-full">
            <Settings className="w-4 h-4 mr-2" />
            Открыть настройки
          </PillButton>
          <PillButton onClick={onCancel} variant="secondary" className="w-full">
            Отмена
          </PillButton>
        </div>
      </div>
    </div>
  );
}

