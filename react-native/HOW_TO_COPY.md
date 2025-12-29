# 📋 Как скопировать файлы в ваш проект

Пошаговая инструкция для копирования React Native дизайн-системы в любой редактор (VS Code, Cursor, Claude Code).

---

## 🎯 Что копировать

Вам нужны только **3 папки**:

1. `/react-native/theme/` - Дизайн-токены
2. `/react-native/components/` - 17 компонентов
3. `/react-native/examples/` - Примеры (опционально)

---

## 📂 Способ 1: Ручное копирование

### Шаг 1: Создайте структуру в вашем проекте

В вашем React Native проекте создайте:

```
YourApp/
├── src/
│   ├── theme/          ← Создайте эту папку
│   ├── components/     ← Создайте эту папку
│   └── examples/       ← Опционально
```

### Шаг 2: Скопируйте файлы

#### A. Скопируйте Theme (4 файла):

**Из Figma Make проекта:**
```
/react-native/theme/colors.ts
/react-native/theme/typography.ts
/react-native/theme/spacing.ts
/react-native/theme/index.ts
```

**В ваш проект:**
```
YourApp/src/theme/colors.ts
YourApp/src/theme/typography.ts
YourApp/src/theme/spacing.ts
YourApp/src/theme/index.ts
```

#### B. Скопируйте Components (18 файлов):

**Из Figma Make проекта:**
```
/react-native/components/*.tsx
/react-native/components/index.ts
```

**В ваш проект:**
```
YourApp/src/components/*.tsx
YourApp/src/components/index.ts
```

Список компонентов:
- GradientBackground.tsx
- SerifHeading.tsx
- PillButton.tsx
- WellnessCard.tsx
- Input.tsx
- Avatar.tsx
- MoodTracker.tsx
- StatCard.tsx
- BottomNavigation.tsx
- LoadingSpinner.tsx
- ProgressBar.tsx
- Alert.tsx
- Modal.tsx
- Checkbox.tsx
- Toggle.tsx
- Tag.tsx
- Tabs.tsx
- index.ts

#### C. Скопируйте Examples (опционально):

**Из Figma Make проекта:**
```
/react-native/examples/HomeScreen.tsx
/react-native/examples/App.example.tsx
```

**В ваш проект:**
```
YourApp/src/examples/HomeScreen.tsx
YourApp/src/examples/App.example.tsx
```

---

## 💻 Способ 2: Терминал (Mac/Linux)

```bash
# Перейдите в ваш проект
cd YourApp

# Создайте структуру
mkdir -p src/theme src/components src/examples

# Скопируйте все файлы (замените PATH_TO_FIGMA_MAKE)
cp -r PATH_TO_FIGMA_MAKE/react-native/theme/* src/theme/
cp -r PATH_TO_FIGMA_MAKE/react-native/components/* src/components/
cp -r PATH_TO_FIGMA_MAKE/react-native/examples/* src/examples/
```

---

## 🪟 Способ 3: Терминал (Windows PowerShell)

```powershell
# Перейдите в ваш проект
cd YourApp

# Создайте структуру
New-Item -ItemType Directory -Force -Path src\theme
New-Item -ItemType Directory -Force -Path src\components
New-Item -ItemType Directory -Force -Path src\examples

# Скопируйте все файлы (замените PATH_TO_FIGMA_MAKE)
Copy-Item -Path "PATH_TO_FIGMA_MAKE\react-native\theme\*" -Destination "src\theme\" -Recurse
Copy-Item -Path "PATH_TO_FIGMA_MAKE\react-native\components\*" -Destination "src\components\" -Recurse
Copy-Item -Path "PATH_TO_FIGMA_MAKE\react-native\examples\*" -Destination "src\examples\" -Recurse
```

---

## 📝 Способ 4: В редакторе кода

### VS Code / Cursor / Claude Code:

1. **Откройте два окна:**
   - Окно 1: Figma Make проект
   - Окно 2: Ваш React Native проект

2. **В Figma Make проекте:**
   - Найдите папку `/react-native/theme/`
   - Выделите все файлы (Cmd+A / Ctrl+A)
   - Скопируйте (Cmd+C / Ctrl+C)

3. **В вашем проекте:**
   - Создайте папку `src/theme/`
   - Вставьте файлы (Cmd+V / Ctrl+V)

4. **Повторите для:**
   - `/react-native/components/` → `src/components/`
   - `/react-native/examples/` → `src/examples/`

---

