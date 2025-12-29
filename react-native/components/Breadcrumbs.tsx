/**
 * Breadcrumbs Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, textStyles } from '../theme';

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

export interface BreadcrumbsProps {
  /** Массив элементов breadcrumb */
  items: BreadcrumbItem[];
  /** Разделитель (по умолчанию ">") */
  separator?: React.ReactNode;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator,
  style,
}) => {
  const defaultSeparator = <Text style={styles.separator}>›</Text>;

  return (
    <View style={[styles.container, style]}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View key={index} style={styles.itemContainer}>
            {index > 0 && (
              <View style={styles.separatorContainer}>
                {separator || defaultSeparator}
              </View>
            )}

            {isLast ? (
              <Text style={styles.labelActive}>{item.label}</Text>
            ) : item.onPress ? (
              <TouchableOpacity onPress={item.onPress} activeOpacity={0.7}>
                <Text style={styles.labelInactive}>{item.label}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.labelInactive}>{item.label}</Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  separatorContainer: {
    alignItems: 'center',
  },
  separator: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
  labelActive: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
  labelInactive: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
});
