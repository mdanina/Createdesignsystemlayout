/**
 * MoodTracker Component - React Native
 * Портировано из web версии - соответствует веб версии точно
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, textStyles, shadows } from '../theme';

// Соответствует веб версии точно
const moods = [
  { emoji: '😔', label: 'Fri', value: 'sad' },
  { emoji: '😐', label: 'Sat', value: 'neutral' },
  { emoji: '😊', label: 'Sun', value: 'good' },
  { emoji: '😴', label: 'Mon', value: 'tired' },
  { emoji: '😄', label: 'Tue', value: 'happy' },
];

export interface MoodTrackerProps {
  /** Количество дней streak */
  streak?: number;
  /** Callback при выборе настроения */
  onMoodSelect?: (mood: string) => void;
  /** Дополнительные стили */
  style?: any;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({
  streak = 7,
  onMoodSelect,
  style,
}) => {
  const [selectedMood, setSelectedMood] = useState<string>('happy');

  const handleMoodClick = (value: string) => {
    setSelectedMood(value);
    onMoodSelect?.(value);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Streak Header - соответствует веб версии */}
      <View style={styles.streakHeader}>
        <Text style={styles.streakEmoji}>🔥</Text>
        <Text style={styles.streakText}>
          {streak} Day Streak
        </Text>
      </View>

      {/* Mood Selector - соответствует веб версии */}
      <View style={styles.moodGrid}>
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.value;

          return (
            <TouchableOpacity
              key={mood.value}
              onPress={() => handleMoodClick(mood.value)}
              activeOpacity={0.8}
              style={styles.moodButtonContainer}
            >
              <View
                style={[
                  styles.moodButton,
                  isSelected && styles.moodButtonSelected,
                ]}
              >
                <Text style={styles.emoji}>{mood.emoji}</Text>
              </View>
              <Text
                style={[
                  styles.label,
                  isSelected && styles.labelSelected,
                ]}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius['2xl'], // 28px как в веб версии (rounded-[28px])
    padding: spacing[6], // p-6 = 24px
    ...shadows.sm, // shadow-sm
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2], // gap-2 = 8px
    marginBottom: spacing[6], // mb-6 = 24px
  },
  streakEmoji: {
    fontSize: 12,
    color: colors.component.coral, // text-[#ff8a5b]
  },
  streakText: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.6, // tracking-[0.1em]
    color: colors.component.coral, // text-[#ff8a5b]
    fontWeight: '500', // font-medium
  },
  moodGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[2], // gap-2 = 8px
  },
  moodButtonContainer: {
    alignItems: 'center',
    gap: spacing[2], // gap-2 = 8px
  },
  moodButton: {
    width: 52, // w-[52px]
    height: 52, // h-[52px]
    borderRadius: borderRadius.full, // rounded-full
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', // bg-[#f5f5f5]
  },
  moodButtonSelected: {
    backgroundColor: '#1a1a1a', // bg-[#1a1a1a]
    ...shadows.base, // shadow-md
  },
  emoji: {
    fontSize: 24, // text-2xl = 24px
  },
  label: {
    fontSize: 10, // text-[10px]
    fontWeight: '500', // font-medium
    color: '#999999', // text-[#999999]
  },
  labelSelected: {
    color: '#1a1a1a', // text-[#1a1a1a]
  },
});
