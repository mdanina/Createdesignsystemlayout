# 🆚 Web vs React Native - Сравнение

Детальное сравнение реализаций компонентов между Web и React Native версиями.

---

## 📊 Общая статистика

| Аспект | Web | React Native |
|--------|-----|--------------|
| **Компонентов всего** | 37 | 17 (46%) |
| **Библиотека UI** | Radix UI | Нативные компоненты |
| **Стили** | Tailwind CSS v4 | StyleSheet API |
| **Иконки** | lucide-react | react-native-vector-icons |
| **Градиенты** | CSS linear-gradient | LinearGradient компонент |
| **Анимации** | Motion (Framer) | React Native Reanimated |
| **Графики** | Recharts | React Native Chart Kit |

---

## 🔄 Основные изменения

### 1. Элементы разметки

| Web | React Native | Причина |
|-----|--------------|---------|
| `<div>` | `<View>` | RN не поддерживает HTML |
| `<span>`, `<p>`, `<h1>` | `<Text>` | Весь текст должен быть в `<Text>` |
| `<button>` | `<TouchableOpacity>` | Нативные touch события |
| `<input>` | `<TextInput>` | Нативный ввод текста |
| `<img>` | `<Image>` | Нативные изображения |
| `<a>` | `<TouchableOpacity>` + навигация | Нет HTML ссылок |

### 2. События

| Web | React Native |
|-----|--------------|
| `onClick` | `onPress` |
| `onChange` | `onChangeText` (для TextInput) |
| `onSubmit` | Custom logic |
| `onMouseEnter` | `onPressIn` |
| `onMouseLeave` | `onPressOut` |
| `onFocus` | `onFocus` ✅ |
| `onBlur` | `onBlur` ✅ |

### 3. Стили

#### Web (Tailwind):
```tsx
<div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-md">
  <span className="text-2xl font-bold">Hello</span>
</div>
```

#### React Native (StyleSheet):
```tsx
<View style={styles.container}>
  <Text style={styles.text}>Hello</Text>
</View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

---

## 🧩 Компонент за компонентом

### PillButton

#### Web версия:
```tsx
<button className="px-6 py-3 bg-[#2D2D2D] text-white rounded-full">
  Нажми меня
</button>
```

#### React Native версия:
```tsx
<TouchableOpacity 
  style={{
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#2D2D2D',
    borderRadius: 100,
  }}
  activeOpacity={0.7}
>
  <Text style={{ color: '#FFFFFF' }}>Нажми меня</Text>
</TouchableOpacity>
```

**Ключевые отличия:**
- ✅ Сохранен: API (variant, size, loading)
- ✅ Сохранен: Визуальный стиль
- 🔄 Изменен: HTML → TouchableOpacity
- 🔄 Изменен: className → style
- 🔄 Изменен: onClick → onPress
- ➕ Добавлен: activeOpacity для touch feedback

---

### GradientBackground

#### Web версия:
```tsx
<div className="min-h-screen bg-gradient-to-b from-[#FFE5D9] to-[#E8D5F2]">
  {children}
</div>
```

#### React Native версия:
```tsx
import LinearGradient from 'react-native-linear-gradient';

<LinearGradient
  colors={['#FFE5D9', '#E8D5F2']}
  start={{ x: 0, y: 0 }}
  end={{ x: 0, y: 1 }}
  style={{ flex: 1 }}
>
  {children}
</LinearGradient>
```

**Ключевые отличия:**
- ✅ Сохранен: Те же цвета и градиенты
- 🔄 Изменен: CSS → LinearGradient компонент
- ➕ Добавлен: Нужна внешняя библиотека
- ➕ Добавлен: Точки start/end для направления

---

### Input

#### Web версия:
```tsx
<div>
  <label className="block text-sm font-medium mb-2">
    Email
  </label>
  <input
    type="email"
    className="w-full px-4 py-3 border rounded-lg focus:ring-2"
    placeholder="you@example.com"
  />
</div>
```

#### React Native версия:
```tsx
<View>
  <Text style={styles.label}>Email</Text>
  <TextInput
    keyboardType="email-address"
    style={[
      styles.input,
      isFocused && styles.inputFocused
    ]}
    placeholder="you@example.com"
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
  />
</View>
```

**Ключевые отличия:**
- ✅ Сохранен: Label, placeholder, validation
- 🔄 Изменен: `<input>` → `<TextInput>`
- 🔄 Изменен: `type` → `keyboardType`
- 🔄 Изменен: CSS focus → state + style
- ➕ Добавлен: Ручное управление focus state

---

### MoodTracker

#### Web версия:
```tsx
<div className="grid grid-cols-5 gap-2">
  {moods.map(mood => (
    <button
      className={`p-4 rounded-lg ${
        selected ? 'bg-gradient-to-br' : 'bg-gray-100'
      }`}
      onClick={() => onChange(mood.value)}
    >
      <span className="text-4xl">{mood.emoji}</span>
      <span className="text-sm">{mood.label}</span>
    </button>
  ))}
