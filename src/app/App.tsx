import React, { useState } from 'react';
import { PillButton } from './components/design-system/PillButton';
import { SerifHeading } from './components/design-system/SerifHeading';
import { DesignSystemDocs } from './components/design-system/DesignSystemDocs';
import { ComponentShowcase } from './components/design-system/ComponentShowcase';
import { BottomNavigation } from './components/design-system/BottomNavigation';
import { 
  FileText,
  LayoutGrid,
  X
} from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'showcase' | 'docs'>('showcase');

  if (viewMode === 'docs') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="fixed top-6 right-6 z-50 flex gap-3">
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
          { icon: <LayoutGrid className="w-5 h-5" />, label: 'Components', value: 'components' },
          { icon: <FileText className="w-5 h-5" />, label: 'Docs', value: 'docs' },
        ]}
        defaultValue="components"
        onChange={(value) => {
          if (value === 'docs') setViewMode('docs');
        }}
      />
    </div>
  );
}