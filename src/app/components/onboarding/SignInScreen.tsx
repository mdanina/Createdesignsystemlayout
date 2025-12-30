import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

interface SignInScreenProps {
  onBack: () => void;
  onSignIn: (email: string, password: string) => void;
  onSignUpInstead: () => void;
}

export function SignInScreen({ onBack, onSignIn, onSignUpInstead }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onSignIn(email, password);
    }
  };

  const handleGoogleSignIn = () => {
    // Placeholder for Google OAuth
    console.log('Sign in with Google');
  };

  const handleAppleSignIn = () => {
    // Placeholder for Apple OAuth
    console.log('Sign in with Apple');
  };

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
          Welcome back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-5 py-4 border-2 border-[#D1E8E5] rounded-full text-[#2D3142] placeholder-gray-400 focus:outline-none focus:border-[#5ECEC5] transition-colors"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-5 py-4 pr-12 border-2 border-[#D1E8E5] rounded-full text-[#2D3142] placeholder-gray-400 focus:outline-none focus:border-[#5ECEC5] transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-[#5ECEC5] text-sm font-medium hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-[#5ECEC5] text-white font-medium rounded-full hover:bg-[#4DBDB4] transition-colors mt-4"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social Sign In Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-4 px-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center gap-3 hover:border-gray-300 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-[#2D3142] font-medium">Sign in with Google</span>
          </button>

          <button
            onClick={handleAppleSignIn}
            className="w-full py-4 px-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center gap-3 hover:border-gray-300 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span className="text-[#2D3142] font-medium">Sign in with Apple</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8 pb-8">
          <span className="text-gray-500">Don't have an account? </span>
          <button
            onClick={onSignUpInstead}
            className="text-[#5ECEC5] font-medium hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
