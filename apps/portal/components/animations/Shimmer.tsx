'use client';

import { motion } from 'framer-motion';

interface ShimmerProps {
  className?: string;
  width?: string;
  height?: string;
}

/**
 * Shimmer - Loading shimmer effect
 * Usage: <Shimmer className="h-4 w-full rounded" />
 */
export function Shimmer({
  className = '',
  width = '100%',
  height = '1rem',
}: ShimmerProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-800 rounded ${className}`}
      style={{ width, height }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ width: '50%' }}
      />
    </div>
  );
}
