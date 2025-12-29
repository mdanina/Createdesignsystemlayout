/**
 * Tooltip Component - React Native
 * Портировано из web версии
 * Базовая реализация (для полноценной используйте react-native-walkthrough-tooltip)
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows, textStyles } from '../theme';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Контент tooltip */
  content: string | React.ReactNode;
  /** Дочерний элемент (trigger) */
  children: React.ReactNode;
  /** Позиция tooltip */
  position?: TooltipPosition;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  style,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        onLongPress={() => setIsVisible(true)}
        activeOpacity={0.8}
      >
        {children}
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={[styles.tooltipContainer, shadows.lg, style]}>
            {typeof content === 'string' ? (
              <Text style={styles.tooltipText}>{content}</Text>
            ) : (
              content
            )}
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  tooltipContainer: {
    backgroundColor: colors.component.buttonPrimary,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.lg,
    maxWidth: 200,
  },
  tooltipText: {
    ...textStyles.bodySmall,
    color: colors.text.onDark,
  },
});
