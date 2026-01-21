import React, { forwardRef } from 'react';
import Image from 'next/image';
import { cn, getInitials } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({
    src,
    alt = '',
    name = '',
    size = 'md',
    shape = 'circle',
    status,
    className,
    ...props
  }, ref) => {
    const sizes = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
    };

    const statusSizes = {
      xs: 'h-1.5 w-1.5 border',
      sm: 'h-2 w-2 border',
      md: 'h-2.5 w-2.5 border-2',
      lg: 'h-3 w-3 border-2',
      xl: 'h-4 w-4 border-2',
    };

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
    };

    const shapes = {
      circle: 'rounded-full',
      square: 'rounded-xl',
    };

    const initials = getInitials(name);

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden bg-gray-200 font-medium text-gray-600',
          sizes[size],
          shapes[shape],
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || name}
            fill
            className="object-cover"
            sizes={`(max-width: 768px) ${size === 'xs' ? '24px' : size === 'sm' ? '32px' : size === 'md' ? '40px' : size === 'lg' ? '48px' : '64px'}`}
          />
        ) : (
          <span className="select-none">{initials}</span>
        )}

        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 block rounded-full border-white',
              statusSizes[size],
              statusColors[status]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'tight' | 'normal' | 'loose';
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 4, size = 'md', spacing = 'normal', className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = childrenArray.length - visibleChildren.length;

    const spacings = {
      tight: '-space-x-2',
      normal: '-space-x-3',
      loose: '-space-x-1',
    };

    const sizes = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center', spacings[spacing], className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="relative z-0 hover:z-10 transition-all">
            {React.isValidElement(child) &&
              React.cloneElement(child as React.ReactElement<AvatarProps>, {
                size,
                className: cn('ring-2 ring-white', (child as React.ReactElement<AvatarProps>).props.className),
              })
            }
          </div>
        ))}

        {remainingCount > 0 && (
          <div
            className={cn(
              'relative z-0 inline-flex items-center justify-center rounded-full bg-gray-200 ring-2 ring-white font-medium text-gray-600',
              sizes[size]
            )}
          >
            <span>+{remainingCount}</span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar };