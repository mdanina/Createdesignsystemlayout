import React from 'react';
import { PillButton } from '../../design-system/PillButton';

interface ProfileTypeSelectionScreenProps {
  onSelect: (type: 'waves' | 'waves-kids') => void;
}

export function ProfileTypeSelectionScreen({ onSelect }: ProfileTypeSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Выберите профиль
          </h1>

          <div className="space-y-4">
            <button
              onClick={() => onSelect('waves')}
              className="w-full p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Waves</h2>
                  <p className="text-gray-600">Для взрослых</p>
                </div>
                <span className="text-4xl">🧠</span>
              </div>
            </button>

            <button
              onClick={() => onSelect('waves-kids')}
              className="w-full p-6 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl border-2 border-pink-200 hover:border-pink-400 transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Waves Kids</h2>
                  <p className="text-gray-600">Для детей</p>
                </div>
                <span className="text-4xl">👶</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

