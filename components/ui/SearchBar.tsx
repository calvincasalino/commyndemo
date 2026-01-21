'use client';

import React, { forwardRef } from 'react';
// FIXED: Changed from '@/lib/utils' to relative path
import { cn } from '../../lib/utils';

// Added 'onSubmit' to the list of things to Omit
export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onSubmit'> {
  variant?: 'default' | 'filled';
  onSearchClick?: () => void;
  onSubmit?: (value: string) => void;
}

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <circle cx="7" cy="7" r="5" stroke="#737373" strokeWidth="1.33"/>
    <path d="M11 11L14 14" stroke="#737373" strokeWidth="1.33" strokeLinecap="round"/>
  </svg>
);

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({
    className,
    variant = 'filled',
    placeholder = 'Search',
    onSearchClick,
    onSubmit,
    ...props
  }, ref) => {
    const handleClick = () => {
      if (onSearchClick) {
        onSearchClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSubmit) {
        onSubmit(e.currentTarget.value);
      }
    };

    return (
      <div
        className={cn(
          "h-11 w-full",
          className
        )}
        onClick={handleClick}
      >
        <div className={cn(
          "h-full px-3 rounded-lg border flex items-center gap-2",
          variant === 'filled'
            ? "bg-[#F5F5F5] border-[#E5E5E5]"
            : "bg-white border-[#E5E5E5]",
          "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        )}>
          <SearchIcon />
          <input
            ref={ref}
            type="search"
            className={cn(
              "flex-1 bg-transparent outline-none",
              "text-sm font-normal leading-5",
              "text-[#0A0A0A] placeholder:text-[#737373]",
              "[&::-webkit-search-cancel-button]:hidden"
            )}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            {...props}
          />
        </div>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export { SearchBar };