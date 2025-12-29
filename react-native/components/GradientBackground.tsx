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
  /** Вариант градиента (соответствует веб версии: peach, lavender, cream, pink) */
  variant?: 'peach' | 'lavender' | 'cream' | 'pink';
  /** Имя предустановленного градиента или массив цветов (альтернатива variant) */
  gradient?: GradientName | string[];
  /** Направление градиента (по умолчанию diagonal для соответствия bg-gradient-to-br) */
  direction?: 'vertical' | 'horizontal' | 'diagonal';
  style?: ViewStyle;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  variant,
  gradient,
  direction = 'diagonal', // По умолчанию diagonal для соответствия bg-gradient-to-br
  style,
}) => {
  // Получаем цвета градиента
  const getGradientColors = (): string[] => {
    // Если указан variant, используем его (соответствует веб версии)
    if (variant) {
      return colors.gradients[variant] || colors.gradients.peach;
    }
    
    // Если указан gradient напрямую
    if (gradient) {
      if (Array.isArray(gradient)) {
        return gradient;
      }
      return colors.gradients[gradient as GradientName] || colors.gradients.peach;
    }
    
    // По умолчанию
    return colors.gradients.peach;
  };

  const gradientColors = getGradientColors();

  // Определяем направление (по умолчанию diagonal для bg-gradient-to-br)
  const getGradientProps = () => {
    switch (direction) {
      case 'horizontal':
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } };
      case 'vertical':
        return { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } };
      case 'diagonal':
      default:
        return { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }; // bg-gradient-to-br
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
