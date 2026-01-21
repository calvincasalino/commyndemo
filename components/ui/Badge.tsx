import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-700',
        primary: 'bg-dwelloo-light text-dwelloo-primary',
        secondary: 'bg-purple-100 text-purple-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        danger: 'bg-red-100 text-red-700',
        outline: 'border border-gray-300 text-gray-700',
      },
      size: {
        xs: 'px-2 py-0.5 text-xxs',
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({
    className,
    variant,
    size,
    leftIcon,
    rightIcon,
    removable = false,
    onRemove,
    children,
    ...props
  }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
        {removable && (
          <button
            onClick={onRemove}
            className="ml-1 -mr-1 hover:text-gray-900 transition-colors"
            aria-label="Remove"
          >
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Notification Badge (for counts)
export interface NotificationBadgeProps {
  count: number;
  max?: number;
  dot?: boolean;
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'gray';
  className?: string;
  children?: React.ReactNode;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  max = 99,
  dot = false,
  color = 'red',
  className,
  children,
}) => {
  const colors = {
    red: 'bg-red-500 text-white',
    blue: 'bg-dwelloo-primary text-white',
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    gray: 'bg-gray-500 text-white',
  };

  const displayCount = count > max ? `${max}+` : count.toString();

  if (!count && !dot) {
    return <>{children}</>;
  }

  return (
    <div className="relative inline-flex">
      {children}
      {dot ? (
        <span
          className={cn(
            'absolute -top-1 -right-1 h-2 w-2 rounded-full',
            colors[color],
            className
          )}
        />
      ) : (
        <span
          className={cn(
            'absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-xxs font-semibold px-1',
            colors[color],
            className
          )}
        >
          {displayCount}
        </span>
      )}
    </div>
  );
};

// Tag Badge (for categories/labels)
export const TagBadge: React.FC<BadgeProps> = ({ children, ...props }) => (
  <Badge variant="outline" size="sm" {...props}>
    # {children}
  </Badge>
);

// Status Badge (for online/offline status)
export interface StatusBadgeProps {
  status: 'online' | 'offline' | 'away' | 'busy';
  text?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text, className }) => {
  const statusConfig = {
    online: { color: 'success' as const, defaultText: 'Online' },
    offline: { color: 'default' as const, defaultText: 'Offline' },
    away: { color: 'warning' as const, defaultText: 'Away' },
    busy: { color: 'danger' as const, defaultText: 'Busy' },
  };

  const { color, defaultText } = statusConfig[status];

  return (
    <Badge
      variant={color}
      size="sm"
      leftIcon={
        <span className={cn('h-2 w-2 rounded-full', {
          'bg-green-500': status === 'online',
          'bg-gray-500': status === 'offline',
          'bg-yellow-500': status === 'away',
          'bg-red-500': status === 'busy',
        })} />
      }
      className={className}
    >
      {text || defaultText}
    </Badge>
  );
};

export { Badge, badgeVariants };