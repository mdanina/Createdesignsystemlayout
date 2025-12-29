/**
 * Tabs Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  /** Массив табов */
  items: TabItem[];
  /** Активный таб */
  activeTab: string;
  /** Callback при изменении */
  onChange: (tabId: string) => void;
  /** Вариант отображения */
  variant?: 'default' | 'pills';
  /** Scrollable tabs */
  scrollable?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onChange,
  variant = 'default',
  scrollable = false,
}) => {
  const tabsContent = items.map((item) => {
    const isActive = item.id === activeTab;

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.tab,
          variant === 'pills' && styles.tabPill,
          isActive && styles.tabActive,
          variant === 'pills' && isActive && styles.tabPillActive,
        ]}
        onPress={() => onChange(item.id)}
        activeOpacity={0.7}
      >
        {item.icon && <View style={styles.icon}>{item.icon}</View>}
        <Text
          style={[
            styles.tabLabel,
            isActive && styles.tabLabelActive,
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  });

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={[
          styles.container,
          variant === 'pills' && styles.containerPills,
        ]}
      >
        {tabsContent}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        variant === 'pills' && styles.containerPills,
      ]}
    >
      {tabsContent}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0,
  },
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
  },
  containerPills: {
    borderBottomWidth: 0,
    gap: spacing[2],
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabPill: {
    borderBottomWidth: 0,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.neutral[100],
  },
  tabActive: {
    borderBottomColor: colors.component.buttonPrimary,
  },
  tabPillActive: {
    backgroundColor: colors.wellness.peach,
  },
  icon: {
    marginRight: spacing[2],
  },
  tabLabel: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  tabLabelActive: {
    color: colors.text.primary,
    fontWeight: '600',
  },
});
