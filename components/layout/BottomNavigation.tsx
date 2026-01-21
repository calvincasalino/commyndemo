'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.FC<{ className?: string; active?: boolean }>;
}

// Icon components matching Figma design (24x24)
const HomeIcon: React.FC<{ className?: string; active?: boolean }> = ({ className, active }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {active ? (
      // Filled home icon for active state
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V14H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
        fill="currentColor"
      />
    ) : (
      // Outline home icon for inactive state
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V14H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

const ExploreIcon: React.FC<{ className?: string; active?: boolean }> = ({ className, active }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="11"
      cy="11"
      r="7"
      stroke="currentColor"
      strokeWidth="1.5"
      fill={active ? 'currentColor' : 'none'}
    />
    <path
      d="M20 20L16.5 16.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const AccountIcon: React.FC<{ className?: string; active?: boolean }> = ({ className, active }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="12"
      cy="8"
      r="4"
      stroke="currentColor"
      strokeWidth="1.5"
      fill={active ? 'currentColor' : 'none'}
    />
    <path
      d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill={active ? 'currentColor' : 'none'}
    />
  </svg>
);

const navItems: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon,
  },
  {
    name: 'Explore',
    href: '/search',
    icon: ExploreIcon,
  },
  {
    name: 'Account',
    href: '/account',
    icon: AccountIcon,
  },
];

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white z-40">
      {/* Navigation content */}
      <div className="px-4 pt-2 pb-2">
        <div className="grid grid-cols-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center"
              >
                {/* 40x40 button container with 24x24 icon */}
                <div className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-full transition-colors',
                  isActive ? 'text-[#0276C1]' : 'text-[#737373]'
                )}>
                  <item.icon active={isActive} />
                </div>
                {/* Label text */}
                <span className={cn(
                  'text-xs font-medium mt-0',
                  isActive ? 'text-[#0276C1]' : 'text-[#737373]'
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
      {/* iOS Home indicator area */}
      <div className="h-[34px] flex items-center justify-center pb-2">
        <div className="w-[134px] h-[5px] bg-black rounded-full" />
      </div>
    </nav>
  );
};

// Mobile-only wrapper to hide on desktop
export const MobileBottomNavigation: React.FC = () => {
  return (
    <div className="md:hidden">
      <BottomNavigation />
    </div>
  );
};