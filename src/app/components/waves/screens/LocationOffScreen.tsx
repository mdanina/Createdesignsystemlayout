import React from 'react';
import { MapPin } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface LocationOffScreenProps {
  onOpenSettings: () => void;
}

export function LocationOffScreen({ onOpenSettings }: LocationOffScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
          <MapPin className="w-16 h-16 text-orange-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Геолокация</h1>
        <p className="text-gray-600 mb-6">
          Требуется для Bluetooth. Мы не отслеживаем ваше местоположение.
        </p>

        <PillButton onClick={onOpenSettings} variant="coral" className="w-full">
          Открыть настройки
        </PillButton>
      </div>
    </div>
  );
}

