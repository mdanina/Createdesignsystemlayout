/**
 * Toast Component - React Native
 * Портировано из web версии
 * Использует react-native-toast-message или кастомную реализацию
 */

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors, spacing, borderRadius, shadows, textStyles } from '../theme';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  /** Сообщение */
  message: string;
  /** Тип toast */
  type?: ToastType;
  /** Длительность отображения (ms) */
  duration?: number;
  /** Callback при закрытии */
  onClose?: () => void;
  /** Иконка (опционально) */
  icon?: React.ReactNode;
  /** Показывать toast */
  visible?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  icon,
  visible = true,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const fadeAnim = new Animated.Value(0);
  const translateAnim = new Animated.Value(50);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);

      // Анимация появления
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Автозакрытие
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false);
      onClose?.();
    });
  };

  if (!isVisible) return null;

  const typeStyles = {
    success: {
      backgroundColor: colors.semantic.successLight,
      borderColor: colors.semantic.success,
      textColor: colors.semantic.success,
      icon: '✓',
    },
    error: {
      backgroundColor: colors.semantic.errorLight,
      borderColor: colors.semantic.error,
      textColor: colors.semantic.error,
      icon: '✕',
    },
    warning: {
      backgroundColor: colors.semantic.warningLight,
      borderColor: colors.semantic.warning,
      textColor: colors.semantic.warning,
      icon: '⚠',
    },
    info: {
      backgroundColor: colors.semantic.infoLight,
      borderColor: colors.semantic.info,
      textColor: colors.semantic.info,
      icon: 'ℹ',
    },
  };

  const currentStyle = typeStyles[type];

  return (
    <Animated.View
      style={[
        styles.container,
        shadows.xl,
        {
          backgroundColor: currentStyle.backgroundColor,
          borderColor: currentStyle.borderColor,
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
        },
      ]}
    >
      {icon || (
        <Text style={[styles.defaultIcon, { color: currentStyle.textColor }]}>
          {currentStyle.icon}
        </Text>
      )}

      <Text style={[styles.message, { color: currentStyle.textColor }]}>
        {message}
      </Text>

      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Text style={styles.closeIcon}>✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: spacing[4],
    left: spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: borderRadius.xl,
    borderWidth: 2,
    zIndex: 9999,
  },
  defaultIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    ...textStyles.bodySmall,
    flex: 1,
    fontWeight: '600',
  },
  closeButton: {
    padding: spacing[1],
  },
  closeIcon: {
    fontSize: 16,
    color: colors.text.secondary,
  },
});
