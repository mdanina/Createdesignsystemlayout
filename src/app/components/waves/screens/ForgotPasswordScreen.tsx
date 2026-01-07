import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Input } from '../../design-system/Input';
import { PillButton } from '../../design-system/PillButton';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onSend: (email: string) => void;
}

export function ForgotPasswordScreen({ onBack, onSend }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(email);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <button
            onClick={onBack}
            className="mb-6 text-gray-600 hover:text-gray-900 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад
          </button>

          {!sent ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Восстановление пароля</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <PillButton type="submit" variant="coral" className="w-full">
                  Отправить ссылку
                </PillButton>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Письмо отправлено</h2>
              <p className="text-gray-600 mb-2">
                Письмо отправлено на <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Не пришло? Проверьте спам или попробуйте снова
              </p>
              <PillButton onClick={onBack} variant="secondary" className="w-full">
                Вернуться к входу
              </PillButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

