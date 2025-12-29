/**
 * MobileScreen Component - React Native
 * Обёртка для экранов с безопасными зонами
 * Портировано из web версии (упрощено для RN)
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, SafeAreaView } from 'react-native';
import { colors } from '../theme';

export interface MobileScreenProps {
  /** Контент экрана */
  children: React.ReactNode;
  /** Цвет фона */
  backgroundColor?: string;
  /** Использовать SafeAreaView */
  useSafeArea?: boolean;
  /** Дополнительные стили */
  style?: ViewStyle;
}

export const MobileScreen: React.FC<MobileScreenProps> = ({
  children,
  backgroundColor = colors.ui.background,
  useSafeArea = true,
  style,
}) => {
  const Container = useSafeArea ? SafeAreaView : View;

  return (
    <Container
      style={[
        styles.container,
        { backgroundColor },
        style,
      ]}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
