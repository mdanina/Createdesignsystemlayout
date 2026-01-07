import React from 'react';
import { PillButton } from '../../design-system/PillButton';

interface PermissionsExplanationScreenProps {
  onContinue: () => void;
}

export function PermissionsExplanationScreen({ onContinue }: PermissionsExplanationScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm text-center">
          {/* Изображение Flex4 */}
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <span className="text-5xl">📱</span>
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-4">
            Для подключения устройства нужны разрешения
          </h1>

          <div className="space-y-3 mb-8 text-left">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <span className="text-2xl">📡</span>
              <div>
                <p className="font-semibold text-gray-900">Bluetooth</p>
                <p className="text-sm text-gray-600">для связи с Flex4</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold text-gray-900">Геолокация</p>
                <p className="text-sm text-gray-600">требуется для BT на Android</p>
              </div>
            </div>
          </div>

          <PillButton onClick={onContinue} variant="coral" className="w-full">
            Понятно
          </PillButton>
        </div>
      </div>
    </div>
  );
}

