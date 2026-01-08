import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../../design-system/Input';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { GradientBackground } from '../../design-system/GradientBackground';
import { Logo } from '../../design-system/Logo';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onForgotPassword }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <GradientBackground variant="peach" className="flex flex-col relative">
      {/* Дополнительные слои градиента */}
      <div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{
          zIndex: 1,
        }}
      >
        {/* Первый слой */}
        <div
          style={{
            borderRadius: '608px',
            background: '#FFB457',
            filter: 'blur(100px)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            opacity: 0.25,
          }}
        />
        {/* Второй слой */}
        <div
          style={{
            borderRadius: '388px',
            background: 'linear-gradient(180deg, #FF6A42 29.14%, rgba(255, 106, 66, 0.00) 152.91%)',
            filter: 'blur(50px)',
            width: '100%',
            height: '100%',
            position: 'absolute',
            opacity: 0.25,
          }}
        />
      </div>
      <div className="flex-1 flex items-center justify-center px-6 pt-24 pb-12 relative z-10">
        <div className="w-full max-w-sm">
          {/* Логотип */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="2xl" variant="default" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl p-6">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-0"
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-0"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <PillButton
              type="submit"
              variant="secondary"
              className="w-full shadow-lg text-[#1a1a1a]/70"
            >
              Войти
            </PillButton>
          </form>

          <p className="text-center text-sm text-white mt-2">
            Нет аккаунта?{' '}
            <a href="#" className="text-white hover:text-white/80 underline transition-colors">
              Зарегистрируйтесь на сайте
            </a>
          </p>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onForgotPassword();
            }}
            className="text-sm text-white hover:text-white/80 transition-colors text-center w-full mt-2 block underline"
          >
            Забыли пароль?
          </a>
        </div>
      </div>
    </GradientBackground>
  );
}

