'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

/**
 * FadeIn - Smooth fade-in animation wrapper
 * Usage: <FadeIn delay={0.2}><YourComponent /></FadeIn>
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  direction = 'none',
}: FadeInProps) {
  const variants = {
    hidden: {
      opacity: 0,
      ...(direction === 'up' && { y: 20 }),
      ...(direction === 'down' && { y: -20 }),
      ...(direction === 'left' && { x: 20 }),
      ...(direction === 'right' && { x: -20 }),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing curve
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
