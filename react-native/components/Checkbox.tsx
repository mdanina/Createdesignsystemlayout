/**
 * Checkbox Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

export interface CheckboxProps {
  /** Checked состояние */
  checked: boolean;
  /** Callback при изменении */
  onChange: (checked: boolean) => void;
  /** Label текст */
  label?: string;
  /** Disabled состояние */
  disabled?: boolean;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled, style]}
      onPress={() => !disabled && onChange(!checked)}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.ui.border,
    backgroundColor: colors.ui.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.component.buttonPrimary,
    borderColor: colors.component.buttonPrimary,
  },
  checkmark: {
    color: colors.text.onDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    ...textStyles.body,
    color: colors.text.primary,
    marginLeft: spacing[3],
  },
});
