# 🎨 Визуальный гайд по компонентам

Описание всех 17 портированных компонентов с примерами использования.

---

## 1. 🌈 GradientBackground

**Назначение:** Градиентные фоны для экранов

**API:**
```tsx
interface GradientBackgroundProps {
  children: React.ReactNode;
  gradient?: 'peachLavender' | 'mintSky' | 'roseYellow' | string[];
  direction?: 'vertical' | 'horizontal' | 'diagonal';
}
```

**Пример:**
```tsx
<GradientBackground gradient="peachLavender">
  <View>{/* Ваш контент */}</View>
</GradientBackground>
```

**Доступные градиенты:**
- `peachLavender` - Персик → Лаванда
- `mintSky` - Мята → Небо
- `roseYellow` - Роза → Желтый
- `creamPeach` - Крем → Персик
- `lavenderMint` - Лаванда → Мята
- `skyRose` - Небо → Роза
- `coralCream` - Коралл → Крем

---

## 2. ✨ SerifHeading

**Назначение:** Элегантные заголовки с serif шрифтом

**API:**
```tsx
interface SerifHeadingProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'display';
  color?: string;
  align?: 'left' | 'center' | 'right';
}
```

**Пример:**
```tsx
<SerifHeading size="large" align="center">
  Добро пожаловать
</SerifHeading>
```

**Размеры:**
- `small` - 20px (H4)
- `medium` - 24px (H3)
- `large` - 28px (H2)
- `xlarge` - 32px (H1)
- `display` - 40px (Display)

---

## 3. 🔘 PillButton

**Назначение:** Закругленные кнопки (pill-shaped)

**API:**
```tsx
interface PillButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
}
```

**Пример:**
```tsx
<PillButton 
  variant="primary" 
  size="medium"
  onPress={() => console.log('Pressed')}
>
  Начать
</PillButton>
```

**Варианты:**
- `primary` - Темная кнопка, белый текст
- `secondary` - Персиковый фон, темный текст
- `outline` - Прозрачная с обводкой
- `ghost` - Прозрачная без обводки

---

## 4. 💳 WellnessCard

**Назначение:** Карточки с градиентами или сплошным цветом

**API:**
```tsx
interface WellnessCardProps {
  children: React.ReactNode;
  gradient?: GradientName | string[];
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: boolean;
  onPress?: () => void;
}
```

**Пример:**
```tsx
<WellnessCard gradient="mintSky" padding="large">
  <SerifHeading size="medium">Контент</SerifHeading>
</WellnessCard>
```

**Особенности:**
- Автоматически добавляет тень
- Кликабельна при наличии `onPress`
- Поддерживает все градиенты

---

## 5. 📝 Input

**Назначение:** Текстовые поля ввода

**API:**
```tsx
interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  disabled?: boolean;
}
```

**Пример:**
```tsx
<Input
  label="Имя"
  placeholder="Введите ваше имя"
  error="Обязательное поле"
  value={name}
  onChangeText={setName}
/>
```

**Состояния:**
- Normal - Обычное состояние
- Focused - При фокусе (темная обводка)
- Error - При ошибке (красная обводка)
- Disabled - Неактивное (opacity 50%)

---

## 6. 👤 Avatar

**Назначение:** Аватары пользователей

**API:**
```tsx
interface AvatarProps {
  source?: ImageSourcePropType;
  initials?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  gradient?: GradientName | string[];
}
```

**Пример:**
```tsx
{/* С изображением */}
<Avatar source={{ uri: 'https://...' }} size="medium" />

{/* С инициалами */}
<Avatar initials="АБ" size="large" gradient="peachLavender" />
```

**Размеры:**
- `small` - 32px
- `medium` - 48px
- `large` - 64px
- `xlarge` - 96px

---

## 7. 😊 MoodTracker

**Назначение:** Трекер настроения с emoji

**API:**
```tsx
interface MoodTrackerProps {
  value?: number;
  onChange?: (value: number) => void;
  showLabels?: boolean;
}
```

