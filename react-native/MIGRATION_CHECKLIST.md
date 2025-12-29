# ✅ Чеклист миграции на React Native

Пошаговая инструкция для успешного портирования wellness приложения.

---

## 🎯 Фаза 1: Подготовка (30 минут)

### Окружение

- [ ] Установлен Node.js (версия 18+)
- [ ] Установлен npm или yarn
- [ ] **Для iOS:** Установлен Xcode (только Mac)
- [ ] **Для iOS:** Установлен CocoaPods (`sudo gem install cocoapods`)
- [ ] **Для Android:** Установлен Android Studio
- [ ] **Для Android:** Настроен Android SDK

### Проверка:
```bash
node --version    # Должно быть >= 18
npm --version     # Должно быть >= 9
pod --version     # Для iOS
```

---

## 🚀 Фаза 2: Создание проекта (10 минут)

### Создание

- [ ] Создан React Native проект:
  ```bash
  npx react-native init WellnessApp --template react-native-template-typescript
  ```

- [ ] Проект запускается:
  ```bash
  cd WellnessApp
  npm run ios     # Или npm run android
  ```

- [ ] Виден "Welcome to React Native" экран

### Структура:
```
WellnessApp/
├── android/          ✅ Проверьте наличие
├── ios/              ✅ Проверьте наличие
├── src/              📝 Создайте эту папку
├── App.tsx           ✅ Существует
└── package.json      ✅ Существует
```

---

## 📦 Фаза 3: Установка зависимостей (15 минут)

### Core библиотеки

- [ ] **Linear Gradient** (для градиентов):
  ```bash
  npm install react-native-linear-gradient
  cd ios && pod install && cd ..
  ```

- [ ] **Reanimated** (для анимаций):
  ```bash
  npm install react-native-reanimated
  npm install react-native-gesture-handler
  ```

- [ ] **SVG** (для векторной графики):
  ```bash
  npm install react-native-svg
  ```

- [ ] **Vector Icons** (замена lucide-react):
  ```bash
  npm install react-native-vector-icons
  npm install --save-dev @types/react-native-vector-icons
  ```

### Опциональные библиотеки

- [ ] **Chart Kit** (для графиков):
  ```bash
  npm install react-native-chart-kit
  ```

- [ ] **Navigation** (для многостраничности):
  ```bash
  npm install @react-navigation/native
  npm install @react-navigation/bottom-tabs
  npm install react-native-screens react-native-safe-area-context
  cd ios && pod install && cd ..
  ```

- [ ] **Toast** (уведомления):
  ```bash
  npm install react-native-toast-message
  ```

### Проверка установки:
```bash
npm list react-native-linear-gradient
npm list react-native-reanimated
# Все должны показать версии без ошибок
```

---

## ⚙️ Фаза 4: Конфигурация (10 минут)

### Babel Configuration

- [ ] Отредактирован `babel.config.js`:
  ```js
  module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-reanimated/plugin', // В конце!
    ],
  };
  ```

### Vector Icons Setup

- [ ] **Android** (`android/app/build.gradle`):
  ```gradle
  apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
  ```

