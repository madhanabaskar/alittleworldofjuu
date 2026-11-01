import type { MusicTrack, MusicTrackSlot, VoiceAudioSlot } from '../types/music';

/**
 * WEBSITE MUSIC CONFIGURATION
 * 
 * 1. Main Theme: "Neeyum Naanum Anbe" — Plays across the entire website.
 * 2. Letters Theme: "Unna Nenachu" — Plays specifically for the Letters sections (/letters and /letter).
 */
export const MUSIC_TRACKS: Record<MusicTrackSlot, MusicTrack> = {
  main: {
    id: 'track-main',
    slot: 'main',
    title: 'Neeyum Naanum Anbe',
    subtitle: 'Main Universe Theme',
    path: '/audio/Neeyum Naanum Anbe - Raghu Dixit, D. Sathyaprakash, Jithin Raj - MassTamilan.mp3',
    sectionRoutes: ['/home', '/story', '/memories', '/voice', '/comfort', '/promises', '/about-juu', '/future', '/ending', '/admin'],
    description: 'Our main song playing across the universe whenever Laddu explores our memories.'
  },
  letters: {
    id: 'track-letters',
    slot: 'letters',
    title: 'Unna Nenachu',
    subtitle: 'Letters & Feelings Theme',
    path: '/audio/Unna Nenachu(KoshalWorld.Com).mp3',
    sectionRoutes: ['/letters', '/letter'],
    description: 'Plays tenderly while Laddu reads Open When letters and the Love Letter.'
  }
};

/**
 * FUTURE VOICE AUDIO SLOTS
 * Prepared asset slots in public/audio/ for Juu's real voice recordings.
 */
export const VOICE_AUDIO_SLOTS: Record<string, VoiceAudioSlot> = {
  welcome: {
    id: 'voice-welcome',
    title: 'Welcome to Our Universe',
    path: '/audio/juu-welcome.mp3',
    category: 'welcome',
    description: 'Personal spoken greeting when Laddu enters the world.'
  },
  comfort01: {
    id: 'voice-comfort-01',
    title: 'Take a Breath, Kutty',
    path: '/audio/juu-comfort-01.mp3',
    category: 'comfort',
    description: 'Calm reassurance for difficult days.'
  },
  comfort02: {
    id: 'voice-comfort-02',
    title: 'You Are Doing Wonderfully',
    path: '/audio/juu-comfort-02.mp3',
    category: 'comfort',
    description: 'Affirmation of strength, study dreams, and patience.'
  },
  specialMessage: {
    id: 'voice-special',
    title: 'Whenever You Miss Me',
    path: '/audio/juu-special-message.mp3',
    category: 'special',
    description: 'Random check-in and sweet reassurance.'
  }
};

/**
 * Resolves the appropriate music track slot for a given route pathname.
 * When on /letters or /letter, plays "Unna Nenachu".
 * Everywhere else on the entire website, plays "Neeyum Naanum Anbe".
 */
export function getTrackForRoute(pathname: string): MusicTrack {
  const normalized = pathname.toLowerCase();
  
  if (normalized.startsWith('/letters') || normalized === '/letter') {
    return MUSIC_TRACKS.letters;
  }
  
  return MUSIC_TRACKS.main;
}
