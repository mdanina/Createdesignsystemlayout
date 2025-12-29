/**
 * TextArea Component - React Native
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

export interface TextAreaProps extends Omit<TextInputProps, 'style'> {
  /** Label текст */
  label?: string;
  /** Текст ошибки */
  error?: string;
  /** Helper текст */
  helper?: string;
  /** Максимальная длина */
  maxLength?: number;
  /** Показывать счётчик символов */
  showCount?: boolean;
  /** Disabled состояние */
  disabled?: boolean;
  /** Дополнительные стили для контейнера */
  containerStyle?: ViewStyle;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helper,
  maxLength,
  showCount = false,
  disabled = false,
  containerStyle,
  value,
  onChangeText,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const charCount = value?.toString().length || 0;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TextInput
        style={[
          styles.textArea,
          isFocused && styles.textAreaFocused,
          error && styles.textAreaError,
          disabled && styles.textAreaDisabled,
        ]}
        placeholderTextColor={colors.text.tertiary}
        editable={!disabled}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...textInputProps}
      />

      <View style={styles.footer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {helper && !error && <Text style={styles.helperText}>{helper}</Text>}
        {showCount && maxLength && (
          <Text style={[styles.countText, error && styles.spacer]}>
            {charCount}/{maxLength}
          </Text>
        )}
      </View>
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
  textArea: {
    ...textStyles.body,
    backgroundColor: colors.component.inputBackground,
    borderWidth: 1.5,
    borderColor: colors.component.inputBorder,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    color: colors.text.primary,
    minHeight: 100,
  },
  textAreaFocused: {
    borderColor: colors.component.buttonPrimary,
  },
  textAreaError: {
    borderColor: colors.semantic.error,
  },
  textAreaDisabled: {
    opacity: 0.5,
    backgroundColor: colors.neutral[100],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing[1],
    paddingHorizontal: spacing[1],
  },
  errorText: {
    ...textStyles.caption,
    color: colors.semantic.error,
    flex: 1,
  },
  helperText: {
    ...textStyles.caption,
    color: colors.text.tertiary,
    flex: 1,
  },
  countText: {
    ...textStyles.caption,
    color: colors.text.tertiary,
    marginLeft: spacing[2],
  },
  spacer: {
    marginRight: spacing[2],
  },
});
