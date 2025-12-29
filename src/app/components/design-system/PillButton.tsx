import React from 'react';
import { cn } from '../ui/utils';

interface PillButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'coral' | 'outline' | 'black';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]',
  secondary: 'bg-white text-[#1a1a1a] hover:bg-gray-50 shadow-[0_2px_10px_rgba(0,0,0,0.08)]',
  coral: 'bg-[#ff8a65] text-white hover:bg-[#ff9775]',
  outline: 'bg-transparent border-2 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white',
  black: 'bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] shadow-sm',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function PillButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  icon,
}: PillButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full font-medium transition-all duration-200 flex items-center gap-2 justify-center',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
      {icon && <span className="flex items-center">{icon}</span>}
    </button>
  );
}