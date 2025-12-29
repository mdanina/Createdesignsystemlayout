# ⚡ Быстрый старт - React Native Wellness App

## 5 минут до первого запуска!

### Шаг 1: Создайте проект (1 мин)

```bash
npx react-native init WellnessApp --template react-native-template-typescript
cd WellnessApp
```

### Шаг 2: Установите зависимости (2 мин)

```bash
npm install react-native-linear-gradient \
            react-native-reanimated \
            react-native-gesture-handler \
            react-native-svg \
            react-native-vector-icons
```

**Для iOS (если на Mac):**
```bash
cd ios && pod install && cd ..
```

### Шаг 3: Скопируйте файлы (30 сек)

Из Figma Make проекта скопируйте:

```
/react-native/theme/        → WellnessApp/src/theme/
/react-native/components/   → WellnessApp/src/components/
/react-native/examples/     → WellnessApp/src/examples/
```

### Шаг 4: Настройте babel (30 сек)

Отредактируйте `babel.config.js`:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Добавьте эту строку
  ],
};
```

### Шаг 5: Замените App.tsx (30 сек)

Скопируйте содержимое из `/react-native/App.example.tsx` в `App.tsx`

Или используйте минимальный пример:

```tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import { HomeScreen } from './src/examples/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
    </SafeAreaView>
  );
}
```

### Шаг 6: Запустите! (30 сек)

```bash
# iOS
npm run ios

# Android
npm run android
```

---

## 🎉 Готово!

Вы должны увидеть работающий wellness app с:
- ✅ Градиентным фоном
- ✅ Трекером настроения
- ✅ Карточками статистики
- ✅ Нижней навигацией

---

## 🔥 Частые проблемы

### "LinearGradient" не найден?

```bash
npm install react-native-linear-gradient
cd ios && pod install && cd ..
```

### Анимации не работают?

В `babel.config.js` добавьте:
```js
plugins: ['react-native-reanimated/plugin']
```

Затем:
```bash
npm start -- --reset-cache
```

### iOS Build failed?

```bash
cd ios
pod deintegrate
pod install
cd ..
```

---

## 📱 Что дальше?

1. **Измените градиент**: В `HomeScreen.tsx` смените `gradient="peachLavender"` на любой другой:
   - `"mintSky"`
   - `"roseYellow"`
   - `"lavenderMint"`

2. **Добавьте компоненты**: Импортируйте любой из 17 готовых компонентов:
   ```tsx
   import { PillButton, Alert, Modal, Tag } from './src/components';
   ```

3. **Создайте экраны**: Используйте `HomeScreen.tsx` как шаблон

4. **Добавьте навигацию**: Установите React Navigation (см. README.md)

---

## 📚 Полная документация

- `/react-native/README.md` - Главная инструкция
- `/react-native/PORTING_GUIDE.md` - Детальный гайд
- `/react-native/COMPONENT_STATUS.md` - Статус компонентов
- `/REACT_NATIVE_MIGRATION_SUMMARY.md` - Общий обзор

---

**Готово! Приятной разработки! 🚀**
