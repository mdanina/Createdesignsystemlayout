/**
 * InfoBadge Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

export interface InfoBadgeProps {
  /** Иконка (React Node) */
  icon?: React.ReactNode;
  /** Текст */
  text: string;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const InfoBadge: React.FC<InfoBadgeProps> = ({ icon, text, style }) => {
  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    backgroundColor: colors.ui.background + 'CC', // 80% opacity
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.pill,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    opacity: 0.7,
  },
  text: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    opacity: 0.7,
  },
});
