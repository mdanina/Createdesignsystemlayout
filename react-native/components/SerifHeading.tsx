/**
 * SerifHeading Component - React Native
 * Портировано из web версии
 */

import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { textStyles, colors, fontFamily, fontSize, lineHeight, fontWeight, letterSpacing } from '../theme';

export interface SerifHeadingProps {
  children: React.ReactNode;
  /** Размер заголовка (соответствует веб версии: xl, 2xl, 3xl, 4xl) */
  size?: 'xl' | '2xl' | '3xl' | '4xl';
  /** Цвет текста */
  color?: string;
  /** Выравнивание */
  align?: 'left' | 'center' | 'right';
  /** Дополнительные стили */
  style?: TextStyle;
}

export const SerifHeading: React.FC<SerifHeadingProps> = ({
  children,
  size = '2xl', // По умолчанию как в веб версии
  color = colors.text.primary, // #1a1a1a
  align = 'left',
  style,
}) => {
  const getSizeStyle = (): TextStyle => {
    // Соответствует веб версии: text-3xl, text-4xl, text-5xl, text-6xl
    switch (size) {
      case 'xl':
        return {
          fontFamily: fontFamily.serif,
          fontSize: fontSize['3xl'], // text-3xl = 28px
          lineHeight: fontSize['3xl'] * lineHeight.tight,
          fontWeight: fontWeight.medium, // font-medium
          letterSpacing: letterSpacing.tight,
        };
      case '2xl':
        return {
          fontFamily: fontFamily.serif,
          fontSize: fontSize['4xl'], // text-4xl = 32px
          lineHeight: fontSize['4xl'] * lineHeight.tight,
          fontWeight: fontWeight.medium,
          letterSpacing: letterSpacing.tight,
        };
      case '3xl':
        return {
          fontFamily: fontFamily.serif,
          fontSize: fontSize['5xl'], // text-5xl = 40px
          lineHeight: fontSize['5xl'] * lineHeight.tight,
          fontWeight: fontWeight.medium,
          letterSpacing: letterSpacing.tight,
        };
      case '4xl':
        return {
          fontFamily: fontFamily.serif,
          fontSize: fontSize['6xl'], // text-6xl = 48px
          lineHeight: fontSize['6xl'] * lineHeight.tight,
          fontWeight: fontWeight.medium,
          letterSpacing: letterSpacing.tight,
        };
      default:
        return {
          fontFamily: fontFamily.serif,
          fontSize: fontSize['4xl'],
          lineHeight: fontSize['4xl'] * lineHeight.tight,
          fontWeight: fontWeight.medium,
          letterSpacing: letterSpacing.tight,
        };
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
