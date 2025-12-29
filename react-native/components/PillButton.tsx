/**
 * PillButton Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, borderRadius, shadows, textStyles } from '../theme';

export interface PillButtonProps {
  children: React.ReactNode;
  /** Вариант кнопки */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Размер кнопки */
  size?: 'small' | 'medium' | 'large';
  /** Состояние загрузки */
  loading?: boolean;
  /** Disabled состояние */
  disabled?: boolean;
  /** Полная ширина */
  fullWidth?: boolean;
  /** Обработчик нажатия */
  onPress?: () => void;
  /** Дополнительные стили для контейнера */
  style?: ViewStyle;
  /** Дополнительные стили для текста */
  textStyle?: TextStyle;
}

export const PillButton: React.FC<PillButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  onPress,
  style,
  textStyle,
}) => {
  const getButtonStyles = (): ViewStyle => {
    const base: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.pill,
      ...shadows.sm,
    };

    // Size
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingVertical: spacing[2],
        paddingHorizontal: spacing[4],
      },
      medium: {
        paddingVertical: spacing[3],
        paddingHorizontal: spacing[6],
      },
      large: {
        paddingVertical: spacing[4],
        paddingHorizontal: spacing[8],
      },
    };

    // Variant
    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: colors.component.buttonPrimary,
      },
      secondary: {
        backgroundColor: colors.wellness.peach,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.component.buttonPrimary,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...base,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth && { width: '100%' }),
      ...(disabled && { opacity: 0.5 }),
    };
  };

  const getTextStyles = (): TextStyle => {
    const base = size === 'small' ? textStyles.buttonSmall : textStyles.button;

    const variantTextStyles: Record<string, TextStyle> = {
      primary: {
        color: colors.text.onDark,
      },
      secondary: {
        color: colors.text.primary,
      },
      outline: {
        color: colors.text.primary,
      },
      ghost: {
        color: colors.text.primary,
      },
    };

    return {
      ...base,
      ...variantTextStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.text.onDark : colors.text.primary}
          size="small"
        />
      ) : (
        <Text style={[getTextStyles(), textStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
