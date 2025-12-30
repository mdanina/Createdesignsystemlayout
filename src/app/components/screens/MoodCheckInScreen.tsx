import React, { useState } from 'react';

interface MoodCheckInScreenProps {
  onContinue: (data: { emotion: string; focus: string; sleep: string }) => void;
}

const emotions = [
  { emoji: '🙂', label: 'Content' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '😞', label: 'Down' },
  { emoji: '😃', label: 'Motivated' },
  { emoji: '😐', label: 'Unmotivated' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😠', label: 'Annoyed' },
  { emoji: '😊', label: 'Happy' },
  { emoji: '😱', label: 'Panicking' },
  { emoji: '🏃', label: 'Energized' },
];

const focusLevels = [
  { emoji: '😵', label: 'Not focused' },
  { emoji: '😕', label: 'Slightly focused' },
  { emoji: '🤔', label: 'Focused' },
  { emoji: '🧐', label: 'Very focused' },
  { emoji: '🤓', label: 'Extremely focused' },
];

const sleepLevels = [
  { emoji: '🥱', label: 'Terrible' },
  { emoji: '😪', label: 'Poor' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😊', label: 'Good' },
];

export function MoodCheckInScreen({ onContinue }: MoodCheckInScreenProps) {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);
  const [selectedSleep, setSelectedSleep] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedEmotion && selectedFocus && selectedSleep) {
      onContinue({
        emotion: selectedEmotion,
        focus: selectedFocus,
        sleep: selectedSleep,
      });
    }
  };

  const isComplete = selectedEmotion && selectedFocus && selectedSleep;

  return (
    <div className="min-h-screen flex flex-col bg-white max-w-md mx-auto">
      {/* Content */}
      <div className="flex-1 px-6 pt-8 pb-24 overflow-y-auto">
        <h1 className="text-[28px] font-semibold text-[#2D3142] text-center mb-8">
          How are you feeling?
        </h1>

        {/* Emotions Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#2D3142] text-center mb-4">
            Emotions
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {emotions.map((item) => (
              <button
                key={item.label}
                onClick={() => setSelectedEmotion(item.label)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  selectedEmotion === item.label
                    ? 'bg-[#E0F7F5] ring-2 ring-[#5ECEC5]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-xs text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Focus Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#2D3142] text-center mb-4">
            Focus
          </h2>
          <div className="flex justify-center gap-2">
            {focusLevels.map((item) => (
              <button
                key={item.label}
                onClick={() => setSelectedFocus(item.label)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  selectedFocus === item.label
                    ? 'bg-[#E0F7F5] ring-2 ring-[#5ECEC5]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-xs text-gray-600 text-center max-w-[60px]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sleep Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#2D3142] text-center mb-4">
            Sleep
          </h2>
          <div className="flex justify-center gap-4">
            {sleepLevels.map((item) => (
              <button
                key={item.label}
                onClick={() => setSelectedSleep(item.label)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  selectedSleep === item.label
                    ? 'bg-[#E0F7F5] ring-2 ring-[#5ECEC5]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="text-xs text-gray-600">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-white max-w-md mx-auto">
        <button
          onClick={handleContinue}
          disabled={!isComplete}
          className={`w-full py-4 font-medium rounded-full transition-colors ${
            isComplete
              ? 'bg-[#5ECEC5] text-white hover:bg-[#4DBDB4]'
              : 'bg-[#B8E8E4] text-white cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
