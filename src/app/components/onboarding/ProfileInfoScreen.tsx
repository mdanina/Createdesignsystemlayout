import React, { useState } from 'react';
import { ChevronLeft, ChevronDown } from 'lucide-react';

interface ProfileInfoScreenProps {
  onBack: () => void;
  onContinue: (data: {
    firstName: string;
    lastName: string;
    sex: string;
    dateOfBirth: string;
  }) => void;
}

export function ProfileInfoScreen({ onBack, onContinue }: ProfileInfoScreenProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sex, setSex] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showSexDropdown, setShowSexDropdown] = useState(false);

  const sexOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName) {
      onContinue({ firstName, lastName, sex, dateOfBirth });
    }
  };

  const isFormValid = firstName.trim() !== '' && lastName.trim() !== '';

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
          Let's get to know you <span className="inline-block">🤝</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="w-full px-5 py-4 border-2 border-[#D1E8E5] rounded-full text-[#2D3142] placeholder-gray-400 focus:outline-none focus:border-[#5ECEC5] transition-colors"
          />

          {/* Last Name */}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className="w-full px-5 py-4 border-2 border-[#D1E8E5] rounded-full text-[#2D3142] placeholder-gray-400 focus:outline-none focus:border-[#5ECEC5] transition-colors"
          />

          {/* Sex Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSexDropdown(!showSexDropdown)}
              className="w-full px-5 py-4 border-2 border-[#D1E8E5] rounded-full text-left flex items-center justify-between focus:outline-none focus:border-[#5ECEC5] transition-colors"
            >
              <span className={sex ? 'text-[#2D3142]' : 'text-gray-400'}>
                {sex || 'Sex'}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showSexDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showSexDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-100 rounded-2xl shadow-lg z-10 overflow-hidden">
                {sexOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSex(option);
                      setShowSexDropdown(false);
                    }}
                    className="w-full px-5 py-3 text-left text-[#2D3142] hover:bg-gray-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div className="relative">
            <input
              type="text"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              placeholder="Date of birth"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = 'text';
              }}
              className="w-full px-5 py-4 border-2 border-[#D1E8E5] rounded-full text-[#2D3142] placeholder-gray-400 focus:outline-none focus:border-[#5ECEC5] transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Continue Button */}
      <div className="px-6 pb-8">
        <button
          onClick={handleSubmit as any}
          disabled={!isFormValid}
          className={`w-full py-4 font-medium rounded-full transition-colors ${
            isFormValid
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
