import React from 'react';

// Simplified container without the "StatusBar" or fake header
export const MobileContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col max-w-[480px] mx-auto shadow-2xl relative">
      {children}
    </div>
  );
};