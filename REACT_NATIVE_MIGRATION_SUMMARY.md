# 📱 React Native - Полное руководство по миграции

## 🎉 Что готово

Ваша wellness дизайн-система успешно портирована на **React Native**!

### 📦 Созданная структура:

```
/react-native/
├── README.md                    # Главная инструкция
├── PORTING_GUIDE.md            # Детальный гайд по портированию
├── COMPONENT_STATUS.md         # Статус всех 37 компонентов
├── package.example.json        # Список зависимостей
│
├── theme/                      # Дизайн-токены
│   ├── colors.ts              # Цвета и градиенты
│   ├── typography.ts          # Типографика
│   ├── spacing.ts             # Отступы и тени
│   └── index.ts               # Экспорт
│
├── components/                 # 17 портированных компонентов
│   ├── GradientBackground.tsx
│   ├── SerifHeading.tsx
│   ├── PillButton.tsx
│   ├── WellnessCard.tsx
│   ├── Input.tsx
│   ├── Avatar.tsx
│   ├── MoodTracker.tsx
│   ├── StatCard.tsx
│   ├── BottomNavigation.tsx
│   ├── LoadingSpinner.tsx
│   ├── ProgressBar.tsx
│   ├── Alert.tsx
│   ├── Modal.tsx
│   ├── Checkbox.tsx
│   ├── Toggle.tsx
│   ├── Tag.tsx
│   ├── Tabs.tsx
│   └── index.ts
│
└── examples/                   # Примеры использования
    ├── HomeScreen.tsx         # Полный экран
    └── App.example.tsx        # Точка входа
```

---

## 🚀 Быстрый старт

### Вариант 1: Создать новый RN проект

```bash
# 1. Создайте проект
npx react-native init WellnessApp --template react-native-template-typescript

# 2. Перейдите в папку
cd WellnessApp

# 3. Установите зависимости
npm install react-native-linear-gradient \
            react-native-svg \
            react-native-reanimated \
            react-native-gesture-handler \
            react-native-vector-icons \
            react-native-chart-kit

# 4. Для iOS (если на Mac)
cd ios && pod install && cd ..

# 5. Скопируйте всю папку /react-native/ из Figma Make в:
#    WellnessApp/src/

# 6. Замените App.tsx содержимым из:
#    /react-native/App.example.tsx

# 7. Запустите
npm run ios      # или
npm run android
```

### Вариант 2: Использовать в существующем проекте

Просто скопируйте папки `/react-native/theme/` и `/react-native/components/` в ваш проект.

---

## ✅ Портировано (17 компонентов)

### Готовы к использованию:
1. **GradientBackground** - Градиентные фоны
2. **SerifHeading** - Serif заголовки  
3. **PillButton** - Кнопки (4 варианта)
4. **WellnessCard** - Карточки с градиентами
5. **Input** - Текстовые поля
6. **Avatar** - Аватары
7. **MoodTracker** - Трекер настроения с emoji
8. **StatCard** - Карточки статистики
9. **BottomNavigation** - Нижняя навигация
10. **LoadingSpinner** - Загрузка
11. **ProgressBar** - Прогресс с анимацией
12. **Alert** - Уведомления
13. **Modal** - Модальные окна
14. **Checkbox** - Чекбоксы
15. **Toggle** - Переключатели
16. **Tag** - Теги/бейджи
17. **Tabs** - Вкладки

**Прогресс: 17 из 37 компонентов (46%)**

---

## ⏳ Осталось портировать (20 компонентов)

### Высокий приоритет:
- TextArea (простой)
- Radio (простой)
- Toast (важный)
- MoodChart (ключевой)
- DayGreeting (простой)

### Средний приоритет:
- ActionCard
- QuestionCard
- DropdownSelector
- Timeline
- TopNavigation

### Низкий приоритет (есть готовые библиотеки):
- Breadcrumbs
- Pagination
- EmojiSelector
- Popover
- Tooltip

См. `/react-native/COMPONENT_STATUS.md` для деталей

---

## 📚 Ключевые файлы для изучения

### Начните с этих файлов:

1. **`/react-native/README.md`**
   - Главная инструкция по установке
   - Настройка зависимостей
   - Использование компонентов

2. **`/react-native/PORTING_GUIDE.md`**
   - Детальный гайд по портированию
   - Замена библиотек
   - Настройка шрифтов
   - Решение проблем

3. **`/react-native/COMPONENT_STATUS.md`**
   - Статус всех 37 компонентов
   - Приоритеты портирования
   - Рекомендуемые библиотеки

4. **`/react-native/examples/HomeScreen.tsx`**
   - Полный пример рабочего экрана
   - Использование компонентов
   - Best practices

---

## 🎨 Визуальная консистентность

Все компоненты сохраняют оригинальный wellness стиль:

