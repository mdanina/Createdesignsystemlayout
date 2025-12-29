/**
 * QuestionCard Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, borderRadius, shadows, textStyles } from '../theme';

export type QuestionCardGradient = 'peach' | 'lavender' | 'cream' | 'pink';

export interface QuestionCardProps {
  /** Текст вопроса */
  question: string;
  /** Текст кнопки */
  buttonText?: string;
  /** Градиент фона */
  gradient?: QuestionCardGradient;
  /** Callback при нажатии кнопки */
  onButtonClick?: () => void;
  /** Дополнительные стили */
  style?: ViewStyle;
}

const gradientColors: Record<QuestionCardGradient, string[]> = {
  peach: ['#fef9f5', '#ffe8dc', '#ffb5a0'],
  lavender: ['#faf8fc', '#f0e8f8', '#d4b8e8'],
  cream: ['#fefcf8', '#fff5e8', '#ffe5c0'],
  pink: ['#fef8fb', '#ffe8f0', '#ffc0d8'],
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  buttonText = 'Reflect',
  gradient = 'peach',
  onButtonClick,
  style,
}) => {
  return (
    <LinearGradient
      colors={gradientColors[gradient]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, shadows.sm, style]}
    >
      <Text style={styles.question}>{question}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onButtonClick}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    padding: spacing[8],
    minHeight: 200,
    justifyContent: 'space-between',
  },
  question: {
    ...textStyles.body,
    color: '#8b5a47',
    lineHeight: textStyles.body.lineHeight * 1.2,
    marginBottom: spacing[6],
  },
  button: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.pill,
    backgroundColor: colors.component.buttonPrimary,
    ...shadows.sm,
  },
  buttonText: {
    ...textStyles.button,
    color: colors.text.onDark,
  },
});
