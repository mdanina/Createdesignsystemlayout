/**
 * DayGreeting Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, textStyles, shadows } from '../theme';

export interface DayGreetingProps {
  /** Приветствие (Good Morning, Good Evening, и т.д.) */
  greeting?: string;
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  subtitle?: string;
  /** Emoji/иконка */
  emoji?: string;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const DayGreeting: React.FC<DayGreetingProps> = ({
  greeting = 'Good Evening',
  title = 'New Day\nFresh Start!',
  subtitle,
  emoji = '☀️',
  style,
}) => {
  const lines = title.split('\n');

  return (
    <View style={[styles.container, style]}>
      {/* Greeting badge */}
      <View style={[styles.badge, shadows.sm]}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.greetingText}>{greeting}</Text>
      </View>

      {/* Main title with serif font */}
      <View style={styles.titleContainer}>
        {lines.map((line, index) => (
          <Text key={index} style={styles.titleLine}>
            {line}
          </Text>
        ))}
      </View>

      {/* Subtitle */}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    backgroundColor: colors.ui.background,
    borderRadius: borderRadius.pill,
    marginBottom: spacing[6],
  },
  emoji: {
    fontSize: 14,
  },
  greetingText: {
    ...textStyles.caption,
    color: colors.text.primary,
    fontWeight: '600',
  },
  titleContainer: {
    marginBottom: spacing[4],
  },
  titleLine: {
    ...textStyles.serifDisplay,
    textAlign: 'center',
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: spacing[2],
  },
});
