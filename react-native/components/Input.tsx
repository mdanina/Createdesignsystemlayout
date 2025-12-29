/**
 * Input Component - React Native
 * Портировано из web версии
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /** Label текст */
  label?: string;
  /** Текст ошибки */
  error?: string;
  /** Helper текст */
  helper?: string;
  /** Disabled состояние */
  disabled?: boolean;
  /** Дополнительные стили для контейнера */
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  disabled = false,
  containerStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
        placeholderTextColor={colors.text.tertiary}
        editable={!disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...textInputProps}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
      {helper && !error && <Text style={styles.helperText}>{helper}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  label: {
    ...textStyles.label,
    color: colors.text.secondary,
    marginBottom: spacing[2],
  },
  input: {
    ...textStyles.body,
    backgroundColor: colors.component.inputBackground,
    borderWidth: 1.5,
    borderColor: colors.component.inputBorder,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    color: colors.text.primary,
  },
  inputFocused: {
    borderColor: colors.component.buttonPrimary,
  },
  inputError: {
    borderColor: colors.semantic.error,
  },
  inputDisabled: {
    opacity: 0.5,
    backgroundColor: colors.neutral[100],
  },
  errorText: {
    ...textStyles.caption,
    color: colors.semantic.error,
    marginTop: spacing[1],
  },
  helperText: {
    ...textStyles.caption,
    color: colors.text.tertiary,
    marginTop: spacing[1],
  },
});
