'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn, formatNumber } from '@/lib/utils';
import { GALLERY_ITEMS } from '@/lib/assets';

export interface GalleryItem {
  id: string;
  thumbnailUrl: string;
  type: 'video' | 'image';
  duration?: number; // seconds for videos
}

export interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload?: (selectedItems: string[]) => void;
  property: {
    id: string;
    name: string;
    address: string;
    city?: string;
    state?: string;
    image: string;
    followers: number;
  };
  galleryItems?: GalleryItem[];
  className?: string;
}

// Mock gallery items using exported Figma assets
const mockGalleryItems: GalleryItem[] = GALLERY_ITEMS.flatMap((url, i) => [
  {
    id: `gallery-${i * 2 + 1}`,
    thumbnailUrl: url,
    type: 'video' as const,
    duration: 15 + (i * 8),
  },
  {
    id: `gallery-${i * 2 + 2}`,
    thumbnailUrl: url,
    type: 'image' as const,
  },
]);

export const AddVideoModal: React.FC<AddVideoModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  property,
  galleryItems = mockGalleryItems,
  className,
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const handleUpload = async () => {
    if (selectedItems.length === 0) return;

    setIsUploading(true);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (onUpload) {
      onUpload(selectedItems);
    }

    setIsUploading(false);
    setSelectedItems([]);
    onClose();
  };

  const fullAddress = [
    property.address,
    property.city || 'Miami',
    property.state || 'FL',
  ].filter(Boolean).join(', ');

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col bg-white',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-14 pb-4">
        <button
          onClick={onClose}
          className="p-1"
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-base font-semibold text-[#0A0A0A] leading-6">
          Add video
        </h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4">
        {/* Section Title */}
        <h2 className="text-sm font-semibold text-[#0A0A0A] leading-5 mb-3">
          Select from your gallery
        </h2>

        {/* Gallery Grid - 4 columns */}
        <div className="grid grid-cols-4 gap-1 mb-6">
          {galleryItems.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="relative aspect-square bg-gray-100 rounded-md overflow-hidden"
              >
                <Image
                  src={item.thumbnailUrl}
                  alt="Gallery item"
                  fill
                  className="object-cover"
                />

                {/* Video Duration Badge */}
                {item.type === 'video' && item.duration && (
                  <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1 rounded">
                    {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
                  </div>
                )}

                {/* Selection Checkmark */}
                {isSelected && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-[#0276C1] rounded-full flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 3L4.5 8.5L2 6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                {/* Selection Border */}
                {isSelected && (
                  <div className="absolute inset-0 border-2 border-[#0276C1] rounded-md" />
                )}
              </button>
            );
          })}
        </div>

        {/* Building Card */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-[#0A0A0A] leading-5 mb-2">
            Building you&apos;re reviewing
          </h3>

          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#E5E5E5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
            {/* Property Thumbnail */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <Image
                src={property.image}
                alt={property.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Property Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-[#0A0A0A] leading-5 truncate">
                {property.name}
              </h4>

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
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <div className="px-4 pb-4">
        <Button
          onClick={handleUpload}
          variant="primary"
          fullWidth
          size="lg"
          disabled={selectedItems.length === 0}
          loading={isUploading}
          leftIcon={
            !isUploading ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6667 12.5V15.8333C16.6667 16.2754 16.4911 16.6993 16.1785 17.0118C15.866 17.3244 15.442 17.5 15 17.5H5C4.55797 17.5 4.13405 17.3244 3.82149 17.0118C3.50893 16.6993 3.33333 16.2754 3.33333 15.8333V12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.3333 6.66667L10 3.33334L6.66667 6.66667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 3.33334V12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : undefined
          }
        >
          {isUploading ? 'Uploading' : 'Upload video'}
        </Button>
      </div>

      {/* Home Indicator */}
      <div className="h-[34px] flex items-center justify-center pb-2">
        <div className="w-[134px] h-[5px] bg-black rounded-full" />
      </div>
    </div>
  );
};
