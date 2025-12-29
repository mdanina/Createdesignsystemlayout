/**
 * Wellness Design System - Typography Tokens
 * Портировано из web версии
 */

import { TextStyle } from 'react-native';

export const fontFamily = {
  // Serif для заголовков (требует установки custom шрифта)
  serif: 'LibreBaskerville-Regular',
  serifItalic: 'LibreBaskerville-Italic',
  serifBold: 'LibreBaskerville-Bold',
  
  // Sans-serif для body текста (системный шрифт)
  sans: 'System',
  sansMedium: 'System',
  sansBold: 'System',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
} as const;

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

export const fontWeight = {
  normal: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
} as const;

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;

// Предопределенные стили текста
export const textStyles = {
  // Serif заголовки
  serifDisplay: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize['5xl'],
    lineHeight: fontSize['5xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  } as TextStyle,

  serifH1: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize['4xl'],
    lineHeight: fontSize['4xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  } as TextStyle,

  serifH2: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize['3xl'],
    lineHeight: fontSize['3xl'] * lineHeight.tight,
    letterSpacing: letterSpacing.normal,
  } as TextStyle,

  serifH3: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize['2xl'],
    lineHeight: fontSize['2xl'] * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  } as TextStyle,

  serifH4: {
    fontFamily: fontFamily.serif,
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  } as TextStyle,

  // Sans-serif body
  bodyLarge: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.lg,
    lineHeight: fontSize.lg * lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  } as TextStyle,

  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  } as TextStyle,

  bodySmall: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  } as TextStyle,

  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs * lineHeight.normal,
    letterSpacing: letterSpacing.wide,
  } as TextStyle,

  // Button и UI текст
  button: {
    fontFamily: fontFamily.sansMedium,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wide,
  } as TextStyle,

  buttonSmall: {
    fontFamily: fontFamily.sansMedium,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wide,
  } as TextStyle,

  label: {
    fontFamily: fontFamily.sansMedium,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
  } as TextStyle,
} as const;

// Типы для TypeScript
export type FontSize = keyof typeof fontSize;
export type FontFamily = keyof typeof fontFamily;
export type TextStyleName = keyof typeof textStyles;
