'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn, formatNumber } from '../../lib/utils';
import type { MockProperty } from '@/lib/mock-data'

export interface PropertyListItemProps {
  property: MockProperty;
  className?: string;
}

export const PropertyListItem: React.FC<PropertyListItemProps> = ({
  property,
  className,
}) => {
  const fullAddress = [property.address, property.city, property.state]
    .filter(Boolean)
    .join(', ');

  return (
    <Link
      href={`/property/${property.id}`}
      className={cn(
        'flex items-center gap-3 py-3 border-b border-[#E5E5E5] last:border-b-0',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Property Name */}
        <h3 className="text-sm font-semibold text-[#0A0A0A] leading-5 truncate">
          {property.name}
        </h3>

        {/* Address */}
        <div className="flex items-center gap-1 mt-0.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#737373] shrink-0"
          >
            <path
              d="M11.375 5.83334C11.375 9.91667 7 12.8333 7 12.8333C7 12.8333 2.625 9.91667 2.625 5.83334C2.625 4.67354 3.08594 3.56145 3.9064 2.74099C4.72686 1.92054 5.83897 1.45834 7 1.45834C8.16103 1.45834 9.27314 1.92054 10.0936 2.74099C10.9141 3.56145 11.375 4.67354 11.375 5.83334Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs font-medium text-[#737373] leading-4 truncate">
            {fullAddress}
          </span>
        </div>

        {/* Followers */}
        <div className="flex items-center gap-1 mt-0.5">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#737373] shrink-0"
          >
            <path
              d="M9.33333 12.25V11.0833C9.33333 10.4645 9.08795 9.87097 8.65099 9.43401C8.21403 8.99706 7.62051 8.75 7 8.75H2.91667C2.29783 8.75 1.70434 8.99706 1.26738 9.43401C0.830423 9.87097 0.583333 10.4645 0.583333 11.0833V12.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.95833 6.41667C6.24699 6.41667 7.29167 5.37199 7.29167 4.08333C7.29167 2.79467 6.24699 1.75 4.95833 1.75C3.66968 1.75 2.625 2.79467 2.625 4.08333C2.625 5.37199 3.66968 6.41667 4.95833 6.41667Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs font-medium text-[#737373] leading-4">
            {formatNumber(property.followers)} Followers
          </span>
        </div>
      </div>
    </Link>
  );
};
