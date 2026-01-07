import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Loader2 } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface DeviceConnectionScreenProps {
  onClose: () => void;
  onSupport: () => void;
  onConnected: (deviceId: string) => void;
  onNoDevice: () => void;
}

export function DeviceConnectionScreen({
  onClose,
  onSupport,
  onConnected,
  onNoDevice,
}: DeviceConnectionScreenProps) {
  const [isSearching, setIsSearching] = useState(true);
  const [foundDevices, setFoundDevices] = useState<string[]>([]);

  useEffect(() => {
    // Симуляция поиска устройств
    const timer = setTimeout(() => {
      setIsSearching(false);
      setFoundDevices(['Flex4-12345', 'Flex4-67890']);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Шапка */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-900">
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Подключение устройства</h1>
        <button onClick={onSupport} className="p-2 text-gray-600 hover:text-gray-900">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Изображение Flex4 */}
        <div className="w-48 h-48 mb-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center relative">
          <span className="text-8xl">📱</span>
          {/* Кнопка питания */}
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">⚡</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Подключите устройство</h2>
        <p className="text-gray-600 mb-8 text-center">
          Нажмите кнопку питания на Flex4
        </p>

        {/* Анимация поиска */}
        {isSearching && (
          <div className="flex items-center gap-2 text-gray-600 mb-8">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Поиск устройств...</span>
          </div>
        )}

        {/* Список найденных устройств */}
        {!isSearching && foundDevices.length > 0 && (
          <div className="w-full max-w-sm space-y-3 mb-6">
            {foundDevices.map((device) => (
              <button
                key={device}
                onClick={() => onConnected(device)}
                className="w-full p-4 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{device}</h3>
                    <p className="text-sm text-gray-600">Flex4</p>
                  </div>
                  <span className="text-2xl">📡</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {!isSearching && foundDevices.length === 0 && (
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">Устройства не найдены</p>
            <PillButton onClick={() => setIsSearching(true)} variant="secondary">
              Попробовать снова
            </PillButton>
          </div>
        )}

        <button
          onClick={onNoDevice}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          У меня нет устройства
        </button>
      </div>
    </div>
  );
}

