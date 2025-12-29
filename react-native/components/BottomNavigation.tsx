/**
 * BottomNavigation Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { colors, spacing, shadows, textStyles } from '../theme';

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface BottomNavigationProps {
  /** Массив элементов навигации */
  items: NavigationItem[];
  /** Активный элемент */
  activeItem: string;
  /** Callback при изменении */
  onChange: (itemId: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  activeItem,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.id === activeItem;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={() => onChange(item.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                isActive && styles.iconContainerActive,
              ]}
            >
              {item.icon}
            </View>
            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.ui.background,
    paddingBottom: Platform.OS === 'ios' ? spacing[6] : spacing[4],
    paddingTop: spacing[3],
    paddingHorizontal: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.ui.border,
    ...shadows.lg,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: spacing[1],
    opacity: 0.5,
  },
  iconContainerActive: {
    opacity: 1,
  },
  label: {
    ...textStyles.caption,
    color: colors.text.tertiary,
  },
  labelActive: {
    color: colors.text.primary,
    fontWeight: '600',
  },
});
