# 📱 React Native Wellness Design System - Навигация

## 🚀 С чего начать?

### Для быстрого старта:
👉 **[QUICKSTART.md](./QUICKSTART.md)** - 5 минут до первого запуска

### Для детального изучения:
👉 **[README.md](./README.md)** - Полная инструкция по установке и использованию

### Для проверки прогресса:
👉 **[MIGRATION_CHECKLIST.md](./MIGRATION_CHECKLIST.md)** - Пошаговый чеклист миграции

---

## 📚 Документация

| Файл | Описание | Когда использовать |
|------|----------|-------------------|
| **[QUICKSTART.md](./QUICKSTART.md)** | Быстрый старт за 5 минут | Хочу сразу запустить |
| **[README.md](./README.md)** | Главная инструкция | Нужна полная установка |
| **[HOW_TO_COPY.md](./HOW_TO_COPY.md)** | Как скопировать файлы | Копирую в другой проект |
| **[MIGRATION_CHECKLIST.md](./MIGRATION_CHECKLIST.md)** | Пошаговый чеклист | Хочу не пропустить ничего |
| **[PORTING_GUIDE.md](./PORTING_GUIDE.md)** | Детальный гайд по портированию | Хочу портировать остальные компоненты |
| **[COMPONENT_STATUS.md](./COMPONENT_STATUS.md)** | Статус всех 37 компонентов | Что уже готово, что осталось |
| **[COMPONENTS_VISUAL_GUIDE.md](./COMPONENTS_VISUAL_GUIDE.md)** | Визуальный гайд с примерами | Как использовать каждый компонент |
| **[WEB_VS_RN_COMPARISON.md](./WEB_VS_RN_COMPARISON.md)** | Сравнение Web vs RN | Что изменилось при портировании |
| **[package.example.json](./package.example.json)** | Список зависимостей | Какие пакеты установить |

---

## 📂 Структура файлов

```
/react-native/
│
├── 📖 INDEX.md                     ← ВЫ ЗДЕСЬ
├── 📖 QUICKSTART.md                ← Начните отсюда!
├── 📖 README.md                    ← Полная инструкция
├── 📖 HOW_TO_COPY.md                ← Как скопировать файлы
├── 📖 MIGRATION_CHECKLIST.md       ← Пошаговый чеклист
├── 📖 PORTING_GUIDE.md             ← Гайд по портированию
├── 📖 COMPONENT_STATUS.md          ← Статус компонентов
├── 📖 COMPONENTS_VISUAL_GUIDE.md   ← Визуальный гайд
├── 📖 WEB_VS_RN_COMPARISON.md       ← Сравнение Web vs RN
├── 📦 package.example.json         ← Зависимости
│
├── 🎨 theme/                       ← Дизайн-токены
│   ├── colors.ts                  (Цвета и градиенты)
│   ├── typography.ts              (Типографика)
│   ├── spacing.ts                 (Отступы и тени)
│   └── index.ts                   (Экспорт всего)
│
├── 🧩 components/                  ← 37 компонентов
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
│   └── ... (+ 20 компонентов)
│   └── index.ts                   (Экспорт компонентов)
│
└── 💡 examples/                    ← Примеры
    ├── HomeScreen.tsx             (Полный экран)
    └── App.example.tsx            (Точка входа)
```

---

## ✅ Что уже готово

### 37 портированных компонентов:

**Layout & Typography:**
- GradientBackground
- WellnessCard
- SerifHeading
- MobileScreen

**Forms:**
- Input
- TextArea
- Checkbox
- Radio
- Toggle
- DropdownSelector
- EmojiSelector

**Buttons:**
- PillButton
- FloatingActionButton

**Display:**
- Avatar
- StatCard
- Tag
- InfoBadge
- StreakBadge

**Navigation:**
- BottomNavigation
- TopNavigation
- Tabs
- Breadcrumbs

**Feedback:**
- LoadingSpinner
- ProgressBar
- Alert
- Modal
- Toast
- Tooltip
- Popover

**Wellness:**
- MoodTracker
- MoodChart
- MoodGraph
- DayGreeting

**Advanced:**
- Timeline
- Pagination
- ActionCard
- QuestionCard
- VerticalSlider

### Design System:
- ✅ Цвета и градиенты
- ✅ Типографика
- ✅ Отступы и радиусы
- ✅ Тени
- ✅ TypeScript типы

### Примеры:
- ✅ HomeScreen - Полный рабочий экран
- ✅ App.example.tsx - Точка входа

---

## 🎯 Как использовать для создания своих экранов

### Вариант 1: Быстрый старт (5 минут)
1. Читай **[QUICKSTART.md](./QUICKSTART.md)**
2. Копируй подходящий экран из `/examples/`
3. Заменяй данные на свои
4. Готово! ✨

### Вариант 2: Подробное изучение (15 минут)
1. Читай **[README.md](./README.md)**
2. Смотри детальные примеры с объяснениями
3. Комбинируй компоненты для своих задач

### Вариант 3: Визуальный поиск (2 минуты)
1. Открой **[COMPONENTS_VISUAL_GUIDE.md](./COMPONENTS_VISUAL_GUIDE.md)**
2. Найди нужный паттерн по скриншоту
3. Копируй код и адаптируй

---

## 📱 Готовые шаблоны экранов