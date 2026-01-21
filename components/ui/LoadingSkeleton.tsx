import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  lines?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  lines = 1,
}) => {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const animations = {
    pulse: 'animate-pulse',
    wave: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    none: '',
  };

  const defaultHeights = {
    text: 'h-4',
    circular: 'h-12 w-12',
    rectangular: 'h-32',
    rounded: 'h-32',
  };

  const renderSkeleton = () => (
    <div
      className={cn(
        'bg-gray-200',
        variants[variant],
        animations[animation],
        !height && defaultHeights[variant],
        className
      )}
      style={{
        width: width,
        height: height,
      }}
    />
  );

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'bg-gray-200',
              variants[variant],
              animations[animation],
              !height && defaultHeights[variant],
              className,
              index === lines - 1 && 'w-3/4' // Last line is shorter
            )}
            style={{
              width: index === lines - 1 ? '75%' : width,
              height: height,
            }}
          />
        ))}
      </div>
    );
  }

  return renderSkeleton();
};

// Preset skeleton components
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({ lines = 3, className }) => (
  <LoadingSkeleton variant="text" lines={lines} className={className} />
);

export const AvatarSkeleton: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  size = 'md',
  className
}) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <LoadingSkeleton
      variant="circular"
      className={cn(sizes[size], className)}
    />
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-3', className)}>
    <LoadingSkeleton variant="rounded" height={200} />
    <LoadingSkeleton variant="text" width="60%" />
    <LoadingSkeleton variant="text" lines={2} />
  </div>
);

export const PropertyCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-3', className)}>
    <LoadingSkeleton variant="rounded" height={160} />
    <div className="space-y-2">
      <LoadingSkeleton variant="text" width="70%" />
      <LoadingSkeleton variant="text" width="50%" height="h-3" />
      <div className="flex items-center gap-2">
        <AvatarSkeleton size="sm" />
        <LoadingSkeleton variant="text" width={60} height="h-3" />
      </div>
    </div>
  </div>
);

export const VideoCardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('relative', className)}>
    <LoadingSkeleton variant="rounded" className="aspect-[9/16]" />
    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
      <div className="flex items-center gap-2">
        <AvatarSkeleton size="sm" />
        <LoadingSkeleton variant="text" width={100} className="h-3" />
      </div>
      <LoadingSkeleton variant="text" width="80%" />
      <LoadingSkeleton variant="text" width="60%" className="h-3" />
    </div>
  </div>
);

export { LoadingSkeleton };