- ✅ **Мягкие пастельные градиенты** (peach, lavender, mint, sky, rose)
- ✅ **Serif типографика** для заголовков (Libre Baskerville)
- ✅ **Плавные анимации** (React Native Reanimated)
- ✅ **Продуманные отступы** (8px grid system)
- ✅ **Успокаивающая эстетика**

---

## 💡 Примеры кода

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
            Добро пожаловать
          </SerifHeading>
          
          <WellnessCard gradient="mintSky" padding="large">
            <PillButton 
              variant="primary"
              onPress={() => console.log('Pressed')}
            >
              Начать
            </PillButton>
          </WellnessCard>
        </ScrollView>
      </GradientBackground>
    </SafeAreaView>
  );
}
```

### С трекером настроения:

```tsx
import { MoodTracker } from './src/components';

function MoodScreen() {
  const [mood, setMood] = React.useState();
  
  return (
    <WellnessCard>
      <SerifHeading size="medium">
        Как ваше настроение?
      </SerifHeading>
      <MoodTracker 
        value={mood}
        onChange={setMood}
        showLabels
      />
    </WellnessCard>
  );
}
```

---

## 📱 Тестирование

### iOS:
```bash
npm run ios
```

### Android:
```bash
npm run android
```

### Отладка:
```bash
npm start
# Затем нажмите 'i' для iOS или 'a' для Android
```

---

## 🔧 Настройка

### Шрифты:

1. Скачайте Libre Baskerville с Google Fonts
2. Поместите в `assets/fonts/`
3. Создайте `react-native.config.js`:

```js
module.exports = {
  assets: ['./assets/fonts/'],
};
```

4. Запустите: `npx react-native-asset`

### Иконки:

Замените placeholders в `BottomNavigation` на:

```tsx
import Icon from 'react-native-vector-icons/Feather';

// Используйте
<Icon name="home" size={24} color={colors.text.primary} />
```

---

## 🐛 Частые проблемы

### Градиенты не работают?
```bash
npm install react-native-linear-gradient
cd ios && pod install
```

### Анимации не работают?
Добавьте в `babel.config.js`:
```js
plugins: ['react-native-reanimated/plugin']
```

### Build failed на iOS?
```bash
cd ios
rm -rf Pods Podfile.lock
pod install
```

Подробнее в `/react-native/PORTING_GUIDE.md`

---

## 🎯 Следующие шаги

### Немедленно:
1. ✅ Создайте RN проект
2. ✅ Скопируйте файлы из `/react-native/`
3. ✅ Установите зависимости
4. ✅ Запустите HomeScreen пример

### Далее:
5. Портируйте высокоприоритетные компоненты (TextArea, Radio, Toast)
6. Добавьте графики (MoodChart с react-native-chart-kit)
7. Создайте свои экраны
8. Настройте навигацию (React Navigation)
9. Добавьте state management (Context API или Redux)

### В будущем:
10. Оптимизация производительности
11. Добавление темной темы
12. Локализация (i18n)
13. Подключение к backend (если нужно)

---

## 📖 Документация

### React Native:
- [Официальная документация](https://reactnative.dev/)
- [React Native Directory](https://reactnative.directory/) - библиотеки

### Используемые библиотеки:
- [React Native Linear Gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit)

### Навигация:
- [React Navigation](https://reactnavigation.org/)

---

## ✨ Особенности портирования

### Что изменилось:

| Аспект | Web | React Native |
|--------|-----|--------------|
| HTML | `<div>`, `<span>` | `<View>`, `<Text>` |
| CSS | Tailwind classes | StyleSheet |
| Клики | `onClick` | `onPress` |
| Градиенты | CSS | LinearGradient компонент |
| Анимации | Motion/Framer | Reanimated |
| Иконки | lucide-react | Vector Icons |
| Графики | recharts | Chart Kit |

### Что сохранилось:

- ✅ Та же визуальная эстетика
- ✅ Те же дизайн-токены
- ✅ Та же структура компонентов
- ✅ Те же props API
- ✅ TypeScript типизация

---

## 🎁 Бонус

В `/react-native/examples/` есть полностью рабочий пример HomeScreen с:
- Градиентным фоном
- Аватаром пользователя
- Трекером настроения
- Карточками статистики
- Списком активностей
- Нижней навигацией

Используйте его как отправную точку! 🚀

---

## 💬 Поддержка

Если возникнут вопросы:
1. Проверьте `/react-native/PORTING_GUIDE.md`
2. Посмотрите примеры в `/react-native/examples/`
3. Изучите существующие компоненты
4. Обратитесь к документации React Native

---

**Готово! Теперь у вас есть полная wellness дизайн-система для React Native! 🎨📱**

Начните с копирования папки `/react-native/` и следуйте инструкциям в `README.md`.

Удачи в разработке! 🚀
