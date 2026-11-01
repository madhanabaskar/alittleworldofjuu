import React from 'react';
import { audioEngine } from '../../services/audioService';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'glass' | 'wine' | 'ghost' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
  withChime?: boolean;
  chimeType?: 'warm' | 'celestial' | 'celebrate';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  withChime = true,
  chimeType = 'warm',
  icon,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (withChime) {
      audioEngine.playChime(chimeType);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const baseClasses = 'inline-flex items-center justify-center font-sans font-medium transition-all duration-300 rounded-full select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C6A56B]/50 active:scale-95 disabled:opacity-50 disabled:pointer-events-none touch-target';

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 min-h-[40px] gap-2 tracking-wider uppercase',
    md: 'text-sm px-6 py-3 min-h-[48px] gap-2.5 tracking-wider uppercase font-semibold',
    lg: 'text-base px-8 py-4 min-h-[54px] gap-3 tracking-widest uppercase font-semibold'
  };

  const variantClasses = {
    gold: 'bg-gradient-to-r from-[#C6A56B] via-[#E0C79B] to-[#C6A56B] text-[#101725] shadow-[0_4px_20px_rgba(198,165,107,0.35)] hover:shadow-[0_6px_28px_rgba(198,165,107,0.55)] hover:brightness-105 border border-[#F5EBDD]/40',
    glass: 'bg-[#182338]/70 backdrop-blur-md text-[#F5EBDD] border border-[#C6A56B]/30 hover:border-[#C6A56B]/70 hover:bg-[#202C40]/80 shadow-[0_4px_16px_rgba(0,0,0,0.4)]',
    wine: 'bg-gradient-to-r from-[#75485B] to-[#4A2737] text-[#F5EBDD] border border-[#C6A56B]/30 shadow-[0_4px_20px_rgba(117,72,91,0.4)] hover:brightness-110',
    ghost: 'bg-transparent text-[#F5EBDD]/80 hover:text-[#F5EBDD] hover:bg-[#182338]/50 border border-transparent hover:border-[#C6A56B]/20',
    emergency: 'bg-gradient-to-r from-[#75485B] via-[#943F5B] to-[#75485B] text-white shadow-[0_0_25px_rgba(148,63,91,0.6)] hover:shadow-[0_0_35px_rgba(198,165,107,0.7)] border border-[#C6A56B]/60 hover:scale-[1.02] animate-pulse-glow'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
