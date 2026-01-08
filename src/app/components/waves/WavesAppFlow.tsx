import React, { useState } from 'react';
import {
  SplashScreen,
  LoginScreen,
  ForgotPasswordScreen,
  ProfileTypeSelectionScreen,
  SubProfileSelectionScreen,
  WelcomeFlowScreen,
  PermissionsExplanationScreen,
  HomeScreen,
  CheckInScreen,
  DeviceConnectionScreen,
  DeviceConnectedScreen,
  DeviceNotFoundScreen,
  DeviceInTransitScreen,
  WearingInstructionScreen,
  SignalCheckScreen,
  TrainingTipsScreen,
  TrainingSelectionScreen,
  ActiveTrainingScreen,
  BreathingTrainingScreen,
  TrainingCompleteScreen,
  PostTrainingCheckoutScreen,
  ProgressScreen,
  SettingsScreen,
  PurchaseScreen,
  PlaylistScreen,
  ProfileScreen,
  TrainingDetailScreen,
  TutorialScreen,
} from './screens';
import { BottomNavigation } from '../design-system/BottomNavigation';
import { PillButton } from '../design-system/PillButton';
import { Modal } from '../design-system/Modal';
import { Home, BarChart3, Music2, Settings, MessageCircle } from 'lucide-react';

type WavesScreen =
  | 'splash'
  | 'login'
  | 'forgot-password'
  | 'profile-type-selection'
  | 'sub-profile-selection'
  | 'welcome-1'
  | 'welcome-2'
  | 'welcome-3'
  | 'permissions'
  | 'home'
  | 'check-in'
  | 'device-connection'
  | 'device-connected'
  | 'device-not-found'
  | 'device-in-transit'
  | 'purchase'
  | 'wearing-instruction'
  | 'signal-check'
  | 'training-tips'
  | 'training-selection'
  | 'active-training'
  | 'breathing-training'
  | 'training-complete'
  | 'post-training-checkout'
  | 'progress'
  | 'training'
  | 'settings'
  | 'profile'
  | 'training-detail'
  | 'tutorial'
  | 'support';

interface SubProfile {
  id: string;
  name: string;
  age?: number;
  avatar?: string;
  type?: 'child' | 'adult';
}

