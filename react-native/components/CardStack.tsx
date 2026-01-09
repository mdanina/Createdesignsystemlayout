/**
 * CardStack Component - React Native
 * Портировано из web версии с поддержкой всех props и variants
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, Dimensions, ViewStyle } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, borderRadius, shadows, textStyles, GradientName } from '../theme';

export type GradientType = 'coral' | 'blue' | 'pink' | 'lavender';

export interface CardItem {
  id: number;
  title: string;
  description?: string;
  image?: ImageSourcePropType;
  gradient?: GradientType;
  tag?: string; // Краткая команда/тег для карточки
}

export interface CardStackSettings {
  springDuration?: number;
  springBounce?: number;
  xSpringDuration?: number;
  xSpringBounce?: number;
  dragElastic?: number;
  swipeConfidenceThreshold?: number;
  zIndexDelay?: number;
}

interface CardStackProps {
  /** Массив карточек для отображения */
  items: CardItem[];
  /** Настройки анимации и поведения */
  settings?: CardStackSettings;
  /** Callback при свайпе карточки */
  onSwipe?: (item: CardItem, direction: 'left' | 'right') => void;
  /** Callback при смене активной карточки */
  onCardChange?: (currentIndex: number) => void;
  /** Дополнительные стили контейнера */
  style?: ViewStyle;
  /** Ширина контейнера (по умолчанию 323) */
  width?: number;
  /** Высота контейнера (по умолчанию 484) */
  height?: number;
}

const defaultSettings: CardStackSettings = {
  springDuration: 300,
  springBounce: 0.3,
  xSpringDuration: 500,
  xSpringBounce: 0.1,
  dragElastic: 0.7,
  swipeConfidenceThreshold: 100,
  zIndexDelay: 50,
};

const defaultGradients: GradientType[] = ['coral', 'blue', 'pink', 'lavender'];

