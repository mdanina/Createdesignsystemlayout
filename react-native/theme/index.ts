/**
 * Wellness Design System - Theme Index
 * Экспорт всех токенов дизайна
 */

export * from './colors';
export * from './typography';
export * from './spacing';

import { colors } from './colors';
import { fontFamily, fontSize, lineHeight, fontWeight, letterSpacing, textStyles } from './typography';
import { spacing, borderRadius, shadows } from './spacing';

// Единый объект theme для удобного использования
export const theme = {
  colors,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  textStyles,
  spacing,
  borderRadius,
  shadows,
} as const;

export default theme;
