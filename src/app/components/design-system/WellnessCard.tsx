import React from 'react';
import { cn } from '../ui/utils';

interface WellnessCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  gradient?: 'coral' | 'blue' | 'pink' | 'lavender';
  hover?: boolean;
}

const gradientClasses = {
  coral: 'bg-gradient-to-br from-[#ffd4c4] via-[#ffb299] to-[#ff8a65]',
  blue: 'bg-gradient-to-br from-[#47BDF7]/20 via-[#6ab9e7]/25 to-[#47BDF7]/30',
  pink: 'bg-gradient-to-br from-[#ffd6e8]/30 to-[#ffb5d5]/40',
  lavender: 'bg-gradient-to-br from-[#d4c5f0]/30 to-[#b8a0d6]/40',
};

export function WellnessCard({ children, className, gradient, hover = false, ...props }: WellnessCardProps) {
  return (
    <div
      {...props}
      className={cn(
        'rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]',
        gradient ? gradientClasses[gradient] : 'bg-white',
        hover && 'transition-all duration-300 hover:shadow-[0_6px_30px_rgba(0,0,0,0.1)] hover:scale-[1.02]',
        className
      )}
    >
      {children}
    </div>
  );
}