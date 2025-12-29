/**
 * GradientBackground Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, GradientName } from '../theme';

export interface GradientBackgroundProps {
  children: React.ReactNode;
  /** Имя предустановленного градиента или массив цветов */
  gradient?: GradientName | string[];
  /** Направление градиента */
  direction?: 'vertical' | 'horizontal' | 'diagonal';
  style?: ViewStyle;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  gradient = 'peachLavender',
  direction = 'vertical',
  style,
}) => {
  // Получаем цвета градиента
  const gradientColors = Array.isArray(gradient)
    ? gradient
    : colors.gradients[gradient as GradientName];

  // Определяем направление
  const getGradientProps = () => {
    switch (direction) {
      case 'horizontal':
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } };
      case 'diagonal':
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } };
      default: // vertical
        return { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } };
    }
  };

  return (
    <LinearGradient
      colors={gradientColors}
      {...getGradientProps()}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
