'use client';

import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6">
      <div className="relative flex items-center justify-center">
        {/* Glowing aura */}
        <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] blur-xl opacity-40 animate-pulse" />
        
        {/* Double spinning rings */}
        <div className="relative w-12 h-12 rounded-full border-t-2 border-r-2 border-[#3b82f6] animate-spin flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-b-2 border-l-2 border-[#8b5cf6] animate-spin duration-700" />
        </div>
        
        {/* Sparkling center icon */}
        <div className="absolute">
          <Sparkles className="w-4 h-4 text-[#8b5cf6] animate-pulse" />
        </div>
      </div>
      
      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] animate-pulse">
        Loading Page
      </p>
    </div>
  );
}
