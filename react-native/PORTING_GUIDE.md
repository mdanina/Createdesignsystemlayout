# Полный гайд по портированию на React Native

## ✅ Что уже портировано

### Созданные файлы:

**Theme (Дизайн-токены):**
- `/react-native/theme/colors.ts` - Цвета и градиенты
- `/react-native/theme/typography.ts` - Типографика
- `/react-native/theme/spacing.ts` - Отступы, радиусы, тени
- `/react-native/theme/index.ts` - Экспорт

**Компоненты (10 из 37):**
1. ✅ `GradientBackground.tsx`
2. ✅ `SerifHeading.tsx`
3. ✅ `PillButton.tsx`
4. ✅ `WellnessCard.tsx`
5. ✅ `Input.tsx`
6. ✅ `Avatar.tsx`
7. ✅ `MoodTracker.tsx`
8. ✅ `StatCard.tsx`
9. ✅ `BottomNavigation.tsx`
10. ✅ `LoadingSpinner.tsx`
11. ✅ `ProgressBar.tsx`

**Примеры:**
- `/react-native/examples/HomeScreen.tsx` - Полный экран
- `/react-native/App.example.tsx` - Точка входа

## 📋 План дальнейшего портирования

### Оставшиеся компоненты (26):

**Формы:**
- [ ] TextArea
- [ ] Checkbox
- [ ] Radio
- [ ] Toggle
- [ ] DropdownSelector
- [ ] EmojiSelector

**Навигация:**
- [ ] TopNavigation
- [ ] Breadcrumbs

**Карточки:**
- [ ] ActionCard
- [ ] QuestionCard
- [ ] Timeline

**Обратная связь:**
- [ ] Alert
- [ ] Toast
- [ ] Modal
- [ ] Tooltip
- [ ] Popover

**Wellness:**
- [ ] MoodChart (требует react-native-chart-kit)
- [ ] MoodGraph
- [ ] DayGreeting
- [ ] StreakBadge
- [ ] VerticalSlider

**Утилиты:**
- [ ] Tag
- [ ] InfoBadge
- [ ] Tabs
- [ ] Pagination
- [ ] FloatingActionButton
- [ ] MobileScreen

## 🚀 Как начать использовать

### Шаг 1: Создайте React Native проект

```bash
npx react-native init WellnessApp --template react-native-template-typescript
cd WellnessApp
```

### Шаг 2: Установите зависимости

```bash
# Core
npm install react-native-linear-gradient
npm install react-native-svg
npm install react-native-reanimated
npm install react-native-gesture-handler

# Vector Icons (замена lucide-react)
npm install react-native-vector-icons
npm install --save-dev @types/react-native-vector-icons

# Charts (замена recharts)
npm install react-native-chart-kit

# NativeWind (опционально, для Tailwind-like синтаксиса)
npm install nativewind
npm install --save-dev tailwindcss@3.3.2
```

### Шаг 3: Настройте iOS (если используете Mac)

```bash
cd ios
pod install
cd ..
```

### Шаг 4: Скопируйте файлы

Скопируйте всю папку `/react-native/` из Figma Make проекта в ваш RN проект:

```
WellnessApp/
├── src/
│   ├── theme/          ← Скопируйте из /react-native/theme/
│   ├── components/     ← Скопируйте из /react-native/components/
│   └── examples/       ← Скопируйте из /react-native/examples/
├── App.tsx             ← Замените на /react-native/App.example.tsx
└── package.json
```

### Шаг 5: Настройте векторные иконки

**Android** (`android/app/build.gradle`):
```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

**iOS**: Следуйте инструкциям из документации react-native-vector-icons

### Шаг 6: Настройте анимации (react-native-reanimated)

**babel.config.js**:
```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

### Шаг 7: Запустите приложение

```bash
# iOS
npm run ios

# Android
npm run android
```

## 🎨 Установка кастомных шрифтов

### Libre Baskerville (Serif для заголовков)

1. Скачайте шрифты с [Google Fonts](https://fonts.google.com/specimen/Libre+Baskerville)

2. Создайте структуру:
```
assets/
└── fonts/
    ├── LibreBaskerville-Regular.ttf
    ├── LibreBaskerville-Italic.ttf
    └── LibreBaskerville-Bold.ttf
```

3. Создайте `react-native.config.js`:
```js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
```

4. Запустите:
```bash
npx react-native-asset
```

## 📦 Замена библиотек

| Web библиотека | React Native альтернатива | Статус |
|----------------|---------------------------|---------|
| `lucide-react` | `react-native-vector-icons` | ✅ Готово |
| `recharts` | `react-native-chart-kit` или `react-native-svg-charts` | 🔄 В процессе |
| `@radix-ui/*` | Кастомные компоненты | ✅ Портированы |
| CSS/Tailwind | StyleSheet или NativeWind | ✅ Готово |
| `react-slick` | `react-native-snap-carousel` | ⏳ Планируется |

## 💡 Примеры использования

### Базовый экран

```tsx
import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import {
  GradientBackground,
  SerifHeading,
  PillButton,
  WellnessCard,
} from './src/components';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GradientBackground gradient="peachLavender">
        <ScrollView style={{ padding: 24 }}>
          <SerifHeading size="large">Wellness App</SerifHeading>
          
          <WellnessCard gradient="mintSky" padding="large">
            <SerifHeading size="medium">Welcome</SerifHeading>
            <PillButton variant="primary" onPress={() => {}}>
              Get Started
            </PillButton>
          </WellnessCard>
        </ScrollView>
      </GradientBackground>
    </SafeAreaView>
  );
}
```

### С навигацией

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './src/examples/HomeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* Другие экраны */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

## 🐛 Частые проблемы

### 1. Градиенты не работают
**Проблема:** `react-native-linear-gradient` не установлен
**Решение:**
```bash
npm install react-native-linear-gradient
cd ios && pod install && cd ..
```

### 2. Анимации не работают
**Проблема:** `react-native-reanimated` plugin не настроен
**Решение:** Добавьте plugin в `babel.config.js` (см. Шаг 6)

### 3. Шрифты не применяются
**Проблема:** Шрифты не линкованы
**Решение:** Запустите `npx react-native-asset`

### 4. iOS: Build failed
**Проблема:** Pods не установлены
**Решение:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

## 📚 Дополнительные ресурсы

- [React Native Docs](https://reactnative.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Navigation](https://reactnavigation.org/)

## 🎯 Следующие шаги

1. Скопируйте файлы в новый RN проект
2. Установите зависимости
3. Запустите пример HomeScreen
4. Портируйте оставшиеся 26 компонентов по необходимости
5. Адаптируйте под свои нужды

## 💬 Поддержка

Все компоненты следуют той же визуальной концепции, что и веб-версия:
- Мягкие пастельные градиенты
- Serif типографика для заголовков
- Плавные анимации
- Успокаивающая wellness эстетика
