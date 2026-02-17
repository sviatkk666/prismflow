'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScoreBarProps {
  score: number; // 0-1
  label?: string;
  showValue?: boolean;
  height?: number;
  className?: string;
}

/**
 * ScoreBar - Animated score bar with gradient
 * Usage: <ScoreBar score={0.85} label="Relevance" showValue />
 */
export function ScoreBar({
  score,
  label,
  showValue = false,
  height = 8,
  className = '',
}: ScoreBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Clamp score between 0 and 1
  const clampedScore = Math.max(0, Math.min(1, score));
  const percentage = clampedScore * 100;

  // Gradient colors based on score
  const getGradient = () => {
    if (clampedScore < 0.5) {
      return 'from-rose-500 to-amber-500';
    } else if (clampedScore < 0.8) {
      return 'from-amber-500 to-emerald-500';
    } else {
      return 'from-emerald-500 to-emerald-400';
    }
  };

  return (
    <div ref={ref} className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-300">{label}</span>
          )}
          {showValue && (
            <span className="text-sm text-gray-400">
              {(clampedScore * 100).toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full bg-gray-800 rounded-full overflow-hidden"
        style={{ height }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full bg-gradient-to-r ${getGradient()} rounded-full`}
        />
      </div>
    </div>
  );
}
