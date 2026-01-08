import React from 'react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { GradientBackground } from '../../design-system/GradientBackground';

interface WelcomeFlowScreenProps {
  step: 1 | 2 | 3;
  childName?: string;
  onNext: () => void;
  onComplete: () => void;
  onStepChange?: (step: 1 | 2 | 3) => void;
}

export function WelcomeFlowScreen({ step, childName = 'ребёнка', onNext, onComplete, onStepChange }: WelcomeFlowScreenProps) {
  const handleStepClick = (stepNumber: 1 | 2 | 3) => {
    if (stepNumber !== step) {
      if (onStepChange) {
        // Прямое переключение на любой шаг (вперед или назад)
        onStepChange(stepNumber);
      } else {
        // Fallback: используем onNext только для перехода вперед
        if (stepNumber > step) {
          if (step === 1 && stepNumber === 2) {
            onNext();
          } else if (step === 2 && stepNumber === 3) {
            onNext();
          } else if (step === 1 && stepNumber === 3) {
            onNext();
            setTimeout(() => onNext(), 100);
          }
        }
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="text-6xl mb-6">👋</div>
            <SerifHeading size="2xl" className="mb-4">
              Привет, {childName || 'Имя'}!
            </SerifHeading>
            <p className="text-gray-600 mb-2">
              Вы на пути к тому, чтобы помочь {childName || 'Имя ребенка'}
            </p>
            <p className="text-gray-600">
              Waves — это научно доказанный метод тренировки внимания
            </p>
          </>
        );

      case 2:
        return (
          <>
            <div className="text-6xl mb-6">🎯</div>
            <SerifHeading size="2xl" className="mb-6">Как это работает:</SerifHeading>
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
          </>
        );

      case 3:
        return (
          <>
            <div className="text-6xl mb-6">📈</div>
            <SerifHeading size="2xl" className="mb-6">Когда ждать результат:</SerifHeading>
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
            <div className="flex justify-center">
              <PillButton onClick={onComplete} variant="coral" className="mt-6">
                Начать
              </PillButton>
            </div>
          </>
        );
    }
  };

  return (
    <GradientBackground variant="lavender" className="flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center">
        {renderStep()}
        
        {/* Интерактивный слайдер (точки пагинации) */}
        <div className="flex gap-2 justify-center mt-8">
          <button
            onClick={() => handleStepClick(1)}
            className={`h-3 rounded-full transition-all ${
              step === 1 ? 'bg-[#b8a0d6] w-8' : 'bg-white/50 hover:bg-white/70 w-3'
            }`}
            aria-label="Шаг 1"
          />
          <button
            onClick={() => handleStepClick(2)}
            className={`h-3 rounded-full transition-all ${
              step === 2 ? 'bg-[#b8a0d6] w-8' : 'bg-white/50 hover:bg-white/70 w-3'
            }`}
            aria-label="Шаг 2"
          />
          <button
            onClick={() => handleStepClick(3)}
            className={`h-3 rounded-full transition-all ${
              step === 3 ? 'bg-[#b8a0d6] w-8' : 'bg-white/50 hover:bg-white/70 w-3'
            }`}
            aria-label="Шаг 3"
          />
        </div>
      </div>
    </GradientBackground>
  );
}
