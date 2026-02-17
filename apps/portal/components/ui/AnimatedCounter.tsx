'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * AnimatedCounter - Animated number counter
 * Usage: <AnimatedCounter value={1234.56} decimals={2} prefix="$" />
 */
export function AnimatedCounter({
  value,
  duration = 1.5,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const startValue = 0;
    const endValue = value;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;

      if (ref.current) {
        ref.current.textContent =
          prefix + currentValue.toFixed(decimals) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (ref.current) {
          ref.current.textContent = prefix + endValue.toFixed(decimals) + suffix;
        }
      }
    };

    animate();
  }, [value, duration, decimals, prefix, suffix, isInView]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
