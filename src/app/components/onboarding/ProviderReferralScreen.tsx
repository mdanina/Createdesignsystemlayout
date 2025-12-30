import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface ProviderReferralScreenProps {
  onBack: () => void;
  onSelect: (hasProvider: boolean) => void;
}

export function ProviderReferralScreen({ onBack, onSelect }: ProviderReferralScreenProps) {
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
        <h1 className="text-[28px] font-semibold text-[#2D3142] mb-2">
          Were you referred by a Myndlift provider? <span className="inline-block">🧑‍⚕️</span>
        </h1>
        <p className="text-gray-500 mb-10">
          This could be your clinician or coach.
        </p>

        {/* Options */}
        <div className="space-y-0">
          <button
            onClick={() => onSelect(true)}
            className="w-full py-4 text-left text-[#2D3142] border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between group"
          >
            <span className="text-[16px]">Yes</span>
            <ChevronLeft className="w-5 h-5 text-gray-300 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={() => onSelect(false)}
            className="w-full py-4 text-left text-[#2D3142] border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between group"
          >
            <span className="text-[16px]">No</span>
            <ChevronLeft className="w-5 h-5 text-gray-300 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
}
