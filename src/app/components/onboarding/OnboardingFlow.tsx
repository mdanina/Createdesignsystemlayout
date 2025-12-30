import React, { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { SignUpScreen } from './SignUpScreen';
import { SignInScreen } from './SignInScreen';
import { ProfileInfoScreen } from './ProfileInfoScreen';
import { SourceSurveyScreen } from './SourceSurveyScreen';
import { ProviderReferralScreen } from './ProviderReferralScreen';

export type OnboardingStep =
  | 'welcome'
  | 'signin'
  | 'signup'
  | 'profile'
  | 'source'
  | 'provider';

interface OnboardingFlowProps {
  onComplete?: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    sex: '',
    dateOfBirth: '',
    source: '',
    hasProvider: null as boolean | null,
  });

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const goBack = () => {
    const stepOrder: OnboardingStep[] = ['welcome', 'signup', 'profile', 'source', 'provider'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const updateUserData = (data: Partial<typeof userData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const handleComplete = () => {
    console.log('Onboarding complete:', userData);
    onComplete?.();
  };

  return (
    <div className="min-h-screen bg-white">
      {currentStep === 'welcome' && (
        <WelcomeScreen
          onGetStarted={() => goToStep('signup')}
          onSignIn={() => goToStep('signin')}
        />
      )}
      {currentStep === 'signin' && (
        <SignInScreen
          onBack={() => goToStep('welcome')}
          onSignIn={(email, password) => {
            updateUserData({ email, password });
            handleComplete();
          }}
          onSignUpInstead={() => goToStep('signup')}
        />
      )}
      {currentStep === 'signup' && (
        <SignUpScreen
          onBack={() => goToStep('welcome')}
          onSignUp={(email, password) => {
            updateUserData({ email, password });
            goToStep('profile');
          }}
          onSignInInstead={() => goToStep('signin')}
        />
      )}
      {currentStep === 'profile' && (
        <ProfileInfoScreen
          onBack={goBack}
          onContinue={(data) => {
            updateUserData(data);
            goToStep('source');
          }}
        />
      )}
      {currentStep === 'source' && (
        <SourceSurveyScreen
          onBack={goBack}
          onSelect={(source) => {
            updateUserData({ source });
            goToStep('provider');
          }}
        />
      )}
      {currentStep === 'provider' && (
        <ProviderReferralScreen
          onBack={goBack}
          onSelect={(hasProvider) => {
            updateUserData({ hasProvider });
            handleComplete();
          }}
        />
      )}
    </div>
  );
}
