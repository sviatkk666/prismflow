'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useScrollAnimation } from '@/lib/hooks';

interface FadeInOnScrollProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

/**
 * FadeInOnScroll - Fade in animation triggered by scroll
 * Usage: <FadeInOnScroll direction="up"><Component /></FadeInOnScroll>
 */
export function FadeInOnScroll({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  direction = 'up',
}: FadeInOnScrollProps) {
  const { ref, isInView } = useScrollAnimation({ once: true });

  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === 'up' && { y: 30 }),
      ...(direction === 'down' && { y: -30 }),
      ...(direction === 'left' && { x: 30 }),
      ...(direction === 'right' && { x: -30 }),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
