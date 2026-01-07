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
} from './screens';
import { BottomNavigation } from '../design-system/BottomNavigation';
import { Home, BarChart3, Dumbbell, Settings, MessageCircle } from 'lucide-react';

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
  const [lastTrainingData, setLastTrainingData] = useState<{
    endReason: 'completed' | 'early' | 'technical';
    timeElapsed: number;
    duration: number;
    technicalIssue?: string;
  } | null>(null);

  // Mock данные для субпрофилей
  const allSubProfiles: SubProfile[] = [
    { id: '1', name: 'Миша', age: 9, type: 'child' },
    { id: '2', name: 'Анна', age: 38, type: 'adult' },
    { id: '3', name: 'Саша', age: 7, type: 'child' },
    { id: '4', name: 'Иван', age: 42, type: 'adult' },
  ];

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
    setCurrentScreen('training-tips');
  };

  const handleTrainingTipsContinue = () => {
    setCurrentScreen('training-selection');
  };

  const handleTrainingStart = () => {
    setCurrentScreen('active-training');
  };

  const handleTrainingComplete = (
    endReason: 'completed' | 'early' | 'technical',
    timeElapsed: number,
    technicalIssue?: string
  ) => {
    // Сохраняем данные о тренировке
    setLastTrainingData({
      endReason,
      timeElapsed,
      duration: 16 * 60, // 16 минут в секундах
      technicalIssue,
    });
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
        setCurrentScreen('support');
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
            streak={5}
          />
        );

      case 'check-in':
        return (
          <CheckInScreen
            childName={selectedSubProfile?.name}
            onContinue={handleCheckInComplete}
          />
        );

      case 'device-connection':
        return (
          <DeviceConnectionScreen
            onClose={() => setCurrentScreen('home')}
            onSupport={() => setCurrentScreen('support')}
            onConnected={handleDeviceConnected}
            onNoDevice={() => {
              window.open('https://waves.example.com', '_blank');
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
          />
        );

      case 'device-not-found':
        return (
          <DeviceNotFoundScreen
            onRetry={() => setCurrentScreen('device-connection')}
            onSupport={() => setCurrentScreen('support')}
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
            onBack={() => setCurrentScreen('home')}
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
            duration={16}
            timeInZone={68}
            streak={5}
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
          />
        );

      case 'training':
        return (
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Тренировка</h1>
              <p className="text-gray-600 mb-4">Выберите тренировку на главном экране</p>
              <button
                onClick={() => setCurrentScreen('home')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                На главный
              </button>
            </div>
          </div>
        );

      case 'settings':
        return (
          <SettingsScreen
            profileType={profileType}
            onProfileTypeChange={(type) => {
              setProfileType(type);
              setCurrentScreen('sub-profile-selection');
            }}
            onSwitchProfile={() => setCurrentScreen('sub-profile-selection')}
            onLogout={() => setCurrentScreen('login')}
          />
        );

      case 'support':
        return (
          <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="text-center max-w-md">
              <h1 className="text-2xl font-bold mb-4">Поддержка</h1>
              <p className="text-gray-600 mb-6">
                Открыть Telegram чат поддержки?
              </p>
              <button
                onClick={() => {
                  window.open('https://t.me/waves_support', '_blank');
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4"
              >
                Открыть Telegram
              </button>
              <button
                onClick={() => setCurrentScreen('home')}
                className="block w-full text-gray-600 hover:text-gray-900"
              >
                Назад
              </button>
            </div>
          </div>
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
    <div className="min-h-screen bg-white">
      {renderScreen()}
      {showBottomNav && (
        <BottomNavigation
          items={[
            { icon: <Home className="w-5 h-5" />, label: 'Сегодня', value: 'home' },
            { icon: <BarChart3 className="w-5 h-5" />, label: 'Прогресс', value: 'progress' },
            { icon: <Dumbbell className="w-5 h-5" />, label: 'Тренировка', value: 'training' },
            { icon: <Settings className="w-5 h-5" />, label: 'Настройки', value: 'settings' },
            { icon: <MessageCircle className="w-5 h-5" />, label: 'Поддержка', value: 'support' },
          ]}
          defaultValue={currentScreen}
          onChange={handleNavigation}
        />
      )}
    </div>
  );
}
