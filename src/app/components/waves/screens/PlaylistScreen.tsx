import React, { useState } from 'react';
import { Plus, Music, Video, MoreVertical, Edit2, Trash2, GripVertical, ChevronDown, ChevronUp, FolderPlus } from 'lucide-react';
import { SerifHeading } from '../../design-system/SerifHeading';
import { WellnessCard } from '../../design-system/WellnessCard';
import { PillButton } from '../../design-system/PillButton';
import { GradientBackground } from '../../design-system/GradientBackground';

export type MediaType = 'video' | 'audio';
export type MediaSource = 'youtube' | 'spotify' | 'apple-music' | 'vimeo' | 'other';

export interface PlaylistItem {
  id: string;
  title: string;
  type: MediaType;
  source: MediaSource;
  thumbnail?: string;
  duration?: string;
  addedAt: Date;
  url: string;
}

export interface PlaylistSection {
  id: string;
  name: string;
  items: PlaylistItem[];
}

export interface Playlist {
  id: string;
  name: string;
  sections: PlaylistSection[];
  createdAt: Date;
  updatedAt: Date;
}

interface PlaylistScreenProps {
  onBack?: () => void;
}

export function PlaylistScreen({ onBack }: PlaylistScreenProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: 'default',
      name: 'Мой плейлист',
      sections: [
        {
          id: 'default-section',
          name: 'Все',
          items: [
            {
              id: '1',
              title: 'Успокаивающая музыка для концентрации',
              type: 'audio',
              source: 'spotify',
              duration: '15:30',
              addedAt: new Date(2024, 0, 15),
              url: 'https://open.spotify.com/track/example',
            },
            {
              id: '2',
              title: 'Медитация для детей - Лес',
              type: 'video',
              source: 'youtube',
              thumbnail: 'https://img.youtube.com/vi/example/mqdefault.jpg',
              duration: '12:45',
              addedAt: new Date(2024, 0, 14),
              url: 'https://youtube.com/watch?v=example',
            },
            {
              id: '3',
              title: 'Дыхательные упражнения - Анимация',
              type: 'video',
              source: 'youtube',
              thumbnail: 'https://img.youtube.com/vi/example2/mqdefault.jpg',
              duration: '10:20',
              addedAt: new Date(2024, 0, 13),
              url: 'https://youtube.com/watch?v=example2',
            },
          ],
        },
      ],
      createdAt: new Date(2024, 0, 1),
      updatedAt: new Date(2024, 0, 15),
    },
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(playlists[0]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['default-section']));
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<{ itemId: string; sectionId: string } | null>(null);

  // Сортировка: новый контент выше
  const sortItemsByDate = (items: PlaylistItem[]) => {
    return [...items].sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
  };

  const handleAddItem = () => {
    // TODO: Интеграция с мультимедийными приложениями для добавления контента
    alert('Функция добавления контента будет доступна после интеграции с мультимедийными приложениями');
  };

  const handleEditItem = (itemId: string) => {
    setEditingItem(itemId);
    // TODO: Открыть модальное окно редактирования
  };

  const handleDeleteItem = (itemId: string, sectionId: string) => {
    if (selectedPlaylist) {
      const updatedPlaylist = { ...selectedPlaylist };
      const section = updatedPlaylist.sections.find((s) => s.id === sectionId);
      if (section) {
        section.items = section.items.filter((item) => item.id !== itemId);
        updatedPlaylist.updatedAt = new Date();
        setPlaylists((prev) =>
          prev.map((p) => (p.id === updatedPlaylist.id ? updatedPlaylist : p))
        );
        setSelectedPlaylist(updatedPlaylist);
      }
    }
  };

  const handleMoveItem = (itemId: string, fromSectionId: string, toSectionId: string, newIndex: number) => {
    if (selectedPlaylist) {
      const updatedPlaylist = { ...selectedPlaylist };
      const fromSection = updatedPlaylist.sections.find((s) => s.id === fromSectionId);
      const toSection = updatedPlaylist.sections.find((s) => s.id === toSectionId);

      if (fromSection && toSection) {
        const item = fromSection.items.find((i) => i.id === itemId);
        if (item) {
          fromSection.items = fromSection.items.filter((i) => i.id !== itemId);
          toSection.items.splice(newIndex, 0, item);
          updatedPlaylist.updatedAt = new Date();
          setPlaylists((prev) =>
            prev.map((p) => (p.id === updatedPlaylist.id ? updatedPlaylist : p))
          );
          setSelectedPlaylist(updatedPlaylist);
        }
      }
    }
  };

  const handleAddSection = () => {
    if (selectedPlaylist) {
      const newSection: PlaylistSection = {
        id: `section-${Date.now()}`,
        name: 'Новый раздел',
        items: [],
      };
      const updatedPlaylist = {
        ...selectedPlaylist,
        sections: [...selectedPlaylist.sections, newSection],
        updatedAt: new Date(),
      };
      setPlaylists((prev) =>
        prev.map((p) => (p.id === updatedPlaylist.id ? updatedPlaylist : p))
      );
      setSelectedPlaylist(updatedPlaylist);
      setExpandedSections((prev) => new Set([...prev, newSection.id]));
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const getSourceIcon = (source: MediaSource) => {
    switch (source) {
      case 'youtube':
        return '📺';
      case 'spotify':
        return '🎵';
      case 'apple-music':
        return '🍎';
      case 'vimeo':
        return '▶️';
      default:
        return '📱';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Сегодня';
    if (days === 1) return 'Вчера';
    if (days < 7) return `${days} дня назад`;
    if (days < 30) return `${Math.floor(days / 7)} недели назад`;
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <GradientBackground variant="cream" className="flex flex-col min-h-screen pb-20">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <SerifHeading size="2xl">Плейлист</SerifHeading>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddItem}
              className="p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-white/50 rounded-lg transition-colors"
              title="Добавить контент"
            >
              <Plus className="w-6 h-6" />
            </button>
            {selectedPlaylist && (
              <button
                onClick={handleAddSection}
                className="p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-white/50 rounded-lg transition-colors"
                title="Добавить раздел"
              >
                <FolderPlus className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Выбор плейлиста */}
        {playlists.length > 1 && (
          <div className="mb-6">
            <select
              value={selectedPlaylist?.id || ''}
              onChange={(e) => {
                const playlist = playlists.find((p) => p.id === e.target.value);
                setSelectedPlaylist(playlist || null);
              }}
              className="w-full px-4 py-2 bg-white/50 border border-[#1a1a1a]/10 rounded-lg"
            >
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Список разделов и контента */}
        {selectedPlaylist && (
          <div className="space-y-4">
            {selectedPlaylist.sections.map((section) => {
              const sortedItems = sortItemsByDate(section.items);
              const isExpanded = expandedSections.has(section.id);

              return (
                <WellnessCard key={section.id} className="p-4">
                  {/* Заголовок раздела */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center gap-2 flex-1 text-left"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-[#1a1a1a]/70" />
                      ) : (
                        <ChevronUp className="w-5 h-5 text-[#1a1a1a]/70" />
                      )}
                      <h3 className="font-semibold text-[#1a1a1a]">{section.name}</h3>
                      <span className="text-sm text-[#1a1a1a]/50">({section.items.length})</span>
                    </button>
                  </div>

                  {/* Список элементов */}
                  {isExpanded && (
                    <div className="space-y-3">
                      {sortedItems.length === 0 ? (
                        <p className="text-sm text-[#1a1a1a]/50 text-center py-4">
                          Раздел пуст. Добавьте контент из мультимедийных приложений.
                        </p>
                      ) : (
                        sortedItems.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-colors group"
                          >
                            {/* Иконка типа */}
                            <div className="flex-shrink-0">
                              {item.type === 'video' ? (
                                <Video className="w-5 h-5 text-[#a8d8ea]" />
                              ) : (
                                <Music className="w-5 h-5 text-[#b8a0d6]" />
                              )}
                            </div>

                            {/* Превью (для видео) */}
                            {item.thumbnail && (
                              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#a8d8ea]/30 to-[#b8a0d6]/30 rounded-lg overflow-hidden">
                                <img
                                  src={item.thumbnail}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              </div>
                            )}

                            {/* Информация */}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-[#1a1a1a] truncate">{item.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-[#1a1a1a]/50">
                                  {getSourceIcon(item.source)} {item.source}
                                </span>
                                {item.duration && (
                                  <>
                                    <span className="text-xs text-[#1a1a1a]/30">•</span>
                                    <span className="text-xs text-[#1a1a1a]/50">{item.duration}</span>
                                  </>
                                )}
                                <span className="text-xs text-[#1a1a1a]/30">•</span>
                                <span className="text-xs text-[#1a1a1a]/50">{formatDate(item.addedAt)}</span>
                              </div>
                            </div>

                            {/* Действия */}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEditItem(item.id)}
                                className="p-2 text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-white/50 rounded transition-colors"
                                title="Редактировать"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id, section.id)}
                                className="p-2 text-[#1a1a1a]/50 hover:text-red-600 hover:bg-white/50 rounded transition-colors"
                                title="Удалить"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <div className="p-2 text-[#1a1a1a]/30 cursor-move" title="Переместить">
                                <GripVertical className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </WellnessCard>
              );
            })}
          </div>
        )}

        {/* Пустое состояние */}
        {!selectedPlaylist && (
          <WellnessCard className="p-8 text-center">
            <Music className="w-16 h-16 text-[#1a1a1a]/20 mx-auto mb-4" />
            <p className="text-[#1a1a1a]/70 mb-4">Создайте свой первый плейлист</p>
            <PillButton onClick={handleAddItem} variant="coral">
              <Plus className="w-4 h-4 mr-2" />
              Добавить контент
            </PillButton>
          </WellnessCard>
        )}
      </div>
    </GradientBackground>
  );
}

