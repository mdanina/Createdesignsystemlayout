/**
 * Radio Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  /** Массив опций */
  options: RadioOption[];
  /** Выбранное значение */
  value?: string;
  /** Callback при изменении */
  onChange?: (value: string) => void;
  /** Disabled состояние */
  disabled?: boolean;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            style={styles.option}
            onPress={() => !disabled && onChange?.(option.value)}
            activeOpacity={0.7}
            disabled={disabled}
          >
            <View style={styles.radioContainer}>
              <View
                style={[
                  styles.radioOuter,
                  isSelected && styles.radioOuterSelected,
                  disabled && styles.radioDisabled,
                ]}
              >
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </View>

            <View style={styles.labelContainer}>
              <Text style={styles.label}>{option.label}</Text>
              {option.description && (
                <Text style={styles.description}>{option.description}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing[3],
  },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[3],
  },
  radioContainer: {
    paddingTop: 2,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.ui.border,
    backgroundColor: colors.ui.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.component.buttonPrimary,
    backgroundColor: colors.wellness.peachDark + '20',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.component.buttonPrimary,
  },
  radioDisabled: {
    opacity: 0.5,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  description: {
    ...textStyles.caption,
    color: colors.text.tertiary,
    marginTop: spacing[1],
  },
});
