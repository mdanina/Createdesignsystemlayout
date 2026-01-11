import React, { useState, useMemo } from 'react';
import { ArrowLeft, Music, Check, Clock } from 'lucide-react';
import { PillButton } from '../../design-system/PillButton';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';

export interface Track {
  id: string;
  title: string;
  artist?: string;
  duration: number; // в секундах
  source?: string;
}

interface TrainingPlaylistSelectionScreenProps {
  playlist: Track[];
  trainingDuration: number; // длительность тренировки в минутах
  onContinue: (selectedTrackIds: string[]) => void;
  onBack: () => void;
}

// Функция для конвертации секунд в формат MM:SS
const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Функция для конвертации минут в секунды
const minutesToSeconds = (minutes: number): number => minutes * 60;

export function TrainingPlaylistSelectionScreen({
  playlist,
  trainingDuration,
  onContinue,
  onBack,
}: TrainingPlaylistSelectionScreenProps) {
  const [selectedTrackIds, setSelectedTrackIds] = useState<Set<string>>(new Set());

  // Вычисляем общую длительность выбранных треков
  const totalSelectedDuration = useMemo(() => {
    return playlist
      .filter(track => selectedTrackIds.has(track.id))
      .reduce((sum, track) => sum + track.duration, 0);
  }, [playlist, selectedTrackIds]);

  const requiredDuration = minutesToSeconds(trainingDuration);
  const isDurationSufficient = totalSelectedDuration >= requiredDuration;
  const remainingDuration = Math.max(0, requiredDuration - totalSelectedDuration);

  const toggleTrack = (trackId: string) => {
    setSelectedTrackIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  };

  const handleContinue = () => {
    if (isDurationSufficient) {
      onContinue(Array.from(selectedTrackIds));
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Шапка */}
      <div className="flex items-center px-4 py-4 border-b border-[#1a1a1a]/10 bg-white/80 backdrop-blur-sm">
        <button onClick={onBack} className="mr-4 text-[#1a1a1a]/70 hover:text-[#1a1a1a]">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <SerifHeading size="xl">Выберите музыку</SerifHeading>
      </div>

      <div className="flex-1 px-16 py-8 overflow-y-auto">
        {/* Информация о длительности тренировки */}
        <WellnessCard gradient="blue" className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#1a1a1a]/70" />
              <div>
                <p className="text-sm text-[#1a1a1a]/70">Длительность тренировки</p>
                <p className="text-lg font-semibold text-[#1a1a1a]">{trainingDuration} мин</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#1a1a1a]/70">Выбрано</p>
              <p className={`text-lg font-semibold ${
                isDurationSufficient ? 'text-green-600' : 'text-[#1a1a1a]'
              }`}>
                {formatDuration(totalSelectedDuration)}
              </p>
            </div>
          </div>

          {/* Прогресс-бар */}
          <div className="w-full bg-[#1a1a1a]/10 rounded-full h-3 mb-2">
            <div
              className={`h-3 rounded-full transition-all ${
                isDurationSufficient 
                  ? 'bg-green-500' 
                  : 'bg-[#a8d8ea]'
              }`}
              style={{ width: `${Math.min(100, (totalSelectedDuration / requiredDuration) * 100)}%` }}
            ></div>
          </div>

          {/* Сообщение о недостающей длительности */}
          {!isDurationSufficient && (
            <p className="text-xs text-[#1a1a1a]/60 mt-2">
              Выберите еще треки на {formatDuration(remainingDuration)}
            </p>
          )}
          {isDurationSufficient && (
            <p className="text-xs text-green-600 mt-2 font-medium">
              ✓ Достаточно музыки для тренировки
            </p>
          )}
        </WellnessCard>

        {/* Список треков */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#1a1a1a] mb-4">Ваш плейлист</h2>
          <div className="space-y-2">
            {playlist.map((track) => {
              const isSelected = selectedTrackIds.has(track.id);
              return (
                <button
                  key={track.id}
                  onClick={() => toggleTrack(track.id)}
                  className="w-full text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <WellnessCard 
                    gradient={isSelected ? "blue" : undefined}
                    className={isSelected ? "border-2 border-[#a8d8ea]" : ""}
                    hover={!isSelected}
                  >
                    <div className="flex items-center gap-4">
                      {/* Чекбокс */}
                      <div className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#a8d8ea] border-[#a8d8ea]'
                          : 'bg-white border-[#1a1a1a]/20'
                      }`}>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>

                      {/* Иконка музыки */}
                      <div className="flex-shrink-0">
                        <Music className={`w-5 h-5 ${isSelected ? 'text-[#a8d8ea]' : 'text-[#1a1a1a]/50'}`} />
                      </div>

                      {/* Информация о треке */}
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${
                          isSelected ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/90'
                        }`}>
                          {track.title}
                        </p>
                        {track.artist && (
                          <p className="text-sm text-[#1a1a1a]/60 truncate">{track.artist}</p>
                        )}
                      </div>

                      {/* Длительность */}
                      <div className="flex-shrink-0 text-right">
                        <p className={`text-sm font-medium ${
                          isSelected ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/70'
                        }`}>
                          {formatDuration(track.duration)}
                        </p>
                      </div>
                    </div>
                  </WellnessCard>
                </button>
              );
            })}
          </div>
        </div>

        {/* Кнопка Продолжить */}
        <PillButton 
          onClick={handleContinue} 
          variant="gradientMesh" 
          className="w-full mb-3"
          disabled={!isDurationSufficient}
        >
          Продолжить
        </PillButton>

        {/* Кнопка Назад */}
        <button
          onClick={onBack}
          className="w-full text-center text-[#1a1a1a]/70 hover:text-[#1a1a1a] py-3 text-sm transition-colors"
        >
          Назад
        </button>
      </div>
    </div>
  );
}
