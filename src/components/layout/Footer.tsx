import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <footer className="w-full bg-[#101725] border-t border-[#C6A56B]/20 pt-16 pb-28 lg:pb-16 relative overflow-hidden">
      {/* Soft background glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #C6A56B 0%, #75485B 50%, transparent 80%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left pb-12 border-b border-[#C6A56B]/15">
          {/* Col 1: Brand & Quote */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3">
              <span className="text-[#C6A56B] text-xl">🌙</span>
              <span className="font-cinzel text-lg tracking-[0.2em] font-semibold text-[#F5EBDD]">
                A LITTLE WORLD OF JUU
              </span>
            </div>
            <p className="font-serif italic text-sm text-[#F5EBDD]/70 max-w-sm mx-auto md:mx-0">
              "A little piece of Juu, always close to your heart."
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-sans tracking-wide text-[#F5EBDD]/70">
            <Link to="/home" className="hover:text-[#C6A56B] transition-colors">Home</Link>
            <Link to="/story" className="hover:text-[#C6A56B] transition-colors">Our Story</Link>
            <Link to="/memories" className="hover:text-[#C6A56B] transition-colors">Memories</Link>
            <Link to="/letters" className="hover:text-[#C6A56B] transition-colors">Letters</Link>
            <Link to="/voice" className="hover:text-[#C6A56B] transition-colors">Voice Notes</Link>
            <Link to="/promises" className="hover:text-[#C6A56B] transition-colors">Promises</Link>
            <Link to="/future" className="hover:text-[#C6A56B] transition-colors">Someday</Link>
            <Link to="/ending" className="hover:text-[#C6A56B] transition-colors">Until We Meet</Link>
          </div>

          {/* Col 3: Reassurance & Secret Admin Link */}
          <div className="flex flex-col items-center md:items-end justify-center">
            <Link
              to="/comfort"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-medium text-[#F5EBDD] bg-[#202C40]/80 border border-[#C6A56B]/30 hover:border-[#C6A56B] transition-all mb-3"
            >
              <Heart className="w-3.5 h-3.5 text-[#943F5B] fill-current" />
              <span>Whenever You Need Me</span>
            </Link>

            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 text-[11px] font-sans text-[#F5EBDD]/40 hover:text-[#C6A56B] transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Juu's Private Studio</span>
            </Link>
          </div>
        </div>

        {/* Bottom Credits & Emotional Anchor */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5EBDD]/50 font-sans gap-4">
          <p>
            Crafted with gentleness & devotion for <span className="text-[#C6A56B]">Laddu</span> by <span className="text-[#C6A56B]">Juu</span>.
          </p>
          <p className="font-serif italic text-xs text-[#F5EBDD]/60 text-center sm:text-right">
            19 September 2025 • Forever In Our Hearts
          </p>
        </div>
      </div>
    </footer>
  );
};
