'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { VideoOverlay } from './VideoOverlay';
import { cn } from '@/lib/utils';
import type { MockVideo } from '@/lib/mock-data';

export interface VideoFeedProps {
  videos: MockVideo[];
  initialVideoId?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({
  videos,
  initialVideoId,
  onLoadMore,
  hasMore = false,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialVideoId) {
      const index = videos.findIndex(v => v.id === initialVideoId);
      return index >= 0 ? index : 0;
    }
    return 0;
  });

  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    videos.forEach(v => {
      counts[v.id] = v.likeCount;
    });
    return counts;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  const handleLike = useCallback((videoId: string) => {
    setLikedVideos(prev => {
      const isLiked = !prev[videoId];
      setLikeCounts(counts => ({
        ...counts,
        [videoId]: isLiked
          ? (counts[videoId] || 0) + 1
          : Math.max(0, (counts[videoId] || 0) - 1)
      }));
      return { ...prev, [videoId]: isLiked };
    });
  }, []);

  const _handleShare = useCallback((video: MockVideo) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this video of ${video.property?.name}`,
        text: `Video by @${video.user.username}`,
        url: `/video/${video.id}`,
      }).catch(() => {
        // User cancelled or share failed
      });
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/video/${video.id}`);
      alert('Link copied to clipboard!');
    }
  }, []);

  const _handleReport = useCallback((_videoId: string) => {
    // TODO: Show report modal
    // Will open a modal to report inappropriate content
  }, []);

  const handleAddVideo = useCallback((_propertyId: string) => {
    // TODO: Navigate to upload flow for this property
    // Will redirect to video upload with property pre-selected
  }, []);

  const goToNext = useCallback(() => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);

      // Load more when approaching end
      if (currentIndex === videos.length - 3 && hasMore && onLoadMore) {
        onLoadMore();
      }
    }
  }, [currentIndex, videos.length, hasMore, onLoadMore]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  // Touch/swipe handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    currentY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const diff = startY.current - currentY.current;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        goToNext(); // Swipe up
      } else {
        goToPrevious(); // Swipe down
      }
    }
  }, [goToNext, goToPrevious]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNext, goToPrevious]);

  const currentVideo = videos[currentIndex];

  if (!currentVideo) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full bg-black overflow-hidden', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Container */}
      <div
        className="relative w-full h-full transition-transform duration-300"
        style={{
          transform: `translateY(${-currentIndex * 100}%)`,
        }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="absolute w-full h-full"
            style={{
              top: `${index * 100}%`,
            }}
          >
            {/* Only render videos near current index for performance */}
            {Math.abs(index - currentIndex) <= 1 && (
              <>
                <VideoPlayer
                  videoId={video.id}
                  videoUrl={video.videoUrl}
                  thumbnailUrl={video.thumbnailUrl}
                  onDoubleTap={() => handleLike(video.id)}
                  autoplay={index === currentIndex}
                />

                <VideoOverlay
                  propertyName={video.property?.name || 'Unknown Property'}
                  propertyId={video.propertyId}
                  username={video.user.username}
                  userAvatar={video.user.avatarUrl}
                  likeCount={likeCounts[video.id] || 0}
                  isLiked={likedVideos[video.id] || false}
                  onLike={() => handleLike(video.id)}
                  onAddVideo={() => handleAddVideo(video.propertyId)}
                />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'w-1 transition-all duration-300',
              index === currentIndex
                ? 'h-6 bg-white'
                : 'h-1 bg-white/30'
            )}
            aria-label={`Go to video ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};