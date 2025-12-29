import React from 'react';
import { cn } from '../ui/utils';

type GradientVariant = 'peach' | 'lavender' | 'cream' | 'pink';

interface GradientBackgroundProps {
  variant: GradientVariant;
  className?: string;
  children?: React.ReactNode;
}

const gradientStyles: Record<GradientVariant, string> = {
  peach: 'bg-gradient-to-br from-[#ffecd2] via-[#ffd7ba] to-[#fcb69f]',
  lavender: 'bg-gradient-to-br from-[#e6dff5] via-[#d4c5f0] to-[#c8b8e8]',
  cream: 'bg-gradient-to-br from-[#fef3e2] via-[#ffecd2] to-[#ffd7ba]',
  pink: 'bg-gradient-to-br from-[#ffd6e8] via-[#ffc9df] to-[#ffb5d5]',
};

export function GradientBackground({ variant, className, children }: GradientBackgroundProps) {
  return (
    <div className={cn('min-h-screen w-full', gradientStyles[variant], className)}>
      {children}
    </div>
  );
}
