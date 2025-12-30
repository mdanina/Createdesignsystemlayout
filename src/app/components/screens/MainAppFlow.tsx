import React, { useState } from 'react';
import { ConnectHeadbandScreen } from './ConnectHeadbandScreen';
import { NoHeadbandScreen } from './NoHeadbandScreen';
import { HomeScreen } from './HomeScreen';
import { BrainSnapshotScreen } from './BrainSnapshotScreen';
import { MoodCheckInScreen } from './MoodCheckInScreen';

export type MainAppScreen =
  | 'connect-headband'
  | 'no-headband'
  | 'home'
  | 'brain-snapshot'
  | 'mood-checkin';

interface MainAppFlowProps {
  userName: string;
  initialScreen?: MainAppScreen;
  onBack?: () => void;
}

export function MainAppFlow({ userName, initialScreen = 'connect-headband', onBack }: MainAppFlowProps) {
  const [currentScreen, setCurrentScreen] = useState<MainAppScreen>(initialScreen);

  const goToScreen = (screen: MainAppScreen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 'connect-headband' && (
        <ConnectHeadbandScreen
          onClose={() => onBack?.()}
          onNoHeadband={() => goToScreen('no-headband')}
          onConnect={() => goToScreen('home')}
        />
      )}

      {currentScreen === 'no-headband' && (
        <NoHeadbandScreen
          onClose={() => goToScreen('connect-headband')}
          onGotIt={() => goToScreen('home')}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          userName={userName}
          onUpgrade={() => console.log('Upgrade clicked')}
          onDailySnapshot={() => goToScreen('brain-snapshot')}
          onOrientation={() => console.log('Orientation clicked')}
          onTraining={() => goToScreen('mood-checkin')}
          onBrainHealthCheck={() => console.log('Brain health check clicked')}
          onNavigate={(tab) => console.log('Navigate to:', tab)}
        />
      )}

      {currentScreen === 'brain-snapshot' && (
        <BrainSnapshotScreen
          onBack={() => goToScreen('home')}
          onStart={() => goToScreen('mood-checkin')}
        />
      )}

      {currentScreen === 'mood-checkin' && (
        <MoodCheckInScreen
          onContinue={(data) => {
            console.log('Mood data:', data);
            goToScreen('home');
          }}
        />
      )}
    </div>
  );
}