</div>
```

#### React Native версия:
```tsx
<View style={{ flexDirection: 'row', gap: 8 }}>
  {moods.map(mood => (
    <TouchableOpacity
      style={[
        styles.moodButton,
        selected && { backgroundColor: mood.color }
      ]}
      onPress={() => onChange(mood.value)}
    >
      <Text style={{ fontSize: 32 }}>{mood.emoji}</Text>
      <Text style={styles.label}>{mood.label}</Text>
    </TouchableOpacity>
  ))}
</View>
```

**Ключевые отличия:**
- ✅ Сохранен: Emoji, labels, выбор
- ✅ Сохранен: Цвета для каждого настроения
- 🔄 Изменен: Grid CSS → flexDirection: 'row'
- 🔄 Изменен: button → TouchableOpacity
- 🔄 Изменен: className условия → style массив

---

### ProgressBar

#### Web версия:
```tsx
<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
  <motion.div
    className="h-full bg-gradient-to-r from-[#FFE5D9] to-[#E8D5F2]"
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ type: 'spring' }}
  />
</div>
```

#### React Native версия:
```tsx
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

const animatedProgress = useSharedValue(0);

useEffect(() => {
  animatedProgress.value = withSpring(progress);
}, [progress]);

const animatedStyle = useAnimatedStyle(() => ({
  width: `${animatedProgress.value}%`,
}));

<View style={styles.container}>
  <Animated.View style={[styles.bar, animatedStyle]}>
    <LinearGradient colors={['#FFE5D9', '#E8D5F2']} />
  </Animated.View>
</View>
```

**Ключевые отличия:**
- ✅ Сохранен: Spring анимация
- ✅ Сохранен: Градиент
- 🔄 Изменен: Motion → Reanimated
- 🔄 Изменен: animate prop → useAnimatedStyle hook
- ➕ Сложнее: Нужны хуки и shared values

---

### Modal

#### Web версия:
```tsx
import { Dialog } from '@radix-ui/react-dialog';

<Dialog open={visible} onOpenChange={setVisible}>
  <DialogContent className="max-w-md">
    <DialogTitle>Заголовок</DialogTitle>
    {children}
  </DialogContent>
</Dialog>
```

#### React Native версия:
```tsx
import { Modal as RNModal } from 'react-native';

<RNModal
  visible={visible}
  transparent
  animationType="fade"
  onRequestClose={onClose}
>
  <View style={styles.overlay}>
    <TouchableOpacity 
      style={styles.backdrop} 
      onPress={onClose} 
    />
    <View style={styles.modal}>
      <Text style={styles.title}>Заголовок</Text>
      {children}
    </View>
  </View>
</RNModal>
```

**Ключевые отличия:**
- ✅ Сохранен: API (visible, onClose, title)
- 🔄 Изменен: Radix Dialog → RN Modal
- ➕ Добавлен: Ручная overlay реализация
- ➕ Добавлен: Backdrop TouchableOpacity
- 🔄 Изменен: Автоматическая a11y → ручная

---

## 📦 Замена библиотек

### Иконки

#### Web:
```tsx
import { Heart, Home, User } from 'lucide-react';

<Heart size={24} color="#FF0000" />
```

#### React Native:
```tsx
import Icon from 'react-native-vector-icons/Feather';

<Icon name="heart" size={24} color="#FF0000" />
```

**Разница:**
- lucide-react: 1000+ иконок, tree-shakeable
- RN Vector Icons: 3000+ иконок, несколько наборов

---

### Графики

#### Web (Recharts):
```tsx
import { LineChart, Line, XAxis, YAxis } from 'recharts';

<LineChart data={data} width={400} height={300}>
  <Line type="monotone" dataKey="mood" stroke="#FFE5D9" />
  <XAxis dataKey="date" />
  <YAxis />
</LineChart>
```

#### React Native (Chart Kit):
```tsx
import { LineChart } from 'react-native-chart-kit';

<LineChart
  data={{
    labels: dates,
    datasets: [{ data: moods }]
  }}
  width={Dimensions.get('window').width - 48}
  height={220}
  chartConfig={{
    backgroundColor: '#FFE5D9',
    color: (opacity = 1) => `rgba(255, 229, 217, ${opacity})`,
  }}
