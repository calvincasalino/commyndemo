'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchBar } from '../ui/SearchBar';
import { cn } from '../../lib/utils';

export interface HeaderProps {
  showSearch?: boolean;
  showLogo?: boolean;
  title?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  showSearch = true,
  showLogo = true,
  title,
  className,
  onSearch,
}) => {
  return (
    <header className={cn('bg-white border-b border-gray-100', className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo or Title */}
          {showLogo ? (
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/assets/comyyn-logo.png"
                alt="Comyyn"
                width={180}
                height={48}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
          ) : title ? (
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          ) : (
            <div className="w-24" />
          )}

          {/* Search Bar (desktop) */}
          {showSearch && (
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <SearchBar
                placeholder="Search properties or areas..."
                onSearchClick={() => onSearch?.('')}
              />
            </div>
          )}

          {/* User actions (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <Link href="/account" className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="md:hidden pb-3">
            <SearchBar
              placeholder="Search"
              onSearchClick={() => onSearch?.('')}
              variant="filled"
            />
          </div>
        )}
      </div>
    </header>
  );
};

// Simplified mobile header
export const MobileHeader: React.FC<{
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}> = ({ title, showBack, onBack, rightAction }) => {
  return (
    <header className="bg-white border-b border-gray-100 md:hidden">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left action */}
        {showBack ? (
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/assets/comyyn-logo.png"
              alt="Comyyn"
              width={180}
              height={48}
              className="h-8 w-auto object-contain"
              priority
            />
          </Link>
        )}

        {/* Title */}
        {title && (
          <h1 className="flex-1 text-center text-lg font-semibold text-gray-900">
            {title}
          </h1>
        )}

        {/* Right action */}
        {rightAction || <div className="w-10" />}
      </div>
    </header>
  );
};