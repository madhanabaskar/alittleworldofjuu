import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, Disc, Sparkles, Minus } from 'lucide-react';
import { useMusic } from '../../context/MusicContext';

export const FloatingMusicPlayer: React.FC = () => {
  const location = useLocation();
  const {
    currentTrack,
    isPlaying,
    isMuted,
    volume,
    trackAvailable,
    isVoicePlaying,
    togglePlay,
    toggleMute,
    setVolume,
  } = useMusic();

  // On mobile (< 640px), default to mini-orb so content is NEVER hidden!
  const [isMiniOrb, setIsMiniOrb] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMiniOrb(false);
      } else {
        setIsMiniOrb(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Collapse if clicked outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (window.innerWidth < 640 && !isMiniOrb) {
          setIsMiniOrb(true);
          setIsExpanded(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMiniOrb]);

  // Do not show on Secret Entrance screen
  if (location.pathname === '/') return null;

  return (
    <aside 
      ref={containerRef}
      aria-label="Celestial Background Music Player"
      className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 select-none animate-fade-in"
    >
      {/* 1. MINI-ORB MODE (Default on mobile, never blocks any text or buttons!) */}
      {isMiniOrb ? (
        <button
          onClick={() => {
            setIsMiniOrb(false);
            setIsExpanded(true);
          }}
          className={`relative group w-11 h-11 rounded-full bg-[#182338]/95 backdrop-blur-xl border border-[#C6A56B]/40 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95 transition-all touch-target ${
            isPlaying ? 'ring-2 ring-[#C6A56B]/40 shadow-[0_0_16px_rgba(198,165,107,0.35)]' : 'hover:border-[#C6A56B]'
          }`}
          title={`Music: ${currentTrack.title} (Tap to open player)`}
          aria-label={`Open music player: currently ${isPlaying ? 'playing' : 'paused'} ${currentTrack.title}`}
        >
          {/* Spinning disc icon */}
          <div className={`${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
            <Disc className="w-5 h-5 text-[#C6A56B]" />
          </div>

          {/* Glowing pulse dot when playing */}
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A56B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C6A56B]"></span>
            </span>
          )}
        </button>
      ) : (
        /* 2. EXPANDED / CARD MODE */
        <div 
          className={`glass-panel border border-[#C6A56B]/30 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 overflow-hidden ${
            isExpanded ? 'w-72 sm:w-80 p-4' : 'w-auto px-3 py-2'
          }`}
        >
          {/* Minimized bar header */}
          <div className="flex items-center gap-2.5">
            {/* Animated vinyl / orbit icon */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-left focus:outline-none group touch-target"
              aria-expanded={isExpanded}
              aria-label="Toggle music player details"
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-tr from-[#182338] to-[#202C40] border border-[#C6A56B]/40 flex items-center justify-center shrink-0 shadow-sm ${
                isPlaying ? 'animate-spin' : ''
              }`} style={{ animationDuration: '6s' }}>
                <Disc className="w-4 h-4 text-[#C6A56B]" />
              </div>

              {!isExpanded && (
                <div className="flex flex-col pr-1 max-w-[120px] sm:max-w-[160px]">
                  <span className="text-[11px] font-serif text-[#F5EBDD] font-medium truncate">
                    {currentTrack.title}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] text-[#C6A56B]">
                    <span>{currentTrack.subtitle}</span>
                    {!trackAvailable && (
                      <span className="text-[#F5EBDD]/40 italic">(Slot Ready)</span>
                    )}
                  </div>
                </div>
              )}
            </button>

            {/* Equalizer animation bars */}
            <div className="flex items-end gap-0.5 h-3.5 px-1 shrink-0" aria-hidden="true">
              {[0.8, 0.4, 1, 0.6].map((factor, i) => (
                <span
                  key={i}
                  className={`w-0.5 rounded-full transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-[#C6A56B] animate-pulse' 
                      : 'bg-[#C6A56B]/30 h-1'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(4, factor * 14)}px` : '4px',
                    animationDelay: `${i * 150}ms`
                  }}
                />
              ))}
            </div>

            {/* Quick Play/Pause button */}
            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-[#C6A56B] hover:bg-[#E0C79B] text-[#101725] flex items-center justify-center shadow-md active:scale-90 transition-transform shrink-0 touch-target"
              aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            {/* Minimize to Mini-Orb button (closes back into small circle so text is never blocked) */}
            <button
              onClick={() => {
                setIsMiniOrb(true);
                setIsExpanded(false);
              }}
              className="p-1 rounded-lg text-[#F5EBDD]/60 hover:text-[#C6A56B] hover:bg-[#202C40] transition-colors touch-target"
              title="Minimize to mini-orb"
              aria-label="Minimize music player to corner disc"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* EXPANDED VIEW CONTROLS */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-[#C6A56B]/20 space-y-3 animate-fade-in">
              {/* Track Info */}
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#C6A56B] mb-0.5">
                  <span className="uppercase tracking-wider">Active Track Slot</span>
                  <span className="bg-[#101725] px-2 py-0.5 rounded-full border border-[#C6A56B]/20">
                    {currentTrack.slot.toUpperCase()}
                  </span>
                </div>
                <h4 className="font-serif text-sm text-[#F5EBDD] font-medium leading-snug">
                  {currentTrack.title}
                </h4>
                <p className="text-[11px] font-sans text-[#F5EBDD]/70 font-light">
                  {currentTrack.subtitle}
                </p>
              </div>

              {/* Audio Ducking Indicator */}
              {isVoicePlaying && (
                <div className="px-2.5 py-1 rounded-lg bg-[#75485B]/40 border border-[#75485B] text-[10px] text-[#F5EBDD] flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="w-3 h-3 text-[#C6A56B]" />
                  <span>Voice Note Playing — Music Gently Lowered</span>
                </div>
              )}

              {/* Volume & Mute Controls */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg text-[#F5EBDD]/70 hover:text-[#C6A56B] hover:bg-[#202C40] transition-colors touch-target"
                  aria-label={isMuted ? 'Unmute music' : 'Mute music'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-[#C6A56B]" />}
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[#101725] rounded-lg appearance-none cursor-pointer accent-[#C6A56B] focus:outline-none"
                  aria-label="Music volume slider"
                />

                <span className="text-[10px] font-mono text-[#F5EBDD]/60 w-7 text-right">
                  {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#F5EBDD]/40 font-sans italic pt-1">
                <span>Theme changes as you explore</span>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-[#C6A56B] hover:underline"
                >
                  Collapse
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
