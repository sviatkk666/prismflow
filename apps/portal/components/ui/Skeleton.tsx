'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  count?: number;
}

/**
 * Skeleton - Loading skeleton component
 * Usage: <Skeleton width="100%" height="20px" rounded="md" count={3} />
 */
export function Skeleton({
  width = '100%',
  height = '1rem',
  className = '',
  rounded = 'md',
  count = 1,
}: SkeletonProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const skeletonElement = (
    <motion.div
      className={`
        bg-gray-800
        ${roundedClasses[rounded]}
        ${className}
      `}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );

  if (count === 1) {
    return skeletonElement;
  }

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          {skeletonElement}
        </motion.div>
      ))}
    </div>
  );
}
