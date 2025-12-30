import React from 'react';
import { X, MessageCircle, ChevronRight, Compass } from 'lucide-react';

interface NoHeadbandScreenProps {
  onClose: () => void;
  onGotIt: () => void;
}

export function NoHeadbandScreen({ onClose, onGotIt }: NoHeadbandScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-[#2D3142] hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <button className="p-2 -mr-2 text-[#5ECEC5] hover:bg-gray-100 rounded-full transition-colors">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* App Preview Card */}
      <div className="px-6 pt-4">
        <div className="bg-gray-50 rounded-3xl p-4 shadow-sm">
          {/* Preview items */}
          <div className="space-y-3">
            {/* Take an orientation */}
            <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium text-[#2D3142]">Take an orientation</span>
              </div>
              <span className="text-[#5ECEC5] text-sm font-medium flex items-center">
                Start <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            {/* Relaxation Training */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <rect width="40" height="40" fill="#E8E0F0"/>
                    <circle cx="20" cy="15" r="8" fill="#5ECEC5"/>
                    <ellipse cx="20" cy="35" rx="12" ry="10" fill="#9B7FCF"/>
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-[#2D3142] block">Relaxation Training</span>
                  <span className="text-gray-400 text-sm">0 / 14 min</span>
                </div>
              </div>
              <div className="text-right mt-2">
                <span className="text-[#5ECEC5] text-sm font-medium flex items-center justify-end">
                  Train now <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Get a brain assessment */}
            <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                  <svg viewBox="0 0 40 40" className="w-full h-full">
                    <rect width="40" height="40" fill="#FFE4D6"/>
                    <circle cx="15" cy="20" r="6" fill="#FFB088"/>
                    <circle cx="25" cy="18" r="8" fill="#FF9066"/>
                  </svg>
                </div>
                <span className="font-medium text-[#2D3142]">Get a brain assessment</span>
              </div>
              <span className="text-[#5ECEC5] text-sm font-medium flex items-center">
                Start <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Today's learning */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-gray-500 text-sm">Today's learning:</span>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8">
                  <svg viewBox="0 0 32 32" className="w-full h-full">
                    <polygon points="8,4 28,16 8,28" fill="#5ECEC5"/>
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-[#2D3142] text-sm block">ADHD inattentive type</span>
                  <span className="text-gray-400 text-xs">~2 min</span>
                </div>
              </div>
              <span className="text-[#5ECEC5] text-sm font-medium flex items-center">
                Start <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <h1 className="text-[28px] font-semibold text-[#2D3142] text-center mb-4">
          That's alright
        </h1>
        <p className="text-gray-500 text-center">
          We highly recommend retaking the<br />
          orientation once you have your headband<br />
          in hand for a smoother experience.
        </p>
      </div>

      {/* Got it button */}
      <div className="px-6 pb-8">
        <button
          onClick={onGotIt}
          className="w-full py-4 bg-[#5ECEC5] text-white font-medium rounded-full hover:bg-[#4DBDB4] transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
