/**
 * Avatar Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, Image, Text, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, fontSize, GradientName } from '../theme';

export interface AvatarProps {
  /** URL изображения или локальный source */
  source?: ImageSourcePropType;
  /** Инициалы (если нет изображения) */
  initials?: string;
  /** Размер аватара */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  /** Градиент фона (если нет изображения) */
  gradient?: GradientName | string[];
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  initials,
  size = 'medium',
  gradient = 'peachLavender',
  style,
}) => {
  const getSize = () => {
    const sizeMap = {
      small: 32,
      medium: 48,
      large: 64,
      xlarge: 96,
    };
    return sizeMap[size];
  };

  const getFontSize = () => {
    const fontSizeMap = {
      small: fontSize.sm,
      medium: fontSize.lg,
      large: fontSize.xl,
      xlarge: fontSize['3xl'],
    };
    return fontSizeMap[size];
  };

  const avatarSize = getSize();
  const avatarStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
  };

  // Если есть изображение
  if (source) {
    return (
      <Image
        source={source}
        style={[styles.image, avatarStyle, style]}
      />
    );
  }

  // Если есть инициалы
  const gradientColors = Array.isArray(gradient)
    ? gradient
    : colors.gradients[gradient as GradientName];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, avatarStyle, style]}
    >
      <Text
        style={[
          styles.initials,
          {
            fontSize: getFontSize(),
          },
        ]}
      >
        {initials || '?'}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: colors.text.primary,
    fontWeight: '600',
  },
});
