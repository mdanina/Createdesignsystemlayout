import React from 'react';
import { AlertTriangle, MessageCircle } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface DeviceNotFoundScreenProps {
  onRetry: () => void;
  onSupport: () => void;
}

export function DeviceNotFoundScreen({ onRetry, onSupport }: DeviceNotFoundScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-16 h-16 text-orange-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Устройство не найдено</h1>
        <p className="text-gray-600 mb-8">
          Убедитесь, что Flex4 включён и рядом
        </p>

        <div className="space-y-3">
          <PillButton onClick={onRetry} variant="coral" className="w-full">
            Попробовать снова
          </PillButton>

          <button
            onClick={onSupport}
            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Проблемы?</span>
          </button>
        </div>
      </div>
    </div>
  );
}

