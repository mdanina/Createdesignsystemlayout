import React from 'react';
import { Crown, ChevronRight, Compass, BarChart2, Dumbbell, Grid, MoreHorizontal } from 'lucide-react';
import { CardStack } from '../design-system/CardStack';

interface HomeScreenProps {
  userName: string;
  onUpgrade?: () => void;
  onDailySnapshot?: () => void;
  onOrientation?: () => void;
  onTraining?: () => void;
  onBrainHealthCheck?: () => void;
  onNavigate?: (tab: string) => void;
}

export function HomeScreen({
  userName,
  onUpgrade,
  onDailySnapshot,
  onOrientation,
  onTraining,
  onBrainHealthCheck,
  onNavigate,
}: HomeScreenProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen flex flex-col bg-white max-w-md mx-auto">
      {/* Content */}
      <div className="flex-1 px-6 pt-6 pb-24 overflow-y-auto">
        {/* Upgrade Button */}
        <button
          onClick={onUpgrade}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#6B5B95] text-white text-sm font-medium rounded-full hover:bg-[#5A4A84] transition-colors mb-6"
        >
          <Crown className="w-4 h-4" />
          Upgrade
        </button>

        {/* Greeting */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300" />
          <h1 className="text-2xl font-semibold text-[#2D3142]">
            {getGreeting()}, {userName}.
          </h1>
        </div>

        {/* Daily Snapshot Card */}
        <button
          onClick={onDailySnapshot}
          className="w-full bg-[#4A5568] rounded-3xl p-5 mb-4 text-left relative overflow-hidden hover:bg-[#3D4852] transition-colors"
        >
          <div className="absolute top-3 right-3 px-2 py-1 bg-[#5ECEC5] text-white text-xs font-medium rounded-full">
            Beta
          </div>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-8 h-8">
                <circle cx="16" cy="14" r="8" fill="#7C3AED" opacity="0.8"/>
                <circle cx="12" cy="12" r="3" fill="#A78BFA"/>
                <circle cx="20" cy="16" r="3" fill="#A78BFA"/>
                <circle cx="14" cy="18" r="2" fill="#C4B5FD"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg">Your brain's daily snapshot</h3>
              <p className="text-gray-300 text-sm">~ 2 mins</p>
            </div>
          </div>
          <div className="text-right mt-2">
            <span className="text-[#5ECEC5] font-medium flex items-center justify-end">
              Start <ChevronRight className="w-4 h-4" />
            </span>
          </div>
        </button>

        {/* Wellness Cards Stack */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#2D3142] mb-4">Featured Activities</h2>
          <div className="flex justify-center">
            <CardStack
              items={[
                {
                  id: 1,
                  title: "Morning Meditation",
                  description: "Start your day with peace and clarity",
                  gradient: "coral"
                },
                {
                  id: 2,
                  title: "Breathing Exercise",
                  description: "Calm your mind in minutes",
                  gradient: "blue"
                },
                {
                  id: 3,
                  title: "Evening Reflection",
                  description: "Wind down and reflect on your day",
                  gradient: "lavender"
                },
                {
                  id: 4,
                  title: "Mindful Walk",
                  description: "Connect with nature and yourself",
                  gradient: "pink"
                },
              ]}
              className="mx-auto"
            />
          </div>
        </div>

        {/* Action Cards */}
        <div className="space-y-3">
          {/* Take an orientation */}
          <button
            onClick={onOrientation}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                <Compass className="w-6 h-6 text-blue-500" />
              </div>
              <span className="font-medium text-[#2D3142]">Take an orientation</span>
            </div>
            <span className="text-[#5ECEC5] font-medium flex items-center">
              Start <ChevronRight className="w-4 h-4" />
            </span>
          </button>

          {/* Start a training session */}
          <button
            onClick={onTraining}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <rect width="48" height="48" fill="#E8E0F0"/>
                  <circle cx="24" cy="16" r="10" fill="#5ECEC5"/>
                  <ellipse cx="24" cy="40" rx="14" ry="12" fill="#9B7FCF"/>
                  <circle cx="24" cy="14" r="6" fill="#3ECEC5"/>
                </svg>
              </div>
              <span className="font-medium text-[#2D3142]">Start a training session</span>
            </div>
            <div className="text-right mt-2">
              <span className="text-[#5ECEC5] font-medium flex items-center justify-end">
                Train now <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </button>

          {/* Get a brain health check */}
          <button
            onClick={onBrainHealthCheck}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <rect width="48" height="48" fill="#FFF4E6"/>
                  <circle cx="18" cy="28" r="10" fill="#FFD4A8" opacity="0.8"/>
                  <circle cx="30" cy="24" r="8" fill="#FFB366" opacity="0.8"/>
                  <circle cx="24" cy="20" r="4" fill="#FF9933"/>
                </svg>
              </div>
              <span className="font-medium text-[#2D3142]">Get a brain health check</span>
            </div>
            <span className="text-[#5ECEC5] font-medium flex items-center">
              Start <ChevronRight className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 max-w-md mx-auto">
        <div className="flex items-center justify-around">
          {[
            { icon: <TodayIcon />, label: 'Today', value: 'today', active: true },
            { icon: <BarChart2 className="w-6 h-6" />, label: 'Insights', value: 'insights' },
            { icon: <TrainIcon />, label: 'Train', value: 'train' },
            { icon: <Grid className="w-6 h-6" />, label: 'Explore', value: 'explore' },
            { icon: <MoreHorizontal className="w-6 h-6" />, label: 'More', value: 'more' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => onNavigate?.(item.value)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                item.active ? 'text-[#5ECEC5]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Custom icons
function TodayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function TrainIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}
