import Link from 'next/link';

export const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white border-t border-gray-200 py-2 px-6 flex justify-between items-center z-50">
      
      {/* HOME TAB (Selected) */}
      <Link href="/" className="flex flex-col items-center gap-1 min-w-[64px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A0A0A" stroke="none">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span className="text-[10px] font-medium text-[#0A0A0A]">Home</span>
      </Link>

      {/* EXPLORE TAB */}
      <Link href="/explore" className="flex flex-col items-center gap-1 min-w-[64px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span className="text-[10px] font-medium text-gray-400">Explore</span>
      </Link>

      {/* ACCOUNT TAB */}
      <Link href="/account" className="flex flex-col items-center gap-1 min-w-[64px]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span className="text-[10px] font-medium text-gray-400">Account</span>
      </Link>
    </div>
  );
};