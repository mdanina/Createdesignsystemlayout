import React from 'react';
import { X, MessageCircle } from 'lucide-react';

interface ConnectHeadbandScreenProps {
  onClose: () => void;
  onNoHeadband: () => void;
  onConnect?: () => void;
}

export function ConnectHeadbandScreen({ onClose, onNoHeadband, onConnect }: ConnectHeadbandScreenProps) {
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

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 pt-8">
        {/* Headband Illustrations */}
        <div className="relative w-full max-w-[300px] h-[280px] mb-8">
          {/* Muse 2 - Top headband */}
          <svg viewBox="0 0 280 100" className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px]">
            {/* Main band */}
            <path
              d="M20 50 Q60 20, 140 20 Q220 20, 260 50 Q220 80, 140 80 Q60 80, 20 50Z"
              fill="#3D3D3D"
            />
            {/* Left ear piece */}
            <ellipse cx="30" cy="50" rx="25" ry="30" fill="#2D2D2D" />
            {/* Right ear piece with sensor */}
            <ellipse cx="250" cy="50" rx="25" ry="30" fill="#2D2D2D" />
            <circle cx="250" cy="40" r="12" fill="#5ECEC5" />
            <circle cx="250" cy="40" r="6" fill="#3ECEC5" />
            {/* Sensors on forehead */}
            <rect x="100" y="55" width="80" height="8" rx="4" fill="#C4A67C" />
            {/* Brand text */}
            <text x="140" y="45" textAnchor="middle" fill="#666" fontSize="10" fontFamily="sans-serif">muse</text>
          </svg>

          {/* Muse S - Bottom headband (fabric) */}
          <svg viewBox="0 0 280 60" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px]">
            {/* Fabric band */}
            <rect x="10" y="15" width="260" height="30" rx="15" fill="#4A4A4A"
              style={{ filter: 'url(#fabric)' }} />
            {/* Center module */}
            <rect x="115" y="10" width="50" height="40" rx="8" fill="#3D3D3D" />
            <circle cx="140" cy="25" r="10" fill="#5ECEC5" />
            <circle cx="140" cy="25" r="5" fill="#3ECEC5" />
            {/* Brand */}
            <text x="140" y="42" textAnchor="middle" fill="#888" fontSize="8" fontFamily="sans-serif">muse</text>
            {/* Fabric texture pattern */}
            <defs>
              <pattern id="fabric" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="#4A4A4A"/>
                <rect width="2" height="2" fill="#555"/>
              </pattern>
            </defs>
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-[28px] font-semibold text-[#2D3142] text-center mb-4">
          Connect your headband
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Click the power button found on your<br />
          Muse 2 or Muse S headband.
        </p>

        {/* No headband link */}
        <button
          onClick={onNoHeadband}
          className="text-[#5ECEC5] font-medium hover:underline"
        >
          I don't have a headband
        </button>
      </div>
    </div>
  );
}
