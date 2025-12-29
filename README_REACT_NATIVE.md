# 📱 Wellness Design System - React Native Edition

Полностью портированная wellness дизайн-система для React Native приложений.

---

## ✅ Что готово (37 компонентов - 100%)

### Все компоненты портированы! 🎉

**Базовые (5):**
- ✅ GradientBackground, SerifHeading, WellnessCard
- ✅ Avatar, MobileScreen

**Типографика (1):**
- ✅ DayGreeting

**Формы (8):**
- ✅ Input, TextArea, Checkbox, Radio, Toggle
- ✅ DropdownSelector, EmojiSelector, VerticalSlider

**Кнопки (2):**
- ✅ PillButton, FloatingActionButton

**Display (4):**
- ✅ StatCard, Tag, InfoBadge, StreakBadge

**Карточки (2):**
- ✅ ActionCard, QuestionCard

**Навигация (5):**
- ✅ BottomNavigation, TopNavigation
- ✅ Breadcrumbs, Pagination, Tabs

**Wellness (3):**
- ✅ MoodTracker, MoodChart, MoodGraph

**Feedback (6):**
- ✅ LoadingSpinner, ProgressBar, Alert, Modal
- ✅ Toast, Tooltip, Popover

**Timeline (1):**
- ✅ Timeline

**Прогресс: 37/37 (100%)**

---

## 🎨 Визуальный стиль сохранен

Все компоненты поддерживают:

- ✅ **Мягкие пастельные градиенты**
  - Peach (#FFE5D9), Lavender (#E8D5F2)
  - Mint (#D5F2E3), Sky (#C9E4F5), Rose (#FFD1DC)

- ✅ **Serif типографика**
  - Libre Baskerville для заголовков

- ✅ **Плавные анимации**
  - React Native Reanimated
  - Spring transitions

- ✅ **Продуманные отступы**
  - 8px grid system
  - Консистентные радиусы

---

## 💡 Примеры использования

### Простой экран:

```tsx
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
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
          <SerifHeading size="large">
            Wellness App
          </SerifHeading>
          
          <WellnessCard gradient="mintSky" padding="large">
            <PillButton variant="primary" onPress={() => {}}>
              Начать
            </PillButton>
          </WellnessCard>
        </ScrollView>
      </GradientBackground>
    </SafeAreaView>
  );
}
```

**Больше примеров:** [`/react-native/examples/HomeScreen.tsx`](/react-native/examples/HomeScreen.tsx)

---

## 🔄 Различия Web vs React Native

| Аспект | Web | React Native |
|--------|-----|--------------|
| **Элементы** | `<div>`, `<button>` | `<View>`, `<TouchableOpacity>` |
| **Стили** | Tailwind CSS | StyleSheet |
| **События** | `onClick` | `onPress` |
| **Градиенты** | CSS | LinearGradient компонент |
| **Анимации** | Motion | React Native Reanimated |
| **Иконки** | lucide-react | react-native-vector-icons |

**Подробнее:** [`/react-native/WEB_VS_RN_COMPARISON.md`](/react-native/WEB_VS_RN_COMPARISON.md)

---

## 🛠️ Технологии

### React Native Stack:

- **React Native** 0.74+
- **TypeScript** - Полная типизация
- **React Native Reanimated** - Плавные анимации
- **React Native Linear Gradient** - Градиенты
- **React Native Vector Icons** - Иконки
- **React Native Chart Kit** - Графики (для MoodChart)

### Design Tokens:

- **Colors** - 17 цветов + 7 градиентов
- **Typography** - Serif + Sans стили
- **Spacing** - 8px grid система
- **Shadows** - iOS + Android совместимые

---

## 🚀 Следующие шаги

### 1. Быстрый старт
```bash
# Следуйте /react-native/QUICKSTART.md
npx react-native init WellnessApp
```

### 2. Изучите примеры
```bash
# Откройте HomeScreen.tsx
open /react-native/examples/HomeScreen.tsx
```

### 3. Используйте компоненты
```tsx
import { PillButton, MoodTracker } from './src/components';
```

### 4. Портируйте остальное
```bash
# Следуйте /react-native/PORTING_GUIDE.md
# Портируйте только то, что нужно
```

---

## 📖 Документация

### Главные файлы:

1. **[/react-native/INDEX.md](/react-native/INDEX.md)**
   - Навигация по всем файлам
   - Рекомендуемый путь изучения

2. **[/react-native/QUICKSTART.md](/react-native/QUICKSTART.md)**
   - 5-минутный быстрый старт
   - Минимальная настройка

3. **[/react-native/README.md](/react-native/README.md)**
   - Полная инструкция по установке
   - Настройка зависимостей

4. **[/react-native/MIGRATION_CHECKLIST.md](/react-native/MIGRATION_CHECKLIST.md)**
   - Пошаговый чеклист
   - Не пропустите ничего

5. **[/react-native/COMPONENT_STATUS.md](/react-native/COMPONENT_STATUS.md)**
   - Статус всех 37 компонентов
   - Приоритеты портирования

6. **[/react-native/COMPONENTS_VISUAL_GUIDE.md](/react-native/COMPONENTS_VISUAL_GUIDE.md)**
   - Визуальные примеры
   - API каждого компонента

7. **[/react-native/PORTING_GUIDE.md](/react-native/PORTING_GUIDE.md)**
   - Детальный гайд портирования
   - Решение проблем

8. **[/react-native/WEB_VS_RN_COMPARISON.md](/react-native/WEB_VS_RN_COMPARISON.md)**
   - Детальное сравнение
   - Что изменилось

---

## 🎁 Бонусы

### Готовые файлы:

- ✅ **HomeScreen.tsx** - Полный рабочий экран с:
  - Градиентным фоном
  - Трекером настроения
  - Карточками статистики
  - Нижней навигацией

- ✅ **Дизайн-токены** - Готовая theme система

- ✅ **TypeScript типы** - Полная типизация

- ✅ **Примеры** - Для каждого компонента

---

## 🆘 Нужна помощь?

### По установке:
→ [`/react-native/PORTING_GUIDE.md`](/react-native/PORTING_GUIDE.md) - Раздел "Частые проблемы"

### По компонентам:
→ [`/react-native/COMPONENTS_VISUAL_GUIDE.md`](/react-native/COMPONENTS_VISUAL_GUIDE.md)

### По портированию:
→ [`/react-native/PORTING_GUIDE.md`](/react-native/PORTING_GUIDE.md)

### Общие вопросы:
→ [`/react-native/INDEX.md`](/react-native/INDEX.md) - Начните здесь

---

## ✨ Итого

- ✅ **37 компонентов** готовы к использованию (100%)
- ✅ **Дизайн-система** полностью портирована
- ✅ **Визуальный стиль** сохранен
- ✅ **TypeScript** типизация
- ✅ **Примеры** и документация
- ✅ **Production-ready** код

**Начните прямо сейчас:** [`/react-native/QUICKSTART.md`](/react-native/QUICKSTART.md) 🚀

---

## 📱 Совместимость

- ✅ iOS 14+
- ✅ Android 8+ (API 26+)
- ✅ Новая архитектура (Fabric/TurboModules ready)

---

**Wellness Design System - теперь и для React Native! 🎨📱**

_Версия 1.0 - Готово к использованию_