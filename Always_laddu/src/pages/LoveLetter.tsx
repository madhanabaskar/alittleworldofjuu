import React, { useState } from 'react';
import { Heart, Feather, Bookmark, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionHeading } from '../components/ui/SectionHeading';
import { audioEngine } from '../services/audioService';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleOpen = () => {
    audioEngine.playChime('celestial');
    setIsOpen(true);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#C6A56B', '#F5EBDD', '#75485B']
    });
  };

  const handleSaveToHeart = () => {
    setIsSaved(true);
    audioEngine.playChime('warm');
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADING */}
      <SectionHeading
        badge="Section 11 • A Personal Keepsake"
        title="One Letter I Want You to Keep"
        subtitle="Not just for today, but for every tomorrow when doubts linger or when you need a reminder of what you mean to me."
      />

      {!isOpen ? (
        /* WAX SEALED ENVELOPE INTERACTION */
        <div className="flex flex-col items-center justify-center py-12">
          <div 
            onClick={handleOpen}
            className="group cursor-pointer w-full max-w-lg aspect-16/10 rounded-3xl glass-panel p-8 border border-[#C6A56B]/40 hover:border-[#C6A56B] transition-all duration-500 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden hover:scale-[1.02]"
          >
            {/* Ambient gold glow */}
            <div className="absolute inset-0 bg-radial-celestial opacity-60" />

            {/* Glowing Wax Seal Emblem */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-[#75485B] via-[#943F5B] to-[#C6A56B] border-2 border-[#F5EBDD] flex items-center justify-center shadow-[0_0_25px_rgba(198,165,107,0.5)] group-hover:scale-110 transition-transform">
              <Heart className="w-9 h-9 text-white fill-white" />
            </div>

            <h3 className="relative z-10 font-serif text-2xl text-[#F5EBDD] mt-6 mb-2">
              For My Laduuu's Eyes Only
            </h3>

            <p className="relative z-10 font-handwriting text-lg text-[#C6A56B]">
              Tap the seal to break and read Juu's letter
            </p>

            {/* Subtle flap fold lines */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C6A56B]/40 to-transparent" />
          </div>
        </div>
      ) : (
        /* FULL LETTER READING EXPERIENCE */
        <div className="glass-panel rounded-3xl p-6 sm:p-12 border border-[#C6A56B]/40 shadow-2xl relative overflow-hidden animate-scale-up">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#C6A56B]/20">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C6A56B]">
              <Feather className="w-4 h-4" />
              <span>Written with sincerity</span>
            </div>

            <button
              onClick={handleSaveToHeart}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans bg-[#202C40] hover:bg-[#C6A56B] hover:text-[#101725] text-[#F5EBDD] transition-colors border border-[#C6A56B]/30 touch-target"
            >
              {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Kept Close ❤️' : 'Keep In Heart'}</span>
            </button>
          </div>

          {/* Letter Body */}
          <div className="space-y-6 text-[#F5EBDD]/90 font-serif leading-relaxed text-base sm:text-lg font-light">
            <p className="font-serif text-2xl sm:text-3xl text-[#F5EBDD]">
              Dearest Laddu,
            </p>

            <p>
              I am writing this because in the rush of life, messages get swallowed by notifications, and words said in quick phone calls can fade away. I wanted you to have something lasting that you can return to whenever you wonder how much you mean to me.
            </p>

            <p>
              First and foremost: you are incredibly special. Not because of any role you play or what you do for anyone else, but because of your heart. The way you care, your stubborn determination, your vulnerability, and that quiet brilliance you carry into every room.
            </p>

            <p className="text-[#C6A56B] font-normal">
              I want you to know how proud I am of your efforts.
            </p>

            <p>
              Your education and your dreams are sacred to me. Never let anyone — including me on a difficult day — make you feel like your personal ambitions should take a backseat. I want to stand beside you cheering for every exam passed, every goal conquered, and every step of independence you earn.
            </p>

            <p>
              You deserve patience, kindness, and consistency. You do not need to hide your emotions or apologize for feeling deeply. When you are sad, you don’t have to force a smile. When you are upset, you don’t have to swallow your words out of fear of conflict.
            </p>

            <p>
              I know love is not proven by poetry written in the midnight hours; it is proven by how I treat you tomorrow morning, how I listen when we disagree, and how reliable my presence is when things get tough. I am committed to showing you that consistency through my actions.
            </p>

            <p>
              Thank you for being in my life, my Laduuu. Meeting you at that hospital was the greatest accident of my life.
            </p>

            <div className="pt-8 border-t border-[#C6A56B]/20 text-right space-y-1">
              <p className="font-handwriting text-3xl sm:text-4xl text-[#C6A56B]">
                Yours, Juu ❤️
              </p>
              <p className="font-sans text-xs text-[#F5EBDD]/50 italic">
                Always standing right behind you.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