## ✅ Проверка после копирования

### Структура должна быть:

```
YourApp/
├── src/
│   ├── theme/
│   │   ├── colors.ts          ✅
│   │   ├── typography.ts      ✅
│   │   ├── spacing.ts         ✅
│   │   └── index.ts           ✅
│   │
│   ├── components/
│   │   ├── GradientBackground.tsx  ✅
│   │   ├── SerifHeading.tsx        ✅
│   │   ├── ... (15 других)         ✅
│   │   └── index.ts                ✅
│   │
│   └── examples/
│       ├── HomeScreen.tsx     ✅
│       └── App.example.tsx    ✅
│
└── App.tsx
```

### Проверьте импорты:

```tsx
// Попробуйте импортировать
import { colors, theme } from './src/theme';
import { PillButton, WellnessCard } from './src/components';

// Должно компилироваться без ошибок
```

---

## 🔧 Исправление путей импорта

После копирования вам может понадобиться обновить пути в компонентах.

### В компонентах измените:

```tsx
// Было (в Figma Make):
import { colors } from '../theme';

// Может стать (в вашем проекте):
import { colors } from '../../theme';
// или
import { colors } from '@/theme';  // если настроили alias
```

### Настройка alias (опционально):

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Тогда можно использовать:
```tsx
import { colors } from '@/theme';
import { PillButton } from '@/components';
```

---

## 📦 После копирования

### 1. Установите зависимости:

```bash
npm install react-native-linear-gradient \
            react-native-reanimated \
            react-native-gesture-handler \
            react-native-svg \
            react-native-vector-icons
```

### 2. Настройте babel.config.js:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
  ],
};
```

### 3. Для iOS:

```bash
cd ios && pod install && cd ..
```

### 4. Запустите:

```bash
npm run ios  # или npm run android
```

---

## 🎨 Копирование документации (опционально)

Если хотите сохранить документацию:

```bash
# Скопируйте все .md файлы
cp PATH_TO_FIGMA_MAKE/react-native/*.md docs/react-native/
```

Файлы документации:
- INDEX.md
- README.md
- QUICKSTART.md
- MIGRATION_CHECKLIST.md
- PORTING_GUIDE.md
- COMPONENT_STATUS.md
- COMPONENTS_VISUAL_GUIDE.md
- WEB_VS_RN_COMPARISON.md
- HOW_TO_COPY.md (этот файл)

---

## 🐛 Частые проблемы

### ❌ "Cannot find module '../theme'"

**Причина:** Неправильные пути импорта

**Решение:**
```tsx
// Проверьте относительные пути
import { colors } from '../theme';      // Если theme на 1 уровень выше
import { colors } from '../../theme';   // Если theme на 2 уровня выше
```

### ❌ "LinearGradient is not defined"

**Причина:** Зависимость не установлена

**Решение:**
```bash
npm install react-native-linear-gradient
cd ios && pod install && cd ..
```

### ❌ TypeScript ошибки

**Причина:** Отсутствуют типы

**Решение:**
```bash
npm install --save-dev @types/react-native-vector-icons
```

---

## 📱 Использование в разных редакторах

### VS Code:
1. Перетащите папки drag & drop
2. Или используйте File Explorer (Ctrl+Shift+E)

### Cursor:
1. Аналогично VS Code
2. Поддерживает те же команды

### Claude Code:
1. Используйте встроенный file explorer
2. Или команды терминала

### Vim/Neovim:
```bash
:!cp -r /path/to/react-native/theme src/
:!cp -r /path/to/react-native/components src/
```

---

## ✨ Готово!

После копирования файлов:

1. ✅ Файлы в правильных папках
2. ✅ Зависимости установлены
3. ✅ Импорты работают
4. ✅ TypeScript компилируется

Теперь можете использовать компоненты:

```tsx
import { GradientBackground, PillButton } from './src/components';

<GradientBackground gradient="peachLavender">
  <PillButton variant="primary">Hello!</PillButton>
</GradientBackground>
```

---

## 🎯 Следующие шаги

1. **Изучите примеры:**
   - Откройте `src/examples/HomeScreen.tsx`
   - Посмотрите, как используются компоненты

2. **Создайте свой экран:**
   - Используйте компоненты из `src/components`
   - Используйте токены из `src/theme`

3. **Кастомизируйте:**
   - Измените цвета в `src/theme/colors.ts`
   - Добавьте свои компоненты

---

**Приятной разработки! 🚀**
