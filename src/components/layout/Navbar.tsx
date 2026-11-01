import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '../../context/MusicContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { isPlaying, togglePlay, currentTrack, trackAvailable } = useMusic();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/story', label: 'Our Story' },
    { to: '/memories', label: 'Memories' },
    { to: '/voice', label: 'Hear My Voice' },
    { to: '/promises', label: 'Promises' },
    { to: '/future', label: 'Someday' },
  ];

  const moreLinks = [
    { to: '/gallery', label: 'Pure Photo Gallery 📷' },
    { to: '/letters', label: 'Open When Letters' },
    { to: '/letter', label: 'A Letter For You' },
    { to: '/about-juu', label: 'Little Things About Juu' },
    { to: '/ending', label: 'Until We Meet Again' },
    { to: '/admin', label: "Juu's Admin Studio" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Don't show full navbar on secret entrance screen
  if (location.pathname === '/') return null;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#101725]/85 backdrop-blur-xl border-b border-[#C6A56B]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link 
          to="/home" 
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="A Little World of Juu Home"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#182338] to-[#202C40] border border-[#C6A56B]/40 flex items-center justify-center shadow-[0_0_15px_rgba(198,165,107,0.25)] group-hover:scale-105 transition-transform">
            <span className="text-[#C6A56B] text-lg">🌙</span>
          </div>
          <div>
            <span className="font-cinzel text-sm sm:text-base tracking-[0.2em] font-semibold text-[#F5EBDD] block leading-none">
              A LITTLE WORLD OF JUU
            </span>
            <span className="font-handwriting text-xs text-[#C6A56B] block mt-1 tracking-wider">
              Whenever You Need Me ❤️
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5" aria-label="Main Navigation">
          {navLinks.map(link => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-sans tracking-wide transition-all ${
                  active 
                    ? 'bg-[#C6A56B]/15 text-[#C6A56B] border border-[#C6A56B]/40 font-medium shadow-[0_0_12px_rgba(198,165,107,0.2)]' 
                    : 'text-[#F5EBDD]/70 hover:text-[#F5EBDD] hover:bg-[#182338]/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-sans tracking-wide text-[#F5EBDD]/70 hover:text-[#F5EBDD] hover:bg-[#182338]/60 flex items-center gap-1"
              aria-expanded={isMoreOpen}
            >
              <span>More</span>
              <span className="text-[10px] text-[#C6A56B]">▾</span>
            </button>

            {isMoreOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0B101B] p-2.5 shadow-[0_16px_50px_rgba(0,0,0,0.95)] border border-[#C6A56B]/40 animate-fade-in z-50"
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                {moreLinks.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMoreOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans text-[#F5EBDD]/90 hover:text-[#C6A56B] hover:bg-[#182338] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls: Background Music & Desktop Comfort Button */}
        <div className="flex items-center gap-3">
          {/* Background Music Toggle */}
          <button
            onClick={togglePlay}
            className={`p-2.5 rounded-full transition-all border touch-target flex items-center gap-1.5 ${
              isPlaying
                ? 'bg-[#C6A56B]/20 border-[#C6A56B] text-[#C6A56B] shadow-[0_0_12px_rgba(198,165,107,0.4)] animate-pulse'
                : 'bg-[#182338]/70 border-[#C6A56B]/20 text-[#F5EBDD]/60 hover:text-[#F5EBDD]'
            }`}
            title={isPlaying ? `Pause background theme (${currentTrack.title})` : `Play background theme (${currentTrack.title})`}
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          >
            {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden xl:inline text-[11px] font-sans">
              {isPlaying ? currentTrack.title : (trackAvailable ? 'Music' : 'Music (Slot Ready)')}
            </span>
          </button>

          {/* Desktop Only: I NEED JUU button (Hidden on mobile to keep mobile header clean and spacious) */}
          <Link
            to="/comfort"
            className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-semibold tracking-wide text-white bg-gradient-to-r from-[#75485B] via-[#943F5B] to-[#75485B] border border-[#C6A56B]/60 shadow-[0_0_16px_rgba(148,63,91,0.5)] hover:shadow-[0_0_24px_rgba(198,165,107,0.6)] hover:scale-[1.02] active:scale-95 transition-all touch-target"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-[#F5EBDD] animate-ping" />
            <span>I NEED JUU ❤️</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
