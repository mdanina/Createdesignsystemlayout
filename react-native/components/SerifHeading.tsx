/**
 * SerifHeading Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { textStyles, colors } from '../theme';

export interface SerifHeadingProps {
  children: React.ReactNode;
  /** Размер заголовка */
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'display';
  /** Цвет текста */
  color?: string;
  /** Выравнивание */
  align?: 'left' | 'center' | 'right';
  /** Дополнительные стили */
  style?: TextStyle;
}

export const SerifHeading: React.FC<SerifHeadingProps> = ({
  children,
  size = 'medium',
  color = colors.text.primary,
  align = 'left',
  style,
}) => {
  const getSizeStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return textStyles.serifH4;
      case 'medium':
        return textStyles.serifH3;
      case 'large':
        return textStyles.serifH2;
      case 'xlarge':
        return textStyles.serifH1;
      case 'display':
        return textStyles.serifDisplay;
      default:
        return textStyles.serifH3;
    }
  };

  return (
    <Text
      style={[
        getSizeStyle(),
        {
          color,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({});
