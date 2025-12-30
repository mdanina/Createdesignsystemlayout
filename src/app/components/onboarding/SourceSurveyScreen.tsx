import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface SourceSurveyScreenProps {
  onBack: () => void;
  onSelect: (source: string) => void;
}

const sourceOptions = [
  'Through a friend',
  'Social media (Instagram, Tiktok, etc.)',
  'Search engine (Google, Bing, etc.)',
  'Email',
  'Advertisement',
  'App store',
  'none',
];

export function SourceSurveyScreen({ onBack, onSelect }: SourceSurveyScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white max-w-md mx-auto">
      {/* Header */}
      <div className="px-6 py-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-[#2D3142] hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8">
        <h1 className="text-[28px] font-semibold text-[#2D3142] mb-10">
          How did you hear about us? <span className="inline-block">🤔</span>
        </h1>

        {/* Options List */}
        <div className="space-y-0">
          {sourceOptions.map((option, index) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className="w-full py-4 text-left text-[#2D3142] border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between group"
            >
              <span className="text-[16px]">{option}</span>
              <ChevronLeft className="w-5 h-5 text-gray-300 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
