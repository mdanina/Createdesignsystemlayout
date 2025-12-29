/**
 * MoodChart Component - React Native
 * Портировано из web версии
 * Использует react-native-chart-kit или react-native-svg-charts
 */

import React from 'react';
import { View, Dimensions, StyleSheet, ViewStyle } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors, spacing } from '../theme';

export interface MoodChartData {
  day: string;
  mood: number;
}

export interface MoodChartProps {
  /** Данные графика */
  data: MoodChartData[];
  /** Цвет линии */
  color?: string;
  /** Высота графика */
  height?: number;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const MoodChart: React.FC<MoodChartProps> = ({
  data,
  color = '#b8a0d6',
  height = 200,
  style,
}) => {
  const screenWidth = Dimensions.get('window').width - spacing[6] * 2;

  const chartData = {
    labels: data.map((item) => item.day),
    datasets: [
      {
        data: data.map((item) => item.mood),
        color: () => color,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: colors.ui.background,
    backgroundGradientFrom: colors.ui.background,
    backgroundGradientTo: colors.ui.background,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(${hexToRgb(color)}, ${opacity})`,
    labelColor: (opacity = 1) => colors.text.tertiary,
    style: {
      borderRadius: spacing[4],
    },
    propsForDots: {
      r: '4',
      strokeWidth: '0',
      fill: color,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: colors.ui.border,
      strokeWidth: 1,
    },
  };

  return (
    <View style={[styles.container, style]}>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={height}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={true}
        withDots={true}
        withShadow={false}
      />
    </View>
  );
};

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chart: {
    borderRadius: spacing[4],
  },
});
