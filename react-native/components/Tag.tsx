/**
 * Tag Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

export interface TagProps {
  /** Текст тега */
  children: React.ReactNode;
  /** Вариант тега */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  /** Размер */
  size?: 'small' | 'medium';
  /** Removable (с крестиком) */
  onRemove?: () => void;
  /** Кликабельный */
  onPress?: () => void;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  onRemove,
  onPress,
  style,
}) => {
  const getVariantStyles = () => {
    const variants = {
      default: {
        backgroundColor: colors.neutral[100],
        color: colors.text.primary,
      },
      primary: {
        backgroundColor: colors.wellness.peach,
        color: colors.text.primary,
      },
      success: {
        backgroundColor: colors.semantic.successLight,
        color: colors.semantic.success,
      },
      warning: {
        backgroundColor: colors.semantic.warningLight,
        color: colors.semantic.warning,
      },
      error: {
        backgroundColor: colors.semantic.errorLight,
        color: colors.semantic.error,
      },
    };

    return variants[variant];
  };

  const getSizeStyles = () => {
    return size === 'small'
      ? {
          paddingVertical: spacing[1],
          paddingHorizontal: spacing[2],
        }
      : {
          paddingVertical: spacing[2],
          paddingHorizontal: spacing[3],
        };
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const content = (
    <View
      style={[
        styles.container,
        { backgroundColor: variantStyles.backgroundColor },
        sizeStyles,
        style,
      ]}
    >
      <Text
        style={[
          size === 'small' ? textStyles.caption : textStyles.bodySmall,
          { color: variantStyles.color },
        ]}
      >
        {children}
      </Text>
      {onRemove && (
        <TouchableOpacity
          onPress={onRemove}
          style={styles.removeButton}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
        >
          <Text style={[styles.removeIcon, { color: variantStyles.color }]}>
            ✕
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.pill,
    alignSelf: 'flex-start',
  },
  removeButton: {
    marginLeft: spacing[2],
  },
  removeIcon: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
