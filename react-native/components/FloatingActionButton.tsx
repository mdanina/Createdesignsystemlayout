/**
 * FloatingActionButton Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, shadows, textStyles } from '../theme';

export interface FloatingActionButtonProps {
  /** Иконка */
  icon: React.ReactNode;
  /** Label под кнопкой */
  label?: string;
  /** Активное состояние */
  active?: boolean;
  /** Размер */
  size?: 'small' | 'medium' | 'large';
  /** Callback при нажатии */
  onPress?: () => void;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  label,
  active = false,
  size = 'large',
  onPress,
  style,
}) => {
  const getSize = () => {
    const sizeMap = {
      small: 48,
      medium: 64,
      large: 80,
    };
    return sizeMap[size];
  };

  const buttonSize = getSize();

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.button,
          {
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
          },
          active ? styles.buttonActive : styles.buttonInactive,
          shadows.md,
        ]}
      >
        {icon}
      </View>

      {label && (
        <Text
          style={[
            styles.label,
            active ? styles.labelActive : styles.labelInactive,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing[2],
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: colors.component.buttonPrimary,
  },
  buttonInactive: {
    backgroundColor: colors.ui.background,
  },
  label: {
    ...textStyles.caption,
    fontSize: 10,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.text.primary,
  },
  labelInactive: {
    color: colors.text.tertiary,
  },
});
