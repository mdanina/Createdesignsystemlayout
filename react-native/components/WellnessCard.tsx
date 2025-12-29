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
  /** Градиент фона (соответствует веб версии: coral, blue, pink, lavender) */
  gradient?: 'coral' | 'blue' | 'pink' | 'lavender' | GradientName | string[];
  /** Padding (medium = 24px как в веб версии) */
  padding?: 'none' | 'small' | 'medium' | 'large';
  /** Показывать тень */
  shadow?: boolean;
  /** Hover эффект (в RN это scale при нажатии) */
  hover?: boolean;
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
  hover = false,
  onPress,
  style,
}) => {
  const getPaddingStyle = (): ViewStyle => {
    const paddingMap = {
      none: spacing[0],
      small: spacing[4],
      medium: spacing[6], // 24px как в веб версии (p-6)
      large: spacing[8],
    };

    return {
      padding: paddingMap[padding],
    };
  };

  // Получаем градиент цвета в зависимости от типа
  const getGradientColors = (): string[] => {
    if (Array.isArray(gradient)) {
      return gradient;
    }
    
    // Соответствие веб версии: coral, blue, pink, lavender
    const gradientMap: Record<string, GradientName> = {
      coral: 'coral',
      blue: 'blue',
      pink: 'pinkCard',
      lavender: 'lavenderCard',
    };
    
    const gradientName = gradientMap[gradient as string] || gradient as GradientName;
    return colors.gradients[gradientName] || colors.gradients.coral;
  };

  const baseStyles: ViewStyle = {
    borderRadius: borderRadius.xl, // 20px как в веб версии (rounded-[20px])
    overflow: 'hidden',
    ...(shadow && shadows.md), // shadow-[0_4px_20px_rgba(0,0,0,0.06)]
  };

  const content = (
    <View style={[baseStyles, style]}>
      {gradient ? (
        <LinearGradient
          colors={getGradientColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }} // bg-gradient-to-br
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

  if (onPress || hover) {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={hover ? 0.9 : 0.8}
        style={hover && styles.hoverContainer}
      >
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
  hoverContainer: {
    // В RN hover эффект реализуется через activeOpacity
    // Можно добавить Animated для scale эффекта при необходимости
  },
});
