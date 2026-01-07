import React from 'react';
import { Download, X } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface AppUpdateScreenProps {
  isMandatory?: boolean;
  onUpdate: () => void;
  onLater?: () => void;
}

export function AppUpdateScreen({ isMandatory = false, onUpdate, onLater }: AppUpdateScreenProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Доступна новая версия</h1>
        <p className="text-gray-600 mb-6">
          Обновите приложение для получения новых функций и исправлений
        </p>

        <div className="space-y-3">
          <PillButton onClick={onUpdate} variant="coral" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Обновить
          </PillButton>
          {!isMandatory && onLater && (
            <PillButton onClick={onLater} variant="secondary" className="w-full">
              Позже
            </PillButton>
          )}
        </div>
      </div>
    </div>
  );
}

