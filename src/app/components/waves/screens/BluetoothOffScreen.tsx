import React from 'react';
import { Bluetooth } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface BluetoothOffScreenProps {
  onEnable: () => void;
  onCancel: () => void;
}

export function BluetoothOffScreen({ onEnable, onCancel }: BluetoothOffScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center relative">
          <Bluetooth className="w-16 h-16 text-red-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-1 bg-red-600 rotate-45"></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Bluetooth выключен</h1>
        <p className="text-gray-600 mb-6">
          Для подключения Flex4 необходимо включить Bluetooth
        </p>

        <div className="space-y-3">
          <PillButton onClick={onEnable} variant="coral" className="w-full">
            Включить
          </PillButton>
          <PillButton onClick={onCancel} variant="secondary" className="w-full">
            Отмена
          </PillButton>
        </div>
      </div>
    </div>
  );
}

