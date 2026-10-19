import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark'; // 'light' means light text for dark backgrounds, 'dark' means dark text for white backgrounds
  layout?: 'horizontal' | 'stacked';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark', // default dark text on white background
  layout = 'horizontal',
  showSubtitle = false
}) => {
  const isLight = variant === 'light'; // Light text (on dark bg)

  // S Emblem SVG matching the user's uploaded logo exactly
  const renderEmblem = (emblemSizeClass: string) => (
    <div className={`relative flex items-center justify-center shrink-0 ${emblemSizeClass}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_10px_rgba(0,166,81,0.25)]"
      >
        <defs>
          {/* Top green ribbon gradients */}
          <linearGradient id="sunuGreenGrad1" x1="20" y1="50" x2="60" y2="10" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#00A651" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>

          <linearGradient id="sunuGreenGrad2" x1="30" y1="35" x2="70" y2="25" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="60%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>

          {/* Bottom dark ribbon gradients */}
          <linearGradient id="sunuDarkGrad" x1="30" y1="55" x2="70" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1C2E28" />
            <stop offset="50%" stopColor="#0F1F1A" />
            <stop offset="100%" stopColor="#06120E" />
          </linearGradient>
        </defs>

        {/* 4 Tech Pixel blocks floating to the top-right matching the uploaded image */}
        <rect x="67" y="14" width="7" height="7" rx="1.5" fill="#0B1613" />
        <rect x="76" y="14" width="7" height="7" rx="1.5" fill="#0B1613" />
        <rect x="76" y="23" width="7" height="7" rx="1.5" fill="#0B1613" />
        <rect x="85" y="6" width="7" height="7" rx="1.5" fill="#0B1613" />

        {/* Top Fold of the S (Emerald Ribbon) */}
        <path
          d="M26 40C26 26 36 12 56 12L66 12C62 20 54 28 42 32C32 35 28 38 26 40Z"
          fill="url(#sunuGreenGrad1)"
        />
        <path
          d="M26 40C30 38 40 34 52 30L68 24C60 38 48 48 38 52L26 40Z"
          fill="url(#sunuGreenGrad2)"
        />

        {/* Diagonal central connection of S */}
        <path
          d="M42 32L68 24L74 38L48 52L42 32Z"
          fill="#008C44"
          opacity="0.9"
        />

        {/* Bottom Fold of the S (Dark Charcoal Ribbon) */}
        <path
          d="M48 52L74 38C74 52 64 66 44 66L34 66C38 58 46 50 58 46L48 52Z"
          fill="url(#sunuDarkGrad)"
        />
        <path
          d="M74 38C70 42 60 48 44 66L34 66C26 66 22 72 26 78L60 78C74 78 80 64 74 38Z"
          fill="#0B1713"
        />
      </svg>
    </div>
  );

  // Stacked Layout (Emblem on Top, exactly like the uploaded image)
  if (layout === 'stacked') {
    const emblemSizes = {
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-24 h-24',
      xl: 'w-32 h-32',
    };

    const titleSizes = {
      sm: 'text-base',
      md: 'text-xl',
      lg: 'text-3xl',
      xl: 'text-4xl',
    };

    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {renderEmblem(emblemSizes[size])}
        
        {/* SUNU TECH */}
        <div className={`font-black tracking-wider uppercase mt-3 ${titleSizes[size]} ${isLight ? 'text-white' : 'text-[#0B1519]'}`}>
          SUNU TECH
        </div>

        {/* — GROUPE — with lines on both sides */}
        <div className="flex items-center justify-center gap-2 w-full max-w-[200px] my-1">
          <div className="h-[1.5px] flex-1 bg-[#00A651]" />
          <span className="text-[11px] sm:text-xs font-bold text-[#00A651] tracking-[0.35em] uppercase pl-1">
            GROUPE
          </span>
          <div className="h-[1.5px] flex-1 bg-[#00A651]" />
        </div>

        {/* Slogan */}
        {showSubtitle && (
          <p className={`text-[10px] sm:text-[11px] tracking-wider mt-1 font-medium ${isLight ? 'text-slate-300' : 'text-slate-600'}`}>
            Innovation • Technologie • Impact
          </p>
        )}
      </div>
    );
  }

  // Horizontal Layout (for navbar, headers)
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {renderEmblem(iconSizes[size])}

      <div className="flex flex-col leading-none">
        <span className={`font-black tracking-wider uppercase ${titleSizes[size]} ${isLight ? 'text-white' : 'text-[#0B1519]'}`}>
          SUNU TECH
        </span>
        
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="h-[1px] w-3 bg-[#00A651]" />
          <span className="text-[9px] sm:text-[10px] font-bold text-[#00A651] tracking-[0.25em] uppercase">
            GROUPE
          </span>
          <div className="h-[1px] w-3 bg-[#00A651]" />
        </div>

        {showSubtitle && (
          <span className={`text-[9px] tracking-wide mt-0.5 font-medium ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
            Innovation • Technologie • Impact
          </span>
        )}
      </div>
    </div>
  );
};
