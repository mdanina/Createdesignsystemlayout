# React Native Design System - Wellness App

Портированная версия wellness дизайн-системы для React Native.

## Установка и настройка

### 1. Создайте новый React Native проект

```bash
npx react-native init WellnessApp
cd WellnessApp
```

### 2. Установите необходимые зависимости

```bash
# Основные зависимости
npm install nativewind
npm install tailwindcss@3.3.2
npm install react-native-svg
npm install react-native-vector-icons
npm install react-native-linear-gradient
npm install react-native-reanimated
npm install react-native-gesture-handler

# Для графиков
npm install react-native-chart-kit
npm install react-native-svg

# Навигация (опционально)
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
```

### 3. Настройте NativeWind

Создайте `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Wellness palette
        'wellness-peach': '#FFE5D9',
        'wellness-lavender': '#E8D5F2',
        'wellness-mint': '#D5F2E3',
        'wellness-sky': '#C9E4F5',
        'wellness-rose': '#FFD1DC',
      },
      fontFamily: {
        'serif': ['Libre Baskerville'], // Requires custom font setup
        'sans': ['System'],
      },
    },
  },
  plugins: [],
}
```

Создайте `babel.config.js`:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
  ],
};
```

### 4. Скопируйте компоненты

Скопируйте все файлы из `/react-native/components/` в ваш проект:

```
WellnessApp/
├── src/
│   ├── components/
│   │   ├── design-system/
│   │   │   ├── PillButton.tsx
│   │   │   ├── WellnessCard.tsx
│   │   │   ├── SerifHeading.tsx
│   │   │   └── ... (все остальные)
│   │   └── index.ts
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   └── utils/
│       └── gradients.ts
```

## Основные отличия от Web версии

### Замена элементов:

| Web | React Native |
|-----|--------------|
| `<div>` | `<View>` |
| `<span>`, `<p>`, `<h1>` | `<Text>` |
| `<button>` | `<TouchableOpacity>` или `<Pressable>` |
| `<input>` | `<TextInput>` |
| `<img>` | `<Image>` |
| CSS classes | StyleSheet или NativeWind |

### Замена библиотек:

| Web | React Native |
|-----|--------------|
| `lucide-react` | `react-native-vector-icons` |
| `recharts` | `react-native-chart-kit` |
| `@radix-ui/*` | Кастомные компоненты |
| CSS градиенты | `react-native-linear-gradient` |

## Структура компонентов

Все компоненты следуют той же визуальной концепции:
- ✅ Мягкие пастельные градиенты
- ✅ Serif типографика для заголовков
- ✅ Плавные анимации
- ✅ Успокаивающая эстетика

## Портированные компоненты (37)

### Основные:
- ✅ PillButton
- ✅ WellnessCard
- ✅ SerifHeading
- ✅ GradientBackground
- ✅ Avatar
- ✅ Input
- ✅ TextArea
- ✅ Checkbox
- ✅ Radio
- ✅ Toggle

### Навигация:
- ✅ TopNavigation
- ✅ BottomNavigation
- ✅ Breadcrumbs

### Карточки и контент:
- ✅ ActionCard
- ✅ StatCard
- ✅ QuestionCard
- ✅ Timeline

### Обратная связь:
- ✅ Alert
- ✅ Toast
- ✅ Modal
- ✅ LoadingSpinner
- ✅ ProgressBar

### Селекторы:
- ✅ DropdownSelector
- ✅ EmojiSelector
- ✅ Tabs

### Специфичные для wellness:
- ✅ MoodTracker
- ✅ MoodChart
- ✅ MoodGraph
- ✅ DayGreeting
- ✅ StreakBadge
- ✅ VerticalSlider

### Утилиты:
- ✅ Tag
- ✅ InfoBadge
- ✅ Tooltip
- ✅ Popover
- ✅ Pagination
- ✅ FloatingActionButton
- ✅ MobileScreen

## Использование

```tsx
import React from 'react';
import { View } from 'react-native';
import { GradientBackground, SerifHeading, PillButton } from './src/components';

export default function App() {
  return (
    <GradientBackground colors={['#FFE5D9', '#E8D5F2']}>
      <View className="flex-1 justify-center items-center p-6">
        <SerifHeading size="large">Welcome to Wellness</SerifHeading>
        <PillButton 
          variant="primary" 
          onPress={() => console.log('Pressed')}
        >
          Get Started
        </PillButton>
      </View>
    </GradientBackground>
  );
}
```

## Шрифты

Для использования Libre Baskerville (serif):

1. Скачайте шрифт с Google Fonts
2. Поместите в `assets/fonts/`
3. Настройте в `react-native.config.js`:

```js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
```

4. Запустите: `npx react-native-asset`

## Примеры экранов

См. `/react-native/examples/` для полных примеров экранов:
- `HomeScreen.tsx` - главный экран
- `MoodTrackerScreen.tsx` - трекер настроения
- `StatsScreen.tsx` - статистика
- `ProfileScreen.tsx` - профиль

## Поддержка

Все компоненты протестированы на:
- ✅ iOS 14+
- ✅ Android 8+
- ✅ Dark mode поддержка (опционально)
