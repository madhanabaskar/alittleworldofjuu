import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Mail, Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Letter } from '../types';
import { memoryService } from '../services/memoryService';
import { SectionHeading } from '../components/ui/SectionHeading';
import { audioEngine } from '../services/audioService';

export const OpenWhen: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>(() => memoryService.getLettersSync());
  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);
  const [openedLetters, setOpenedLetters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    memoryService.getLetters().then(data => setLetters(data));
  }, []);

  // Lock body scroll and prevent background jumping when modal is open
  useEffect(() => {
    if (activeLetter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeLetter]);

  const handleOpenLetter = (letter: Letter) => {
    audioEngine.playChime('celestial');
    setActiveLetter(letter);
    setOpenedLetters(prev => ({ ...prev, [letter.id]: true }));

    // Confetti celebration if "achieve something"
    if (letter.slug.includes('achieve')) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#C6A56B', '#F5EBDD', '#75485B']
      });
    }
  };

  return (
    <div className="py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADING */}
      <SectionHeading
        badge="Section 05 • Open When Envelopes"
        title="Letters for Every Little Feeling"
        subtitle="For every mood, every late-night worry, every victory, and every tear. Open the envelope that speaks to how you feel right this second."
      />

      {/* ENVELOPES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {letters.map((letter, index) => {
          const isOpened = openedLetters[letter.id];

          return (
            <div
              key={letter.id}
              onClick={() => handleOpenLetter(letter)}
              className="group relative cursor-pointer glass-card rounded-2xl p-6 border border-[#C6A56B]/25 hover:border-[#C6A56B]/70 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
            >
              {/* Envelope flap visual design */}
              <div className="relative mb-6">
                <div className="w-full h-32 rounded-xl bg-gradient-to-tr from-[#182338] via-[#202C40] to-[#101725] border border-[#C6A56B]/30 flex flex-col items-center justify-center relative overflow-hidden shadow-inner group-hover:shadow-[0_0_20px_rgba(198,165,107,0.25)] transition-shadow">
                  {/* Wax Seal / Heart Icon */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#75485B] to-[#943F5B] border border-[#C6A56B]/50 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-[#F5EBDD] fill-current" />
                  </div>
                  
                  {/* Delicate string / seal line */}
                  <div className="absolute inset-x-0 top-1/2 h-px bg-[#C6A56B]/20" />
                </div>

                {/* Status indicator */}
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-mono text-[#C6A56B] bg-[#101725]/90 px-2 py-0.5 rounded-full border border-[#C6A56B]/20">
                    Letter {index + 1}
                  </span>
                </div>
              </div>

              {/* Title & Trigger Feeling */}
              <div className="flex-1">
                <div className="text-xs font-sans tracking-wide text-[#C6A56B] uppercase font-medium mb-1">
                  {letter.triggerFeeling}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F5EBDD] group-hover:text-[#C6A56B] transition-colors mb-2">
                  {letter.title}
                </h3>
                <p className="font-sans text-xs text-[#F5EBDD]/65 line-clamp-2 leading-relaxed font-light mb-4">
                  {letter.subtitle}
                </p>
              </div>

              {/* Bottom tap prompt */}
              <div className="pt-3 border-t border-[#C6A56B]/15 flex items-center justify-between text-xs text-[#C6A56B]">
                <span className="font-sans text-[11px] text-[#F5EBDD]/40">
                  {isOpened ? 'Read again' : 'Tap to break seal'}
                </span>
                <span className="flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
                  Open Letter →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL-SCREEN LETTER READING MODAL - Mounted directly in document.body via Portal */}
      {activeLetter && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-[#080D17]/90 backdrop-blur-xl animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={activeLetter.title}
          onClick={() => setActiveLetter(null)}
        >
          <div 
            className="w-full max-w-xl max-h-[85vh] bg-[#101725] rounded-2xl sm:rounded-3xl border border-[#C6A56B]/40 shadow-2xl flex flex-col overflow-hidden animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-b border-[#C6A56B]/20 flex items-center justify-between bg-[#141C2D]/95 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2 text-xs font-sans text-[#C6A56B]">
                <Mail className="w-4 h-4 text-[#C6A56B]" />
                <span className="font-medium tracking-wide">{activeLetter.triggerFeeling}</span>
              </div>
              <button
                onClick={() => setActiveLetter(null)}
                className="p-1.5 rounded-full bg-[#182338] text-[#F5EBDD] hover:text-[#C6A56B] border border-[#C6A56B]/20 transition-colors touch-target flex items-center justify-center cursor-pointer"
                aria-label="Close letter"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Letter Paper Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 bg-radial-celestial flex-1">
              <div className="text-center pb-2.5 border-b border-[#C6A56B]/20">
                <h3 className="font-serif text-lg sm:text-2xl text-[#F5EBDD] font-medium leading-snug">
                  {activeLetter.title}
                </h3>
                <p className="font-handwriting text-base sm:text-lg text-[#C6A56B] mt-0.5">
                  {activeLetter.subtitle}
                </p>
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-3 pt-1">
                {activeLetter.content.map((paragraph, idx) => (
                  <p 
                    key={idx}
                    className="font-serif text-sm sm:text-base text-[#F5EBDD]/90 leading-relaxed font-light"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Handwritten Closing */}
              <div className="pt-3 border-t border-[#C6A56B]/20 text-right">
                <p className="font-handwriting text-xl sm:text-2xl text-[#C6A56B]">
                  {activeLetter.closing}
                </p>
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-4 py-2.5 sm:px-6 sm:py-3 border-t border-[#C6A56B]/20 bg-[#141C2D] flex items-center justify-between shrink-0">
              <span className="text-[11px] text-[#F5EBDD]/50 font-sans italic">
                Always here whenever you need to reread this.
              </span>
              <button
                onClick={() => setActiveLetter(null)}
                className="px-4 py-1.5 rounded-full text-xs font-sans tracking-wide font-medium bg-[#182338] hover:bg-[#C6A56B] hover:text-[#101725] text-[#F5EBDD] border border-[#C6A56B]/30 transition-all cursor-pointer"
              >
                Close Letter
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
