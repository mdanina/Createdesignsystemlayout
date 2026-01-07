import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../../design-system/Input';
import { PillButton } from '../../design-system/PillButton';

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
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Логотип */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🌊</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Waves</h1>
            <p className="text-gray-600">Войти в аккаунт</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-700 text-left w-full"
            >
              Забыли пароль?
            </button>

            <PillButton
              type="submit"
              variant="coral"
              className="w-full"
            >
              Войти
            </PillButton>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Нет аккаунта?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Зарегистрируйтесь на сайте
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

