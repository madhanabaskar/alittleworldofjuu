import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Volume2, VolumeX, ArrowLeft, RefreshCw, Sparkles, Wind, ShieldCheck } from 'lucide-react';
import { audioEngine } from '../services/audioService';
import { memoryService } from '../services/memoryService';
import type { Memory, VoiceNote } from '../types';
import { AudioPlayer } from '../components/ui/AudioPlayer';
import { useMusic } from '../context/MusicContext';

export const Comfort: React.FC = () => {
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const [happyMemory, setHappyMemory] = useState<Memory | null>(() => {
    const mems = memoryService.getMemoriesSync();
    return mems.length > 0 ? mems[Math.floor(Math.random() * mems.length)] : null;
  });
  const [sampleVoice, setSampleVoice] = useState<VoiceNote | null>(() => {
    const notes = memoryService.getVoiceNotesSync();
    return notes.find(n => n.category === 'reassurance') || notes[0] || null;
  });

  useEffect(() => {
    // Refresh happy memories and sample voice in background if new data exists
    memoryService.getMemories().then(mems => {
      if (mems.length > 0 && !happyMemory) {
        const random = mems[Math.floor(Math.random() * mems.length)];
        setHappyMemory(random);
      }
    });
    memoryService.getVoiceNotes().then(notes => {
      if (!sampleVoice && notes.length > 0) {
        const reassuranceNote = notes.find(n => n.category === 'reassurance') || notes[0];
        setSampleVoice(reassuranceNote);
      }
    });

    // Box breathing cycle: 4s Inhale, 4s Hold, 4s Exhale
    const interval = setInterval(() => {
      setBreathTimer(prev => {
        if (prev <= 1) {
          setBreathPhase(curr => {
            if (curr === 'Inhale') return 'Hold';
            if (curr === 'Hold') return 'Exhale';
            return 'Inhale';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { isPlaying: isMusicPlaying, togglePlay: toggleMusicPlay, currentTrack } = useMusic();

  const shuffleHappyMemory = async () => {
    const mems = await memoryService.getMemories();
    if (mems.length > 0) {
      const random = mems[Math.floor(Math.random() * mems.length)];
      setHappyMemory(random);
      audioEngine.playChime('warm');
    }
  };

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-radial-celestial flex flex-col justify-between">
      {/* Top Bar with Return Home & Sound Toggle */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between mb-8 z-20">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs sm:text-sm text-[#F5EBDD] hover:text-[#C6A56B] transition-colors touch-target"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Our World</span>
        </Link>

        <button
          onClick={toggleMusicPlay}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans border transition-all touch-target ${
            isMusicPlaying
              ? 'bg-[#C6A56B]/20 border-[#C6A56B] text-[#C6A56B] shadow-[0_0_15px_rgba(198,165,107,0.4)] animate-pulse'
              : 'glass-panel text-[#F5EBDD]/70 hover:text-[#F5EBDD]'
          }`}
          aria-label="Toggle calming background sound"
        >
          {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden sm:inline">
            {isMusicPlaying ? `Theme: ${currentTrack.title}` : 'Calm Background Music'}
          </span>
        </button>
      </div>

      {/* Main Peaceful Comfort Experience */}
      <div className="max-w-3xl mx-auto w-full space-y-12 z-10">
        {/* Step 1: Gentle Greeting & Emotional Anchor */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#75485B] to-[#943F5B] border border-[#C6A56B]/50 shadow-[0_0_30px_rgba(148,63,91,0.6)] mb-6 animate-pulse-glow">
            <Heart className="w-7 h-7 text-white fill-current" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#F5EBDD] mb-4">
            Hey, my Ladu...
          </h1>

          <p className="font-handwriting text-2xl sm:text-3xl text-[#C6A56B]">
            Take a little breath with me.
          </p>
        </div>

        {/* Step 2: Interactive Guided Breathing Pause */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#C6A56B]/30 text-center flex flex-col items-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-3 left-4 flex items-center gap-1.5 text-xs font-sans text-[#C6A56B]">
            <Wind className="w-3.5 h-3.5" />
            <span>Gentle Breathing Anchor</span>
          </div>

          {/* Animated Pulsing Breathing Circle */}
          <div className="relative my-8 flex items-center justify-center">
            {/* Outer halo */}
            <div 
              className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-[#C6A56B]/30 flex items-center justify-center transition-all duration-1000 ${
                breathPhase === 'Inhale' 
                  ? 'scale-125 bg-[#C6A56B]/10 shadow-[0_0_50px_rgba(198,165,107,0.35)]' 
                  : breathPhase === 'Hold' 
                    ? 'scale-125 bg-[#75485B]/20 shadow-[0_0_40px_rgba(117,72,91,0.4)]'
                    : 'scale-90 bg-transparent'
              }`}
            >
              {/* Inner core */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#182338] to-[#202C40] border-2 border-[#C6A56B] flex flex-col items-center justify-center shadow-lg">
                <span className="font-serif text-lg sm:text-xl text-[#F5EBDD] font-medium tracking-wide">
                  {breathPhase}
                </span>
                <span className="font-mono text-xs text-[#C6A56B] mt-1">
                  {breathTimer}s
                </span>
              </div>
            </div>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#F5EBDD]/70 max-w-md mx-auto font-light leading-relaxed">
            Let your shoulders drop. Relax your jaw. You do not have to hold everything together this second.
          </p>
        </div>

        {/* Step 3: Exact Comfort Message */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-[#C6A56B]/30 relative overflow-hidden">
          <div className="space-y-4 font-serif text-base sm:text-lg md:text-xl text-[#F5EBDD]/90 leading-relaxed font-light">
            <p>You don't have to solve everything right now.</p>
            <p>You don't have to pretend to be okay.</p>
            <p className="text-[#C6A56B] font-normal">
              Your feelings matter. Your dreams matter.
            </p>
            <p>
              And you deserve love that makes you feel safe, heard and valued.
            </p>
            <p>
              If I could be beside you right now, I would want to listen first, hold your hand and remind you how precious you are.
            </p>
            <p className="font-handwriting text-2xl sm:text-3xl text-[#C6A56B] pt-4">
              Take your time, kutty. One moment at a time.
            </p>
          </div>
        </div>

        {/* Step 4: Reassurance Voice Note */}
        {sampleVoice && (
          <div>
            <div className="text-center mb-4">
              <span className="text-xs font-sans tracking-widest uppercase text-[#C6A56B] font-medium">
                Listen When Words On Screen Aren't Enough
              </span>
            </div>
            <AudioPlayer note={sampleVoice} />
          </div>
        )}

        {/* Step 5: One Happy Memory Spotlight */}
        {happyMemory && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#C6A56B]/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C6A56B]" />
                <span className="text-xs font-sans tracking-widest uppercase text-[#C6A56B] font-semibold">
                  A Gentle Memory For You
                </span>
              </div>
              <button
                onClick={shuffleHappyMemory}
                className="inline-flex items-center gap-1.5 text-xs text-[#F5EBDD]/70 hover:text-[#C6A56B] transition-colors touch-target"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Show another memory</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="rounded-2xl overflow-hidden aspect-4/3 max-h-56 bg-black/40 border border-[#C6A56B]/20">
                <img
                  src={happyMemory.imageUrl}
                  alt={happyMemory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-mono text-[#C6A56B]">
                  {happyMemory.displayDate} • {happyMemory.location}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-[#F5EBDD] mt-1 mb-2">
                  {happyMemory.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#F5EBDD]/80 font-sans font-light leading-relaxed">
                  {happyMemory.caption}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reassurance Checklist */}
        <div className="p-6 rounded-2xl glass-card border border-[#C6A56B]/20">
          <h4 className="text-xs font-sans tracking-widest uppercase text-[#C6A56B] mb-3 flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Before you close this screen:</span>
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F5EBDD]/80 font-sans">
            <li className="flex items-center gap-2">
              <span className="text-[#C6A56B]">✦</span> Drink a small sip of water
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#C6A56B]">✦</span> Rest your head for five minutes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#C6A56B]">✦</span> You do not have to carry everything today
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#C6A56B]">✦</span> Difficult hours pass; your worth remains
            </li>
          </ul>
        </div>

        {/* Step 7: Return Home or Visit Letters */}
        <div className="pt-6 pb-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            to="/home"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C6A56B] to-[#E0C79B] text-[#101725] font-sans font-semibold text-xs sm:text-sm tracking-widest uppercase shadow-[0_4px_20px_rgba(198,165,107,0.4)] hover:brightness-105 active:scale-95 transition-all touch-target"
          >
            I Feel A Little Calmer Now
          </Link>

          <Link
            to="/letters"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-card text-xs sm:text-sm text-[#F5EBDD] font-sans font-medium tracking-wide hover:border-[#C6A56B] transition-all touch-target"
          >
            Read an Open-When Letter
          </Link>
        </div>
      </div>
    </div>
  );
};
