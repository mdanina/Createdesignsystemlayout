/**
 * DropdownSelector Component - React Native
 * Портировано из web версии
 * Использует @react-native-picker/picker
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows, textStyles } from '../theme';

export interface DropdownSelectorProps {
  /** Массив опций */
  options: string[];
  /** Значение по умолчанию */
  defaultValue?: string;
  /** Placeholder */
  placeholder?: string;
  /** Callback при изменении */
  onChange?: (value: string) => void;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  options,
  defaultValue,
  placeholder = 'Select an option',
  onChange,
  style,
}) => {
  const [selected, setSelected] = useState(defaultValue || options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Trigger Button */}
      <TouchableOpacity
        style={[styles.trigger, shadows.sm]}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.triggerText}>{selected || placeholder}</Text>
        <Text style={[styles.chevron, isOpen && styles.chevronOpen]}>
          ▼
        </Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.dropdown, shadows.lg]}>
            <ScrollView style={styles.optionsList}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.option,
                    selected === option && styles.optionSelected,
                  ]}
                  onPress={() => handleSelect(option)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected === option && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  trigger: {
    backgroundColor: colors.ui.background + 'CC',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  triggerText: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 10,
    color: colors.text.secondary,
  },
  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.ui.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: colors.ui.background,
    borderRadius: borderRadius.xl,
    minWidth: 200,
    maxHeight: 400,
    overflow: 'hidden',
  },
  optionsList: {
    maxHeight: 400,
  },
  option: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border + '33',
  },
  optionSelected: {
    backgroundColor: colors.neutral[100],
  },
  optionText: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
  },
  optionTextSelected: {
    fontWeight: '600',
  },
});
