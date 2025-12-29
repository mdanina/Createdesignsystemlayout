/**
 * MoodTracker Component - React Native
 * Портировано из web версии
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

const moodEmojis = [
  { emoji: '😔', label: 'Грустно', value: 1, color: colors.wellness.sky },
  { emoji: '😐', label: 'Нормально', value: 2, color: colors.wellness.mint },
  { emoji: '🙂', label: 'Хорошо', value: 3, color: colors.wellness.peach },
  { emoji: '😊', label: 'Отлично', value: 4, color: colors.wellness.lavender },
  { emoji: '🤩', label: 'Прекрасно', value: 5, color: colors.wellness.rose },
];

export interface MoodTrackerProps {
  /** Текущее выбранное настроение */
  value?: number;
  /** Callback при изменении */
  onChange?: (value: number) => void;
  /** Показывать labels */
  showLabels?: boolean;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({
  value,
  onChange,
  showLabels = true,
}) => {
  const [selectedMood, setSelectedMood] = useState<number | undefined>(value);

  const handleMoodSelect = (moodValue: number) => {
    setSelectedMood(moodValue);
    onChange?.(moodValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.moodGrid}>
        {moodEmojis.map((mood) => {
          const isSelected = selectedMood === mood.value;

          return (
            <TouchableOpacity
              key={mood.value}
              style={[
                styles.moodButton,
                isSelected && {
                  backgroundColor: mood.color,
                  transform: [{ scale: 1.1 }],
                },
              ]}
              onPress={() => handleMoodSelect(mood.value)}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              {showLabels && (
                <Text style={[styles.label, isSelected && styles.labelSelected]}>
                  {mood.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing[2],
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[2],
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral[100],
    minHeight: 80,
  },
  emoji: {
    fontSize: 32,
    marginBottom: spacing[1],
  },
  label: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  labelSelected: {
    color: colors.text.primary,
    fontWeight: '600',
  },
});
