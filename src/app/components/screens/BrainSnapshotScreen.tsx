import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BrainSnapshotScreenProps {
  onBack: () => void;
  onStart: () => void;
}

export function BrainSnapshotScreen({ onBack, onStart }: BrainSnapshotScreenProps) {
  const features = [
    {
      icon: <HeadbandIcon />,
      text: 'Wear headband for 2 mins - no electrodes required.',
    },
    {
      icon: <BrainMetricsIcon />,
      text: "See your brain's load, focus, and fatigue.",
    },
    {
      icon: <PatternsIcon />,
      text: 'Track patterns over time.',
    },
    {
      icon: <DailyIcon />,
      text: 'Do it daily.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#5A6B7A] max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="px-3 py-1 bg-[#5ECEC5] text-white text-xs font-medium rounded-full">
          Beta
        </div>
      </div>

      {/* Brain Illustration */}
      <div className="flex-1 flex flex-col items-center px-6">
        <div className="relative w-48 h-48 my-8">
          {/* Background blobs */}
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Outer golden blob */}
            <ellipse cx="100" cy="100" rx="80" ry="70" fill="#C9A86C" opacity="0.6"/>
            <ellipse cx="95" cy="95" rx="70" ry="60" fill="#D4B87A" opacity="0.7"/>
            {/* Brain shape */}
            <g transform="translate(50, 40)">
              <ellipse cx="50" cy="60" rx="45" ry="50" fill="#7C6AAE"/>
              {/* Brain folds/details */}
              <circle cx="35" cy="45" r="12" fill="#9B8AC4"/>
              <circle cx="65" cy="45" r="14" fill="#9B8AC4"/>
              <circle cx="45" cy="70" r="10" fill="#9B8AC4"/>
              <circle cx="55" cy="55" r="8" fill="#B4A6D4"/>
              {/* Glowing dots */}
              <circle cx="30" cy="50" r="4" fill="#5ECEC5"/>
              <circle cx="50" cy="35" r="3" fill="#5ECEC5"/>
              <circle cx="70" cy="55" r="4" fill="#5ECEC5"/>
              <circle cx="45" cy="75" r="3" fill="#5ECEC5"/>
            </g>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-[28px] font-semibold text-white text-center mb-4">
          Your brain's daily snapshot
        </h1>

        {/* Duration badge */}
        <div className="px-4 py-2 bg-[#5ECEC5]/20 text-[#5ECEC5] text-sm font-medium rounded-full mb-8">
          ~ 2 mins
        </div>

        {/* Features list */}
        <div className="w-full space-y-5 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-8 h-8 flex-shrink-0">
                {feature.icon}
              </div>
              <p className="text-white/90 text-[15px] leading-relaxed pt-1">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Start button */}
      <div className="px-6 pb-8">
        <button
          onClick={onStart}
          className="w-full py-4 bg-[#5ECEC5] text-white font-medium rounded-full hover:bg-[#4DBDB4] transition-colors"
        >
          Start
        </button>
      </div>
    </div>
  );
}

// Feature icons
function HeadbandIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <polygon points="6,16 16,8 26,16 16,24" fill="#5ECEC5"/>
    </svg>
  );
}

function BrainMetricsIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <circle cx="10" cy="16" r="8" fill="#5ECEC5" opacity="0.5"/>
      <circle cx="22" cy="16" r="8" fill="#FFB366" opacity="0.5"/>
    </svg>
  );
}

function PatternsIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <rect x="4" y="8" width="8" height="16" rx="2" fill="#9B8AC4"/>
      <rect x="14" y="12" width="8" height="12" rx="2" fill="#FFB366"/>
      <rect x="24" y="6" width="4" height="18" rx="2" fill="#5ECEC5"/>
    </svg>
  );
}

function DailyIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <rect x="6" y="6" width="8" height="8" rx="2" fill="#FF8A80"/>
      <rect x="18" y="6" width="8" height="8" rx="2" fill="#5ECEC5"/>
      <rect x="6" y="18" width="8" height="8" rx="2" fill="#FFB366"/>
      <rect x="18" y="18" width="8" height="8" rx="2" fill="#9B8AC4"/>
    </svg>
  );
}
