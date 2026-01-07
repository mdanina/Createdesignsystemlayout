import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';

interface WelcomeFlowScreenProps {
  step: 1 | 2 | 3;
  childName?: string;
  onNext: () => void;
  onComplete: () => void;
}

export function WelcomeFlowScreen({ step, childName = 'ребёнка', onNext, onComplete }: WelcomeFlowScreenProps) {
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="text-6xl mb-6">👋</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Привет, {childName || 'Имя'}!
            </h1>
            <p className="text-gray-600 mb-2">
              Вы на пути к тому, чтобы помочь {childName || 'Имя ребенка'}
            </p>
            <p className="text-gray-600">
              Waves — это научно доказанный метод тренировки внимания
            </p>
            <div className="flex gap-2 mt-8">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
            <PillButton onClick={onNext} variant="coral" className="mt-6">
              Далее <ChevronRight className="w-4 h-4 ml-2" />
            </PillButton>
          </>
        );

      case 2:
        return (
          <>
            <div className="text-6xl mb-6">🎯</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Как это работает:</h1>
            <div className="space-y-4 text-left mb-8">
              <div className="flex items-start gap-3">
                <span className="text-2xl">1️⃣</span>
                <p className="text-gray-700">Наденьте Flex4 на {childName || 'Имя ребенка'}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">2️⃣</span>
                <p className="text-gray-700">Тренируйтесь 15-20 минут в день</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">3️⃣</span>
                <p className="text-gray-700">Мозг учится концентрироваться</p>
              </div>
            </div>
            <p className="text-gray-500 italic mb-8">
              Регулярность важнее интенсивности
            </p>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
            <PillButton onClick={onNext} variant="coral" className="mt-6">
              Далее <ChevronRight className="w-4 h-4 ml-2" />
            </PillButton>
          </>
        );

      case 3:
        return (
          <>
            <div className="text-6xl mb-6">📈</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Когда ждать результат:</h1>
            <div className="space-y-4 text-left mb-8">
              <div className="flex items-start gap-3">
                <span className="text-xl">📅</span>
                <div>
                  <p className="font-semibold text-gray-900">Неделя 1-2:</p>
                  <p className="text-gray-600">{childName || 'Имя ребенка'} привыкает к тренировкам</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📅</span>
                <div>
                  <p className="font-semibold text-gray-900">Неделя 3-4:</p>
                  <p className="text-gray-600">Первые улучшения в концентрации</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📅</span>
                <div>
                  <p className="font-semibold text-gray-900">Неделя 5-8:</p>
                  <p className="text-gray-600">Устойчивый результат</p>
                </div>
              </div>
            </div>
            <p className="text-gray-500 mb-8">
              Ключ к успеху — тренировки 4-5 раз в неделю
            </p>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            </div>
            <PillButton onClick={onComplete} variant="coral" className="mt-6">
              Начать
            </PillButton>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center">
        {renderStep()}
      </div>
    </div>
  );
}