**Пример:**
```tsx
const [mood, setMood] = useState();

<MoodTracker 
  value={mood}
  onChange={setMood}
  showLabels={true}
/>
```

**Настроения:**
- 😔 Грустно (1)
- 😐 Нормально (2)
- 🙂 Хорошо (3)
- 😊 Отлично (4)
- 🤩 Прекрасно (5)

---

## 8. 📊 StatCard

**Назначение:** Карточки статистики

**API:**
```tsx
interface StatCardProps {
  value: string | number;
  label: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  gradient?: GradientName | string[];
  icon?: React.ReactNode;
}
```

**Пример:**
```tsx
<StatCard
  value="7"
  label="Дней подряд"
  change="+2"
  changeType="positive"
  gradient="mintSky"
/>
```

**Особенности:**
- Показывает изменение (↑/↓)
- Цвет изменения: зеленый (positive), красный (negative)
- Опциональная иконка

---

## 9. 🧭 BottomNavigation

**Назначение:** Нижняя навигация

**API:**
```tsx
interface BottomNavigationProps {
  items: NavigationItem[];
  activeItem: string;
  onChange: (itemId: string) => void;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
```

**Пример:**
```tsx
const navItems = [
  { id: 'home', label: 'Главная', icon: <Icon /> },
  { id: 'mood', label: 'Настроение', icon: <Icon /> },
];

<BottomNavigation
  items={navItems}
  activeItem="home"
  onChange={setActiveItem}
/>
```

---

## 10. ⏳ LoadingSpinner

**Назначение:** Индикатор загрузки

**API:**
```tsx
interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  overlay?: boolean;
}
```

**Пример:**
```tsx
{/* Простой */}
<LoadingSpinner size="large" />

{/* С текстом */}
<LoadingSpinner text="Загрузка..." />

{/* Fullscreen overlay */}
<LoadingSpinner overlay text="Сохранение..." />
```

---

## 11. 📈 ProgressBar

**Назначение:** Прогресс-бар с анимацией

**API:**
```tsx
interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  gradient?: GradientName | string[];
  backgroundColor?: string;
}
```

**Пример:**
```tsx
<ProgressBar 
  progress={65}
  height={12}
  gradient="mintSky"
/>
```

**Особенности:**
- Плавная spring анимация
- Поддержка градиентов
- Любая высота

---

## 12. ⚠️ Alert

**Назначение:** Уведомления и алерты

**API:**
```tsx
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description: string;
  icon?: React.ReactNode;
}
```

**Пример:**
```tsx
<Alert
  variant="success"
  title="Успешно!"
  description="Настроение сохранено"
/>
```

**Варианты:**
- `info` - Синий (информация)
- `success` - Зеленый (успех)
- `warning` - Оранжевый (предупреждение)
- `error` - Красный (ошибка)

---

## 13. 🎭 Modal

**Назначение:** Модальные окна

**API:**
```tsx
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  showCloseButton?: boolean;
}
```

**Пример:**
```tsx
const [visible, setVisible] = useState(false);

<Modal
  visible={visible}
  onClose={() => setVisible(false)}
  title="Настройки"
  size="medium"
>
  <Text>Контент модального окна</Text>
</Modal>
```

**Размеры:**
- `small` - 30% высоты экрана
- `medium` - 50% высоты
- `large` - 70% высоты
- `fullscreen` - 100%

---

## 14. ☑️ Checkbox

**Назначение:** Чекбоксы

**API:**
```tsx
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}
```

**Пример:**
```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={setChecked}
  label="Согласен с условиями"
/>
```

---

## 15. 🔀 Toggle

**Назначение:** Переключатели (Switch)

**API:**
```tsx
interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  disabled?: boolean;
}
```

**Пример:**
```tsx
const [enabled, setEnabled] = useState(false);

<Toggle
  enabled={enabled}
  onChange={setEnabled}
  label="Уведомления"
/>
```

**Особенности:**
- Плавная spring анимация
- Темная тема при enabled
- Label справа

---

