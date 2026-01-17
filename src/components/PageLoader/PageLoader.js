import React from 'react';
import { useLoading } from '../../context/LoadingContext';

const PageLoader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/10 dark:bg-gray-900/30 backdrop-blur-2xl z-[9999] flex items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        {/* Elegant orbit loader */}
        <div className="relative w-40 h-40">
          {/* Outer spinning ring - slowest */}
          <div 
            className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-purple-500/60 border-r-purple-500/40"
            style={{ 
              animation: 'spin 4s linear infinite',
            }}
          ></div>
          
          {/* Middle spinning ring - medium */}
          <div 
            className="absolute inset-3 rounded-full border-[3px] border-transparent border-t-blue-500/70 border-r-blue-500/50"
            style={{ 
              animation: 'spin 3s linear infinite reverse',
            }}
          ></div>
          
          {/* Inner spinning ring - fastest */}
          <div 
            className="absolute inset-6 rounded-full border-[3px] border-transparent border-t-primary-400/80 border-r-primary-400/60"
            style={{ 
              animation: 'spin 2s linear infinite',
            }}
          ></div>
          
          {/* Center logo with pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse">
              <svg viewBox="0 0 50 50" className="w-12 h-12 text-white/90">
                <circle cx="25" cy="25" r="8" fill="currentColor" opacity="0.25" />
                <circle cx="25" cy="25" r="3" fill="currentColor" />
                <path
                  d="M25 10 L25 15 M25 35 L25 40 M10 25 L15 25 M35 25 L40 25"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Loading text with animated dots */}
        <div className="flex items-center gap-1 text-white/90 text-xl font-medium tracking-wide">
          <span>Loading</span>
          <span className="flex gap-1.5 ml-0.5">
            <span 
              className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce"
              style={{ animationDelay: '0s', animationDuration: '1s' }}
            ></span>
            <span 
              className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s', animationDuration: '1s' }}
            ></span>
            <span 
              className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce"
              style={{ animationDelay: '0.4s', animationDuration: '1s' }}
            ></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
