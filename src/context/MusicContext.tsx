import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import type { MusicContextType, MusicTrack, MusicTrackSlot } from '../types/music';
import { MUSIC_TRACKS, getTrackForRoute } from '../config/musicConfig';

const MusicContext = createContext<MusicContextType | null>(null);

const STORAGE_KEY_VOLUME = 'juu_music_volume';
const STORAGE_KEY_MUTED = 'juu_music_muted';
const STORAGE_KEY_ENTERED = 'juu_world_unlocked';

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Load persisted preferences
  const [volume, setVolumeState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VOLUME);
      return saved ? parseFloat(saved) : 0.75;
    } catch {
      return 0.75;
    }
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_MUTED) === 'true';
    } catch {
      return false;
    }
  });

  const [hasEnteredWorld, setHasEnteredWorld] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ENTERED) === 'true';
    } catch {
      return false;
    }
  });

  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(() => getTrackForRoute(location.pathname));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackAvailable, setTrackAvailable] = useState<boolean>(true);
  const [isVoicePlaying, setIsVoicePlayingState] = useState<boolean>(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(true);

  // Single persistent Audio element reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const userWantsMusicRef = useRef<boolean>(true);

  // Saved playback positions for each track slot (persists where each song paused)
  const trackPositionsRef = useRef<Record<MusicTrackSlot, number>>({
    main: 0,
    letters: 0
  });
  const currentTrackRef = useRef<MusicTrack>(currentTrack);
  const isPlayingRef = useRef<boolean>(isPlaying);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize single audio element
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = isMuted ? 0 : volume;
      audioRef.current = audio;

      audio.addEventListener('error', () => {
        setTrackAvailable(false);
        setIsPlaying(false);
      });

      audio.addEventListener('canplay', () => {
        setTrackAvailable(true);
      });

      audio.addEventListener('play', () => {
        setIsPlaying(true);
        isPlayingRef.current = true;
      });

      audio.addEventListener('pause', () => {
        setIsPlaying(false);
        isPlayingRef.current = false;
      });

      // Track playback position for seamless resume between section switches
      audio.addEventListener('timeupdate', () => {
        if (audio.currentTime > 0) {
          trackPositionsRef.current[currentTrackRef.current.slot] = audio.currentTime;
        }
      });

      // If song naturally reaches the end, reset saved position to 0 and loop/restart from start
      audio.addEventListener('ended', () => {
        trackPositionsRef.current[currentTrackRef.current.slot] = 0;
        audio.currentTime = 0;
        if (userWantsMusicRef.current) {
          audio.play().catch(() => {});
        }
      });
    }

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  // Smooth volume fader helper
  const fadeTo = useCallback((targetVol: number, durationMs: number = 500): Promise<void> => {
    return new Promise((resolve) => {
      if (!audioRef.current) return resolve();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      const audio = audioRef.current;
      const startVol = audio.volume;
      const steps = 15;
      const stepDuration = durationMs / steps;
      const volChange = (targetVol - startVol) / steps;
      let currentStep = 0;

      fadeIntervalRef.current = window.setInterval(() => {
        currentStep++;
        const nextVol = startVol + volChange * currentStep;
        audio.volume = Math.max(0, Math.min(1, nextVol));

        if (currentStep >= steps) {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          audio.volume = Math.max(0, Math.min(1, targetVol));
          resolve();
        }
      }, stepDuration);
    });
  }, []);

  // Play current track immediately with sound
  const play = useCallback(async (): Promise<void> => {
    userWantsMusicRef.current = true;
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const targetPath = currentTrack.path;

    // Check if source needs updating
    if (!audio.src || !decodeURI(audio.src).includes(decodeURI(targetPath))) {
      const savedPosition = trackPositionsRef.current[currentTrack.slot] || 0;
      audio.src = targetPath;
      if (savedPosition > 0) {
        audio.addEventListener('loadedmetadata', () => {
          if (audio && isFinite(savedPosition) && audio.duration && savedPosition < audio.duration - 0.5) {
            audio.currentTime = savedPosition;
          }
        }, { once: true });
      }
      audio.load();
    }

    const effectiveVol = isMuted ? 0 : isVoicePlaying ? volume * 0.15 : volume;
    audio.volume = effectiveVol;

    try {
      await audio.play();
      setIsPlaying(true);
      setTrackAvailable(true);
    } catch (err) {
      console.warn('Autoplay waiting for user gesture:', err);
      setIsPlaying(false);
    }
  }, [currentTrack.path, currentTrack.slot, isMuted, isVoicePlaying, volume]);

  // Pause with smooth fade-out
  const pause = useCallback(async () => {
    userWantsMusicRef.current = false;
    if (!audioRef.current) return;

    const audio = audioRef.current;
    await fadeTo(0, 400);
    audio.pause();
    setIsPlaying(false);
  }, [fadeTo]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  // Volume control
  const setVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    try {
      localStorage.setItem(STORAGE_KEY_VOLUME, clamped.toString());
    } catch {}

    if (audioRef.current && !isMuted && !isVoicePlaying) {
      audioRef.current.volume = clamped;
    }
  }, [isMuted, isVoicePlaying]);

  // Mute control
  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY_MUTED, next.toString());
      } catch {}

      if (audioRef.current) {
        audioRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  }, [volume]);

  // Voice recording ducking
  const setVoicePlaying = useCallback((voiceActive: boolean) => {
    setIsVoicePlayingState(voiceActive);
    if (!audioRef.current || !isPlaying || isMuted) return;

    if (voiceActive) {
      fadeTo(volume * 0.15, 300);
    } else {
      fadeTo(volume, 500);
    }
  }, [isPlaying, isMuted, volume, fadeTo]);

  // Switch to specific track slot with smooth crossfade and resume position
  const switchTrack = useCallback(async (slot: MusicTrackSlot) => {
    const newTrack = MUSIC_TRACKS[slot];
    if (!newTrack || newTrack.id === currentTrackRef.current.id) return;

    const audio = audioRef.current;
    if (audio && audio.currentTime > 0) {
      trackPositionsRef.current[currentTrackRef.current.slot] = audio.currentTime;
    }

    const wasPlaying = isPlayingRef.current || (audio ? !audio.paused : false);
    if (wasPlaying && audio) {
      await fadeTo(0, 300);
      audio.pause();
    }

    setCurrentTrack(newTrack);
    currentTrackRef.current = newTrack;

    if (audio) {
      const savedPosition = trackPositionsRef.current[slot] || 0;
      audio.src = newTrack.path;

      // Restore position where this track was previously paused
      const restoreTime = () => {
        if (savedPosition > 0 && isFinite(savedPosition)) {
          try {
            if (audio.duration && savedPosition < audio.duration - 0.5) {
              audio.currentTime = savedPosition;
            } else {
              audio.currentTime = 0;
              trackPositionsRef.current[slot] = 0;
            }
          } catch (e) {
            console.warn('Seek error on track switch:', e);
          }
        }
      };

      audio.addEventListener('loadedmetadata', restoreTime, { once: true });
      audio.load();

      if (wasPlaying && userWantsMusicRef.current) {
        try {
          const effectiveVol = isMuted ? 0 : isVoicePlaying ? volume * 0.15 : volume;
          audio.volume = effectiveVol;
          await audio.play();
          setIsPlaying(true);
          setTrackAvailable(true);
        } catch (err) {
          console.warn('Playback error during track switch:', err);
          setIsPlaying(false);
        }
      }
    }
  }, [fadeTo, isMuted, isVoicePlaying, volume]);

  // Synchronous Enter World Trigger (called synchronously on user click)
  const enterWorld = useCallback(() => {
    setHasEnteredWorld(true);
    userWantsMusicRef.current = true;
    try {
      localStorage.setItem(STORAGE_KEY_ENTERED, 'true');
    } catch {}

    if (audioRef.current) {
      const mainTrack = MUSIC_TRACKS.main;
      setCurrentTrack(mainTrack);
      currentTrackRef.current = mainTrack;
      const savedPosition = trackPositionsRef.current.main || 0;
      audioRef.current.src = mainTrack.path;
      if (savedPosition > 0) {
        audioRef.current.addEventListener('loadedmetadata', () => {
          if (audioRef.current && isFinite(savedPosition) && audioRef.current.duration && savedPosition < audioRef.current.duration - 0.5) {
            audioRef.current.currentTime = savedPosition;
          }
        }, { once: true });
      }
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setTrackAvailable(true);
      }).catch(err => {
        console.warn('Playback attempt after enter:', err);
      });
    }
  }, [isMuted, volume]);

  // Auto-switch track on route changes
  useEffect(() => {
    // Secret entrance has no background music
    if (location.pathname === '/') {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }

    const matchedTrack = getTrackForRoute(location.pathname);
    if (matchedTrack.slot !== currentTrack.slot) {
      switchTrack(matchedTrack.slot);
    }
  }, [location.pathname, currentTrack.slot, isPlaying, switchTrack]);

  // Fallback global listener: if user is on site and music is paused due to browser autoplay policy, first tap anywhere plays music
  useEffect(() => {
    const handleDocumentInteraction = () => {
      if (hasEnteredWorld && audioRef.current && audioRef.current.paused && userWantsMusicRef.current && location.pathname !== '/') {
        play();
      }
    };

    window.addEventListener('click', handleDocumentInteraction, { passive: true });
    window.addEventListener('touchstart', handleDocumentInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleDocumentInteraction);
      window.removeEventListener('touchstart', handleDocumentInteraction);
    };
  }, [hasEnteredWorld, play, location.pathname]);

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isMuted,
        volume,
        isVoicePlaying,
        trackAvailable,
        hasEnteredWorld,
        isPlayerVisible,
        play,
        pause,
        togglePlay,
        setVolume,
        toggleMute,
        setVoicePlaying,
        enterWorld,
        setIsPlayerVisible,
        switchTrack
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
