# PrismFlow Component Library

Reusable animation and UI components for the PrismFlow portal. All components are optimized for performance and follow the PrismFlow design system.

## 🎨 Animation Components

### FadeIn
Smooth fade-in animation wrapper.

```tsx
import { FadeIn } from '@/components/animations';

<FadeIn delay={0.2} direction="up">
  <YourComponent />
</FadeIn>
```

**Props:**
- `delay?: number` - Animation delay in seconds (default: 0)
- `duration?: number` - Animation duration (default: 0.5)
- `direction?: 'up' | 'down' | 'left' | 'right' | 'none'` - Animation direction
- `className?: string` - Additional CSS classes

### SlideUp
Slide up animation with fade.

```tsx
import { SlideUp } from '@/components/animations';

<SlideUp delay={0.1} distance={30}>
  <Card />
</SlideUp>
```

**Props:**
- `delay?: number` - Animation delay (default: 0)
- `duration?: number` - Animation duration (default: 0.6)
- `distance?: number` - Slide distance in pixels (default: 30)
- `className?: string` - Additional CSS classes

### StaggerChildren
Stagger animation for list items.

```tsx
import { StaggerChildren } from '@/components/animations';

<StaggerChildren staggerDelay={0.1}>
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</StaggerChildren>
```

**Props:**
- `staggerDelay?: number` - Delay between each child (default: 0.1)
- `className?: string` - Additional CSS classes

### Parallax
Parallax scroll effect.

```tsx
import { Parallax } from '@/components/animations';

<Parallax speed={0.5}>
  <Image src="/hero.jpg" />
</Parallax>
```

**Props:**
- `speed?: number` - Parallax speed multiplier (default: 0.5)
- `className?: string` - Additional CSS classes

### FadeInOnScroll
Fade in animation triggered by scroll.

```tsx
import { FadeInOnScroll } from '@/components/animations';

<FadeInOnScroll direction="up" delay={0.2}>
  <Section />
</FadeInOnScroll>
```

**Props:**
- `delay?: number` - Animation delay (default: 0)
- `duration?: number` - Animation duration (default: 0.6)
- `direction?: 'up' | 'down' | 'left' | 'right'` - Animation direction
- `className?: string` - Additional CSS classes

### Pulse
Pulsing animation effect.

```tsx
import { Pulse } from '@/components/animations';

<Pulse intensity="medium">
  <Badge>New</Badge>
</Pulse>
```

**Props:**
- `intensity?: 'low' | 'medium' | 'high'` - Pulse intensity
- `className?: string` - Additional CSS classes

### Shimmer
Loading shimmer effect.

```tsx
import { Shimmer } from '@/components/animations';

<Shimmer className="h-4 w-full rounded" />
```

**Props:**
- `width?: string` - Width (default: '100%')
- `height?: string` - Height (default: '1rem')
- `className?: string` - Additional CSS classes

## 📊 Chart Components

### CostChart
Animated pie chart for cost breakdown.

```tsx
import { CostChart } from '@/components/charts';

<CostChart
  data={[
    { name: 'LLM', value: 0.5, color: '#6366f1' },
    { name: 'RAG', value: 0.3, color: '#3b82f6' },
  ]}
  total={0.8}
/>
```

### LatencyGraph
Real-time latency line graph.

```tsx
import { LatencyGraph } from '@/components/charts';

<LatencyGraph
  data={[
    { timestamp: '10:00', latency: 120 },
    { timestamp: '10:01', latency: 150 },
  ]}
/>
```

### TrendChart
Trend visualization chart.

```tsx
import { TrendChart } from '@/components/charts';

<TrendChart
  data={[
    { date: '2024-01-01', value: 0.85 },
    { date: '2024-01-02', value: 0.90 },
  ]}
/>
```

### ScoreBar
Animated score bar with gradient.

```tsx
import { ScoreBar } from '@/components/charts';

<ScoreBar
  score={0.85}
  label="Relevance"
  showValue
/>
```

**Props:**
- `score: number` - Score value (0-1)
- `label?: string` - Label text
- `showValue?: boolean` - Show percentage value
- `height?: number` - Bar height in pixels (default: 8)
- `className?: string` - Additional CSS classes

## 🎯 UI Components

### Button
Animated button with ripple effect.

