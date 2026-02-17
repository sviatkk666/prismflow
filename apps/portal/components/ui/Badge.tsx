'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  pulse?: boolean;
}

/**
 * Badge - Animated badge component
 * Usage: <Badge variant="success" pulse>New</Badge>
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  pulse = false,
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-800 text-gray-300 border-gray-700',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const Component = pulse ? motion.span : 'span';

  return (
    <Component
      {...(pulse && {
        animate: { scale: [1, 1.05, 1] },
        transition: { duration: 2, repeat: Infinity },
      })}
      className={`
        inline-flex items-center font-medium rounded-full border
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
