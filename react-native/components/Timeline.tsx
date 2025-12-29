/**
 * Timeline Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, textStyles, shadows } from '../theme';

export type TimelineGradient = 'coral' | 'lavender' | 'blue' | 'pink';

export interface TimelineItem {
  time: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  gradient?: TimelineGradient;
}

export interface TimelineProps {
  /** Массив элементов timeline */
  items: TimelineItem[];
  /** Дополнительные стили */
  style?: ViewStyle;
}

const gradientColors: Record<TimelineGradient, string[]> = {
  coral: ['#ff8a65', '#ff6f4a'],
  lavender: ['#b8a0d6', '#9b7ec4'],
  blue: ['#a8d8ea', '#8bc9e0'],
  pink: ['#ffb5c5', '#ff9fb3'],
};

export const Timeline: React.FC<TimelineProps> = ({ items, style }) => {
  return (
    <View style={[styles.container, style]}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View key={index} style={styles.item}>
            {/* Icon and Line */}
            <View style={styles.iconColumn}>
              <LinearGradient
                colors={gradientColors[item.gradient || 'coral']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.iconContainer, shadows.md]}
              >
                {item.icon || <View style={styles.dot} />}
              </LinearGradient>

              {!isLast && <View style={styles.line} />}
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.title}>{item.title}</Text>
              {item.description && (
                <Text style={styles.description}>{item.description}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing[6],
  },
  item: {
    flexDirection: 'row',
    gap: spacing[4],
  },
  iconColumn: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.ui.background,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 40,
    backgroundColor: colors.neutral[300],
    marginTop: spacing[2],
  },
  content: {
    flex: 1,
    paddingBottom: spacing[6],
  },
  time: {
    ...textStyles.caption,
    color: colors.text.tertiary,
    marginBottom: spacing[1],
  },
  title: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing[1],
  },
  description: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
});
