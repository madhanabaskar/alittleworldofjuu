import React from 'react';
import { Link } from 'react-router-dom';
import { MoonGlow } from '../components/animations/MoonGlow';
import { Button } from '../components/ui/Button';
import { Heart, Sparkles, Infinity as InfinityIcon } from 'lucide-react';

export const Ending: React.FC = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden text-center bg-radial-celestial">
      {/* Soft Ambient Radiance */}
      <div 
        className="absolute w-[650px] h-[650px] rounded-full pointer-events-none opacity-30 blur-3xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, rgba(198, 165, 107, 0.35) 0%, rgba(117, 72, 91, 0.2) 50%, transparent 75%)'
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Glowing Infinity Symbol with Celestial Moon */}
        <div className="relative mb-8">
          <MoonGlow size="sm" />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 p-2.5 rounded-full bg-[#182338] border border-[#C6A56B] shadow-[0_0_20px_rgba(198,165,107,0.5)]">
            <InfinityIcon className="w-5 h-5 text-[#C6A56B] animate-pulse" />
          </div>
        </div>

        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-sans tracking-widest uppercase font-medium bg-[#182338]/90 border border-[#C6A56B]/30 text-[#C6A56B] mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 12 • The Eternal Promise</span>
        </div>

        {/* Cinematic Main Message */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#C6A56B]/30 shadow-2xl mb-10 text-center">
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#F5EBDD] font-normal leading-relaxed mb-6">
            Whenever the world feels a little too loud, come back and remember the beautiful parts of our story.
          </p>

          <div className="space-y-3 font-sans text-sm sm:text-base text-[#F5EBDD]/80 font-light leading-relaxed mb-8">
            <p>You are more than the difficult days you face.</p>
            <p className="text-[#C6A56B] font-medium">Keep growing.</p>
            <p className="text-[#C6A56B] font-medium">Keep dreaming.</p>
            <p className="text-[#C6A56B] font-medium">Keep being you.</p>
            <p className="pt-2">And let's keep creating memories worth remembering.</p>
          </div>

          <p className="font-serif italic text-xl sm:text-2xl text-[#F5EBDD] pt-4 border-t border-[#C6A56B]/20">
            Until we meet again, my Laduuu...
          </p>

          <p className="font-handwriting text-3xl sm:text-4xl text-[#C6A56B] mt-3">
            With love, Yours, Juu. ❤️
          </p>
        </div>

        {/* Return Button */}
        <Link to="/home">
          <Button variant="gold" size="lg" icon={<Heart className="w-4 h-4 fill-current text-[#101725]" />}>
            BACK TO OUR LITTLE WORLD
          </Button>
        </Link>
      </div>
    </div>
  );
};
