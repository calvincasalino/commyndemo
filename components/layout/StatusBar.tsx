'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export function StatusBar() {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours > 12 ? hours - 12 : hours || 12}:${minutes}`;
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-2 text-base-foreground h-11">
      {/* Time */}
      <div className="flex-1">
        <span className="text-[15px] font-semibold">{time}</span>
      </div>

      {/* Status Icons - Using Figma SVGs */}
      <div className="flex items-center gap-[5px]">
        <Image
          src="/icons/status-bar-status-cellular.svg"
          alt="Signal"
          width={17}
          height={11}
          className="inline-block"
        />
        <div className="w-[15px] h-[11px] flex items-center justify-center">
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2.99902C5.0147 2.99902 3 5.0137 3 7.49902C3 7.7752 2.7761 7.99902 2.5 7.99902C2.2239 7.99902 2 7.7752 2 7.49902C2 4.4615 4.4624 1.99902 7.5 1.99902C10.5376 1.99902 13 4.4615 13 7.49902C13 7.7752 12.7761 7.99902 12.5 7.99902C12.2239 7.99902 12 7.7752 12 7.49902C12 5.0137 9.9853 2.99902 7.5 2.99902ZM7.5 5.99902C6.6716 5.99902 6 6.6706 6 7.49902C6 7.7752 5.7761 7.99902 5.5 7.99902C5.2239 7.99902 5 7.7752 5 7.49902C5 6.1184 6.1193 4.99902 7.5 4.99902C8.8807 4.99902 10 6.1184 10 7.49902C10 7.7752 9.7761 7.99902 9.5 7.99902C9.2239 7.99902 9 7.7752 9 7.49902C9 6.6706 8.3284 5.99902 7.5 5.99902ZM8 7.49902C8 7.7752 7.7761 7.99902 7.5 7.99902C7.2239 7.99902 7 7.7752 7 7.49902C7 7.2229 7.2239 6.99902 7.5 6.99902C7.7761 6.99902 8 7.2229 8 7.49902ZM7.5 0.999023C4.7386 0.999023 2.5 3.2376 2.5 5.99902C2.5 6.2752 2.2761 6.49902 2 6.49902C1.7239 6.49902 1.5 6.2752 1.5 5.99902C1.5 2.6854 4.1863 -0.000977 7.5 -0.000977C10.8137 -0.000977 13.5 2.6854 13.5 5.99902C13.5 6.2752 13.2761 6.49902 13 6.49902C12.7239 6.49902 12.5 6.2752 12.5 5.99902C12.5 3.2376 10.2614 0.999023 7.5 0.999023Z" fill="currentColor"/>
          </svg>
        </div>
        <Image
          src="/icons/status-bar-status-battery-mini.svg"
          alt="Battery"
          width={25}
          height={12}
          className="inline-block"
        />
      </div>
    </div>
  );
}