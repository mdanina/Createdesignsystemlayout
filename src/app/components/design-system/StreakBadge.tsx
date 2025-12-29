import React from 'react';
import { cn } from '../ui/utils';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  days: number;
  className?: string;
}

export function StreakBadge({ days, className }: StreakBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 bg-gradient-to-r from-[#ff8a65] to-[#ff9775] text-white px-4 py-2 rounded-full shadow-md',
        className
      )}
    >
      <Flame className="w-4 h-4" />
      <span className="text-sm font-medium">{days} DAY STREAK</span>
    </div>
  );
}
