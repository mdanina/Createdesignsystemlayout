/**
 * LoadingSpinner Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, spacing, textStyles } from '../theme';

export interface LoadingSpinnerProps {
  /** Размер спиннера */
  size?: 'small' | 'large';
  /** Цвет спиннера */
  color?: string;
  /** Текст под спиннером */
  text?: string;
  /** Показывать overlay */
  overlay?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = colors.component.buttonPrimary,
  text,
  overlay = false,
}) => {
  const content = (
    <View style={[styles.container, overlay && styles.overlay]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );

  return content;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.ui.overlay,
    zIndex: 999,
  },
  text: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing[3],
  },
});
