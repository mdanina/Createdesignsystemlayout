import React, { useState } from 'react';
import { GradientBackground } from './components/design-system/GradientBackground';
import { WellnessCard } from './components/design-system/WellnessCard';
import { SerifHeading } from './components/design-system/SerifHeading';
import { PillButton } from './components/design-system/PillButton';
import { EmojiSelector } from './components/design-system/EmojiSelector';
import { StatCard } from './components/design-system/StatCard';
import { MoodChart } from './components/design-system/MoodChart';
import { VerticalSlider } from './components/design-system/VerticalSlider';
import { BottomNavigation } from './components/design-system/BottomNavigation';
import { TopNavigation } from './components/design-system/TopNavigation';
import { DropdownSelector } from './components/design-system/DropdownSelector';
import { StreakBadge } from './components/design-system/StreakBadge';
import { InfoBadge } from './components/design-system/InfoBadge';
import { MobileScreen } from './components/design-system/MobileScreen';
import { DesignSystemDocs } from './components/design-system/DesignSystemDocs';
import { ComponentShowcase } from './components/design-system/ComponentShowcase';
import { 
  Menu, 
  Bell, 
  ChevronLeft, 
  Home, 
  Heart, 
  Book, 
  User, 
  Activity, 
  Clock,
  ArrowRight,
  X,
  Smile,
  FileText,
  LayoutGrid
} from 'lucide-react';

const mockMoodData = [
  { day: 'M', mood: 5 },
  { day: 'T', mood: 7 },
  { day: 'W', mood: 6 },
  { day: 'T', mood: 8 },
  { day: 'F', mood: 9 },
  { day: 'S', mood: 7 },
  { day: 'S', mood: 6 },
];

const emojiOptions = [
  { emoji: '😢', label: 'Sad', value: 'sad' },
  { emoji: '😐', label: 'Okay', value: 'okay' },
  { emoji: '😊', label: 'Good', value: 'good' },
  { emoji: '😄', label: 'Great', value: 'great' },
  { emoji: '🤩', label: 'Amazing', value: 'amazing' },
];

const navItems = [
  { icon: <Home className="w-5 h-5" />, label: 'Today', value: 'today' },
  { icon: <Activity className="w-5 h-5" />, label: 'Track', value: 'track' },
  { icon: <Smile className="w-5 h-5" />, label: 'Mood', value: 'mood' },
  { icon: <Book className="w-5 h-5" />, label: 'Library', value: 'library' },
  { icon: <User className="w-5 h-5" />, label: 'Profile', value: 'profile' },
];