export function WavesAppFlow() {
  const [currentScreen, setCurrentScreen] = useState<WavesScreen>('splash');
  const [profileType, setProfileType] = useState<'waves' | 'waves-kids'>('waves-kids');
  const [selectedSubProfile, setSelectedSubProfile] = useState<SubProfile | null>(null);
  const [welcomeStep, setWelcomeStep] = useState<1 | 2 | 3>(1);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [selectedTrainingType, setSelectedTrainingType] = useState<string>('tbr');
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
  // Состояние устройства и подписки
  const [hasDevice, setHasDevice] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState<'basic' | 'parent-child' | null>(null);
  const [deviceStatus, setDeviceStatus] = useState<'none' | 'in-transit' | 'delivered'>('none');
  const [lastTrainingData, setLastTrainingData] = useState<{
    endReason: 'completed' | 'early' | 'technical';
    timeElapsed: number;
    duration: number;
    technicalIssue?: string;
  } | null>(null);
  
  // История тренировок
  const [trainingHistory, setTrainingHistory] = useState<Array<{
    id: string;
    date: string;
    type: string;
    duration: number; // в минутах
    timeElapsed: number; // в секундах
    timeInZone: number;
    endReason: 'completed' | 'early' | 'technical';
    technicalIssue?: string;
    points?: number;
  }>>([]);
  const [selectedTrainingSession, setSelectedTrainingSession] = useState<{
    id: string;
    date: string;
    type: string;
    duration: number;
    timeElapsed: number;
    timeInZone: number;
    endReason: 'completed' | 'early' | 'technical';
    technicalIssue?: string;
    points?: number;
  } | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Mock данные для субпрофилей
  const [allSubProfiles, setAllSubProfiles] = useState<SubProfile[]>([
    { id: '1', name: 'Миша', age: 9, type: 'child' },
    { id: '2', name: 'Анна', age: 38, type: 'adult' },
    { id: '3', name: 'Саша', age: 7, type: 'child' },
    { id: '4', name: 'Иван', age: 42, type: 'adult' },
  ]);

  // Фильтруем субпрофили по типу профиля
  const mockSubProfiles = allSubProfiles.filter((profile) => {
    if (profileType === 'waves-kids') {
      return profile.type === 'child' || (profile.age && profile.age < 18);
    } else {
      return profile.type === 'adult' || (profile.age && profile.age >= 18);
    }
  });

  // После сплэш-экрана показываем логин
  React.useEffect(() => {
    if (currentScreen === 'splash') {
      setTimeout(() => setCurrentScreen('login'), 2000);
    }
  }, [currentScreen]);

  const handleLogin = (email: string, password: string) => {
    // Для демо-режима принимаем любые данные для входа
    // После успешного логина → выбор типа профиля
    setCurrentScreen('profile-type-selection');
  };

  const handleProfileTypeSelect = (type: 'waves' | 'waves-kids') => {
    setProfileType(type);
    setCurrentScreen('sub-profile-selection');
  };

  const handleSubProfileSelect = (profileId: string) => {
    const profile = allSubProfiles.find((p) => p.id === profileId);
    if (profile) {
      setSelectedSubProfile(profile);
      if (isFirstLaunch) {
        setCurrentScreen('welcome-1');
      } else {
        setCurrentScreen('home');
      }
    }
  };

  const handleWelcomeNext = () => {
    if (welcomeStep < 3) {
      setWelcomeStep((prev) => (prev + 1) as 1 | 2 | 3);
      setCurrentScreen(`welcome-${welcomeStep + 1}` as WavesScreen);
    }
  };

  const handleWelcomeComplete = () => {
    setIsFirstLaunch(false);
    setCurrentScreen('permissions');
  };

  const handlePermissionsContinue = () => {
    setCurrentScreen('home');
  };

  const handleStartTraining = (type: string) => {
    setSelectedTrainingType(type);
    if (type === 'breathing') {
      // Дыхательные упражнения не требуют устройства
      setCurrentScreen('check-in');
    } else {
      // Для других тренировок нужен check-in и устройство
      setCurrentScreen('check-in');
    }
  };

  const handleCheckInComplete = () => {
    if (selectedTrainingType === 'breathing') {
      setCurrentScreen('breathing-training');
    } else if (!connectedDevice) {
      setCurrentScreen('device-connection');
    } else {
      setCurrentScreen('training-tips');
    }
  };

  const handleDeviceConnected = (deviceId: string) => {
    setConnectedDevice(deviceId);
    setCurrentScreen('device-connected');
  };

  const handleDeviceContinue = () => {
    setCurrentScreen('wearing-instruction');
  };

  const handleWearingReady = () => {
    setCurrentScreen('signal-check');
  };

  const handleSignalCheckComplete = () => {
    setCurrentScreen('training-selection');
  };

  const handleTrainingTipsContinue = () => {
    setCurrentScreen('active-training');
  };

  const handleTrainingStart = () => {
    setCurrentScreen('training-tips');
  };

  const handleTrainingComplete = (
    endReason: 'completed' | 'early' | 'technical',
    timeElapsed: number,
    technicalIssue?: string
  ) => {
    // Сохраняем данные о тренировке с реальным временем
    const trainingData = {
      endReason,
      timeElapsed,
      duration: 16 * 60, // Планируемая длительность тренировки (16 минут в секундах)
      technicalIssue,
    };
    setLastTrainingData(trainingData);
    
    // Сохраняем в историю тренировок с правильной пометкой причины завершения
    const newSession = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('ru-RU'),
      type: selectedTrainingType === 'tbr' ? 'TBR' : 
            selectedTrainingType === 'alpha' ? 'Alpha' : 
            selectedTrainingType === 'smr' ? 'SMR' : 
            selectedTrainingType === 'breathing' ? 'Дыхание' : 'Тренировка',
      duration: Math.round(timeElapsed / 60), // в минутах для отображения
      timeElapsed, // в секундах для точности
      timeInZone: endReason === 'completed' ? 68 : 0, // только для завершенных тренировок
      endReason,
      technicalIssue,
      points: endReason === 'completed' ? Math.round(timeElapsed / 60) * 50 : undefined, // очки только за завершенные
    };
    setTrainingHistory((prev) => [newSession, ...prev]);
    
    setCurrentScreen('training-complete');
  };

  const handleTrainingCompleteDone = () => {
    // После завершения тренировки → Post-training Check-out (M28b)
    setCurrentScreen('post-training-checkout');
  };

  const handlePostTrainingCheckoutComplete = () => {
    // После check-out → главный экран
    // TODO: Здесь можно добавить проверку на первую тренировку и показать запрос push-уведомлений (M28d)
    setCurrentScreen('home');
  };

  const handleNavigation = (tab: string) => {
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'progress':
        setCurrentScreen('progress');
        break;
      case 'training':
        setCurrentScreen('training');
        break;
      case 'settings':
        setCurrentScreen('settings');
        break;
      case 'support':
        setIsSupportModalOpen(true);
        break;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;

      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onForgotPassword={() => setCurrentScreen('forgot-password')}
          />
        );

      case 'forgot-password':
        return (
          <ForgotPasswordScreen
            onBack={() => setCurrentScreen('login')}
            onSend={(email) => {
              console.log('Send password reset to:', email);
            }}
          />
        );

      case 'profile-type-selection':
        return <ProfileTypeSelectionScreen onSelect={handleProfileTypeSelect} />;

      case 'sub-profile-selection':
        return (
          <SubProfileSelectionScreen
            profiles={mockSubProfiles}
            profileType={profileType}
            onSelect={handleSubProfileSelect}
            onBack={() => setCurrentScreen('profile-type-selection')}
            onLogout={() => setCurrentScreen('login')}
            canAdd={true}
          />
        );

      case 'welcome-1':
      case 'welcome-2':
      case 'welcome-3':
        return (
          <WelcomeFlowScreen
            step={welcomeStep}
            childName={selectedSubProfile?.name}
            onNext={handleWelcomeNext}
            onComplete={handleWelcomeComplete}
            onStepChange={(newStep) => {
              setWelcomeStep(newStep);
              setCurrentScreen(`welcome-${newStep}` as WavesScreen);
            }}
          />
        );

      case 'permissions':
        return <PermissionsExplanationScreen onContinue={handlePermissionsContinue} />;

      case 'home':
        return (
          <HomeScreen
            childName={selectedSubProfile?.name}
            profileType={profileType}
            onProfileTypeChange={(type) => {
              setProfileType(type);
              setCurrentScreen('sub-profile-selection');
            }}
            onStartTraining={handleStartTraining}
            onTutorial={() => setCurrentScreen('tutorial')}
            streak={5}
          />
        );

      case 'check-in':
        return (
          <CheckInScreen
            childName={selectedSubProfile?.name}
            onContinue={handleCheckInComplete}
            onBack={() => setCurrentScreen('home')}
          />
        );

      case 'device-connection':
        return (
          <DeviceConnectionScreen
            onClose={() => setCurrentScreen('home')}
            onSupport={() => setIsSupportModalOpen(true)}
            onConnected={handleDeviceConnected}
            onNoDevice={() => {
              // Проверяем статус устройства и подписки
              if (!hasDevice && !hasSubscription) {
                // Нет устройства и подписки - показываем экран покупки
                setCurrentScreen('purchase');
              } else if (deviceStatus === 'in-transit') {
                // Устройство в пути
                setCurrentScreen('device-in-transit');
              } else {
                // Устройство не куплено, но есть подписка (или другая ситуация)
                setCurrentScreen('purchase');
              }
            }}
          />
        );

      case 'device-connected':
        return (
          <DeviceConnectedScreen
            deviceId={connectedDevice || 'Flex4-12345'}
            onContinue={handleDeviceContinue}
            onClose={() => setCurrentScreen('home')}
            onHome={() => setCurrentScreen('home')}
            onBack={() => setCurrentScreen('device-connection')}
          />
        );

      case 'device-not-found':
        return (
          <DeviceNotFoundScreen
            onRetry={() => setCurrentScreen('device-connection')}
            onSupport={() => setIsSupportModalOpen(true)}
          />
        );

      case 'device-in-transit':
        return (
          <DeviceInTransitScreen
            onBreathingExercise={() => setCurrentScreen('breathing-training')}
            onVideo={() => window.open('https://www.youtube.com/watch?v=example', '_blank')}
            onBack={() => setCurrentScreen('home')}
          />
        );

      case 'purchase':
        return (
          <PurchaseScreen
            onPurchase={() => {
              // После покупки: активируем подписку и устройство
              setHasSubscription(true);
              setSubscriptionType('basic'); // Можно определить тип на основе выбранного пакета
              setDeviceStatus('in-transit'); // Устройство будет доставлено
              // Переходим на главный экран
              setCurrentScreen('home');
            }}
            onBack={() => setCurrentScreen('home')}
          />
        );

      case 'wearing-instruction':
        return (
          <WearingInstructionScreen
            onBack={() => setCurrentScreen('device-connected')}
            onReady={handleWearingReady}
          />
        );

      case 'signal-check':
        return (
          <SignalCheckScreen
            onBack={() => setCurrentScreen('wearing-instruction')}
            onAllGood={handleSignalCheckComplete}
          />
        );

      case 'training-tips':
        return (
          <TrainingTipsScreen
            onBack={() => {
              // Возвращаемся к выбору тренировки
              setCurrentScreen('training-selection');
            }}
            onContinue={handleTrainingTipsContinue}
          />
        );

      case 'training-selection':
        return (
          <TrainingSelectionScreen
            currentProgram={{
              id: selectedTrainingType,
              name: 'Концентрация',
              description: 'Тренировка внимания',
              waves: 'Theta/Beta (4-7 / 15-20 Hz)',
              duration: 16,
              eyesOpen: true,
              current: true,
            }}
            onStart={handleTrainingStart}
            onChangeProgram={() => {
              // Можно добавить модальное окно выбора программы
            }}
            onBack={() => {
              // Возвращаемся на предыдущий экран в зависимости от контекста
              if (connectedDevice) {
                setCurrentScreen('signal-check');
              } else {
                setCurrentScreen('home');
              }
            }}
          />
        );

      case 'active-training':
        return (
          <ActiveTrainingScreen
            trainingType={selectedTrainingType}
            duration={16 * 60} // 16 минут в секундах
            onPause={() => setCurrentScreen('training-pause')}
            onComplete={(endReason, timeElapsed, technicalIssue) => handleTrainingComplete(endReason, timeElapsed, technicalIssue)}
            onTechnicalIssue={() => {
              // Симуляция технической проблемы - можно вызвать при потере сигнала
              // В реальном приложении это будет вызываться автоматически при обнаружении проблемы
              const currentTime = Math.floor(Math.random() * 8 * 60); // Случайное время до 8 минут
              handleTrainingComplete('technical', currentTime, 'Потерян сигнал с устройства. Проверьте подключение электродов.');
            }}
          />
        );

      case 'breathing-training':
        return (
          <BreathingTrainingScreen
            pattern={{ inhale: 4, hold: 4, exhale: 4, hold2: 4 }}
            onPause={() => {
              // Можно добавить экран паузы
            }}
            onComplete={(endReason, timeElapsed, technicalIssue) => handleTrainingComplete(endReason, timeElapsed, technicalIssue)}
          />
        );

      case 'training-complete':
        return (
          <TrainingCompleteScreen
            userName={selectedSubProfile?.name || 'Пользователь'}
            duration={lastTrainingData ? Math.round(lastTrainingData.timeElapsed / 60) : 16}
            timeElapsed={lastTrainingData?.timeElapsed || 0}
            timeInZone={68}
            streak={lastTrainingData?.endReason === 'completed' ? 5 : 0}
            endReason={lastTrainingData?.endReason || 'completed'}
            technicalIssue={lastTrainingData?.technicalIssue}
            trainingType={selectedTrainingType}
            onComplete={handleTrainingCompleteDone}
          />
        );

      case 'post-training-checkout':
        return (
          <PostTrainingCheckoutScreen
            childName={selectedSubProfile?.name}
            onComplete={handlePostTrainingCheckoutComplete}
            onSkip={handlePostTrainingCheckoutComplete}
          />
        );

      case 'progress':
        return (
          <ProgressScreen
            userName={selectedSubProfile?.name}
            onBack={() => setCurrentScreen('home')}
            sessions={trainingHistory}
            onSessionClick={(sessionId) => {
              console.log('onSessionClick called with sessionId:', sessionId);
              console.log('trainingHistory:', trainingHistory);
              // Ищем в trainingHistory или используем mock данные
              let session = trainingHistory.find((s) => s.id === sessionId);
              
              // Если не найдено в trainingHistory, создаем из mock данных
              if (!session) {
                const defaultSessions = [
                  { id: '1', date: '05.01.2026', type: 'TBR', duration: 16, timeElapsed: 960, timeInZone: 68, endReason: 'completed' as const, points: 850 },
                  { id: '2', date: '04.01.2026', type: 'Alpha', duration: 16, timeElapsed: 960, timeInZone: 72, endReason: 'completed' as const, points: 920 },
                  { id: '3', date: '03.01.2026', type: 'SMR', duration: 16, timeElapsed: 960, timeInZone: 65, endReason: 'completed' as const, points: 780 },
                  { id: '4', date: '02.01.2026', type: 'TBR', duration: 16, timeElapsed: 960, timeInZone: 70, endReason: 'completed' as const, points: 880 },
                  { id: '5', date: '01.01.2026', type: 'Дыхание', duration: 10, timeElapsed: 600, timeInZone: 0, endReason: 'completed' as const },
                ];
                session = defaultSessions.find((s) => s.id === sessionId);
              }
              
              if (session) {
                console.log('Session found:', session);
                setSelectedTrainingSession(session);
                setCurrentScreen('training-detail');
              } else {
                console.warn('Session not found for id:', sessionId);
              }
            }}
          />
        );

      case 'training':
        return (
          <PlaylistScreen onBack={() => setCurrentScreen('home')} />
        );

      case 'settings':
        return (
          <SettingsScreen
            currentProfile={selectedSubProfile}
            allProfiles={allSubProfiles}
            onProfileChange={(profileId) => {
              const profile = allSubProfiles.find((p) => p.id === profileId);
              if (profile) {
                setSelectedSubProfile(profile);
                // Автоматически определяем тип профиля на основе возраста/типа пользователя
                if (profile.type === 'child' || (profile.age && profile.age < 18)) {
                  setProfileType('waves-kids');
                } else {
                  setProfileType('waves');
                }
                // Остаемся на экране настроек после переключения
              }
            }}
            onProfileClick={() => setCurrentScreen('profile')}
            onLogout={() => setCurrentScreen('login')}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            profile={selectedSubProfile}
            hasSubscription={hasSubscription}
            subscriptionType={subscriptionType}
            onBack={() => setCurrentScreen('settings')}
            onSave={(updatedProfile) => {
              // Обновляем профиль в списке
              setAllSubProfiles((prev) =>
                prev.map((p) => (p.id === updatedProfile.id ? updatedProfile : p))
              );
              setSelectedSubProfile(updatedProfile);
              setCurrentScreen('settings');
            }}
            onUpgrade={() => setCurrentScreen('purchase')}
          />
        );

      case 'training-detail':
        return (
          <TrainingDetailScreen
            session={selectedTrainingSession}
            onBack={() => setCurrentScreen('progress')}
          />
        );

      case 'tutorial':
        return (
          <TutorialScreen
            onBack={() => setCurrentScreen('home')}
            onComplete={() => setCurrentScreen('home')}
          />
        );

      default:
        return <SplashScreen />;
    }
  };

  const showBottomNav =
    currentScreen === 'home' ||
    currentScreen === 'progress' ||
    currentScreen === 'training' ||
    currentScreen === 'settings';

  return (
    <div className="min-h-screen bg-white relative">
      {renderScreen()}
      {showBottomNav && (
        <BottomNavigation
          items={[
            { icon: <Home className="w-5 h-5" />, label: 'Сегодня', value: 'home' },
            { icon: <BarChart3 className="w-5 h-5" />, label: 'Прогресс', value: 'progress' },
            { icon: <Music2 className="w-5 h-5" />, label: 'Плейлист', value: 'training' },
            { icon: <Settings className="w-5 h-5" />, label: 'Настройки', value: 'settings' },
            { icon: <MessageCircle className="w-5 h-5" />, label: 'Поддержка', value: 'support' },
          ]}
          defaultValue={currentScreen}
          onChange={handleNavigation}
        />
      )}

      {/* Модальное окно поддержки */}
      <Modal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
        size="md"
        showCloseButton={false}
      >
        <div className="space-y-4">
          <p className="text-[#1a1a1a]/80 text-center">
            Открыть Telegram чат поддержки?
          </p>
          <div className="flex gap-3 pt-2">
            <PillButton
              onClick={() => {
                window.open('https://t.me/waves_support', '_blank');
                setIsSupportModalOpen(false);
              }}
              variant="coral"
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Открыть Telegram
            </PillButton>
            <PillButton
              onClick={() => setIsSupportModalOpen(false)}
              variant="secondary"
              className="flex-1"
            >
              Отмена
            </PillButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
