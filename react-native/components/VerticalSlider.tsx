/**
 * VerticalSlider Component - React Native
 * Портировано из web версии
 * Использует @react-native-community/slider с rotation
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, textStyles } from '../theme';

export interface SliderLabel {
  value: number;
  label: string;
}

export interface VerticalSliderProps {
  /** Минимальное значение */
  min?: number;
  /** Максимальное значение */
  max?: number;
  /** Значение по умолчанию */
  defaultValue?: number;
  /** Labels для меток */
  labels?: SliderLabel[];
  /** Цвет слайдера */
  color?: string;
  /** Callback при изменении */
  onChange?: (value: number) => void;
  /** Высота слайдера */
  height?: number;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const VerticalSlider: React.FC<VerticalSliderProps> = ({
  min = 0,
  max = 10,
  defaultValue = 5,
  labels,
  color = '#ff8a65',
  onChange,
  height = 300,
  style,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Labels */}
      {labels && (
        <View style={[styles.labelsContainer, { height }]}>
          {labels.map((label, index) => (
            <Text
              key={index}
              style={[
                styles.label,
                Math.abs(value - label.value) < 1.5 && styles.labelActive,
              ]}
            >
              {label.label}
            </Text>
          ))}
        </View>
      )}

      {/* Vertical Slider */}
      <View style={[styles.sliderContainer, { height }]}>
        <View style={styles.sliderWrapper}>
          <Slider
            style={[styles.slider, { width: height }]}
            minimumValue={min}
            maximumValue={max}
            value={value}
            onValueChange={handleChange}
            minimumTrackTintColor={color}
            maximumTrackTintColor={colors.neutral[200]}
            thumbTintColor={color}
          />
        </View>
      </View>

      {/* Value Display */}
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value.toFixed(1)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[6],
  },
  labelsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column-reverse',
  },
  label: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
    opacity: 0.5,
  },
  labelActive: {
    color: colors.text.primary,
    opacity: 1,
    fontWeight: '600',
  },
  sliderContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderWrapper: {
    transform: [{ rotate: '-90deg' }],
  },
  slider: {
    height: 40,
  },
  valueContainer: {
    alignItems: 'center',
  },
  value: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
});
