# PrismFlow - Reusable Animation Components

This directory contains reusable frontend components for animations and charts. Use these components to focus on AI functionality while maintaining a polished, animated UI.

## 📦 Installation

Make sure you have the required dependencies:

```bash
npm install framer-motion recharts lucide-react
```

## 🎨 Animation Components

### FadeIn
Smooth fade-in animation with optional directional movement.

```tsx
import { FadeIn } from '@/components/animations';

<FadeIn delay={0.2} direction="up">
  <YourComponent />
</FadeIn>
```

**Props:**
- `delay` (number, default: 0) - Animation delay in seconds
- `duration` (number, default: 0.5) - Animation duration
- `direction` ('up' | 'down' | 'left' | 'right' | 'none') - Direction of movement
- `className` (string) - Additional CSS classes

### SlideUp
Slide up animation with fade effect.

```tsx
import { SlideUp } from '@/components/animations';

<SlideUp delay={0.1} distance={30}>
  <Card />
</SlideUp>
```

**Props:**
- `delay` (number, default: 0)
- `duration` (number, default: 0.6)
- `distance` (number, default: 30) - Pixels to slide
- `className` (string)

### StaggerChildren
Stagger animation for list items.

```tsx
import { StaggerChildren } from '@/components/animations';

<StaggerChildren staggerDelay={0.1}>
  {items.map(item => <Card key={item.id} data={item} />)}
</StaggerChildren>
```

**Props:**
- `staggerDelay` (number, default: 0.1) - Delay between each child
- `className` (string)

### Parallax
Parallax scroll effect.

```tsx
import { Parallax } from '@/components/animations';

<Parallax speed={0.5}>
  <Image src="/hero.jpg" />
</Parallax>
```

**Props:**
- `speed` (number, default: 0.5) - Parallax speed multiplier
- `className` (string)

## 📊 Chart Components

### ScoreBar
Animated score bar with gradient fill.

```tsx
import { ScoreBar } from '@/components/charts';

<ScoreBar 
  score={0.85} 
  label="Relevance" 
  showValue 
  height={8}
/>
```

**Props:**
- `score` (number, 0-1) - Score value
- `label` (string, optional) - Label text
- `showValue` (boolean, default: false) - Show percentage
- `height` (number, default: 8) - Bar height in pixels
- `className` (string)

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

**Props:**
- `data` (Array<{name: string, value: number, color?: string}>)
- `total` (number, optional) - Total cost (auto-calculated if omitted)
- `className` (string)

### LatencyGraph
Real-time latency line chart with area fill.

```tsx
import { LatencyGraph } from '@/components/charts';

<LatencyGraph 
  data={[
    { timestamp: Date.now(), latency: 123 },
    { timestamp: Date.now() + 1000, latency: 145 },
  ]}
  maxDataPoints={20}
/>
```

**Props:**
- `data` (Array<{timestamp: number | string, latency: number}>)
- `maxDataPoints` (number, default: 20) - Maximum points to display
- `className` (string)

### TrendChart
Multi-line trend chart for evaluation metrics.

```tsx
import { TrendChart } from '@/components/charts';

<TrendChart 
  data={[
    { date: '2026-02-17', accuracy: 0.85, avgCost: 0.001 },
    { date: '2026-02-18', accuracy: 0.87, avgCost: 0.0012 },
  ]}
  metrics={['accuracy', 'avgCost']}
/>
```

**Props:**
- `data` (Array<{date: string, accuracy?: number, avgCost?: number, latency?: number}>)
- `metrics` (string[], default: ['accuracy', 'avgCost']) - Metrics to display
- `className` (string)

## 🎯 UI Components

### AnimatedCounter
Animated number counter.

```tsx
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

<AnimatedCounter 
  value={1234.56} 
  decimals={2} 
  prefix="$" 
/>
```

**Props:**
- `value` (number) - Target value
- `duration` (number, default: 1.5) - Animation duration
- `decimals` (number, default: 0) - Decimal places
- `prefix` (string, default: '') - Prefix text
- `suffix` (string, default: '') - Suffix text
- `className` (string)

### LoadingSpinner
Animated loading spinner.

```tsx
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

<LoadingSpinner size="md" />
```

**Props:**
- `size` ('sm' | 'md' | 'lg', default: 'md')
- `className` (string)

### Toast & ToastContainer
Animated notification toasts.

```tsx
import { ToastContainer } from '@/components/ui/Toast';
import { useToast } from '@/lib/hooks/useToast';

function MyComponent() {
  const { toasts, showToast, removeToast } = useToast();

  return (
    <>
      <button onClick={() => showToast('Success!', 'success')}>
        Show Toast
      </button>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}
```

## 🪝 Hooks

### useToast
Hook for managing toast notifications.

```tsx
import { useToast } from '@/lib/hooks/useToast';

const { toasts, showToast, removeToast } = useToast();

showToast('Operation successful!', 'success', 3000);
```

### useScrollAnimation
Hook for scroll-triggered animations.

```tsx
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

const { ref, isInView } = useScrollAnimation();

return <div ref={ref}>{isInView && <AnimatedContent />}</div>;
```

## 🎨 Styling

All components use Tailwind CSS classes. Make sure your `tailwind.config.js` includes:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // PrismFlow brand colors
      },
    },
  },
};
```

## 📝 Usage Examples

### Module Card with Animation
```tsx
import { FadeIn, StaggerChildren } from '@/components/animations';

<StaggerChildren staggerDelay={0.1}>
  {modules.map(module => (
    <FadeIn key={module.id} delay={0}>
      <ModuleCard module={module} />
    </FadeIn>
  ))}
</StaggerChildren>
```

### Metrics Display with Charts
```tsx
import { AnimatedCounter, CostChart, LatencyGraph } from '@/components';

<div>
  <AnimatedCounter value={cost} prefix="$" decimals={4} />
  <CostChart data={costBreakdown} />
  <LatencyGraph data={latencyHistory} />
</div>
```

### Citation List with Score Bars
```tsx
import { ScoreBar } from '@/components/charts';

{citations.map(citation => (
  <div key={citation.chunk_id}>
    <ScoreBar score={citation.score} label={citation.source} showValue />
    <p>{citation.snippet}</p>
  </div>
))}
```

## 🚀 Next Steps

1. Import components as needed in your AI module pages
2. Wrap your content with animation components
3. Use charts to visualize metrics from your AI services
4. Focus on AI functionality while components handle the UI polish!
