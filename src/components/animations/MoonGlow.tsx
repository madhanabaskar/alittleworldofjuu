import React from 'react';

interface MoonGlowProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const MoonGlow: React.FC<MoonGlowProps> = ({ 
  size = 'md', 
  className = '',
  showSubtitle = false
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36 md:w-44 md:h-44',
    lg: 'w-52 h-52 md:w-64 md:h-64',
    xl: 'w-64 h-64 md:w-80 md:h-80'
  };

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Outer ambient glow circles */}
      <div 
        className="absolute w-96 h-96 rounded-full pointer-events-none opacity-40 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(198, 165, 107, 0.35) 0%, rgba(117, 72, 91, 0.15) 50%, transparent 70%)'
        }}
      />
      
      {/* Secondary soft aura */}
      <div 
        className="absolute w-72 h-72 rounded-full pointer-events-none opacity-50 blur-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(245, 235, 221, 0.2) 0%, rgba(198, 165, 107, 0.1) 60%, transparent 80%)'
        }}
      />

      {/* Main celestial moon body */}
      <div className={`relative ${sizeClasses[size]} rounded-full transition-transform duration-700 hover:scale-105`}>
        {/* Moon spherical gradient */}
        <div 
          className="w-full h-full rounded-full shadow-[0_0_60px_rgba(198,165,107,0.35),inset_0_0_20px_rgba(245,235,221,0.6)] relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FBF8F3 0%, #F5EBDD 30%, #C6A56B 75%, #9E7D46 100%)'
          }}
        >
          {/* Subtle crater/mare texture simulation */}
          <div className="absolute top-4 left-6 w-10 h-8 rounded-full bg-[#B89457]/20 blur-xs" />
          <div className="absolute top-12 left-14 w-16 h-12 rounded-full bg-[#9E7D46]/25 blur-xs" />
          <div className="absolute bottom-8 right-8 w-14 h-10 rounded-full bg-[#9E7D46]/20 blur-xs" />
          <div className="absolute bottom-4 left-10 w-8 h-6 rounded-full bg-[#B89457]/30 blur-xs" />
          
          {/* Soft atmospheric rim lighting */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#101725]/40 via-transparent to-white/40" />
        </div>

        {/* Delicate orbit ring with subtle sparkle */}
        <div className="absolute -inset-4 rounded-full border border-[#C6A56B]/25 pointer-events-none animate-spin" style={{ animationDuration: '40s' }}>
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F5EBDD] shadow-[0_0_10px_#FFF]" />
        </div>
      </div>

      {showSubtitle && (
        <p className="mt-5 font-serif italic text-sm tracking-widest text-[#E0C79B]/80 text-center">
          illuminating every dark night
        </p>
      )}
    </div>
  );
};