- [ ] **iOS**: Следуйте [инструкциям](https://github.com/oblador/react-native-vector-icons#ios)

### Шрифты (Libre Baskerville)

- [ ] Создана папка `assets/fonts/`
- [ ] Скачаны шрифты с Google Fonts
- [ ] Размещены файлы:
  - `LibreBaskerville-Regular.ttf`
  - `LibreBaskerville-Italic.ttf`
  - `LibreBaskerville-Bold.ttf`

- [ ] Создан `react-native.config.js`:
  ```js
  module.exports = {
    project: {
      ios: {},
      android: {},
    },
    assets: ['./assets/fonts/'],
  };
  ```

- [ ] Запущена команда:
  ```bash
  npx react-native-asset
  ```

### Проверка:
```bash
# Очистите cache и пересоберите
npm start -- --reset-cache
npm run ios  # или android
```

---

## 📁 Фаза 5: Копирование файлов (5 минут)

### Из Figma Make проекта скопируйте:

- [ ] `/react-native/theme/` → `WellnessApp/src/theme/`
  - [ ] `colors.ts`
  - [ ] `typography.ts`
  - [ ] `spacing.ts`
  - [ ] `index.ts`

- [ ] `/react-native/components/` → `WellnessApp/src/components/`
  - [ ] Все 17 `.tsx` файлов
  - [ ] `index.ts`

- [ ] `/react-native/examples/` → `WellnessApp/src/examples/`
  - [ ] `HomeScreen.tsx`
  - [ ] `App.example.tsx` (опционально)

### Структура должна быть:
```
WellnessApp/
├── src/
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── components/
│   │   ├── GradientBackground.tsx
│   │   ├── SerifHeading.tsx
│   │   ├── ... (15 других)
│   │   └── index.ts
│   └── examples/
│       └── HomeScreen.tsx
└── App.tsx
```

---

## 🎨 Фаза 6: Интеграция (10 минут)

### Обновите App.tsx

- [ ] Заменен содержимое `App.tsx`:
  ```tsx
  import React from 'react';
  import { SafeAreaView, StatusBar } from 'react-native';
  import { GestureHandlerRootView } from 'react-native-gesture-handler';
  import { HomeScreen } from './src/examples/HomeScreen';

  function App(): JSX.Element {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <SafeAreaView style={{ flex: 1 }}>
          <HomeScreen />
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }

  export default App;
  ```

### Проверка импортов

- [ ] Все компоненты импортируются без ошибок
- [ ] Theme импортируется корректно
- [ ] TypeScript не показывает ошибок

---

## 🧪 Фаза 7: Тестирование (15 минут)

### iOS

- [ ] Запущено приложение:
  ```bash
  npm run ios
  ```

- [ ] Проверено:
  - [ ] Градиентный фон отображается
  - [ ] Serif заголовки работают
  - [ ] Кнопки кликабельны
  - [ ] Трекер настроения интерактивен
  - [ ] Карточки статистики видны
  - [ ] Нижняя навигация работает

### Android

- [ ] Запущено приложение:
  ```bash
  npm run android
  ```

- [ ] Проверено:
  - [ ] Те же пункты, что для iOS
  - [ ] Elevation (тени) работают
  - [ ] Шрифты отображаются правильно

### Общие проверки

- [ ] Нет ошибок в консоли
- [ ] Нет красных экранов (Red Box)
- [ ] Нет желтых предупреждений (Yellow Box)
- [ ] Анимации плавные
- [ ] Touch события отзывчивы

---

## 🐛 Фаза 8: Исправление проблем (30 минут)

### Частые проблемы и решения:

#### ❌ "LinearGradient is not defined"

- [ ] Проверить установку:
  ```bash
  npm install react-native-linear-gradient
  ```

- [ ] Для iOS:
  ```bash
  cd ios && pod install && cd ..
  npm run ios
  ```

#### ❌ "Reanimated module not found"

- [ ] Проверить `babel.config.js`:
  ```js
  plugins: ['react-native-reanimated/plugin']
  ```

- [ ] Очистить cache:
  ```bash
  npm start -- --reset-cache
  ```

#### ❌ "Unable to resolve module"

- [ ] Очистить cache:
  ```bash
  watchman watch-del-all
  rm -rf node_modules
  npm install
  npm start -- --reset-cache
  ```

#### ❌ Шрифты не работают

- [ ] Проверить `react-native.config.js`
- [ ] Запустить:
  ```bash
  npx react-native-asset
  ```
- [ ] Пересобрать:
  ```bash
  npm run ios  # или android
  ```

#### ❌ iOS Build failed

- [ ] Очистить pods:
  ```bash
  cd ios
  rm -rf Pods Podfile.lock
  pod deintegrate
  pod install
  cd ..
  npm run ios
  ```

---

## 🎯 Фаза 9: Кастомизация (∞ времени)

### Адаптация под ваше приложение

- [ ] Изменены цвета в `theme/colors.ts`
- [ ] Настроена типографика в `theme/typography.ts`
- [ ] Созданы собственные экраны
- [ ] Добавлена навигация между экранами
- [ ] Портированы нужные компоненты из оставшихся 20

### Добавление функциональности

- [ ] **State Management** (Redux, MobX, Zustand):
  ```bash
  npm install zustand  # Или Redux Toolkit
  ```

- [ ] **API интеграция** (Axios, Fetch):
  ```bash
  npm install axios
  ```

- [ ] **Локальное хранилище** (AsyncStorage):
  ```bash
  npm install @react-native-async-storage/async-storage
  ```

- [ ] **Формы** (React Hook Form):
  ```bash
  npm install react-hook-form
  ```

### Оптимизация

- [ ] Используется `React.memo` для тяжелых компонентов
- [ ] Используется `useMemo` для вычислений
- [ ] Используется `useCallback` для функций
- [ ] Изображения оптимизированы
- [ ] FlatList вместо ScrollView для длинных списков

---

## 📱 Фаза 10: Production (1-2 дня)

### Подготовка к релизу

#### iOS

- [ ] Настроен App Icon
- [ ] Настроен Launch Screen
- [ ] Настроен Bundle ID
- [ ] Создан сертификат в Apple Developer
- [ ] Собран release build:
  ```bash
  cd ios
  xcodebuild -workspace WellnessApp.xcworkspace \
             -scheme WellnessApp \
             -configuration Release
  ```

#### Android

- [ ] Настроен App Icon
- [ ] Настроен Splash Screen
- [ ] Сгенерирован signing key:
  ```bash
  keytool -genkeypair -v -storetype PKCS12 \
          -keystore my-release-key.keystore \
          -alias my-key-alias \
          -keyalg RSA -keysize 2048 -validity 10000
  ```
- [ ] Настроен `android/app/build.gradle`
- [ ] Собран release APK:
  ```bash
  cd android
  ./gradlew assembleRelease
  ```

### Тестирование Production

- [ ] Протестирован release build на реальных устройствах
- [ ] Проверена производительность
- [ ] Проверена работа без Metro bundler
- [ ] Проверены разрешения приложения

---

## 📊 Итоговый Checklist

### Минимальный набор (можно запустить)

- ✅ Проект создан
- ✅ Core зависимости установлены
- ✅ Babel настроен
- ✅ Файлы скопированы
- ✅ App.tsx обновлен
- ✅ Приложение запускается

**Время: ~1 час**

### Полный набор (production ready)

- ✅ Все из минимального
- ✅ Шрифты настроены
- ✅ Иконки работают
- ✅ Навигация добавлена
- ✅ State management настроен
- ✅ API интеграция работает
- ✅ Оптимизация выполнена
- ✅ Production build создан
- ✅ Тестирование завершено

**Время: ~2-3 дня**

---

## 🎉 Поздравляю!

Если все чекбоксы отмечены, ваше wellness приложение успешно портировано на React Native!

### Следующие шаги:

1. **Изучите документацию:**
   - [QUICKSTART.md](./QUICKSTART.md)
   - [PORTING_GUIDE.md](./PORTING_GUIDE.md)
   - [COMPONENT_STATUS.md](./COMPONENT_STATUS.md)

2. **Портируйте нужные компоненты:**
   - Смотрите приоритеты в COMPONENT_STATUS.md
   - Используйте существующие как шаблоны

3. **Создайте свои экраны:**
   - Используйте HomeScreen как пример
   - Комбинируйте готовые компоненты

4. **Добавьте функциональность:**
   - Подключите backend
   - Добавьте аналитику
   - Настройте push-уведомления

---

## 🆘 Нужна помощь?

### Проблемы с установкой:
→ Раздел "Фаза 8: Исправление проблем"

### Вопросы по компонентам:
→ [COMPONENTS_VISUAL_GUIDE.md](./COMPONENTS_VISUAL_GUIDE.md)

### Сравнение с Web:
→ [WEB_VS_RN_COMPARISON.md](./WEB_VS_RN_COMPARISON.md)

### Портирование компонентов:
→ [PORTING_GUIDE.md](./PORTING_GUIDE.md)

---

**Удачи в разработке! 🚀**

_Wellness Design System for React Native - Migration Checklist v1.0_
