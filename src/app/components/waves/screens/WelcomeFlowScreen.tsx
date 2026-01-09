import React from 'react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';

interface WelcomeFlowScreenProps {
  step: 1 | 2 | 3;
  childName?: string;
  parentName?: string;
  onNext: () => void;
  onComplete: () => void;
  onStepChange?: (step: 1 | 2 | 3) => void;
}

// Функция для склонения имени в дательный падеж (кому?)
function toDativeCase(name: string): string {
  if (!name) return name;
  
  const trimmed = name.trim();
  if (trimmed.length === 0) return name;
  
  // Имена на -а/-я -> -е (Миша -> Мише, Саша -> Саше, Маша -> Маше)
  if (trimmed.endsWith('а') || trimmed.endsWith('я')) {
    return trimmed.slice(0, -1) + 'е';
  }
  
  // Имена на -ь -> -ю (Игорь -> Игорю)
  if (trimmed.endsWith('ь')) {
    return trimmed.slice(0, -1) + 'ю';
  }
  
  // Имена на согласную -> добавляем -у (Иван -> Ивану, но это упрощенно)
  // Для большинства мужских имен на согласную
  if (!trimmed.endsWith('а') && !trimmed.endsWith('я') && !trimmed.endsWith('ь') && !trimmed.endsWith('й')) {
    return trimmed + 'у';
  }
  
  // Имена на -й -> -ю (Андрей -> Андрею)
  if (trimmed.endsWith('й')) {
    return trimmed.slice(0, -1) + 'ю';
  }
  
  // Если не подошло ни одно правило, возвращаем как есть
  return name;
}

export function WelcomeFlowScreen({ step, childName = 'ребёнка', parentName, onNext, onComplete, onStepChange }: WelcomeFlowScreenProps) {
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
            <div className="text-6xl mb-4">👋</div>
            <SerifHeading size="2xl" className="mb-3">
              Привет, {parentName || 'родитель'}!
            </SerifHeading>
            <p className="text-gray-600 mb-1.5">
              Вы на пути к тому, чтобы помочь {childName ? toDativeCase(childName) : 'вашему ребёнку'}
            </p>
            <p className="text-gray-600">
              Waves — это научно доказанный метод тренировки внимания
            </p>
          </>
        );

      case 2:
        return (
          <>
            <SerifHeading size="2xl" className="mb-6">Как это работает:</SerifHeading>
            <div className="space-y-2.5 text-left mb-6 pl-16">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                  1
                </div>
                <p className="text-gray-700 pt-1">Наденьте Flex4 на {childName ? toDativeCase(childName) : 'ребёнка'}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                  2
                </div>
                <p className="text-gray-700 pt-1">Тренируйтесь 15-20 минут в день</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                  3
                </div>
                <p className="text-gray-700 pt-1">Мозг учится концентрироваться</p>
              </div>
            </div>
            <p className="text-gray-500 italic mb-6">
              Регулярность важнее интенсивности
            </p>
          </>
        );

      case 3:
        return (
          <>
            <SerifHeading size="2xl" className="mb-6">Когда ждать результат:</SerifHeading>
            <div className="space-y-2.5 text-left mb-6 pl-16">
              <div className="flex items-start gap-2">
                <span className="text-xl">📅</span>
                <div>
                  <p className="font-semibold text-gray-900">Неделя 1-2:</p>
                  <p className="text-gray-600">{childName || 'Имя ребенка'} привыкает к тренировкам</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xl">📅</span>
                <div>
                  <p className="font-semibold text-gray-900">Неделя 3-4:</p>
                  <p className="text-gray-600">Первые улучшения в концентрации</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xl">📅</span>
                <div>
                  <p className="font-semibold text-gray-900">Неделя 5-8:</p>
                  <p className="text-gray-600">Устойчивый результат</p>
                </div>
              </div>
            </div>
            <p className="text-gray-500 mb-6">
              Ключ к успеху — тренировки 4-5 раз в неделю
            </p>
            <div className="flex justify-center">
              <PillButton onClick={onComplete} variant="gradientMesh" className="mt-4">
                Начать
              </PillButton>
            </div>
          </>
        );
    }
  };

  return (
    <div 
      className="flex items-center justify-center px-10 py-12 min-h-screen"
      style={{
        backgroundImage: 'url(/bg2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full max-w-md text-center">
        {renderStep()}
        
        {/* Интерактивный слайдер (точки пагинации) */}
        <div className="flex gap-2 justify-center mt-6">
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
    </div>
  );
}
