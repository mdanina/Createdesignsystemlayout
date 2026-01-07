import React from 'react';
import { Package, Wind, Video } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface DeviceInTransitScreenProps {
  deliveryDate?: string;
  trackingNumber?: string;
  onBreathingExercise?: () => void;
  onVideo?: () => void;
}

export function DeviceInTransitScreen({
  deliveryDate = '8 января',
  trackingNumber,
  onBreathingExercise,
  onVideo,
}: DeviceInTransitScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <Package className="w-20 h-20 text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ваш Flex4 в пути! 📦</h1>
          <p className="text-gray-600 mb-4">Статус: Ожидается доставка {deliveryDate}</p>

          {trackingNumber && (
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 text-sm underline mb-8 block"
            >
              Трек-номер: {trackingNumber}
            </a>
          )}

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h2 className="font-semibold text-gray-900 mb-4">Что можно сделать сейчас:</h2>
            <div className="space-y-3">
              {onBreathingExercise && (
                <button
                  onClick={onBreathingExercise}
                  className="w-full flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-left"
                >
                  <Wind className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">Попробовать дыхательные упражнения</span>
                </button>
              )}
              {onVideo && (
                <button
                  onClick={onVideo}
                  className="w-full flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-left"
                >
                  <Video className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-900">Посмотреть видео «Что такое нейрофидбек»</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

