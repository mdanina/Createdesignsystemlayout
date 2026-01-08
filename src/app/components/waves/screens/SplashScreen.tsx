import React from 'react';
import { SerifHeading } from '../../design-system/SerifHeading';
import { GradientBackground } from '../../design-system/GradientBackground';
import { Logo } from '../../design-system/Logo';

export function SplashScreen() {
  return (
    <GradientBackground variant="lavender" className="flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          {/* Логотип Waves */}
          <div className="mx-auto mb-4 animate-pulse">
            <Logo size="xl" variant="default" />
          </div>
          <SerifHeading size="4xl" className="text-white">Waves</SerifHeading>
        </div>
      </div>
    </GradientBackground>
  );
}

