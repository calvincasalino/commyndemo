'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// Note: Ensure these point to your actual file locations
import { cn, formatNumber } from '../../lib/utils';
import { Button } from '../ui/button';

export interface PropertyHeaderProps {
  property: {
    id: string;
    name: string;
    address: string;
    city?: string;
    state?: string;
    zipCode?: string;
    images: string[];
    followers: number;
    videoCount?: number;
    description?: string;
  };
  onAddVideo?: () => void;
  onMoreDetails?: () => void;
  className?: string;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  property,
  onAddVideo,
  onMoreDetails,
  className,
}) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fullAddress = [
    property.address,
    property.city,
    [property.state, property.zipCode].filter(Boolean).join(' ')
  ].filter(Boolean).join(', ');

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className={cn('bg-white', className)}>
      {/* Hero Image with Back Button Overlay */}
      <div className="relative h-60 bg-gray-100">
        {property.images && property.images.length > 0 ? (
          <>
            <Image
              src={property.images[currentImageIndex]}
              alt={`${property.name} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />

            {/* Back Button */}
            <button
              type="button"
              onClick={() => router.back()}
              onTouchEnd={() => router.back()}
              className="absolute top-12 left-4 w-10 h-10 bg-white rounded-[10px] shadow-sm flex items-center justify-center z-10 touch-manipulation"
              aria-label="Go back"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M12 19L5 12L12 5"
                  stroke="#0A0A0A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Carousel Dots */}
            {property.images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-1.5">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      index === currentImageIndex
                        ? 'w-6 bg-[#0A0A0A]'
                        : 'w-1.5 bg-[#0A0A0A]/40'
                    )}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Touch areas for navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-0 top-0 bottom-0 w-1/3 z-0"
                  aria-label="Previous image"
                />
                <button
                  onClick={nextImage}
                  className="absolute right-0 top-0 bottom-0 w-1/3 z-0"
                  aria-label="Next image"
                />
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Property Info */}
      <div className="px-4 py-4">
        <h1 className="text-xl font-semibold text-[#0A0A0A] leading-6">
          {property.name}
        </h1>

        {/* Address */}
        <div className="flex items-center gap-1 mt-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-[#737373] shrink-0"
          >
            <path
              d="M16.25 8.33334C16.25 14.1667 10 18.3333 10 18.3333C10 18.3333 3.75 14.1667 3.75 8.33334C3.75 6.67649 4.40848 5.08779 5.58058 3.9157C6.75268 2.7436 8.34138 2.08334 10 2.08334C11.6586 2.08334 13.2473 2.7436 14.4194 3.9157C15.5915 5.08779 16.25 6.67649 16.25 8.33334Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33334C12.5 6.95263 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95263 7.5 8.33334C7.5 9.71405 8.61929 10.8333 10 10.8333Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm font-medium text-[#737373] leading-5">
            {fullAddress}
          </p>
        </div>

        {/* Followers */}
        <div className="flex items-center gap-1 mt-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-[#737373] shrink-0"
          >
            <path
              d="M13.3333 17.5V15.8333C13.3333 14.9493 12.9821 14.1014 12.357 13.4763C11.7319 12.8512 10.884 12.5 10 12.5H4.16667C3.28261 12.5 2.43476 12.8512 1.80964 13.4763C1.18452 14.1014 0.833333 14.9493 0.833333 15.8333V17.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.08333 9.16667C8.92428 9.16667 10.4167 7.67428 10.4167 5.83333C10.4167 3.99238 8.92428 2.5 7.08333 2.5C5.24238 2.5 3.75 3.99238 3.75 5.83333C3.75 7.67428 5.24238 9.16667 7.08333 9.16667Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5 17.5V15.8333C17.4995 15.087 17.2644 14.3602 16.831 13.7564C16.3976 13.1527 15.7886 12.703 15.0917 12.4692"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.1667 2.55249C12.8674 2.78505 13.4799 3.23523 13.9161 3.8409C14.3522 4.44658 14.5887 5.17601 14.5887 5.92499C14.5887 6.67397 14.3522 7.40341 13.9161 8.00908C13.4799 8.61476 12.8674 9.06493 12.1667 9.29749"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm font-medium text-[#737373] leading-5">
            {formatNumber(property.followers)} Followers
          </p>
        </div>

        {/* --- THE SPACER --- */}
        {/* Using h-6 (24px) to FORCE the separation */}
        <div className="h-6 w-full" aria-hidden="true" />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={onAddVideo}
            variant="primary"
            className="flex-1"
            leftIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3333 5.83333L12.5 10L18.3333 14.1667V5.83333Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.8333 4.16667H3.33333C2.41286 4.16667 1.66667 4.91286 1.66667 5.83333V14.1667C1.66667 15.0871 2.41286 15.8333 3.33333 15.8333H10.8333C11.7538 15.8333 12.5 15.0871 12.5 14.1667V5.83333C12.5 4.91286 11.7538 4.16667 10.8333 4.16667Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Add video
          </Button>
          <Button
            onClick={onMoreDetails}
            variant="outline"
            className="flex-1"
            leftIcon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 5H17.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 10H17.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 15H10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            More details
          </Button>
        </div>
      </div>
    </div>
  );
};