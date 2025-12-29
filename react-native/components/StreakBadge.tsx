/**
 * StreakBadge Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, borderRadius, textStyles, shadows } from '../theme';

export interface StreakBadgeProps {
  /** Количество дней */
  days: number;
  /** Текст (опционально, по умолчанию "DAY STREAK") */
  label?: string;
  /** Иконка (опционально) */
  icon?: React.ReactNode;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({
  days,
  label = 'DAY STREAK',
  icon,
  style,
}) => {
  return (
    <LinearGradient
      colors={['#ff8a65', '#ff9775']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.container, shadows.md, style]}
    >
      {icon ? (
        <View style={styles.iconContainer}>{icon}</View>
      ) : (
        <Text style={styles.emoji}>🔥</Text>
      )}
      <Text style={styles.text}>
        {days} {label}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.pill,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    width: 16,
    height: 16,
  },
  emoji: {
    fontSize: 16,
  },
  text: {
    ...textStyles.bodySmall,
    color: colors.text.onDark,
    fontWeight: '600',
  },
});
