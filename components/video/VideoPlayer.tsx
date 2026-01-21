'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  videoId: string;
  autoplay?: boolean;
  muted?: boolean;
  onViewComplete?: () => void;
  onWatchDuration?: (duration: number) => void;
  onDoubleTap?: () => void;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  thumbnailUrl,
  videoId: _videoId,
  autoplay = false,
  muted = true,
  onViewComplete,
  onWatchDuration,
  onDoubleTap,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<number>(0);
  const watchTimeRef = useRef<number>(0);
  const watchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [_volume, setVolume] = useState(muted ? 0 : 1);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);

  // Auto-hide controls
  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying, showControls]);

  // Track watch duration
  useEffect(() => {
    if (isPlaying) {
      watchIntervalRef.current = setInterval(() => {
        watchTimeRef.current += 1;
        onWatchDuration?.(watchTimeRef.current);
      }, 1000);
    } else {
      if (watchIntervalRef.current) {
        clearInterval(watchIntervalRef.current);
      }
    }

    return () => {
      if (watchIntervalRef.current) {
        clearInterval(watchIntervalRef.current);
      }
    };
  }, [isPlaying, onWatchDuration]);

  // Intersection Observer for autoplay
  useEffect(() => {
    if (!autoplay || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            videoRef.current?.play();
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [autoplay]);

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleTap = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const currentTime = Date.now();
    const tapDelay = currentTime - lastTapRef.current;

    if (tapDelay < 300 && tapDelay > 0) {
      // Double tap detected
      onDoubleTap?.();

      // Show heart animation
      const heart = document.createElement('div');
      heart.className = 'absolute text-white text-6xl animate-heart pointer-events-none';
      heart.innerHTML = '❤️';
      heart.style.left = '50%';
      heart.style.top = '50%';
      heart.style.transform = 'translate(-50%, -50%)';
      containerRef.current?.appendChild(heart);

      setTimeout(() => heart.remove(), 1000);
    } else {
      // Single tap - play/pause
      setTimeout(() => {
        if (Date.now() - currentTime > 250) {
          handlePlayPause();
          setShowControls(true);
        }
      }, 300);
    }

    lastTapRef.current = currentTime;
  }, [handlePlayPause, onDoubleTap]);

  const handleProgress = useCallback(() => {
    if (!videoRef.current) return;

    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);

    // Check if video completed (>90% watched)
    if (progress > 90 && !hasEnded) {
      setHasEnded(true);
      onViewComplete?.();
    }
  }, [hasEnded, onViewComplete]);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * videoRef.current.duration;

    videoRef.current.currentTime = newTime;
    setProgress(percentage * 100);
  }, []);

  const handleVolumeToggle = useCallback(() => {
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.volume = 1;
      setVolume(1);
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  }, [isMuted]);

  const handleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if ((containerRef.current as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen) {
          await (containerRef.current as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as unknown as { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen) {
          await (document as unknown as { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  }, [isFullscreen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative bg-black overflow-hidden',
        isFullscreen ? 'fixed inset-0 z-50' : 'aspect-9/16',
        className
      )}
      onClick={handleTap}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnailUrl}
        className="w-full h-full object-cover"
        playsInline
        muted={isMuted}
        loop
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          setIsLoading(false);
        }}
        onTimeUpdate={handleProgress}
        onEnded={() => setHasEnded(true)}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Controls Overlay */}
      {showControls && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none">
          {/* Play/Pause Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPause();
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full pointer-events-auto"
          >
            {isPlaying ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
            {/* Progress Bar */}
            <div
              ref={progressRef}
              className="relative h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="absolute top-0 left-0 h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
                style={{ left: `${progress}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Volume */}
                <button onClick={handleVolumeToggle} className="p-2">
                  {isMuted ? (
                    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>

                {/* Fullscreen */}
                <button onClick={handleFullscreen} className="p-2">
                  <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};