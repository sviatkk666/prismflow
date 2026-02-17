'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

/**
 * SlideUp - Slide up animation with fade
 * Usage: <SlideUp delay={0.1} distance={30}><Card /></SlideUp>
 */
export function SlideUp({
  children,
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = '',
}: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
