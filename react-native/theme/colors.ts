/**
 * Wellness Design System - Color Tokens
 * Портировано из web версии
 */

export const colors = {
  // Primary wellness palette - пастельные градиенты
  wellness: {
    peach: '#FFE5D9',
    peachDark: '#FFD4C2',
    lavender: '#E8D5F2',
    lavenderDark: '#D9C2E8',
    mint: '#D5F2E3',
    mintDark: '#C2E8D4',
    sky: '#C9E4F5',
    skyDark: '#B3D9F0',
    rose: '#FFD1DC',
    roseDark: '#FFC2D1',
    cream: '#FFF8F0',
    yellow: '#FFF4CC',
    coral: '#FFCBB3',
  },

  // Gradients для LinearGradient компонента
  // Соответствуют веб версии из theme.css
  gradients: {
    // GradientBackground варианты (3 цвета для более плавного перехода)
    peach: ['#ffecd2', '#ffd7ba', '#fcb69f'],
    lavender: ['#e6dff5', '#d4c5f0', '#c8b8e8'],
    cream: ['#fef3e2', '#ffecd2', '#ffd7ba'],
    pink: ['#ffd6e8', '#ffc9df', '#ffb5d5'],
    
    // WellnessCard градиенты (с прозрачностью, но в RN используем более светлые версии)
    coral: ['rgba(255, 138, 101, 0.2)', 'rgba(255, 178, 153, 0.3)'],
    blue: ['rgba(168, 216, 234, 0.2)', 'rgba(168, 216, 234, 0.3)'],
    pinkCard: ['rgba(255, 214, 232, 0.3)', 'rgba(255, 181, 213, 0.4)'],
    lavenderCard: ['rgba(212, 197, 240, 0.3)', 'rgba(184, 160, 214, 0.4)'],
    
    // Старые варианты (для обратной совместимости)
    peachLavender: ['#FFE5D9', '#E8D5F2'],
    mintSky: ['#D5F2E3', '#C9E4F5'],
    roseYellow: ['#FFD1DC', '#FFF4CC'],
    creamPeach: ['#FFF8F0', '#FFE5D9'],
    lavenderMint: ['#E8D5F2', '#D5F2E3'],
    skyRose: ['#C9E4F5', '#FFD1DC'],
    coralCream: ['#FFCBB3', '#FFF8F0'],
  },

  // Нейтральные цвета
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Текст (соответствует веб версии)
  text: {
    primary: '#1a1a1a', // --foreground из theme.css
    secondary: '#666666',
    tertiary: '#999999',
    disabled: '#CCCCCC',
    onDark: '#FFFFFF',
    onLight: '#1a1a1a',
  },

  // Семантические цвета
  semantic: {
    success: '#4CAF50',
    successLight: '#E8F5E9',
    warning: '#FF9800',
    warningLight: '#FFF3E0',
    error: '#F44336',
    errorLight: '#FFEBEE',
    info: '#2196F3',
    infoLight: '#E3F2FD',
  },

  // UI элементы
  ui: {
    background: '#FFFFFF',
    backgroundSecondary: '#FAFAFA',
    border: '#E5E5E5',
    borderLight: '#F0F0F0',
    shadow: 'rgba(0, 0, 0, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Специальные цвета для компонентов (соответствует веб версии)
  component: {
    buttonPrimary: '#1a1a1a', // --primary из theme.css
    buttonSecondary: '#FFFFFF',
    inputBackground: '#FFFFFF',
    inputBorder: 'rgba(0, 0, 0, 0.08)', // --input из theme.css
    cardBackground: '#FFFFFF',
    modalBackground: '#FFFFFF',
    // Wellness цвета из theme.css
    coral: '#ff8a5b',
    coralLight: '#ffb299',
    lavender: '#e4a5f0',
    lavenderLight: '#f0d5f7',
    softBlue: '#6ab9e7',
    softPink: '#ffb5d5',
  },
} as const;

// Типы для TypeScript
export type WellnessColor = keyof typeof colors.wellness;
export type GradientName = keyof typeof colors.gradients;
export type NeutralShade = keyof typeof colors.neutral;
export type SemanticColor = keyof typeof colors.semantic;

// Хелпер функции
export const getGradientColors = (gradientName: GradientName) => {
  return colors.gradients[gradientName];
};

export const getSemanticColor = (type: 'success' | 'warning' | 'error' | 'info', light = false) => {
  return light 
    ? colors.semantic[`${type}Light` as keyof typeof colors.semantic]
    : colors.semantic[type];
};
