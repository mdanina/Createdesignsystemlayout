/**
 * MoodGraph Component - React Native
 * Портировано из web версии
 * Использует react-native-svg для кастомной визуализации
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path, Line, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { colors, spacing, borderRadius, shadows, textStyles } from '../theme';

export interface MoodGraphData {
  day: string;
  value: number;
}

export interface MoodGraphProps {
  /** Заголовок */
  title?: string;
  /** Подзаголовок */
  subtitle?: string;
  /** Данные графика */
  data?: MoodGraphData[];
  /** Emoji */
  emoji?: string;
  /** Дополнительные стили */
  style?: ViewStyle;
}

const defaultData: MoodGraphData[] = [
  { day: 'M', value: 3.5 },
  { day: 'T', value: 3.0 },
  { day: 'W', value: 3.2 },
  { day: 'T', value: 3.7 },
  { day: 'F', value: 3.4 },
  { day: 'S', value: 3.8 },
  { day: 'S', value: 3.7 },
];

export const MoodGraph: React.FC<MoodGraphProps> = ({
  title = '3.6 average mood',
  subtitle = 'You focus on health and you feel great',
  data = defaultData,
  emoji = '😊',
  style,
}) => {
  const width = 280;
  const height = 100;
  const padding = 20;
  const pointWidth = (width - padding * 2) / (data.length - 1);

  // Normalize values
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const points = data.map((d, i) => ({
    x: padding + i * pointWidth,
    y: height - padding - ((d.value - minValue) / range) * (height - padding * 2),
  }));

  // Create smooth curve path
  const pathD = points.reduce((path, point, i) => {
    if (i === 0) {
      return `M ${point.x} ${point.y}`;
    }
    const prevPoint = points[i - 1];
    const midX = (prevPoint.x + point.x) / 2;
    const midY = (prevPoint.y + point.y) / 2;
    return `${path} Q ${prevPoint.x} ${prevPoint.y}, ${midX} ${midY} Q ${point.x} ${point.y}, ${point.x} ${point.y}`;
  }, '');

  return (
    <View style={[styles.container, shadows.sm, style]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {/* Graph */}
      <Svg width={width} height={height} style={styles.svg}>
        <Defs>
          <SvgLinearGradient id="moodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#e4a5f0" />
            <Stop offset="50%" stopColor="#c9a0e8" />
            <Stop offset="100%" stopColor="#b89ed6" />
          </SvgLinearGradient>
        </Defs>

        {/* Base line */}
        <Line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke={colors.neutral[200]}
          strokeWidth="1"
        />

        {/* Wave path */}
        <Path
          d={pathD}
          fill="none"
          stroke="url(#moodGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>

      {/* Day labels */}
      <View style={styles.labels}>
        {data.map((d, i) => (
          <Text key={i} style={styles.dayLabel}>
            {d.day}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ui.background,
    borderRadius: 28,
    padding: spacing[6],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  emoji: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
  subtitle: {
    ...textStyles.caption,
    fontSize: 10,
    color: colors.text.tertiary,
    marginTop: 2,
  },
  svg: {
    width: '100%',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[3],
    marginTop: spacing[2],
  },
  dayLabel: {
    ...textStyles.caption,
    fontSize: 10,
    color: colors.text.tertiary,
  },
});
