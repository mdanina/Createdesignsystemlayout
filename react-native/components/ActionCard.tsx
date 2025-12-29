/**
 * ActionCard Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows, textStyles } from '../theme';

export interface ActionCardProps {
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  subtitle?: string;
  /** Иконка справа (по умолчанию стрелка) */
  icon?: React.ReactNode;
  /** Callback при нажатии */
  onPress?: () => void;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, shadows.sm, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.iconContainer}>
        {icon || <Text style={styles.arrow}>→</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ui.background,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.ui.border + '0D', // 5% opacity
  },
  content: {
    flex: 1,
    marginRight: spacing[4],
  },
  title: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  subtitle: {
    ...textStyles.caption,
    color: colors.text.tertiary,
    marginTop: spacing[1],
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 16,
    color: colors.text.primary,
  },
});
