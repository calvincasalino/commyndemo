'use client';

import React, { useState, useCallback, useRef } from 'react';
import { cn, formatNumber } from '@/lib/utils';

export interface LikeButtonProps {
  videoId: string;
  initialLiked?: boolean;
  initialCount?: number;
  onLike?: (liked: boolean) => Promise<void> | void;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  videoId: _videoId,
  initialLiked = false,
  initialCount = 0,
  onLike,
  size = 'md',
  showCount = true,
  className,
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const handleLike = useCallback(async () => {
    if (isLoading) return;

    // Optimistic update
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : Math.max(0, prev - 1));
    setIsAnimating(true);

    // Reset animation
    setTimeout(() => setIsAnimating(false), 300);

    // Clear existing debounce
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounce API call
    debounceTimer.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        await onLike?.(newLikedState);
      } catch (error) {
        // Rollback on error
        console.error('Failed to update like:', error);
        setIsLiked(!newLikedState);
        setLikeCount(prev => !newLikedState ? prev + 1 : Math.max(0, prev - 1));
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }, [isLiked, isLoading, onLike]);

  return (
    <button
      onClick={handleLike}
      className={cn(
        'flex items-center gap-2 transition-transform active:scale-110',
        isAnimating && 'animate-heart',
        className
      )}
      disabled={isLoading}
    >
      <div className="relative">
        <svg
          className={cn(
            sizes[size],
            'transition-colors',
            isLiked ? 'text-red-500' : 'text-gray-600 hover:text-gray-800'
          )}
          fill={isLiked ? 'currentColor' : 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>

        {/* Particle effects on like */}
        {isAnimating && isLiked && (
          <>
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500 animate-ping">
              ❤️
            </span>
            <span className="absolute top-0 left-0 text-red-400 text-xs animate-bounce">
              +1
            </span>
          </>
        )}
      </div>

      {showCount && (
        <span className={cn(
          'font-medium transition-colors',
          isLiked ? 'text-red-500' : 'text-gray-600',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg'
        )}>
          {formatNumber(likeCount)}
        </span>
      )}
    </button>
  );
};

// Standalone animated like button for double-tap
export const AnimatedHeart: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none',
        className
      )}
    >
      <div className="relative">
        <svg
          className="w-24 h-24 text-white animate-heart"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <div className="absolute inset-0 bg-white/50 rounded-full blur-xl animate-ping" />
      </div>
    </div>
  );
};