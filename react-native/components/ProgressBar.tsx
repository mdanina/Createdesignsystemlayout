/**
 * ProgressBar Component - React Native
 * Портировано из web версии
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { colors, borderRadius, GradientName } from '../theme';

export interface ProgressBarProps {
  /** Прогресс от 0 до 100 */
  progress: number;
  /** Высота bar */
  height?: number;
  /** Градиент */
  gradient?: GradientName | string[];
  /** Цвет фона */
  backgroundColor?: string;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  gradient = 'peachLavender',
  backgroundColor = colors.neutral[200],
  style,
}) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withSpring(Math.min(Math.max(progress, 0), 100));
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value}%`,
    };
  });

  const gradientColors = Array.isArray(gradient)
    ? gradient
    : colors.gradients[gradient as GradientName];

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor,
          borderRadius: height / 2,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.progressContainer,
          animatedStyle,
          { borderRadius: height / 2 },
        ]}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  progressContainer: {
    height: '100%',
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
});