const gradientColors: Record<GradientType, string[]> = {
  coral: ['#FFE5D9', '#FFD7BA', '#FFCBB3'],
  blue: ['#C9E4F5', '#B3D9F0', '#A8D4EB'],
  pink: ['#FFD1DC', '#FFC9DF', '#FFC2D1'],
  lavender: ['#E8D5F2', '#D9C2E8', '#D4C5F0'],
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 323;
const CARD_HEIGHT = 484;
const STACK_DEPTH = 4;

export const CardStack: React.FC<CardStackProps> = ({
  items,
  settings: userSettings,
  onSwipe,
  onCardChange,
  style,
  width = CARD_WIDTH,
  height = CARD_HEIGHT,
}) => {
  const settings = { ...defaultSettings, ...userSettings };
  const [indices, setIndices] = useState([0, 1, 2, 3]);
  const [currentPage, setCurrentPage] = useState(0);

  // Shared values for each card position
  const cardPositions = indices.map(() => ({
    x: useSharedValue(0),
    y: useSharedValue(0),
    scale: useSharedValue(1),
    rotation: useSharedValue(0),
    opacity: useSharedValue(1),
  }));

  useEffect(() => {
    // Reset positions when indices change
    cardPositions.forEach((pos, i) => {
      pos.x.value = withSpring(0, {
        duration: settings.springDuration,
        dampingRatio: 1 - settings.springBounce!,
      });
      pos.y.value = withSpring(0, {
        duration: settings.springDuration,
        dampingRatio: 1 - settings.springBounce!,
      });
      pos.scale.value = withSpring(getScaleForIndex(i), {
        duration: settings.springDuration,
        dampingRatio: 1 - settings.springBounce!,
      });
      pos.rotation.value = withSpring(getRotationForIndex(i), {
        duration: settings.springDuration,
        dampingRatio: 1 - settings.springBounce!,
      });
      pos.opacity.value = i < STACK_DEPTH ? 1 : 0;
    });
  }, [indices]);

  const getScaleForIndex = (index: number): number => {
    const scales = [1, 0.9, 0.85, 0.8];
    return scales[index] || 0.75;
  };

  const getRotationForIndex = (index: number): number => {
    const rotations = [0, 2, 4, 7];
    return rotations[index] || 10;
  };

  const getYOffsetForIndex = (index: number): number => {
    const offsets = [0, -12, 0, 12];
    return offsets[index] ?? 20;
  };

  const getXOffsetForIndex = (index: number): number => {
    const offsets = [0, 32, 48, 62];
    return offsets[index] ?? 80;
  };

  const paginate = () => {
    if (items.length === 0) return;
    
    setIndices((prevIndices) => [
      prevIndices[1],
      prevIndices[2],
      prevIndices[3],
      (prevIndices[3] + 1) % items.length,
    ]);
    
    const newPage = (currentPage + 1) % items.length;
    setCurrentPage(newPage);
    onCardChange?.(newPage);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (items.length === 0) return;
    const currentItem = items[indices[0] % items.length];
    onSwipe?.(currentItem, direction);
    paginate();
  };

  const swipePower = (offset: number, velocity: number): number => {
    return Math.abs(offset) * Math.abs(velocity);
  };

  const renderCard = (index: number, stackIndex: number) => {
    if (stackIndex >= STACK_DEPTH) return null;

    const itemIndex = indices[stackIndex] % items.length;
    const item = items[itemIndex];
    const cardPos = cardPositions[stackIndex];

    // Gesture for top card only
    const panGesture = stackIndex === 0
      ? Gesture.Pan()
          .onUpdate((e) => {
            cardPos.x.value = e.translationX;
            cardPos.y.value = e.translationY * 0.1; // Reduce vertical movement
            cardPos.rotation.value = e.translationX * 0.05;
            cardPos.scale.value = 1 - Math.abs(e.translationX) / 1000;

            // Update stack cards
            for (let i = 1; i < STACK_DEPTH; i++) {
              const factor = 1 - i * 0.3;
              cardPositions[i].x.value = e.translationX * factor;
              cardPositions[i].scale.value = getScaleForIndex(i) + Math.abs(e.translationX) * 0.0003;
            }
          })
          .onEnd((e) => {
            const swipe = swipePower(e.translationX, e.velocityX);
            const threshold = settings.swipeConfidenceThreshold! * 1000;

            if (swipe < -threshold || e.translationX < -width * 0.3) {
              // Swipe left
              cardPos.x.value = withSpring(-width * 2, {
                duration: settings.xSpringDuration,
                dampingRatio: 1 - settings.xSpringBounce!,
              });
              cardPos.opacity.value = withSpring(0);
              runOnJS(handleSwipe)('left');
            } else if (swipe > threshold || e.translationX > width * 0.3) {
              // Swipe right
              cardPos.x.value = withSpring(width * 2, {
                duration: settings.xSpringDuration,
                dampingRatio: 1 - settings.xSpringBounce!,
              });
              cardPos.opacity.value = withSpring(0);
              runOnJS(handleSwipe)('right');
            } else {
              // Return to center
              cardPos.x.value = withSpring(0, {
                duration: settings.springDuration,
                dampingRatio: 1 - settings.springBounce!,
              });
              cardPos.y.value = withSpring(0, {
                duration: settings.springDuration,
                dampingRatio: 1 - settings.springBounce!,
              });
              cardPos.rotation.value = withSpring(0, {
                duration: settings.springDuration,
                dampingRatio: 1 - settings.springBounce!,
              });
              cardPos.scale.value = withSpring(1, {
                duration: settings.springDuration,
                dampingRatio: 1 - settings.springBounce!,
              });

              // Reset stack cards
              for (let i = 1; i < STACK_DEPTH; i++) {
                cardPositions[i].x.value = withSpring(0, {
                  duration: settings.springDuration,
                  dampingRatio: 1 - settings.springBounce!,
                });
                cardPositions[i].scale.value = withSpring(getScaleForIndex(i), {
                  duration: settings.springDuration,
                  dampingRatio: 1 - settings.springBounce!,
                });
              }
            }
          })
      : undefined;

    const animatedStyle = useAnimatedStyle(() => {
      const baseScale = getScaleForIndex(stackIndex);
      const baseRotation = getRotationForIndex(stackIndex);
      const baseY = getYOffsetForIndex(stackIndex);
      const baseX = getXOffsetForIndex(stackIndex);

      return {
        transform: [
          { translateX: cardPos.x.value + baseX },
          { translateY: cardPos.y.value + baseY },
          { scale: cardPos.scale.value * baseScale },
          { rotate: `${cardPos.rotation.value + baseRotation}deg` },
        ],
        opacity: cardPos.opacity.value,
        zIndex: STACK_DEPTH - stackIndex,
      };
    });

    const gradient = item.gradient || defaultGradients[stackIndex % defaultGradients.length];
    const gradientColorsArray = gradientColors[gradient];

    const cardContent = (
      <Animated.View style={[styles.card, { width, height }, animatedStyle]}>
        {item.image ? (
          <Image
            source={item.image}
            style={styles.cardImage}
            resizeMode="cover"
          />
        ) : (
          <LinearGradient
            colors={gradientColorsArray}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {item.description && (
                <Text style={styles.cardDescription}>{item.description}</Text>
              )}
            </View>
            {item.tag && (
              <View style={styles.tagContainer}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>
              </View>
            )}
          </LinearGradient>
        )}
      </Animated.View>
    );

    if (stackIndex === 0 && panGesture) {
      return (
        <GestureDetector gesture={panGesture} key={`card-${item.id}-${stackIndex}`}>
          {cardContent}
        </GestureDetector>
      );
    }

    return <React.Fragment key={`card-${item.id}-${stackIndex}`}>{cardContent}</React.Fragment>;
  };

  return (
    <View style={[styles.container, { width, height }, style]}>
      {indices.slice(0, STACK_DEPTH).map((_, stackIndex) =>
        renderCard(indices[stackIndex], stackIndex)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    borderRadius: borderRadius.xl,
    backgroundColor: colors.ui.background,
    overflow: 'hidden',
    ...shadows.xl,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardGradient: {
    width: '100%',
    height: '100%',
    padding: spacing[6],
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
  },
  cardTitle: {
    ...textStyles.serifH3,
    color: colors.text.primary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing[3],
  },
  cardDescription: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  tagContainer: {
    marginTop: spacing[4],
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  tagText: {
    ...textStyles.caption,
    color: colors.text.primary,
    fontWeight: '500',
  },
});

export default CardStack;
