'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn, formatNumber } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export interface VideoCardProps {
  video: {
    id: string;
    thumbnailUrl: string;
    duration: number; // in seconds
    likeCount: number;
    viewCount: number;
    user?: {
      username: string;
      avatarUrl?: string;
    };
    property?: {
      id: string;
      name: string;
      address?: string;
    };
  };
  variant?: 'vertical' | 'horizontal' | 'grid' | 'compact' | 'trending';
  showStats?: boolean;
  className?: string;
  onClick?: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  variant = 'vertical',
  showStats = true,
  className,
  onClick,
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Trending variant - responsive design based on Figma specs (92x142px at 375px viewport)
  // Uses CSS custom property for fluid width, aspect ratio for proportional height
  if (variant === 'trending') {
    return (
      <Link
        href={`/video/${video.id}`}
        onClick={onClick}
        className={cn('block', className)}
      >
        <div
          className="w-[var(--card-trending-width)] rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] relative overflow-hidden"
          style={{ aspectRatio: '92/142' }}
        >
          {/* Video Thumbnail Background */}
          <Image
            src={video.thumbnailUrl}
            alt="Video thumbnail"
            fill
            className="object-cover"
          />

          {/* Bottom gradient scrim - 48px height, 60% opacity */}
          <div className="absolute bottom-0 left-0 right-0 h-[48px]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent opacity-60" />

            {/* Like count - positioned at bottom left */}
            <div className="absolute left-2 bottom-2 flex items-center gap-0.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 4.125C10.5 2.67525 9.32475 1.5 7.875 1.5C6.8385 1.5 5.94975 2.10225 5.5755 2.9655C5.2005 2.10225 4.31175 1.5 3.27525 1.5C1.82475 1.5 0.75 2.67525 0.75 4.125C0.75 7.5 5.5755 10.5 5.5755 10.5C5.5755 10.5 10.5 7.5 10.5 4.125Z"
                  stroke="white"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[10px] font-medium text-white leading-3">
                {formatNumber(video.likeCount)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid variant - for backwards compatibility
  if (variant === 'grid') {
    return (
      <Link
        href={`/video/${video.id}`}
        onClick={onClick}
        className={cn('block', className)}
      >
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          {/* Thumbnail */}
          <div className="relative aspect-[9/16] bg-gray-100">
            <Image
              src={video.thumbnailUrl}
              alt="Video thumbnail"
              fill
              className="object-cover rounded-lg"
            />

            {/* Gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-lg" />

            {/* Duration badge - top right */}
            <div className="absolute top-1.5 right-1.5 bg-black/60 text-white text-[9px] px-1 py-0.5 rounded">
              {formatDuration(video.duration)}
            </div>

            {/* Stats at bottom */}
            {showStats && (
              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between">
                {/* Like count */}
                <div className="flex items-center gap-0.5 text-white">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  <span className="text-[9px] font-medium">{formatNumber(video.likeCount)}</span>
                </div>

                {/* View count */}
                <div className="flex items-center gap-0.5 text-white">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[9px] font-medium">{formatNumber(video.viewCount)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/video/${video.id}`}
        onClick={onClick}
        className={cn(
          'flex gap-3 group cursor-pointer',
          className
        )}
      >
        {/* Thumbnail */}
        <div className="relative w-32 aspect-16/9 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={video.thumbnailUrl}
            alt="Video thumbnail"
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
          <Badge
            variant="default"
            size="xs"
            className="absolute bottom-2 right-2 bg-black/60 text-white"
          >
            {formatDuration(video.duration)}
          </Badge>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {video.property && (
            <h3 className="font-semibold text-gray-900 truncate">
              {video.property.name}
            </h3>
          )}
          {video.user && (
            <p className="text-sm text-gray-500 truncate">
              @{video.user.username}
            </p>
          )}
          {showStats && (
            <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                {formatNumber(video.likeCount)}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {formatNumber(video.viewCount)}
              </span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Vertical variant (default)
  return (
    <Link
      href={`/video/${video.id}`}
      onClick={onClick}
      className={cn(
        'block group cursor-pointer',
        className
      )}
    >
      <div className="relative aspect-9/16 bg-gray-100 rounded-xl overflow-hidden">
        <Image
          src={video.thumbnailUrl}
          alt="Video thumbnail"
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Duration badge */}
        <Badge
          variant="default"
          size="xs"
          className="absolute top-2 right-2 bg-black/60 text-white"
        >
          {formatDuration(video.duration)}
        </Badge>

        {/* Stats overlay */}
        {showStats && (
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            {/* Property name */}
            {video.property && (
              <p className="font-semibold text-sm truncate mb-1">
                {video.property.name}
              </p>
            )}

            {/* User */}
            {video.user && (
              <p className="text-xs text-white/80 truncate mb-2">
                @{video.user.username}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                {formatNumber(video.likeCount)}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                {formatNumber(video.viewCount)}
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

// Mini video card for grids
export const MiniVideoCard: React.FC<{
  video: VideoCardProps['video'];
  className?: string;
}> = ({ video, className }) => {
  return (
    <Link
      href={`/video/${video.id}`}
      className={cn('block relative group', className)}
    >
      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
        <Image
          src={video.thumbnailUrl}
          alt="Video thumbnail"
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
          {formatNumber(video.likeCount)}
        </div>
      </div>
    </Link>
  );
};