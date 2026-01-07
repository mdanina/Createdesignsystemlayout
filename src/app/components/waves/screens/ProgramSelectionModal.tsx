import React from 'react';
import { X, Check } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  eyesOpen: boolean;
  waves: string;
  current?: boolean;
}

interface ProgramSelectionModalProps {
  programs: Program[];
  currentProgramId: string;
  onSelect: (programId: string) => void;
  onClose: () => void;
}

export function ProgramSelectionModal({
  programs,
  currentProgramId,
  onSelect,
  onClose,
}: ProgramSelectionModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="w-full bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Выберите программу</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {programs.map((program) => (
            <button
              key={program.id}
              onClick={() => {
                onSelect(program.id);
                onClose();
              }}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                program.id === currentProgramId
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{program.name}</h3>
                {program.id === currentProgramId && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{program.eyesOpen ? '👁 Глаза открыты' : '👁 Глаза закрыты'}</span>
                <span>•</span>
                <span>{program.waves}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

