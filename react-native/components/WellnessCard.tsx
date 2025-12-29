/**
 * WellnessCard Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, borderRadius, shadows, GradientName } from '../theme';

export interface WellnessCardProps {
  children: React.ReactNode;
  /** Градиент фона */
  gradient?: GradientName | string[];
  /** Padding */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /** Показывать тень */
  shadow?: boolean;
  /** Обработчик нажатия (делает карточку кликабельной) */
  onPress?: () => void;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const WellnessCard: React.FC<WellnessCardProps> = ({
  children,
  gradient,
  padding = 'medium',
  shadow = true,
  onPress,
  style,
}) => {
  const getPaddingStyle = (): ViewStyle => {
    const paddingMap = {
      none: spacing[0],
      small: spacing[4],
      medium: spacing[6],
      large: spacing[8],
    };

    return {
      padding: paddingMap[padding],
    };
  };

  const baseStyles: ViewStyle = {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...(shadow && shadows.md),
  };

  const content = (
    <View style={[baseStyles, style]}>
      {gradient ? (
        <LinearGradient
          colors={
            Array.isArray(gradient)
              ? gradient
              : colors.gradients[gradient as GradientName]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={getPaddingStyle()}
        >
          {children}
        </LinearGradient>
      ) : (
        <View style={[styles.solidBackground, getPaddingStyle()]}>
          {children}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  solidBackground: {
    backgroundColor: colors.component.cardBackground,
  },
});
