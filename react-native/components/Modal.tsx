/**
 * Modal Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { colors, spacing, borderRadius, shadows, textStyles } from '../theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface ModalProps {
  /** Видимость modal */
  visible: boolean;
  /** Callback закрытия */
  onClose: () => void;
  /** Заголовок */
  title?: string;
  /** Контент */
  children: React.ReactNode;
  /** Размер modal */
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  /** Показывать кнопку закрытия */
  showCloseButton?: boolean;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  style,
}) => {
  const getSizeStyles = (): ViewStyle => {
    if (size === 'fullscreen') {
      return {
        flex: 1,
        margin: 0,
        borderRadius: 0,
      };
    }

    const sizeMap = {
      small: SCREEN_HEIGHT * 0.3,
      medium: SCREEN_HEIGHT * 0.5,
      large: SCREEN_HEIGHT * 0.7,
    };

    return {
      maxHeight: sizeMap[size],
    };
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.modal, getSizeStyles(), style]}>
          {/* Header */}
          {(title || showCloseButton) && (
            <View style={styles.header}>
              {title && <Text style={styles.title}>{title}</Text>}
              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.closeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Content */}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.ui.overlay,
  },
  modal: {
    backgroundColor: colors.ui.background,
    borderRadius: borderRadius.xl,
    width: '90%',
    maxWidth: 500,
    ...shadows.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[6],
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.border,
  },
  title: {
    ...textStyles.serifH3,
    color: colors.text.primary,
    flex: 1,
  },
  closeButton: {
    padding: spacing[2],
  },
  closeIcon: {
    fontSize: 24,
    color: colors.text.secondary,
  },
  content: {
    padding: spacing[6],
  },
});
