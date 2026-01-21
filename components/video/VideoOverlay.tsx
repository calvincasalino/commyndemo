'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn, formatNumber } from '@/lib/utils';

export interface VideoOverlayProps {
  propertyName: string;
  propertyId: string;
  username: string;
  userAvatar?: string;
  likeCount: number;
  isLiked?: boolean;
  onLike?: () => void;
  onAddVideo?: () => void;
  onBack?: () => void;
  className?: string;
}

export const VideoOverlay: React.FC<VideoOverlayProps> = ({
  propertyName,
  propertyId,
  username,
  userAvatar,
  likeCount,
  isLiked = false,
  onLike,
  onAddVideo,
  onBack,
  className,
}) => {
  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)}>
      {/* Back Button - Top Left */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-10 h-10 flex items-center justify-center pointer-events-auto z-10"
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
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Right Side Actions - Avatar and Like */}
      <div className="absolute right-4 bottom-36 flex flex-col items-center gap-4 pointer-events-auto">
        {/* User Avatar with ring */}
        <Link href={`/user/${username}`} className="relative">
          <div className="w-12 h-12 rounded-full ring-2 ring-white overflow-hidden bg-gray-300">
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={username}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white font-semibold text-lg">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </Link>

        {/* Like Button */}
        <button
          onClick={onLike}
          className="flex flex-col items-center gap-1 text-white"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill={isLiked ? '#EF4444' : 'none'}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.0667 5.23332C23.2478 4.41383 22.2745 3.76459 21.2025 3.32274C20.1305 2.88089 18.9807 2.6549 17.8192 2.6575C16.6576 2.66009 15.5089 2.8911 14.4389 3.33764C13.3689 3.78418 12.3986 4.43765 11.5833 5.26082L10.5 6.34415L9.41667 5.26082C7.7684 3.61254 5.52751 2.6887 3.19251 2.6887C0.857509 2.6887 -1.3834 3.61254 -3.03167 5.26082C-4.67995 6.90909 -5.60379 9.14998 -5.60379 11.485C-5.60379 13.82 -4.67995 16.0609 -3.03167 17.7092L10.5 31.2408L24.0317 17.7092C24.855 16.8942 25.5087 15.9241 25.9556 14.8542C26.4024 13.7844 26.6337 12.6356 26.6365 11.4741C26.6393 10.3126 26.4135 9.16266 25.9719 8.09066C25.5303 7.01866 24.8813 6.04527 24.0617 5.22665L24.0667 5.23332Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(4, 0) scale(0.85)"
            />
          </svg>
          <span className="text-xs font-medium text-white">
            {formatNumber(likeCount)}
          </span>
        </button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        {/* Property Info - Bottom Left */}
        <div className="mb-3 pointer-events-auto">
          {/* Property Name with Building Icon */}
          <Link
            href={`/property/${propertyId}`}
            className="flex items-center gap-2 mb-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M10.8333 17.5V10.8333H9.16667V17.5M2.5 7.5L10 1.66667L17.5 7.5V16.6667C17.5 17.1087 17.3244 17.5326 17.0118 17.8452C16.6993 18.1577 16.2754 18.3333 15.8333 18.3333H4.16667C3.72464 18.3333 3.30072 18.1577 2.98816 17.8452C2.67559 17.5326 2.5 17.1087 2.5 16.6667V7.5Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-base font-semibold text-white">
              {propertyName}
            </span>
          </Link>

          {/* Username */}
          <span className="text-sm text-white/80">@{username}</span>
        </div>

        {/* Add Video Button - Glass morphism */}
        {onAddVideo && (
          <button
            onClick={onAddVideo}
            className="w-full py-3 px-4 backdrop-blur-md bg-[rgba(14,14,14,0.16)] border border-[rgba(255,255,255,0.2)] text-white font-medium rounded-[14px] flex items-center justify-center gap-2 pointer-events-auto"
          >
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
            Add video
          </button>
        )}
      </div>
    </div>
  );
};
