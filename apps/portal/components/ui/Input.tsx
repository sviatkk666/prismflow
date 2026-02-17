'use client';

import { motion } from 'framer-motion';
import { InputHTMLAttributes, forwardRef, useState } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

/**
 * Input - Animated input with floating label
 * Usage: <Input label="Email" type="email" error={error} />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, className = '', ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        <div className="relative">
          {label && (
            <motion.label
              initial={false}
              animate={{
                y: focused || hasValue ? -24 : 0,
                scale: focused || hasValue ? 0.85 : 1,
                color: error
                  ? '#ef4444'
                  : focused
                  ? '#6366f1'
                  : '#9ca3af',
              }}
              transition={{ duration: 0.2 }}
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none origin-left"
            >
              {label}
            </motion.label>
          )}
          <motion.input
            ref={ref}
            {...props}
            onChange={handleChange}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            className={`
              w-full px-3 py-2 bg-gray-900/50 border rounded-lg
              text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
              transition-all duration-200
              ${error
                ? 'border-rose-500 focus:ring-rose-500'
                : 'border-gray-700 focus:border-indigo-500 focus:ring-indigo-500'
              }
              ${label ? 'pt-6' : ''}
              ${className}
            `}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-rose-400"
          >
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
