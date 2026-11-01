import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, KeyRound, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';
import { MoonGlow } from '../components/animations/MoonGlow';
import { audioEngine } from '../services/audioService';
import { useMusic } from '../context/MusicContext';

export const Entrance: React.FC = () => {
  const navigate = useNavigate();
  const { enterWorld } = useMusic();
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Please enter the secret key.');
      return;
    }

    const res = authService.unlockEntrance(passcode);
    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }

    // Passcode is verified! Call enterWorld to start audio and transition
    enterWorld();
    setIsEntering(true);
    audioEngine.playChime('celestial');

    setTimeout(() => {
      navigate('/home');
    }, 400);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 overflow-hidden bg-[#101725]">
      {/* Soft background ambient gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(198, 165, 107, 0.15) 0%, rgba(117, 72, 91, 0.08) 45%, transparent 70%)'
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto text-center flex flex-col items-center">
        {/* Glowing Celestial Moon */}
        <div className="mb-6 transform transition-transform duration-700 hover:scale-105">
          <MoonGlow size="md" />
        </div>

        {/* Brand Titles */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-sans tracking-widest uppercase font-medium bg-[#182338]/90 border border-[#C6A56B]/30 text-[#C6A56B] mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A Private Memory Universe</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-semibold tracking-[0.18em] text-[#F5EBDD] mb-3 leading-tight">
          A LITTLE WORLD OF JUU
        </h1>

        <p className="font-handwriting text-xl sm:text-2xl text-[#C6A56B] mb-6">
          A little world, made just for you.
        </p>

        {/* Poetic Welcome Quote */}
        <div className="relative px-6 py-4 glass-panel rounded-2xl mb-8 border border-[#C6A56B]/20 max-w-sm">
          <p className="font-serif italic text-sm sm:text-base text-[#F5EBDD]/85 leading-relaxed">
            "Some places are not found on maps.<br />
            They are found in the hearts of two people."
          </p>
        </div>

        {/* Secret Entrance Form */}
        <form onSubmit={handleEnter} className="w-full space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#C6A56B]">
              <KeyRound className="w-4 h-4" />
            </div>

            <input
              type={showPassword ? 'text' : 'password'}
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Enter secret key..."
              className="w-full pl-11 pr-12 py-3.5 rounded-full bg-[#182338]/80 text-[#F5EBDD] placeholder-[#F5EBDD]/40 text-sm font-sans border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B] focus:ring-2 focus:ring-[#C6A56B]/30 transition-all touch-target"
              autoComplete="off"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#F5EBDD]/50 hover:text-[#C6A56B] transition-colors touch-target cursor-pointer"
              aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-300 font-sans animate-fade-in">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isEntering}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C6A56B] via-[#E0C79B] to-[#C6A56B] text-[#101725] font-sans font-semibold text-sm tracking-widest uppercase shadow-[0_4px_20px_rgba(198,165,107,0.4)] hover:shadow-[0_6px_28px_rgba(198,165,107,0.6)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 touch-target cursor-pointer"
          >
            <span>{isEntering ? 'Opening Our Little World...' : 'Enter Our Universe'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};
