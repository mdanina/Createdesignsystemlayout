import React, { useState } from 'react';
import { PillButton } from './components/design-system/PillButton';
import { SerifHeading } from './components/design-system/SerifHeading';
import { DesignSystemDocs } from './components/design-system/DesignSystemDocs';
import { ComponentShowcase } from './components/design-system/ComponentShowcase';
import { BottomNavigation } from './components/design-system/BottomNavigation';
import { OnboardingFlow } from './components/onboarding';
import { MainAppFlow } from './components/screens';
import {
  FileText,
  LayoutGrid,
  Smartphone,
  RotateCcw,
  X
} from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'showcase' | 'docs' | 'app'>('app');
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Show onboarding flow when in app mode and not yet onboarded
  if (viewMode === 'app' && !isOnboarded) {
    return (
      <div className="min-h-screen bg-white">
        {/* Mode switcher */}
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={() => setViewMode('showcase')}
            className="px-3 py-1.5 text-xs bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <LayoutGrid className="w-3 h-3 inline mr-1" />
            Components
          </button>
        </div>
        <OnboardingFlow onComplete={() => setIsOnboarded(true)} />
      </div>
    );
  }

  // Show main app after onboarding
  if (viewMode === 'app' && isOnboarded) {
    return (
      <div className="min-h-screen bg-white">
        {/* Mode switcher */}
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={() => setIsOnboarded(false)}
            className="px-3 py-1.5 text-xs bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3 h-3 inline mr-1" />
            Restart
          </button>
          <button
            onClick={() => setViewMode('showcase')}
            className="px-3 py-1.5 text-xs bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <LayoutGrid className="w-3 h-3 inline mr-1" />
            Components
          </button>
        </div>
        <MainAppFlow
          userName="Mariya"
          onBack={() => setIsOnboarded(false)}
        />
      </div>
    );
  }

  if (viewMode === 'docs') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="fixed top-6 right-6 z-50 flex gap-3">
          <PillButton variant="secondary" onClick={() => setViewMode('app')}>
            <Smartphone className="w-4 h-4" />
            App Preview
          </PillButton>
          <PillButton variant="secondary" onClick={() => setViewMode('showcase')}>
            <LayoutGrid className="w-4 h-4" />
            Components
          </PillButton>
        </div>
        <DesignSystemDocs />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <SerifHeading size="xl">Component Library</SerifHeading>
          <div className="flex gap-3">
            <PillButton variant="coral" onClick={() => setViewMode('app')}>
              <Smartphone className="w-4 h-4" />
              App Preview
            </PillButton>
            <PillButton variant="secondary" onClick={() => setViewMode('docs')}>
              <FileText className="w-4 h-4" />
              Documentation
            </PillButton>
          </div>
        </div>
      </div>
      <ComponentShowcase />
      <BottomNavigation
        items={[
          { icon: <Smartphone className="w-5 h-5" />, label: 'App', value: 'app' },
          { icon: <LayoutGrid className="w-5 h-5" />, label: 'Components', value: 'components' },
          { icon: <FileText className="w-5 h-5" />, label: 'Docs', value: 'docs' },
        ]}
        defaultValue="components"
        onChange={(value) => {
          if (value === 'docs') setViewMode('docs');
          if (value === 'app') setViewMode('app');
        }}
      />
    </div>
  );
}
