import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

const slides = [
  {
    title: 'Boost your\nmental wellbeing',
    illustration: 'climbing', // placeholder for illustration type
  },
  {
    title: 'Track your\nprogress daily',
    illustration: 'tracking',
  },
  {
    title: 'Achieve your\nwellness goals',
    illustration: 'goals',
  },
];

export function WelcomeScreen({ onGetStarted, onSignIn }: WelcomeScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-white px-6 py-8 max-w-md mx-auto">
      {/* Logo */}
      <div className="flex items-center gap-1 mb-8">
        <span className="text-2xl font-medium text-[#2D3142] tracking-tight">myndlift</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mb-3">
          <path d="M6 1L6 11M6 1L10 5M6 1L2 5" stroke="#3ECEC5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="relative w-full max-w-[300px] aspect-square">
          {/* Abstract shape background */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Main blob shape */}
              <path
                d="M150 50 C220 50, 260 100, 250 150 C240 200, 200 250, 150 250 C100 250, 60 200, 50 150 C40 100, 80 50, 150 50Z"
                fill="#B8E8E0"
                opacity="0.6"
              />
              {/* Secondary blob */}
              <path
                d="M130 80 C180 60, 220 100, 200 150 C180 200, 120 220, 90 180 C60 140, 80 100, 130 80Z"
                fill="#7DD3C8"
                opacity="0.5"
              />
              {/* Steps/stairs */}
              <rect x="100" y="180" width="40" height="30" fill="#5ECEC5" rx="4"/>
              <rect x="130" y="150" width="40" height="60" fill="#4DBDB4" rx="4"/>
              <rect x="160" y="120" width="40" height="90" fill="#3CACA3" rx="4"/>
            </svg>
          </div>

          {/* Person illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 120 160" className="w-32 h-44 translate-x-4 -translate-y-4">
              {/* Person climbing */}
              <ellipse cx="60" cy="25" rx="15" ry="18" fill="#F5F0E8"/> {/* Head */}
              <path d="M50 20 Q60 10 70 20" stroke="#8B7355" strokeWidth="3" fill="none"/> {/* Hair */}
              <rect x="45" y="40" width="30" height="40" rx="8" fill="white"/> {/* Body/shirt */}
              <rect x="40" y="75" width="18" height="50" rx="5" fill="#3D4A5C"/> {/* Left leg */}
              <rect x="62" y="75" width="18" height="45" rx="5" fill="#3D4A5C"/> {/* Right leg */}
              <rect x="30" y="45" width="20" height="8" rx="4" fill="white" transform="rotate(-45 40 49)"/> {/* Left arm */}
              <rect x="70" y="45" width="20" height="8" rx="4" fill="white" transform="rotate(30 80 49)"/> {/* Right arm */}
              {/* Shoes */}
              <ellipse cx="48" cy="127" rx="8" ry="5" fill="#E0A0D0"/>
              <ellipse cx="72" cy="122" rx="8" ry="5" fill="#E0A0D0"/>
            </svg>
          </div>

          {/* Sun/circle */}
          <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-lg" />

          {/* Decorative elements */}
          <div className="absolute top-20 left-8 w-2 h-2 bg-yellow-400 rounded-full" />
          <div className="absolute top-32 right-12 w-1.5 h-1.5 bg-[#5ECEC5] rounded-full" />
          <div className="absolute bottom-24 left-12 w-2 h-2 bg-[#5ECEC5] opacity-60" style={{ transform: 'rotate(45deg)' }} />
          <div className="absolute top-16 right-24 text-[#5ECEC5] text-xs">~</div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-[28px] font-semibold text-[#2D3142] leading-tight whitespace-pre-line">
          {slides[currentSlide].title}
        </h1>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-[#5ECEC5] w-6' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-auto">
        <button
          onClick={onGetStarted}
          className="flex-1 py-4 px-6 bg-[#5ECEC5] text-white font-medium rounded-full hover:bg-[#4DBDB4] transition-colors"
        >
          Get started
        </button>
        <button
          onClick={onSignIn}
          className="flex-1 py-4 px-6 bg-white text-[#5ECEC5] font-medium rounded-full border-2 border-gray-100 hover:border-[#5ECEC5] transition-colors"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
