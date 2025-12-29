/**
 * Alert Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

export interface AlertProps {
  /** Тип alert */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Заголовок */
  title?: string;
  /** Описание */
  description: string;
  /** Иконка */
  icon?: React.ReactNode;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  icon,
  style,
}) => {
  const getVariantStyles = () => {
    const variants = {
      info: {
        backgroundColor: colors.semantic.infoLight,
        borderColor: colors.semantic.info,
      },
      success: {
        backgroundColor: colors.semantic.successLight,
        borderColor: colors.semantic.success,
      },
      warning: {
        backgroundColor: colors.semantic.warningLight,
        borderColor: colors.semantic.warning,
      },
      error: {
        backgroundColor: colors.semantic.errorLight,
        borderColor: colors.semantic.error,
      },
    };

    return variants[variant];
  };

  return (
    <View style={[styles.container, getVariantStyles(), style]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing[4],
    borderRadius: borderRadius.lg,
    borderLeftWidth: 4,
  },
  icon: {
    marginRight: spacing[3],
  },
  content: {
    flex: 1,
  },
  title: {
    ...textStyles.label,
    color: colors.text.primary,
    marginBottom: spacing[1],
  },
  description: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
});
