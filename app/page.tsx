'use client';

import React from 'react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { Header } from '../components/layout/Header';
import { SectionHeader } from '../components/layout/SectionHeader';
import { PropertyCard } from '../components/property/PropertyCard';
import { BottomNav } from '../components/layout/BottomNav'; // Import the new Nav

// --- MOCK DATA ---
const NEAR_YOU_PROPERTIES = [
  {
    id: '1',
    name: 'Bezel Miami ',
    address: '650 NE 2nd Ave',
    city: 'Miami',
    state: 'FL',
    followers: 9200,
    image: 'https://images.myrazz.com/uc-image/LbwG8Dt4iA3nWn2Nh/-/format/webp/-/quality/lighter/-/resize/x1600/bezel_2-22_044.jpeg.webp',
  },
  {
    id: '2',
    name: 'Mountain Lofts',
    address: '123 Highland',
    city: 'Miami',
    state: 'FL',
    followers: 1800,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  },
];

const NEW_PROPERTIES = [
  {
    id: '3',
    name: 'Mount Coral',
    address: 'Coral Way',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80',
    followers: 500,
  },
  {
    id: '4',
    name: 'Lakeside Oasis',
    address: 'Lake Dr',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
    followers: 320,
  },
  {
    id: '5',
    name: 'Desert Villa',
    address: 'Sand St',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=400&q=80',
    followers: 150,
  },
];

const TRENDING_VIDEOS = [
  {
    id: '6',
    name: 'Penthouse Tour',
    address: 'Brickell',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
    followers: 12000,
  },
  {
    id: '7',
    name: 'Poolside Vibes',
    address: 'South Beach',
    // FIXED: Better image URL for pool
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=400&q=80',
    followers: 8500,
  },
  {
    id: '8',
    name: 'Modern Kitchen',
    address: 'Edgewater',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
    followers: 5400,
  },
];

// --- ICONS ---
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
);

const TrendingIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

export default function Home() {
  return (
    <MobileContainer>
      <Header />
      {/* Added pb-20 to ensure content isn't hidden behind BottomNav */}
      <main className="flex flex-col gap-8 pb-24 pt-4">
        
        {/* SECTION 1: NEAR YOU */}
        <section className="flex flex-col gap-3">
          <div className="px-4">
            <SectionHeader title="Near you" icon={MapPinIcon} viewMoreHref="/search?q=near-me" />
          </div>
          <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x hide-scrollbar">
            {NEAR_YOU_PROPERTIES.map((prop) => (
              <PropertyCard key={prop.id} property={prop} variant="near-you" />
            ))}
          </div>
        </section>

        {/* SECTION 2: NEWLY ADDED */}
        <section className="flex flex-col gap-3">
          <div className="px-4">
            <SectionHeader title="Newly added" icon={FileTextIcon} viewMoreHref="/search?sort=newest" />
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 pb-4 snap-x hide-scrollbar">
            {NEW_PROPERTIES.map((prop) => (
              <PropertyCard key={prop.id} property={prop} variant="newly-added" />
            ))}
          </div>
        </section>

        {/* SECTION 3: TRENDING VIDEOS */}
        <section className="flex flex-col gap-3">
          <div className="px-4">
            <SectionHeader title="Trending videos" icon={TrendingIcon} viewMoreHref="/search?sort=trending" />
          </div>
          <div className="flex overflow-x-auto gap-3 px-4 pb-4 snap-x hide-scrollbar">
            {TRENDING_VIDEOS.map((prop) => (
              <PropertyCard key={prop.id} property={prop} variant="trending-video" />
            ))}
          </div>
        </section>

      </main>
      <BottomNav />
    </MobileContainer>
  );
}