import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../../lib/utils'; // Removed formatNumber import

// Helper to format 9200 -> 9.2k locally
const formatCount = (num: number) => {
  if (!num) return '0';
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'K';
  }
  return num.toLocaleString();
};

export interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    address: string;
    city?: string;
    state?: string;
    image: string;
    followers: number;
    videoCount?: number;
    rentMin?: number;
    rentMax?: number;
    bedrooms?: string;
  };
  variant?: 'compact' | 'detailed' | 'list' | 'overlay' | 'figma' | 'near-you' | 'newly-added' | 'trending-video';
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  variant = 'compact',
  className,
}) => {
  
  // 1. NEAR YOU VARIANT
  if (variant === 'near-you') {
    return (
      <Link href={`/property/${property.id}`}>
        <div className={cn('w-[280px] bg-white rounded-[14px] shadow-sm border border-gray-200 p-3 flex flex-col gap-2 flex-shrink-0', className)}>
          <div className="relative h-[136px] w-full rounded-lg overflow-hidden bg-gray-100">
            <Image src={property.image} alt={property.name} fill className="object-cover" sizes="280px" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-gray-900 text-base font-semibold leading-snug truncate">{property.name}</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 text-gray-500">
                  <path d="M16.25 8.33334C16.25 14.1667 10 18.3333 10 18.3333C10 18.3333 3.75 14.1667 3.75 8.33334C3.75 6.67649 4.40848 5.08779 5.58058 3.9157C6.75268 2.7436 8.34138 2.08334 10 2.08334C11.6586 2.08334 13.2473 2.7436 14.4194 3.9157C15.5915 5.08779 16.25 6.67649 16.25 8.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33334C12.5 6.95263 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95263 7.5 8.33334C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-500 text-sm font-medium leading-5 truncate">
                  {property.address}, {property.city || 'Miami'}, FL
                </span>
              </div>
              <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 text-gray-500">
                  <path d="M13.3333 17.5V15.8333C13.3333 14.9493 12.9821 14.1014 12.357 13.4763C11.7319 12.8512 10.884 12.5 10 12.5H4.16667C3.28261 12.5 2.43476 12.8512 1.80964 13.4763C1.18452 14.1014 0.833333 14.9493 0.833333 15.8333V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.08333 9.16667C8.92428 9.16667 10.4167 7.67428 10.4167 5.83333C10.4167 3.99238 8.92428 2.5 7.08333 2.5C5.24238 2.5 3.75 3.99238 3.75 5.83333C3.75 7.67428 5.24238 9.16667 7.08333 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* FIXED: Using local formatter to guarantee render */}
                <span className="text-gray-500 text-sm font-medium leading-5">
                  {formatCount(property.followers)} Followers
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // 2. NEWLY ADDED VARIANT
  if (variant === 'newly-added') {
    return (
      <Link href={`/property/${property.id}`}>
        <div className={cn('w-[144px] aspect-square bg-white rounded-[14px] shadow-sm border border-gray-200 flex flex-col overflow-hidden flex-shrink-0', className)}>
          <div className="relative w-full h-[76%] bg-gray-100">
            <Image src={property.image} alt={property.name} fill className="object-cover" sizes="144px" />
          </div>
          <div className="flex-1 flex items-center px-2.5 bg-white">
            <span className="text-gray-900 text-sm font-semibold leading-snug truncate">{property.name}</span>
          </div>
        </div>
      </Link>
    );
  }

  // 3. TRENDING VIDEO VARIANT
  if (variant === 'trending-video') {
    return (
      <Link href={`/property/${property.id}`}>
        <div className={cn('w-[200px] h-[120px] relative rounded-[14px] overflow-hidden flex-shrink-0 shadow-sm', className)}>
          <Image src={property.image} alt={property.name} fill className="object-cover" sizes="200px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                 <path d="M5 3l14 9-14 9V3z" />
               </svg>
            </div>
          </div>
          <div className="absolute bottom-2 left-3 right-3">
             <span className="text-white text-sm font-semibold leading-snug truncate block">{property.name}</span>
          </div>
        </div>
      </Link>
    );
  }

  return <div className="p-4 text-red-500">Variant not supported</div>;
};