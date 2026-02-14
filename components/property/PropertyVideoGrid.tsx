'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn, formatNumber } from '../../lib/utils';
import { Button } from '../ui/button';
import { Modal } from '../ui/Modal';

// Define the interface locally so we don't need an external file
export interface MockVideo {
  id: string;
  thumbnailUrl: string;
  videoUrl?: string;
  likeCount: number;
  user: {
    username: string;
    avatarUrl?: string;
  };
}

export interface PropertyVideoGridProps {
  videos: MockVideo[];
  propertyId: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  className?: string;
}

// Determine tile size based on like count (dynamic sizing per Figma)
type TileSize = 'small' | 'medium' | 'large';

const getTileSize = (likeCount: number, index: number, maxLikes: number): TileSize => {
  // First featured video (highest engagement) gets large tile
  if (index === 0 && likeCount > maxLikes * 0.7) return 'large';
  // Top 30% engagement gets medium
  if (likeCount > maxLikes * 0.5) return 'medium';
  // Default small tile
  return 'small';
};

export const PropertyVideoGrid: React.FC<PropertyVideoGridProps> = ({
  videos,
  propertyId,
  onLoadMore,
  hasMore = false,
  loading = false,
  className,
}) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [activeVideo, setActiveVideo] = useState<MockVideo | null>(null);

  const handleImageError = useCallback((videoId: string) => {
    setImageErrors(prev => ({ ...prev, [videoId]: true }));
  }, []);

  const handleOpenVideo = useCallback((video: MockVideo) => {
    if (video.videoUrl) {
      setActiveVideo(video);
    }
  }, []);

  const handleCloseVideo = useCallback(() => {
    setActiveVideo(null);
  }, []);

  const maxLikes = useMemo(() => {
    return Math.max(...videos.map(v => v.likeCount), 1);
  }, [videos]);

  if (videos.length === 0) {
    return <PropertyEmptyState propertyId={propertyId} />;
  }

  return (
    <div className={cn('px-4 pb-20', className)}>
      {/* 4-Column Masonry Grid - matching Figma design */}
      <div className="grid grid-cols-4 gap-1 auto-rows-[80px]">
        {videos.map((video, index) => {
          const tileSize = getTileSize(video.likeCount, index, maxLikes);
          const isPlayable = Boolean(video.videoUrl);
          // Determine grid span based on tile size
          const spanClasses = {
            small: 'col-span-1 row-span-1',
            medium: 'col-span-1 row-span-2',
            large: 'col-span-2 row-span-2',
          };
          const tileContent = (
            <>
              {/* Thumbnail */}
              {!imageErrors[video.id] ? (
                <Image
                  src={video.thumbnailUrl}
                  alt={`Video by ${video.user.username}`}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(video.id)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <svg className="w-8 h-8 text-gray-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Gradient Overlay - always visible at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Like Count - bottom left */}
              <div className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="white"
                  className="drop-shadow-sm"
                >
                  <path d="M6 10.5L1.76 6.26a3 3 0 014.24-4.24L6 2.5l.48-.48a3 3 0 014.24 4.24L6 10.5z" />
                </svg>
                <span className="text-[10px] font-medium text-white leading-3 drop-shadow-sm">
                  {formatNumber(video.likeCount)}
                </span>
              </div>
            </>
          );

          if (isPlayable) {
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => handleOpenVideo(video)}
                onPointerUp={() => handleOpenVideo(video)}
                className={cn(
                  'relative bg-gray-100 rounded-lg overflow-hidden group text-left',
                  spanClasses[tileSize]
                )}
                aria-label={`Play video by ${video.user.username}`}
              >
                {tileContent}
              </button>
            );
          }

          return (
            <div
              key={video.id}
              className={cn(
                'relative bg-gray-100 rounded-lg overflow-hidden group',
                spanClasses[tileSize]
              )}
            >
              {tileContent}
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={Boolean(activeVideo)}
        onClose={handleCloseVideo}
        size="lg"
        className="max-w-[420px]"
        closeOnOverlayClick={false}
      >
        <div className="w-full aspect-[9/16] bg-black rounded-xl overflow-hidden">
          <video
            key={activeVideo?.videoUrl}
            src={activeVideo?.videoUrl}
            className="h-full w-full"
            controls
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster={activeVideo?.thumbnailUrl}
          />
        </div>
      </Modal>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={onLoadMore}
            variant="outline"
            disabled={loading}
            className="min-w-[200px]"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading...
              </>
            ) : (
              'Load more videos'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

// Empty State Component
interface PropertyEmptyStateProps {
  propertyId: string;
  className?: string;
}

export const PropertyEmptyState: React.FC<PropertyEmptyStateProps> = ({
  propertyId: _propertyId,
  className,
}) => {
  return (
    <div className={cn('px-4 py-16 flex flex-col items-center justify-center', className)}>
      {/* Icon */}
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No videos yet
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 text-center max-w-[280px] mb-6">
        Be the first to share your experience living here
      </p>

      {/* CTA Button */}
      <Button
        variant="primary"
        size="lg"
        leftIcon={
          <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 4v16m8-8H4" />
          </svg>
        }
      >
        Add the first video
      </Button>
    </div>
  );
};