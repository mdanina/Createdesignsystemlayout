/**
 * Pagination Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, borderRadius, textStyles } from '../theme';

export interface PaginationProps {
  /** Текущая страница */
  currentPage: number;
  /** Всего страниц */
  totalPages: number;
  /** Callback при изменении страницы */
  onPageChange: (page: number) => void;
  /** Максимум видимых страниц */
  maxVisible?: number;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  style,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSide = Math.max(1, currentPage - 1);
      const rightSide = Math.min(totalPages, currentPage + 1);

      if (leftSide > 2) pages.push(1, '...');
      else if (leftSide === 2) pages.push(1);

      for (let i = leftSide; i <= rightSide; i++) {
        pages.push(i);
      }

      if (rightSide < totalPages - 1) pages.push('...', totalPages);
      else if (rightSide === totalPages - 1) pages.push(totalPages);
    }

    return pages;
  };

  const renderPageButton = (page: number | string, index: number) => {
    const isActive = page === currentPage;
    const isEllipsis = page === '...';

    if (isEllipsis) {
      return (
        <View key={index} style={styles.pageButton}>
          <Text style={styles.ellipsis}>{page}</Text>
        </View>
      );
    }

    if (isActive) {
      return (
        <LinearGradient
          key={index}
          colors={['#ff8a65', '#ff6f4a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.pageButtonActive}
        >
          <Text style={styles.pageTextActive}>{page}</Text>
        </LinearGradient>
      );
    }

    return (
      <TouchableOpacity
        key={index}
        style={styles.pageButton}
        onPress={() => typeof page === 'number' && onPageChange(page)}
        activeOpacity={0.7}
      >
        <Text style={styles.pageText}>{page}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* Previous */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.navText,
            currentPage === 1 && styles.navTextDisabled,
          ]}
        >
          ‹
        </Text>
      </TouchableOpacity>

      {/* Pages */}
      {getPageNumbers().map((page, index) => renderPageButton(page, index))}

      {/* Next */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.navText,
            currentPage === totalPages && styles.navTextDisabled,
          ]}
        >
          ›
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  navText: {
    ...textStyles.body,
    fontSize: 20,
    color: colors.text.primary,
  },
  navTextDisabled: {
    color: colors.text.disabled,
  },
  pageButton: {
    minWidth: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  pageButtonActive: {
    minWidth: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  pageText: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
  pageTextActive: {
    ...textStyles.bodySmall,
    color: colors.text.onDark,
    fontWeight: '600',
  },
  ellipsis: {
    ...textStyles.bodySmall,
    color: colors.text.tertiary,
  },
});
