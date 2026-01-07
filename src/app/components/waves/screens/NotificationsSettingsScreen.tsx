import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Toggle } from '../../design-system/Toggle';

interface NotificationsSettingsScreenProps {
  onBack: () => void;
}

export function NotificationsSettingsScreen({ onBack }: NotificationsSettingsScreenProps) {
  const [trainingReminders, setTrainingReminders] = useState(true);
  const [trainingTime, setTrainingTime] = useState('18:00');
  const [streakNotifications, setStreakNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [achievements, setAchievements] = useState(true);
  const [tipsAndArticles, setTipsAndArticles] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center px-4 py-4 border-b border-gray-100">
        <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Уведомления</h1>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="space-y-6">
          {/* Напоминания о тренировках */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-gray-900">Напоминания о тренировках</p>
              </div>
              <Toggle checked={trainingReminders} onChange={setTrainingReminders} />
            </div>
            {trainingReminders && (
              <div className="mt-3">
                <label className="block text-sm text-gray-600 mb-2">Время</label>
                <input
                  type="time"
                  value={trainingTime}
                  onChange={(e) => setTrainingTime(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Streak-уведомления */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900">Streak-уведомления</p>
              <Toggle checked={streakNotifications} onChange={setStreakNotifications} />
            </div>
          </div>

          {/* Еженедельный отчёт */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900">Еженедельный отчёт</p>
              <Toggle checked={weeklyReport} onChange={setWeeklyReport} />
            </div>
          </div>

          {/* Достижения */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900">Достижения</p>
              <Toggle checked={achievements} onChange={setAchievements} />
            </div>
          </div>

          {/* Советы и статьи */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-900">Советы и статьи</p>
              <Toggle checked={tipsAndArticles} onChange={setTipsAndArticles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

