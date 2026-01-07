import React from 'react';
import { WifiOff, CheckCircle2 } from 'lucide-react';

interface OfflineModeScreenProps {
  isOnline: boolean;
}

export function OfflineModeScreen({ isOnline }: OfflineModeScreenProps) {
  if (isOnline) {
    return (
      <div className="bg-green-50 border-b border-green-200 px-4 py-3 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-green-600" />
        <p className="text-sm text-green-900">Данные синхронизированы ✓</p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
      <div className="flex items-center gap-3 mb-3">
        <WifiOff className="w-5 h-5 text-yellow-600" />
        <p className="font-semibold text-yellow-900">Нет подключения к интернету</p>
      </div>
      <div className="ml-8 space-y-2 text-sm">
        <div>
          <p className="font-semibold text-gray-900 mb-1">Доступно офлайн:</p>
          <ul className="space-y-1 text-gray-700">
            <li>✅ Тренировки (до 3 закэшированных)</li>
            <li>✅ Дыхательные упражнения</li>
            <li>✅ Просмотр истории</li>
            <li>✅ Библиотека (загруженные статьи)</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900 mb-1">Недоступно офлайн:</p>
          <ul className="space-y-1 text-gray-700">
            <li>❌ Синхронизация прогресса</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