const sliderLabels = [
  { value: 8, label: 'Very Well' },
  { value: 6, label: 'Good' },
  { value: 4, label: 'Fair' },
  { value: 2, label: 'Poor' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'mood' | 'sleep'>('home');
  const [viewMode, setViewMode] = useState<'demo' | 'showcase' | 'docs'>('demo');

  const renderHomeScreen = () => (
    <GradientBackground variant="cream">
      <TopNavigation
        leftIcon={<Menu className="w-5 h-5" />}
        rightIcon={<Bell className="w-5 h-5" />}
        greeting="Good Evening"
      />

      <div className="px-6 pt-6 pb-24 space-y-6">
        <StreakBadge days={3} className="mb-4" />

        <SerifHeading size="2xl">
          New Day
          <br />
          Fresh Start!
        </SerifHeading>

        <WellnessCard className="mt-6">
          <button className="w-full text-left">
            <p className="text-sm opacity-70 mb-2">Begin Morning Preparation</p>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
        </WellnessCard>

        <WellnessCard gradient="coral">
          <p className="mb-4">
            Are you the type of person who believes reviews often?
          </p>
          <PillButton size="sm" onClick={() => setCurrentScreen('mood')}>
            Reflect
          </PillButton>
        </WellnessCard>

        <div className="space-y-4">
          <h3 className="font-medium">How are you feeling?</h3>
          <EmojiSelector options={emojiOptions} defaultValue="good" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Stress Level"
            value="48"
            unit="%"
            gradient="blue"
          />
          <StatCard
            label="Sleep Quality"
            value="5h"
            gradient="pink"
          />
        </div>
      </div>

      <BottomNavigation items={navItems} defaultValue="today" />
    </GradientBackground>
  );

  const renderMoodScreen = () => (
    <GradientBackground variant="lavender">
      <TopNavigation
        leftIcon={<ChevronLeft className="w-5 h-5" />}
        title={<DropdownSelector options={['Weeks', 'Months', 'Year']} defaultValue="Weeks" />}
        onLeftClick={() => setCurrentScreen('home')}
      />

      <div className="px-6 pt-6 pb-24 space-y-6">
        <SerifHeading size="2xl">Good Mood</SerifHeading>

        <InfoBadge icon={<Smile className="w-4 h-4" />} text="3.6 average mood" />

        <p className="text-sm opacity-70">You focus on health and good mind</p>

        <WellnessCard className="mt-6">
          <MoodChart data={mockMoodData} />
          <div className="flex items-center justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#b8a0d6]" />
              <span>This week</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <span>Previous week</span>
            </div>
          </div>
        </WellnessCard>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <StatCard
            label="Stress Level"
            value="48"
            unit="%"
            gradient="blue"
          />
          <StatCard
            label="Sleep Quality"
            value="5h"
            gradient="pink"
          />
        </div>
      </div>

      <BottomNavigation items={navItems} defaultValue="mood" onChange={() => setCurrentScreen('sleep')} />
    </GradientBackground>
  );

  const renderSleepScreen = () => (
    <GradientBackground variant="peach">
      <TopNavigation
        leftIcon={<ChevronLeft className="w-5 h-5" />}
        rightIcon={<X className="w-5 h-5" />}
        onLeftClick={() => setCurrentScreen('mood')}
      />

      <div className="px-6 pt-6 pb-24 space-y-8">
        <div className="text-center">
          <div className="inline-block p-3 bg-white/60 rounded-full mb-4">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <SerifHeading size="2xl" className="text-center">
          How Well Did You
          <br />
          Sleep Today?
        </SerifHeading>

        <p className="text-sm opacity-70 text-center max-w-sm mx-auto">
          We ask about your sleep so you can monitor it and improve its quality. Since good sleep is essential to healthy and prosperous life.
        </p>

        <div className="flex justify-center mt-12">
          <VerticalSlider
            min={0}
            max={8}
            defaultValue={5}
            labels={sliderLabels}
            color="#ff8a65"
          />
        </div>

        <div className="flex justify-center mt-8">
          <PillButton variant="coral" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Continue
          </PillButton>
        </div>
      </div>
    </GradientBackground>
  );

  if (viewMode === 'docs') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="fixed top-6 right-6 z-50 flex gap-3">
          <PillButton variant="secondary" onClick={() => setViewMode('showcase')}>
            <LayoutGrid className="w-4 h-4" />
            Components
          </PillButton>
          <PillButton variant="primary" onClick={() => setViewMode('demo')}>
            <X className="w-4 h-4" />
            Close
          </PillButton>
        </div>
        <DesignSystemDocs />
      </div>
    );
  }

  if (viewMode === 'showcase') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <SerifHeading size="xl">Component Library</SerifHeading>
            <div className="flex gap-3">
              <PillButton variant="secondary" onClick={() => setViewMode('docs')}>
                <FileText className="w-4 h-4" />
                Documentation
              </PillButton>
              <PillButton variant="primary" onClick={() => setViewMode('demo')}>
                <X className="w-4 h-4" />
                Close
              </PillButton>
            </div>
          </div>
        </div>
        <ComponentShowcase />
        <BottomNavigation
          items={[
            { icon: <Home className="w-5 h-5" />, label: 'Demo', value: 'demo' },
            { icon: <LayoutGrid className="w-5 h-5" />, label: 'Components', value: 'components' },
            { icon: <FileText className="w-5 h-5" />, label: 'Docs', value: 'docs' },
          ]}
          defaultValue="components"
          onChange={(value) => {
            if (value === 'demo') setViewMode('demo');
            if (value === 'docs') setViewMode('docs');
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Floating navigation buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setViewMode('showcase')}
          className="w-14 h-14 bg-[#b8a0d6] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          title="View Component Library"
        >
          <LayoutGrid className="w-6 h-6" />
        </button>
        <button
          onClick={() => setViewMode('docs')}
          className="w-14 h-14 bg-[#1a1a1a] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          title="View Design System Documentation"
        >
          <FileText className="w-6 h-6" />
        </button>
      </div>

      {currentScreen === 'home' && renderHomeScreen()}
      {currentScreen === 'mood' && renderMoodScreen()}
      {currentScreen === 'sleep' && renderSleepScreen()}
    </div>
  );
}
