'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarGroup } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';

export interface CommunityVoicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVideo?: () => void;
  property: {
    id: string;
    name: string;
    image: string;
    description?: string;
  };
  contributors?: {
    avatarUrl?: string;
    name?: string;
  }[];
  contributorCount?: number;
  lastUpdated?: string;
  className?: string;
}

export const CommunityVoicesModal: React.FC<CommunityVoicesModalProps> = ({
  isOpen,
  onClose,
  onAddVideo,
  property,
  contributors = [],
  contributorCount = 128,
  lastUpdated = 'Sep 2025',
  className,
}) => {
  if (!isOpen) return null;

  // Default AI summary text for MVP (static placeholder)
  const aiSummary = property.description || `${property.name} offers modern design and resort-style amenities right on Ocean Drive. Residents love the light-filled apartments, sleek finishes, and shared spaces that feel like a boutique hotel. The building is praised for its pool, gym with ocean views, and welcoming common areas.

Reviews highlight cleanliness, security, and responsive management. People mention the walkable location and balance of energy and privacy. What stands out most is the sense of community. Friendly neighbors, curated events, and a relaxed yet modern Miami vibe.`;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col',
        className
      )}
    >
      {/* Blurred Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover blur-xl scale-110"
        />
        {/* Dark gradient overlay - matching Figma #002035 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,32,53,0.3)] to-[#002035]" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col px-4 pt-14 pb-8 overflow-y-auto">
        {/* Close Button - top right with glass morphism */}
        <button
          onClick={onClose}
          className="absolute top-12 right-4 w-10 h-10 backdrop-blur-md bg-[rgba(14,14,14,0.16)] border border-[rgba(255,255,255,0.2)] rounded-[14px] flex items-center justify-center z-10"
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
              stroke="#FAFAFA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Main Content - pushed down for visual balance */}
        <div className="flex-1 flex flex-col justify-center mt-20">
          {/* Title */}
          <h2 className="text-xl font-semibold text-[#FAFAFA] leading-6 mb-4">
            Community voices
          </h2>

          {/* Contributors Row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {/* Avatar Group */}
              <AvatarGroup max={3} size="sm" spacing="tight">
                {contributors.length > 0 ? (
                  contributors.slice(0, 3).map((contributor, index) => (
                    <Avatar
                      key={index}
                      src={contributor.avatarUrl}
                      name={contributor.name || `Contributor ${index + 1}`}
                      size="sm"
                    />
                  ))
                ) : (
                  // Default avatars if none provided
                  <>
                    <Avatar size="sm" name="User 1" />
                    <Avatar size="sm" name="User 2" />
                    <Avatar size="sm" name="User 3" />
                  </>
                )}
              </AvatarGroup>
              {/* Count badge */}
              <span className="text-sm font-medium text-[#FAFAFA]/80">
                +{contributorCount}
              </span>
            </div>
            {/* Updated timestamp */}
            <span className="text-sm font-medium text-[#FAFAFA]/60">
              Updated {lastUpdated}
            </span>
          </div>

          {/* AI Summary Text */}
          <div className="space-y-4">
            {aiSummary.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="text-base font-normal text-[#FAFAFA] leading-6"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Add Video CTA - Glass morphism style */}
        <div className="mt-8">
          <Button
            onClick={onAddVideo}
            variant="glass"
            fullWidth
            size="lg"
            className="rounded-[14px]"
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
            Add Video
          </Button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="relative h-[34px] flex items-center justify-center pb-2">
        <div className="w-[134px] h-[5px] bg-white rounded-full" />
      </div>
    </div>
  );
};
