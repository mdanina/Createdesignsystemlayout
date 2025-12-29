/**
 * StatCard Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, borderRadius, shadows, textStyles, GradientName } from '../theme';

export interface StatCardProps {
  /** Значение статистики */
  value: string | number;
  /** Label */
  label: string;
  /** Изменение (опционально) */
  change?: string;
  /** Тип изменения */
  changeType?: 'positive' | 'negative' | 'neutral';
  /** Градиент фона */
  gradient?: GradientName | string[];
  /** Иконка (React Native Vector Icon component) */
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  change,
  changeType = 'neutral',
  gradient = 'peachLavender',
  icon,
}) => {
  const gradientColors = Array.isArray(gradient)
    ? gradient
    : colors.gradients[gradient as GradientName];

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return colors.semantic.success;
      case 'negative':
        return colors.semantic.error;
      default:
        return colors.text.secondary;
    }
  };

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, shadows.md]}
    >
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
        
        {change && (
          <Text style={[styles.change, { color: getChangeColor() }]}>
            {changeType === 'positive' && '↑ '}
            {changeType === 'negative' && '↓ '}
            {change}
          </Text>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    minHeight: 120,
  },
  content: {
    padding: spacing[5],
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginBottom: spacing[2],
  },
  value: {
    ...textStyles.serifH1,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  label: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing[1],
  },
  change: {
    ...textStyles.caption,
    fontWeight: '600',
  },
});
