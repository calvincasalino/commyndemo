'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        // Primary blue button (Figma: Add video button)
        primary: 'bg-[#0276C1] text-white hover:bg-[#0284C7] focus:ring-[#0276C1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] rounded-[10px]',
        // Secondary light button
        secondary: 'bg-[#E0F2FE] text-[#0276C1] hover:bg-[#0276C1] hover:text-white focus:ring-[#0276C1] rounded-[10px]',
        // Ghost button
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400 rounded-[10px]',
        // Danger button
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 rounded-[10px]',
        // Outline button (Figma: More details button)
        outline: 'border border-[#E5E5E5] bg-white text-[#0A0A0A] hover:bg-gray-50 focus:ring-[#0276C1] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] rounded-[10px]',
        // Glass morphism button (Figma: Community voices modal buttons)
        glass: 'backdrop-blur-md bg-[rgba(14,14,14,0.16)] border border-[rgba(255,255,255,0.2)] text-[#FAFAFA] hover:bg-[rgba(14,14,14,0.24)] focus:ring-white/30 rounded-[14px]',
        // Back button style (Figma: Navigation back buttons)
        back: 'backdrop-blur-md bg-white border border-[rgba(255,255,255,0.2)] text-[#0A0A0A] hover:bg-gray-50 focus:ring-gray-400 rounded-[10px]',
      },
      size: {
        sm: 'h-9 px-3 text-sm gap-2',
        md: 'h-11 px-4 text-sm gap-2',
        lg: 'h-12 px-6 text-base gap-2',
        xl: 'h-14 px-8 text-lg gap-2',
        icon: 'h-10 w-10 p-2.5',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    fullWidth,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };