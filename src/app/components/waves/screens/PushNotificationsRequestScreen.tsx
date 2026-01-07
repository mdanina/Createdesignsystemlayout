import React from 'react';
import { Bell } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface PushNotificationsRequestScreenProps {
  childName?: string;
  onEnable: () => void;
  onSkip: () => void;
}

export function PushNotificationsRequestScreen({
  childName = 'Миша',
  onEnable,
  onSkip,
}: PushNotificationsRequestScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
          <Bell className="w-16 h-16 text-blue-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Хотите напоминания о тренировках?
        </h1>
        <p className="text-gray-600 mb-8">
          Мы напомним, когда пора тренироваться, и расскажем о прогрессе {childName}
        </p>

        <div className="space-y-3">
          <PillButton onClick={onEnable} variant="coral" className="w-full">
            Включить уведомления
          </PillButton>
          <button onClick={onSkip} className="w-full text-gray-500 hover:text-gray-700 text-sm">
            Не сейчас
          </button>
        </div>
      </div>
    </div>
  );
}

