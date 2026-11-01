import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 md:mb-14 ${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-sans tracking-widest uppercase font-medium bg-[#182338]/80 border border-[#C6A56B]/30 text-[#C6A56B] mb-3 shadow-sm ${isCenter ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A56B] animate-pulse" />
          <span>{badge}</span>
        </div>
      )}
      
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal text-[#F5EBDD] tracking-wide leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className={`mt-3 text-sm sm:text-base text-[#F5EBDD]/70 font-sans max-w-2xl font-light leading-relaxed ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}

      {/* Decorative Golden Star Divider */}
      <div className={`mt-5 flex items-center gap-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C6A56B]/40" />
        <span className="text-[#C6A56B] text-xs opacity-75">✦</span>
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C6A56B]/40" />
      </div>
    </div>
  );
};
