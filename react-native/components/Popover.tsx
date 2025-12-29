/**
 * Popover Component - React Native
 * Портировано из web версии
 * Базовая реализация (для полноценной используйте react-native-popover-view)
 */

import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../theme';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  /** Trigger элемент */
  trigger: React.ReactNode;
  /** Контент popover */
  content: React.ReactNode;
  /** Позиция popover */
  position?: PopoverPosition;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  position = 'bottom',
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.8}
      >
        {trigger}
      </TouchableOpacity>

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
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={[styles.popoverContainer, shadows.xl, style]}>
              {content}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  popoverContainer: {
    backgroundColor: colors.ui.background,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.ui.border,
    padding: spacing[4],
    maxWidth: 300,
  },
});
