/**
 * GradientMesh Component - React Native
 * Декоративный компонент с градиентами в стиле "Light Mesh Holographic Gradients"
 * Альтернатива WebGL компоненту для React Native
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { colors, borderRadius } from '../theme';

export type GradientMeshVariant =
  | 'iridescent'
  | 'peachLavender'
  | 'mintSky'
  | 'roseYellow'
  | 'coralBlue'
  | 'custom';

export interface GradientMeshProps {
  /** Размер компонента */
  size?: number;
  /** Вариант градиента */
  variant?: GradientMeshVariant;
  /** Кастомные цвета градиента */
  colors?: string[];
  /** Включить анимацию */
  animated?: boolean;
  /** Скорость анимации (1 = нормальная, 2 = быстрая, 0.5 = медленная) */
  animationSpeed?: number;
  /** Включить пульсацию */
  pulsing?: boolean;
  /** Включить вращение */
  rotating?: boolean;
  /** Дополнительные стили */
  style?: ViewStyle;
  /** Прозрачность */
  opacity?: number;
}

const gradientVariants: Record<GradientMeshVariant, string[][]> = {
  iridescent: [
    ['#E8D5F2', '#D4C5F0', '#C9E4F5'],
    ['#C9E4F5', '#A8D4EB', '#FFD1DC'],
    ['#FFD1DC', '#FFC9DF', '#FFF4CC'],
    ['#FFF4CC', '#FFE5D9', '#E8D5F2'],
  ],
  peachLavender: [
    ['#FFE5D9', '#E8D5F2', '#D9C2E8'],
    ['#D9C2E8', '#FFE5D9', '#FFD7BA'],
  ],
  mintSky: [
    ['#D5F2E3', '#C2E8D4', '#C9E4F5'],
    ['#C9E4F5', '#B3D9F0', '#D5F2E3'],
  ],
  roseYellow: [
    ['#FFD1DC', '#FFC2D1', '#FFF4CC'],
    ['#FFF4CC', '#FFE5D9', '#FFD1DC'],
  ],
  coralBlue: [
    ['#FFCBB3', '#FFE5D9', '#C9E4F5'],
    ['#C9E4F5', '#B3D9F0', '#FFCBB3'],
  ],
  custom: [],
};

export const GradientMesh: React.FC<GradientMeshProps> = ({
  size = 200,
  variant = 'iridescent',
  colors: customColors,
  animated = true,
  animationSpeed = 1,
  pulsing = false,
  rotating = false,
  style,
  opacity = 0.7,
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const gradientOffset = useSharedValue(0);

  useEffect(() => {
    if (!animated) return;

    if (rotating) {
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 10000 / animationSpeed,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    }

    if (pulsing) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, {
            duration: 2000 / animationSpeed,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, {
            duration: 2000 / animationSpeed,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        true
      );
    }

    if (variant === 'iridescent') {
      gradientOffset.value = withRepeat(
        withSequence(
          withTiming(1, {
            duration: 3000 / animationSpeed,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, {
            duration: 3000 / animationSpeed,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        true
      );
    }
  }, [animated, rotating, pulsing, animationSpeed, variant]);

  const getGradientColors = (): string[] => {
    if (customColors && customColors.length >= 2) {
      return customColors;
    }

    if (variant === 'custom') {
      return customColors || colors.gradients.peachLavender;
    }

    const variantGradients = gradientVariants[variant];
    if (!variantGradients || variantGradients.length === 0) {
      return colors.gradients.peachLavender;
    }

    // Return first gradient set for simple variants
    return variantGradients[0] || colors.gradients.peachLavender;
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: rotating ? `${rotation.value}deg` : '0deg' },
        { scale: pulsing ? scale.value : 1 },
      ],
    };
  });

  const gradientColors = getGradientColors();


  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity,
        },
        animatedContainerStyle,
        style,
      ]}
    >
      {/* Основной градиент */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Внутренний градиент для эффекта глубины */}
        <View style={styles.innerGradient}>
          <LinearGradient
            colors={[gradientColors[1] || gradientColors[0], 'transparent']}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.innerGradient}
          />
        </View>
        
        {/* Дополнительный слой для mesh эффекта */}
        {variant === 'iridescent' && (
          <View style={styles.meshLayer}>
            <LinearGradient
              colors={['transparent', gradientColors[2] || gradientColors[0], 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.meshLayer}
            />
          </View>
        )}
      </LinearGradient>
      
      {/* Внешнее свечение */}
      {opacity > 0.5 && (
        <View
          style={[
            styles.glow,
            {
              width: size * 1.15,
              height: size * 1.15,
              borderRadius: (size * 1.15) / 2,
              marginTop: -(size * 1.15) / 2,
              marginLeft: -(size * 1.15) / 2,
            },
          ]}
        >
          <LinearGradient
            colors={[gradientColors[0] + '40', 'transparent']}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
            style={styles.glow}
          />
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  innerGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  meshLayer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.3,
  },
  glow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -1, // Половина размера для центрирования
    marginLeft: -1,
    backgroundColor: 'transparent',
    opacity: 0.2,
  },
});

export default GradientMesh;
