import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, Mic, Loader2 } from 'lucide-react';
import type { VoiceNote } from '../../types';
import { useMusic } from '../../context/MusicContext';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface AudioPlayerProps {
  note: VoiceNote;
  onEnded?: () => void;
  className?: string;
}

function parseDurationString(dur?: string, fallbackSeconds?: number): number {
  if (dur && typeof dur === 'string') {
    const parts = dur.trim().split(':').map(p => parseInt(p, 10));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return parts[0] * 60 + parts[1];
    }
    if (parts.length === 1 && !isNaN(parts[0])) {
      return parts[0];
    }
  }
  return fallbackSeconds && fallbackSeconds > 0 ? fallbackSeconds : 10;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  note, 
  onEnded,
  className = '' 
}) => {
  const { setVoicePlaying } = useMusic();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number>(() => parseDurationString(note.duration, note.durationSeconds));
  const [playableUrl, setPlayableUrl] = useState<string>(note.audioUrl || '');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync initial duration if note changes
  useEffect(() => {
    const parsed = parseDurationString(note.duration, note.durationSeconds);
    setDuration(parsed);
    setCurrentTime(0);
    setIsPlaying(false);
  }, [note.duration, note.durationSeconds]);

  // Resolve playable URL (handle private bucket signed URLs automatically)
  useEffect(() => {
    let isCancelled = false;

    const resolveUrl = async () => {
      if (!note.audioUrl) return;

      // If it's a Supabase voice_notes URL, generate a signed URL to bypass private bucket restrictions
      if (note.audioUrl.includes('/voice_notes/')) {
        const parts = note.audioUrl.split('/voice_notes/');
        const filePath = parts[1]?.split('?')[0];

        if (filePath && isSupabaseConfigured && supabase) {
          try {
            const { data, error } = await supabase.storage
              .from('voice_notes')
              .createSignedUrl(decodeURIComponent(filePath), 60 * 60 * 24 * 7); // 7 days

            if (!error && data?.signedUrl && !isCancelled) {
              setPlayableUrl(data.signedUrl);
              return;
            }
          } catch (err) {
            console.warn('Failed to resolve signed URL, using direct URL:', err);
          }
        }
      }

      if (!isCancelled) {
        setPlayableUrl(note.audioUrl);
      }
    };

    resolveUrl();

    return () => {
      isCancelled = true;
    };
  }, [note.audioUrl]);

  // Audio element event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(Math.round(audio.duration));
      }
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(Math.round(audio.currentTime));
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setVoicePlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setVoicePlaying(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setVoicePlaying(false);
      setCurrentTime(0);
      if (onEnded) onEnded();
    };

    const handleError = (e: Event) => {
      console.warn('Audio element playback error:', e);
      setIsLoading(false);
      setIsPlaying(false);
      setVoicePlaying(false);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      setVoicePlaying(false);
    };
  }, [playableUrl, onEnded, setVoicePlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      setIsLoading(true);
      audio.play().catch(err => {
        console.warn('Play attempt blocked or failed:', err);
        setIsLoading(false);
        setIsPlaying(false);
      });
    }
  };

  const handleRestart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    audio.play().catch(err => console.warn('Restart play error:', err));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const formatTime = (secs: number) => {
    const safeSecs = Math.max(0, Math.round(secs));
    const m = Math.floor(safeSecs / 60);
    const s = Math.floor(safeSecs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`glass-panel p-5 sm:p-6 rounded-2xl relative overflow-hidden transition-all duration-300 ${className}`}>
      {/* Real HTML Audio Element */}
      {playableUrl && (
        <audio
          ref={audioRef}
          src={playableUrl}
          preload="metadata"
        />
      )}

      {/* Category Pill & Status */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans tracking-wide bg-[#202C40]/90 text-[#C6A56B] border border-[#C6A56B]/20">
          <Mic className="w-3.5 h-3.5" />
          {note.categoryLabel}
        </span>
        {note.isPlaceholder && (
          <span className="text-[11px] font-sans text-[#F5EBDD]/50 italic">
            Slot: {note.audioUrl || `/audio/juu-${note.category}.mp3`} (Ready)
          </span>
        )}
      </div>

      {/* Title & Caption */}
      <h3 className="font-serif text-xl sm:text-2xl text-[#F5EBDD] font-normal mb-1">
        {note.title}
      </h3>
      <p className="text-xs sm:text-sm text-[#F5EBDD]/70 font-sans font-light mb-5 leading-relaxed">
        {note.caption}
      </p>

      {/* Waveform Visualization Bars */}
      <div className="flex items-end justify-between h-10 gap-1 sm:gap-1.5 mb-4 px-1" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => {
          const isActive = (i / 28) * 100 <= progressPercent;
          const heightFactor = Math.sin((i / 28) * Math.PI) * 0.8 + 0.2;
          const randomJitter = isPlaying ? (Math.sin(i * 1.5 + currentTime * 3) * 0.25) : 0;
          const heightPercent = Math.max(15, Math.min(100, (heightFactor + randomJitter) * 100));

          return (
            <div
              key={i}
              className={`w-full rounded-full transition-all duration-150 ${
                isActive 
                  ? 'bg-gradient-to-t from-[#C6A56B] to-[#F5EBDD] shadow-[0_0_8px_rgba(198,165,107,0.5)]' 
                  : 'bg-[#202C40]/80'
              }`}
              style={{ height: `${heightPercent}%` }}
            />
          );
        })}
      </div>

      {/* Progress slider */}
      <div className="relative mb-3">
        <input
          type="range"
          min={0}
          max={duration || 1}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-[#202C40] rounded-lg appearance-none cursor-pointer accent-[#C6A56B] focus:outline-none"
          aria-label="Audio progress"
        />
        <div className="flex justify-between items-center text-xs text-[#F5EBDD]/60 mt-1 font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-[#C6A56B]/15">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            disabled={!playableUrl}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C6A56B] to-[#E0C79B] text-[#101725] flex items-center justify-center shadow-[0_4px_16px_rgba(198,165,107,0.4)] hover:scale-105 active:scale-95 transition-transform touch-target cursor-pointer disabled:opacity-50"
            aria-label={isPlaying ? 'Pause audio note' : 'Play audio note'}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={handleRestart}
            disabled={!playableUrl}
            className="p-2.5 rounded-full text-[#F5EBDD]/70 hover:text-[#C6A56B] hover:bg-[#202C40] transition-colors touch-target cursor-pointer disabled:opacity-40"
            aria-label="Replay audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#C6A56B]/90 font-sans">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Voice Note from Juu</span>
          <Volume2 className="w-4 h-4 text-[#F5EBDD]/50" />
        </div>
      </div>
    </div>
  );
};
