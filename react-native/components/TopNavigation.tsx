/**
 * TopNavigation Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows, textStyles } from '../theme';

export interface TopNavigationProps {
  /** Левая иконка */
  leftIcon?: React.ReactNode;
  /** Правая иконка */
  rightIcon?: React.ReactNode;
  /** Заголовок */
  title?: string | React.ReactNode;
  /** Приветствие (badge в центре) */
  greeting?: string;
  /** Callback для левой кнопки */
  onLeftPress?: () => void;
  /** Callback для правой кнопки */
  onRightPress?: () => void;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  leftIcon,
  rightIcon,
  title,
  greeting,
  onLeftPress,
  onRightPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Left Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={onLeftPress}
        activeOpacity={0.7}
      >
        {leftIcon}
      </TouchableOpacity>

      {/* Center Content */}
      <View style={styles.center}>
        {greeting && (
          <View style={[styles.greeting, shadows.sm]}>
            <Text style={styles.greetingEmoji}>☀️</Text>
            <Text style={styles.greetingText}>{greeting}</Text>
          </View>
        )}
        {title && typeof title === 'string' ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          title
        )}
      </View>

      {/* Right Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={onRightPress}
        activeOpacity={0.7}
      >
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[4],
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    backgroundColor: colors.ui.background + 'CC', // 80% opacity
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.pill,
  },
  greetingEmoji: {
    fontSize: 14,
  },
  greetingText: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
  title: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
});
