'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PulseProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

/**
 * Pulse - Pulsing animation effect
 * Usage: <Pulse intensity="medium"><Badge /></Pulse>
 */
export function Pulse({
  children,
  className = '',
  intensity = 'medium',
}: PulseProps) {
  const scaleValues = {
    low: [1, 1.02, 1],
    medium: [1, 1.05, 1],
    high: [1, 1.1, 1],
  };

  return (
    <motion.div
      animate={{
        scale: scaleValues[intensity],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
