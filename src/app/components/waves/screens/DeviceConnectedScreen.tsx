import React from 'react';
import { CheckCircle2, X, Home } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface DeviceConnectedScreenProps {
  deviceId: string;
  batteryLevel?: number;
  onContinue: () => void;
  onClose?: () => void;
  onHome?: () => void;
}

export function DeviceConnectedScreen({
  deviceId,
  batteryLevel = 85,
  onContinue,
  onClose,
  onHome,
}: DeviceConnectedScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Шапка с кнопками */}
      <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-4 border-b border-gray-100">
        {onClose ? (
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            title="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>
        ) : null}
        <div className="flex-1"></div>
        {onHome && (
          <button
            onClick={onHome}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2"
            title="На главный экран"
          >
            <Home className="w-6 h-6" />
            <span className="text-sm">Главная</span>
          </button>
        )}
        {!onHome && !onClose && <div></div>}
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Устройство подключено</h1>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="mb-2">
              <p className="text-sm text-gray-600">Серийный номер</p>
              <p className="font-semibold text-gray-900">{deviceId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Заряд</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${batteryLevel}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-gray-900">{batteryLevel}%</span>
              </div>
            </div>
          </div>

          <PillButton onClick={onContinue} variant="coral" className="w-full mb-3">
            Продолжить
          </PillButton>
          {onHome && (
            <button
              onClick={onHome}
              className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 py-2 text-sm"
            >
              <Home className="w-4 h-4" />
              <span>На главный экран</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