## 16. 🏷️ Tag

**Назначение:** Теги и бейджи

**API:**
```tsx
interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium';
  onRemove?: () => void;
  onPress?: () => void;
}
```

**Пример:**
```tsx
{/* Простой */}
<Tag variant="primary">Wellness</Tag>

{/* С удалением */}
<Tag variant="success" onRemove={() => {}}>
  Медитация
</Tag>

{/* Кликабельный */}
<Tag onPress={() => {}}>Йога</Tag>
```

**Варианты:**
- `default` - Серый
- `primary` - Персиковый
- `success` - Зеленый
- `warning` - Оранжевый
- `error` - Красный

---

## 17. 📑 Tabs

**Назначение:** Вкладки

**API:**
```tsx
interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills';
  scrollable?: boolean;
}

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
```

**Пример:**
```tsx
const tabs = [
  { id: 'day', label: 'День', icon: <Icon /> },
  { id: 'week', label: 'Неделя' },
  { id: 'month', label: 'Месяц' },
];

<Tabs
  items={tabs}
  activeTab="day"
  onChange={setActiveTab}
  variant="pills"
/>
```

**Варианты:**
- `default` - Линия снизу
- `pills` - Закругленные таблетки

---

## 🎨 Design Tokens

### Цвета (colors.ts):
```tsx
colors.wellness.peach      // #FFE5D9
colors.wellness.lavender   // #E8D5F2
colors.wellness.mint       // #D5F2E3
colors.wellness.sky        // #C9E4F5
colors.wellness.rose       // #FFD1DC
```

### Градиенты (colors.ts):
```tsx
colors.gradients.peachLavender  // ['#FFE5D9', '#E8D5F2']
colors.gradients.mintSky        // ['#D5F2E3', '#C9E4F5']
// ... и другие
```

### Отступы (spacing.ts):
```tsx
spacing[1]  // 4px
spacing[2]  // 8px
spacing[3]  // 12px
spacing[4]  // 16px
spacing[6]  // 24px
spacing[8]  // 32px
```

### Радиусы (spacing.ts):
```tsx
borderRadius.sm    // 4px
borderRadius.md    // 12px
borderRadius.lg    // 16px
borderRadius.xl    // 24px
borderRadius.pill  // 100px
```

### Типографика (typography.ts):
```tsx
textStyles.serifH1      // 32px serif
textStyles.serifH2      // 28px serif
textStyles.body         // 16px sans
textStyles.button       // 16px medium
```

---

## 💡 Комбинации компонентов

### Форма с валидацией:
```tsx
<WellnessCard padding="large">
  <SerifHeading size="medium">Вход</SerifHeading>
  
  <Input
    label="Email"
    error={emailError}
    value={email}
    onChangeText={setEmail}
  />
  
  <Input
    label="Пароль"
    secureTextEntry
    value={password}
    onChangeText={setPassword}
  />
  
  <Checkbox
    checked={remember}
    onChange={setRemember}
    label="Запомнить меня"
  />
  
  <PillButton 
    variant="primary" 
    fullWidth
    loading={loading}
    onPress={handleLogin}
  >
    Войти
  </PillButton>
</WellnessCard>
```

### Карточка статистики:
```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <StatCard
    value="7"
    label="Дней подряд"
    change="+2"
    changeType="positive"
    gradient="mintSky"
  />
  
  <StatCard
    value="85%"
    label="Позитивных дней"
    change="+5%"
    changeType="positive"
    gradient="roseYellow"
  />
</View>
```

### Трекер настроения:
```tsx
<WellnessCard gradient="creamPeach" padding="large">
  <SerifHeading size="medium">
    Как ваше настроение?
  </SerifHeading>
  
  <MoodTracker
    value={mood}
    onChange={setMood}
    showLabels
  />
  
  {mood && (
    <PillButton variant="primary" fullWidth>
      Сохранить
    </PillButton>
  )}
</WellnessCard>
```

---

**Все компоненты TypeScript типизированы и готовы к использованию! 🚀**