/>
```

**Разница:**
- Recharts: Более гибкий, композитный
- Chart Kit: Проще, но менее кастомизируемый

---

## 🎨 Сохраненные элементы

### ✅ Что осталось неизменным:

1. **Дизайн-токены:**
   - Цвета: те же hex коды
   - Градиенты: те же комбинации
   - Отступы: та же 8px сетка
   - Радиусы: те же значения

2. **Component API:**
   - Props названия
   - Типы данных (TypeScript)
   - Callback сигнатуры

3. **Визуальный стиль:**
   - Мягкие пастельные градиенты
   - Serif заголовки
   - Закругленные формы
   - Продуманные отступы

4. **Анимации:**
   - Spring transitions
   - Smooth easing
   - Та же длительность

---

## 🔄 Основные адаптации

### 1. Flexbox

#### Web:
```css
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
```

#### React Native:
```tsx
// Flexbox по умолчанию, column по умолчанию
{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
```

**Отличия:**
- RN: Flexbox всегда включен
- RN: `flexDirection: 'column'` по умолчанию
- RN: Нет `display` property

---

### 2. Позиционирование

#### Web:
```css
.floating {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
}
```

#### React Native:
```tsx
{
  position: 'absolute',
  bottom: 24,
  right: 24,
  zIndex: 999,
}
```

**Отличия:**
- RN: Нет `fixed`, только `absolute` и `relative`
- RN: Числа без 'px'
- RN: zIndex вместо z-index

---

### 3. Тени

#### Web:
```css
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
```

#### React Native:
```tsx
// iOS:
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
}

// Android:
{
  elevation: 3,
}
```

**Отличия:**
- RN iOS: 4 отдельных свойства для тени
- RN Android: Только `elevation`
- Нужны оба для кросс-платформенности

---

### 4. Текст

#### Web:
```tsx
<div>
  Любой текст можно поместить в div
</div>
```

#### React Native:
```tsx
<View>
  <Text>Весь текст ДОЛЖЕН быть в Text</Text>
</View>

// ❌ Не работает:
<View>Текст напрямую</View>
```

**Критично:** В RN весь текст ОБЯЗАН быть в `<Text>`

---

## 💡 Best Practices

### Web → RN миграция:

1. **Начните с дизайн-токенов:**
   - Создайте `theme/` первым
   - Определите colors, spacing, typography
   - Экспортируйте как константы

2. **Портируйте по порядку:**
   - Базовые (Background, Card, Heading)
   - Формы (Input, Button)
   - Сложные (Modal, Charts)

3. **Используйте StyleSheet:**
   ```tsx
   // ✅ Хорошо (оптимизировано)
   const styles = StyleSheet.create({...});
   
   // ❌ Плохо (создается каждый рендер)
   <View style={{ padding: 16 }} />
   ```

4. **Извлекайте логику:**
   ```tsx
   // Web:
   className={`base ${active ? 'active' : ''}`}
   
   // RN:
   style={[styles.base, active && styles.active]}
   ```

5. **Тестируйте на обеих платформах:**
   - iOS и Android ведут себя по-разному
   - Особенно тени, шрифты, клавиатура

---

## 📊 Сравнение производительности

| Аспект | Web | React Native |
|--------|-----|--------------|
| **Рендеринг** | DOM (60fps) | Native views (60fps+) |
| **Анимации** | CSS/JS (может лагать) | Native threads (плавные) |
| **Списки** | VirtualScrolling | FlatList (оптимизирован) |
| **Изображения** | `<img>` (браузер) | Native Image (быстрее) |
| **Startup** | Быстрый | Медленнее (JSBundle) |

---

## ✨ Преимущества RN версии

1. **Native производительность**
2. **Доступ к native API** (камера, GPS, и т.д.)
3. **Плавные анимации** (на отдельном потоке)
4. **Оптимизированные списки** (FlatList)
5. **Native look & feel**

## 🌐 Преимущества Web версии

1. **Быстрая разработка** (hot reload)
2. **SEO** (индексируемость)
3. **Легкая установка** (просто URL)
4. **Больше библиотек**
5. **Проще отладка** (DevTools)

---

## 🎯 Итоги

### Портировано успешно:
- ✅ 17 из 37 компонентов (46%)
- ✅ Все дизайн-токены
- ✅ Визуальный стиль сохранен
- ✅ Component API совместимо
- ✅ TypeScript типизация

### Требует доработки:
- ⏳ 20 компонентов
- ⏳ Графики (Chart Kit integration)
- ⏳ Сложные анимации
- ⏳ Кастомные геометрии

### Рекомендация:
Портируйте только то, что **действительно нужно** для вашего приложения. Остальное добавляйте по мере необходимости.

---

**Обе версии сохраняют wellness эстетику и функциональность! 🎨📱**
