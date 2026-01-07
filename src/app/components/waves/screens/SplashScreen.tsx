import React from 'react';

export function SplashScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="text-center">
        <div className="mb-8">
          {/* Логотип Waves - можно заменить на реальный */}
          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center mb-4 animate-pulse">
            <span className="text-4xl">🌊</span>
          </div>
          <h1 className="text-4xl font-bold text-white">Waves</h1>
        </div>
      </div>
    </div>
  );
}