```tsx
import { Button } from '@/components/ui';

<Button
  variant="primary"
  size="md"
  onClick={handleClick}
  loading={isLoading}
>
  Click me
</Button>
```

**Props:**
- `variant?: 'primary' | 'secondary' | 'ghost' | 'danger'`
- `size?: 'sm' | 'md' | 'lg'`
- `disabled?: boolean`
- `loading?: boolean`
- `fullWidth?: boolean`
- `type?: 'button' | 'submit' | 'reset'`

### Card
Glassmorphism card with hover effects.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card hover glow>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

**Props:**
- `hover?: boolean` - Enable hover scale effect
- `glow?: boolean` - Add glow shadow
- `onClick?: () => void` - Click handler

### Input
Animated input with floating label.

```tsx
import { Input } from '@/components/ui';

<Input
  label="Email"
  type="email"
  error={error}
  helperText="Enter your email"
/>
```

**Props:**
- `label?: string` - Floating label
- `error?: string` - Error message
- `helperText?: string` - Helper text
- `fullWidth?: boolean`
- All standard HTML input props

### CodeViewer
Syntax-highlighted code viewer with copy button.

```tsx
import { CodeViewer } from '@/components/ui';

<CodeViewer
  code={jsonString}
  language="json"
  showLineNumbers
  maxHeight="400px"
/>
```

**Props:**
- `code: string` - Code to display
- `language?: string` - Language (default: 'json')
- `showLineNumbers?: boolean`
- `maxHeight?: string` - Max height (default: '400px')

### AnimatedCounter
Animated number counter.

```tsx
import { AnimatedCounter } from '@/components/ui';

<AnimatedCounter
  value={1234.56}
  decimals={2}
  prefix="$"
  suffix=" USD"
/>
```

**Props:**
- `value: number` - Target value
- `duration?: number` - Animation duration (default: 1.5)
- `decimals?: number` - Decimal places (default: 0)
- `prefix?: string` - Prefix text
- `suffix?: string` - Suffix text

### LoadingSpinner
Animated loading spinner.

```tsx
import { LoadingSpinner } from '@/components/ui';

<LoadingSpinner size="md" />
```

**Props:**
- `size?: 'sm' | 'md' | 'lg'`

### Toast
Toast notification system (use with useToast hook).

```tsx
import { ToastContainer } from '@/components/ui';
import { useToast } from '@/lib/hooks';

function MyComponent() {
  const { toasts, removeToast, success } = useToast();

  const handleClick = () => {
    success('Operation completed!');
  };

  return (
    <>
      <button onClick={handleClick}>Show Toast</button>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}
```

## 🪝 Hooks

### useScrollAnimation
Hook for scroll-triggered animations.

```tsx
import { useScrollAnimation } from '@/lib/hooks';

const { ref, isInView } = useScrollAnimation({ once: true });
```

### useToast
Hook for managing toast notifications.

```tsx
import { useToast } from '@/lib/hooks';

const { success, error, warning, info, toasts, removeToast } = useToast();
```

### useHover
Hook to detect hover state.

```tsx
import { useHover } from '@/lib/hooks';

const [isHovered, ref] = useHover<HTMLDivElement>();
```

### useRipple
Hook for creating ripple effect on click.

```tsx
import { useRipple } from '@/lib/hooks';

const { ref, createRipple } = useRipple();

<button ref={ref} onClick={createRipple}>Click</button>
```

## 🎨 Design System

### Colors
- Primary Gradient: `from-indigo-600 to-blue-600`
- Accent Colors: Emerald (success), Rose (error), Amber (warning), Sky (info)
- Background: `bg-gray-900/50` with backdrop blur

### Animations
- Fast: 150ms
- Normal: 300ms
- Slow: 600ms
- Easing: Custom cubic-bezier curves

### Typography
- Headings: Inter (bold)
- Body: Inter
- Code: JetBrains Mono

## 📝 Usage Tips

1. **Performance**: All animations use GPU acceleration (transform, opacity)
2. **Accessibility**: Components include proper ARIA attributes
3. **Responsive**: All components are mobile-friendly
4. **Dark Mode**: Components adapt to dark theme automatically

## 🔗 Related Files

- Animation utilities: `lib/utils/animations.ts`
- Ripple styles: `styles/ripple.css`
- Component exports: `components/*/index.ts`
