# Wellness Design System

A comprehensive UI component library for mental health and wellness SaaS applications, featuring soft gradients, elegant typography, and calming aesthetics.

## 🎨 Design Principles

### 1. Calm & Welcoming
- Soft pastel gradients create a soothing environment
- Rounded corners (24-28px default) reduce visual harshness
- Generous whitespace prevents overwhelming users
- Subtle shadows (rgba(0,0,0,0.04)) provide depth without distraction

### 2. Elegant Typography
- **Playfair Display** (Serif) for headlines - adds personality and warmth
- **Inter** (Sans-serif) for body text and UI - ensures clean readability
- Clear hierarchy with defined font sizes and weights
- Optimal line-height for comfortable reading

### 3. Thoughtful Color Psychology
- **Coral (#ff8a5b)**: Action, energy, positive engagement
- **Lavender (#e4a5f0)**: Calm, meditation, inner peace
- **Soft Blue (#6ab9e7)**: Trust, reliability, clarity
- **Soft Pink (#ffb5d5)**: Care, compassion, emotional support
- **Primary Black (#1a1a1a)**: Authority, readability, contrast
- **Background (#fffef7)**: Warm cream for comfortable viewing

## 📦 Component Library (37 Components)

### ✨ Reference-Inspired Components (NEW)

#### MoodTracker
Daily emoji-based mood tracker with streak counter and day labels.

**Props:**
- `streak?: number` - Number of consecutive days
- `onMoodSelect?: (mood: string) => void` - Callback when mood is selected
- `className?: string`

```tsx
<MoodTracker streak={7} onMoodSelect={(mood) => console.log(mood)} />
```

**Features:**
- 5 emoji states with day labels
- Black background for selected state
- Streak badge with fire emoji
- Smooth hover and active states

---

#### DayGreeting
Large serif heading with greeting badge for welcoming users.

**Props:**
- `greeting?: string` - Top badge text (default: "Good Evening")
- `title: string` - Main heading (supports \n for line breaks)
- `subtitle?: string` - Optional subtext
- `className?: string`

```tsx
<DayGreeting 
  greeting="Good Morning"
  title="New Day\nFresh Start!"
/>
```

**Features:**
- Greeting badge with emoji
- Multi-line serif heading support
- Centered layout

---

#### QuestionCard
Gradient card with reflective question and action button.

**Props:**
- `question: string` - The question text
- `buttonText?: string` - Button label (default: "Reflect")
- `gradient?: 'peach' | 'lavender' | 'cream' | 'pink'`
- `onButtonClick?: () => void`
- `className?: string`

```tsx
<QuestionCard 
  question="Are you the type of person who leaves reviews often?"
  gradient="peach"
  buttonText="Reflect"
/>
```

**Features:**
- Soft gradient backgrounds
- Black pill button
- 28px border radius
- Subtle shadow

---

#### ActionCard
Clean action button with title, subtitle, and arrow icon.

**Props:**
- `title: string` - Main action title
- `subtitle?: string` - Optional description
- `onClick?: () => void`
- `className?: string`

```tsx
<ActionCard 
  title="Begin Morning Preparation"
  subtitle="Start your day mindfully"
  onClick={() => {}}
/>
```

**Features:**
- White background with subtle border
- Arrow icon in circular container
- Hover scale effect
- Clean, minimal design

---

#### MoodGraph
Wavy line graph showing mood over time with smooth curves.

**Props:**
- `title?: string` - Graph title
- `subtitle?: string` - Description text
- `data?: Array<{ day: string; value: number }>`
- `className?: string`

```tsx
<MoodGraph 
  title="3.6 average mood"
  subtitle="You focus on health and you feel great"
/>
```

**Features:**
- Smooth bezier curve paths
- Gradient purple/lavender line
- Day labels below graph
- Current mood value display

---

#### FloatingActionButton
Circular navigation button with icon and label.

**Props:**
- `icon: React.ReactNode` - Icon component
- `label?: string` - Text label below button
- `active?: boolean` - Active state (black background)
- `onClick?: () => void`
- `size?: 'sm' | 'md' | 'lg'`
- `className?: string`

```tsx
<FloatingActionButton 
  icon={<Home className="w-6 h-6" />}
  label="Today"
  active={true}
  size="md"
/>
```

**Features:**
- Circular design with shadow
- Active state with black background
- Hover scale animation
- Optional label

---

### Layout Components

#### GradientBackground
Provides full-screen gradient backgrounds for different moods and contexts.

**Variants:**
- `peach` - Warm, morning energy
- `lavender` - Calm, evening reflection
- `cream` - Neutral, daytime activities
- `pink` - Caring, supportive moments

```tsx
<GradientBackground variant="peach">
  {/* Your content */}
</GradientBackground>
```

### Card Components

#### WellnessCard
Primary container for content with customizable gradient overlays.

**Props:**
- `gradient?: 'coral' | 'blue' | 'pink' | 'lavender'`
- `hover?: boolean` - Enables hover animations
- `className?: string`

```tsx
<WellnessCard gradient="coral" hover>
  <h3>Card Title</h3>
  <p>Card content</p>
</WellnessCard>
```

#### StatCard
Displays key metrics with large numbers and gradient backgrounds.

**Props:**
- `label: string` - Metric description
- `value: string | number` - Main value
- `unit?: string` - Optional unit (%, h, etc.)
- `gradient: 'blue' | 'pink' | 'coral' | 'lavender'`
- `icon?: React.ReactNode`

```tsx
<StatCard
  label="Sleep Quality"
  value="7.5"
  unit="h"
  gradient="blue"
/>
```

### Typography

#### SerifHeading
Elegant serif headlines using Playfair Display.

**Sizes:** `xl` | `2xl` | `3xl` | `4xl`

```tsx
<SerifHeading size="2xl">
  New Day
  <br />
  Fresh Start!
</SerifHeading>
```

### Interactive Components

#### PillButton
Fully rounded buttons with multiple variants.

**Variants:**
- `primary` - Black background
- `coral` - Coral background  
- `secondary` - White background
- `outline` - Transparent with border

**Sizes:** `sm` | `md` | `lg`

```tsx
<PillButton 
  variant="coral" 
  size="lg"
  icon={<ArrowRight />}
>
  Continue
</PillButton>
```

#### EmojiSelector
Interactive emoji-based option selector with visual feedback.

```tsx
<EmojiSelector
  options={[
    { emoji: '😊', label: 'Good', value: 'good' },
    { emoji: '😄', label: 'Great', value: 'great' },
  ]}
  defaultValue="good"
  onChange={(value) => console.log(value)}
/>
```

#### VerticalSlider
Custom vertical slider for rating scales.

```tsx
<VerticalSlider
  min={0}
  max={10}
  defaultValue={5}
  labels={[
    { value: 8, label: 'Very Well' },
    { value: 6, label: 'Good' },
    { value: 4, label: 'Fair' },
    { value: 2, label: 'Poor' },
  ]}
  color="#ff8a65"
/>
```

#### DropdownSelector
Compact dropdown with smooth animations.

```tsx
<DropdownSelector
  options={['Weeks', 'Months', 'Year']}
  defaultValue="Weeks"
  onChange={(value) => console.log(value)}
/>
```

### Data Visualization

#### MoodChart
Smooth area chart for tracking mood over time.

```tsx
<MoodChart
  data={[
    { day: 'M', mood: 5 },
    { day: 'T', mood: 7 },
    { day: 'W', mood: 6 },
  ]}
  color="#b8a0d6"
/>
```

### Navigation

#### TopNavigation
Header navigation with left/right actions and optional greeting or title.

```tsx
<TopNavigation
  leftIcon={<Menu />}
  rightIcon={<Bell />}
  greeting="Good Evening"
  onLeftClick={() => {}}
  onRightClick={() => {}}
/>
```

#### BottomNavigation
Fixed bottom tab navigation with active state animations.

```tsx
<BottomNavigation
  items={[
    { icon: <Home />, label: 'Home', value: 'home' },
    { icon: <Activity />, label: 'Track', value: 'track' },
  ]}
  defaultValue="home"
  onChange={(value) => console.log(value)}
/>
```

### Badges

#### StreakBadge
Displays achievement streaks with flame icon.

```tsx
<StreakBadge days={7} />
```

#### InfoBadge
Subtle informational badges with optional icons.

```tsx
<InfoBadge
  icon={<Smile />}
  text="3.6 average mood"
/>
```

### Utility

#### MobileScreen
iPhone-style frame wrapper for demos.

```tsx
<MobileScreen showNotch>
  {/* Your mobile content */}
</MobileScreen>
```

## 📝 Form Components

### Input
Text input with floating label and icon support.

**Props:**
- `label?: string` - Floating label text
- `error?: string` - Error message
- `icon?: React.ReactNode` - Left icon
- Standard HTML input props

```tsx
<Input 
  label="Email" 
  placeholder="Enter your email"
  type="email"
  icon={<Mail />}
  error="Invalid email format"
/>
```

### TextArea
Multi-line text input with character count.

**Props:**
- `label?: string` - Label text
- `error?: string` - Error message
- `maxLength?: number` - Maximum characters
- `showCount?: boolean` - Show character counter
- Standard HTML textarea props

```tsx
<TextArea
  label="Message"
  placeholder="Write your thoughts..."
  maxLength={200}
  showCount
  rows={4}
/>
```

### Checkbox
Styled checkbox with gradient when checked.

**Props:**
- `label?: string` - Label text
- `checked?: boolean` - Controlled state
- `onChange?: (checked: boolean) => void` - Change handler
- `disabled?: boolean` - Disabled state

```tsx
<Checkbox 
  label="Enable notifications"
  checked={isChecked}
  onChange={setIsChecked}
/>
```

### RadioGroup
Radio button group with descriptions.

**Props:**
- `options: RadioOption[]` - Array of `{ value, label, description? }`
- `value?: string` - Selected value
- `onChange?: (value: string) => void` - Change handler
- `name: string` - Radio group name

```tsx
<RadioGroup
  name="mood"
  options={[
    { value: 'great', label: 'Feeling Great', description: 'Energetic and positive' },
    { value: 'good', label: 'Feeling Good', description: 'Calm and content' },
  ]}
  value={selectedMood}
  onChange={setSelectedMood}
/>
```

### Toggle
Switch toggle with multiple sizes.

**Props:**
- `checked?: boolean` - Controlled state
- `defaultChecked?: boolean` - Initial state
- `onChange?: (checked: boolean) => void` - Change handler
- `label?: string` - Label text
- `size?: 'sm' | 'md' | 'lg'` - Toggle size
- `disabled?: boolean` - Disabled state

```tsx
<Toggle
  label="Dark mode"
  size="md"
  checked={isDarkMode}
  onChange={setIsDarkMode}
/>
```

## 🔔 Feedback Components

### Toast
Auto-dismissing notification toast.

**Props:**
- `message: string` - Notification message
- `type?: 'success' | 'error' | 'warning' | 'info'` - Toast type
- `duration?: number` - Display duration (ms), default 3000
- `onClose?: () => void` - Close callback
- `icon?: React.ReactNode` - Custom icon

```tsx
<Toast
  message="Session saved successfully!"
  type="success"
  duration={3000}
/>
```

### ProgressBar
Gradient progress indicator.

**Props:**
- `value: number` - Current value
- `max?: number` - Maximum value, default 100
- `gradient?: 'coral' | 'lavender' | 'blue' | 'pink'` - Color gradient
- `showLabel?: boolean` - Show percentage
- `label?: string` - Label text
- `size?: 'sm' | 'md' | 'lg'` - Bar height

```tsx
<ProgressBar
  value={75}
  gradient="coral"
  label="Daily Goal"
  showLabel
/>
```

### LoadingSpinner
Animated loading indicator.

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Spinner size
- `gradient?: 'coral' | 'lavender' | 'blue' | 'pink'` - Color
- `className?: string` - Additional classes

```tsx
<LoadingSpinner size="lg" gradient="lavender" />
```

### Alert
Informational banner with variants.

**Props:**
- `variant?: 'info' | 'success' | 'warning' | 'error'` - Alert type
- `title?: string` - Alert title
- `message: string` - Alert message
- `icon?: React.ReactNode` - Custom icon
- `onClose?: () => void` - Close callback

```tsx
<Alert
  variant="warning"
  title="Reminder"
  message="You haven't checked in for 3 days"
  onClose={() => {}}
/>
```

## 📊 Data Display Components

### Timeline
Vertical timeline with icons and gradients.

**Props:**
- `items: TimelineItem[]` - Array of `{ time, title, description?, icon?, gradient? }`
- `className?: string` - Additional classes

```tsx
<Timeline
  items={[
    { 
      time: '09:00 AM', 
      title: 'Morning Meditation', 
      description: '10 minutes of mindfulness',
      gradient: 'lavender',
      icon: <Heart />
    },
    { 
      time: '12:30 PM', 
      title: 'Mood Check-in', 
      description: 'Feeling great today!',
      gradient: 'coral'
    },
  ]}
/>
```

### Avatar
User avatar with status indicator.

**Props:**
- `src?: string` - Avatar image URL
- `alt?: string` - Image alt text
- `fallback?: string` - Text for initials
- `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'` - Avatar size
- `gradient?: 'coral' | 'lavender' | 'blue' | 'pink'` - Background gradient
- `status?: 'online' | 'offline' | 'busy'` - Status indicator

```tsx
<Avatar
  fallback="Sarah Chen"
  size="md"
  gradient="coral"
  status="online"
/>
```

### Tag
Removable tag/chip component.

**Props:**
- `label: string` - Tag text
- `gradient?: 'coral' | 'lavender' | 'blue' | 'pink' | 'gray'` - Color
- `onRemove?: () => void` - Remove callback
- `size?: 'sm' | 'md'` - Tag size

```tsx
<Tag
  label="Meditation"
  gradient="lavender"
  onRemove={() => {}}
/>
```

## 🧭 Navigation Components (Extended)

### Tabs
Tabbed content with two style variants.

**Props:**
- `tabs: Tab[]` - Array of `{ id, label, icon?, content }`
- `defaultTab?: string` - Initially active tab
- `variant?: 'pills' | 'underline'` - Style variant
- `className?: string` - Additional classes

```tsx
<Tabs
  variant="pills"
  tabs={[
    { 
      id: 'overview', 
      label: 'Overview',
      icon: <Activity />,
      content: <div>Overview content</div>
    },
    { 
      id: 'analytics', 
      label: 'Analytics',
      content: <div>Analytics content</div>
    },
  ]}
/>
```

### Breadcrumbs
Navigation breadcrumb trail.

**Props:**
- `items: BreadcrumbItem[]` - Array of `{ label, href?, onClick? }`
- `separator?: React.ReactNode` - Custom separator icon
- `className?: string` - Additional classes

```tsx
<Breadcrumbs
  items={[
    { label: 'Home', onClick: () => {} },
    { label: 'Dashboard', onClick: () => {} },
    { label: 'Current Page' },
  ]}
/>
```

### Pagination
Page navigation component.

**Props:**
- `currentPage: number` - Active page
- `totalPages: number` - Total page count
- `onPageChange: (page: number) => void` - Page change handler
- `maxVisible?: number` - Max visible page buttons, default 5
- `className?: string` - Additional classes

```tsx
<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
  maxVisible={5}
/>
```

## 💬 Overlay Components

### Modal
Centered modal dialog.

**Props:**
- `isOpen: boolean` - Open state
- `onClose: () => void` - Close handler
- `title?: string` - Modal title
- `children: React.ReactNode` - Modal content
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Modal width
- `showCloseButton?: boolean` - Show close button, default true

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure you want to continue?</p>
</Modal>
```

### Tooltip
Hover tooltip with positioning.

**Props:**
- `content: string | React.ReactNode` - Tooltip content
- `children: React.ReactNode` - Trigger element
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Tooltip position
- `delay?: number` - Show delay (ms), default 200
- `className?: string` - Additional classes

```tsx
<Tooltip content="This helps track your mood" position="top">
  <button>Hover me</button>
</Tooltip>
```

### Popover
Click-triggered popover menu.

**Props:**
- `trigger: React.ReactNode` - Click trigger element
- `content: React.ReactNode` - Popover content
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Popover position
- `className?: string` - Additional classes

```tsx
<Popover
  trigger={<button>Click me</button>}
  content={
    <div className="p-4">
      <h4>Menu Options</h4>
      <ul>
        <li>Option 1</li>
        <li>Option 2</li>
      </ul>
    </div>
  }
  position="bottom"
/>
```

## 🎯 Usage Guidelines

### Spacing
- **Mobile padding**: 24px (1.5rem) horizontal
- **Section spacing**: 24px (1.5rem) vertical
- **Card padding**: 24px (1.5rem)
- **Component gaps**: 16px (1rem) default

### Border Radius
- **Cards**: 20px (1.25rem)
- **Buttons**: 9999px (fully rounded)
- **Small elements**: 12px (0.75rem)

### Shadows
- **Cards**: `0 4px 20px rgba(0,0,0,0.06)`
- **Hover**: `0 6px 30px rgba(0,0,0,0.1)`
- **Floating**: `0 10px 40px rgba(0,0,0,0.15)`

### Transitions
- **Standard**: 200ms ease
- **Hover**: 300ms ease
- **Scale**: 1.02 for cards, 1.10 for small elements

### Accessibility
- Minimum touch target: 44×44px (48×48px recommended)
- Color contrast: WCAG AA compliant
- Focus indicators: Ring with accent color
- Semantic HTML throughout

## 🚀 Getting Started

Import components from the design system:

```tsx
import {
  // Layout
  GradientBackground,
  MobileScreen,
  
  // Cards
  WellnessCard,
  StatCard,
  
  // Typography
  SerifHeading,
  
  // Buttons & Interactive
  PillButton,
  EmojiSelector,
  DropdownSelector,
  VerticalSlider,
  
  // Forms
  Input,
  TextArea,
  Checkbox,
  RadioGroup,
  Toggle,
  
  // Feedback
  Toast,
  ProgressBar,
  LoadingSpinner,
  Alert,
  
  // Data Display
  MoodChart,
  Timeline,
  Avatar,
  Tag,
  
  // Navigation
  TopNavigation,
  BottomNavigation,
  Tabs,
  Breadcrumbs,
  Pagination,
  
  // Overlays
  Modal,
  Tooltip,
  Popover,
  
  // Badges
  StreakBadge,
  InfoBadge,
} from './components/design-system';
```

## 🎨 Color Palette

### Gradients
- **Peach**: `#ffecd2 → #ffd7ba → #fcb69f`
- **Lavender**: `#e6dff5 → #d4c5f0 → #c8b8e8`
- **Cream**: `#fef3e2 → #ffecd2 → #ffd7ba`
- **Pink**: `#ffd6e8 → #ffc9df → #ffb5d5`

### Accent Colors
- **Coral**: `#ff8a65`
- **Lavender**: `#b8a0d6`
- **Soft Blue**: `#a8d8ea`
- **Soft Pink**: `#ffb5c5`
- **Primary**: `#1a1a1a`

### Semantic Colors
- **Background**: `#faf8f6`
- **Foreground**: `#1a1a1a`
- **Muted**: `#f0f0f0`
- **Border**: `rgba(0,0,0,0.08)`

## 📱 Mobile-First Design

All components are designed with mobile as the primary viewport:
- Touch-friendly sizes (minimum 44×44px)
- Gesture-based interactions
- Optimized for portrait orientation
- Responsive scaling for larger screens

## ��� Customization

Most components accept `className` props for additional styling:

```tsx
<WellnessCard className="custom-class">
  Content
</WellnessCard>
```

Colors can be customized via CSS variables in `theme.css`.

## 📝 Best Practices

1. **Use semantic colors** - Choose gradient and accent colors based on emotional context
2. **Maintain hierarchy** - Use SerifHeading for titles, regular text for content
3. **Group related content** - Use WellnessCard to create clear content blocks
4. **Provide feedback** - Use hover states and transitions for interactive elements
5. **Be consistent** - Stick to the established spacing and sizing guidelines

---

Built with ❤️ for wellness and mental health applications.