'use client';

import React from 'react';
// Relative imports
import { MobileContainer } from '../../../components/layout/MobileContainer';
import { PropertyHeader } from '../../../components/property/PropertyHeader';
import { PropertyVideoGrid } from '../../../components/property/PropertyVideoGrid';
import { BottomNav } from '../../../components/layout/BottomNav';

// --- MOCK DATA FOR HEADER ---
const PROPERTY_DATA = {
  id: '1',
  name: 'Bezel Miami',
  address: '650 NE 2nd Ave',
  city: 'Miami',
  state: 'FL',
  zipCode: '33132',
  followers: 9240,
  images: [
    'https://images.myrazz.com/uc-image/prccDemxDYv74atd7/-/format/webp/-/quality/lighter/-/resize/x1200/-/scale_crop/640x640/center/bezel_2-22_048.jpeg.webp',
    'https://images.myrazz.com/uc-image/42H2cRvSErDq2BcKG/-/format/webp/-/quality/lighter/-/resize/x1200/-/scale_crop/640x640/center/bezel_2-22_091.jpeg.webp',
    'https://images.myrazz.com/uc-image/pyt85hLzmt2HGPsfb/-/format/webp/-/quality/lighter/-/resize/x1200/-/scale_crop/640x640/center/bezel_2-22_030.jpeg.webp',
  ],
};

// --- MOCK DATA FOR GRID ---
const PROPERTY_VIDEOS = [
  // HERO BLOCK (Items 1-5)
  {
    id: 'v1',
    thumbnailUrl: '/thumbnails/bezel-1-thumb.png',
    videoUrl: '/videos/bezel-1.mp4',
    likeCount: 15400,
    user: { username: 'sarah_condo' },
  },
  {
    id: 'v2',
    thumbnailUrl: '/thumbnails/bezel-2-thumb.png',
    videoUrl: '/videos/bezel-2.mp4',
    likeCount: 8200,
    user: { username: 'miami_living' },
  },
  {
    id: 'v3',
    thumbnailUrl: '/thumbnails/bezel-3-thumb.png',
    videoUrl: '/videos/bezel-3.mp4',
    likeCount: 3200, 
    user: { username: 'dave_realtor' },
  },
  {
    id: 'v4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80',
    likeCount: 4100,
    user: { username: 'jenna_b' },
  },
  {
    id: 'v5',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&q=80',
    likeCount: 2900,
    user: { username: 'urban_explorer' },
  },
  
  // ROW 2 (Items 6-9)
  {
    id: 'v6',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512918760513-95f65dd83100?w=400&q=80',
    likeCount: 1200,
    user: { username: 'first_time_buyer' },
  },
  {
    id: 'v7',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80',
    likeCount: 850,
    user: { username: 'miami_heat' },
  },
  {
    id: 'v8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=80',
    likeCount: 4300,
    user: { username: 'luxury_listings' },
  },
  {
    id: 'v9',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80',
    likeCount: 670,
    user: { username: 'apt_hunter' },
  },

  // ROW 3 (Items 10-13)
  {
    id: 'v10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
    likeCount: 11000,
    user: { username: 'design_daily' },
  },
  {
    id: 'v11',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
    likeCount: 540,
    user: { username: 'renter_life' },
  },
  {
    id: 'v12',
    thumbnailUrl: 'https://images.unsplash.com/photo-1572331165267-854da2dc72af?w=400&q=80',
    likeCount: 890,
    user: { username: 'pool_vibes' },
  },
  {
    id: 'v13',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80',
    likeCount: 2100,
    user: { username: 'kitchen_envy' },
  },
  
  // START OF ROW 4 (Item 14)
  {
    id: 'v14',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80',
    likeCount: 320,
    user: { username: 'moving_in' },
  },
];

export default function PropertyPage() {
  return (
    <MobileContainer>
      <main className="pb-24 bg-white min-h-screen">
        {/* HEADER */}
        <PropertyHeader 
          property={PROPERTY_DATA}
          onAddVideo={() => console.log('Add video clicked')}
          onMoreDetails={() => console.log('Details clicked')}
        />
        
        {/* DIVIDER */}
        <div className="h-2 bg-gray-50 border-t border-b border-gray-100" />

        {/* VIDEO GRID SECTION */}
        {/* CHANGED: pt-8 -> pt-4 (Reduced gap between divider and content) */}
        <div className="pt-4">
          {/* CHANGED: mb-6 -> mb-4 (Better spacing for text to grid) */}
          <h2 className="px-4 text-lg font-semibold mb-4 text-gray-900">Community Videos</h2>
          <PropertyVideoGrid 
            videos={PROPERTY_VIDEOS} 
            propertyId={PROPERTY_DATA.id}
          />
        </div>
      </main>
      
      <BottomNav />
    </MobileContainer>
  );
}