import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Loader2 } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';

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
    <div className="flex flex-col bg-white min-h-screen">
      {/* Шапка */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
        <button onClick={onClose} className="p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
          <X className="w-6 h-6" />
        </button>
        <SerifHeading size="xl">Подключение устройства</SerifHeading>
        <button onClick={onSupport} className="p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <SerifHeading size="2xl" className="mb-2">Подключите устройство</SerifHeading>
        <p className="text-[#1a1a1a]/70 mb-8 text-center">
          Нажмите кнопку питания на Flex4
        </p>

        {/* Анимация поиска */}
        {isSearching && (
          <div className="flex items-center gap-2 text-[#1a1a1a]/70 mb-8">
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
                className="w-full text-left transition-all hover:scale-[1.02]"
              >
                <WellnessCard gradient="blue" hover>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a]">{device}</h3>
                      <p className="text-sm text-[#1a1a1a]/70">Flex4</p>
                    </div>
                    <span className="text-2xl">📡</span>
                  </div>
                </WellnessCard>
              </button>
            ))}
          </div>
        )}

        {!isSearching && foundDevices.length === 0 && (
          <div className="text-center mb-6">
            <p className="text-[#1a1a1a]/70 mb-4">Устройства не найдены</p>
            <PillButton onClick={() => setIsSearching(true)} variant="secondary">
              Попробовать снова
            </PillButton>
          </div>
        )}

        <button
          onClick={onNoDevice}
          className="text-sm text-[#1a1a1a]/50 hover:text-[#1a1a1a]/70 underline"
        >
          У меня нет устройства
        </button>
      </div>
    </div>
  );
}

