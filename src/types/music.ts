export type MusicTrackSlot = 'main' | 'letters';

export interface MusicTrack {
  id: string;
  slot: MusicTrackSlot;
  title: string;
  subtitle: string;
  path: string;
  sectionRoutes: string[];
  description: string;
}

export interface VoiceAudioSlot {
  id: string;
  title: string;
  path: string;
  category: string;
  description: string;
}

export interface MusicContextType {
  currentTrack: MusicTrack;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  isVoicePlaying: boolean;
  trackAvailable: boolean;
  hasEnteredWorld: boolean;
  isPlayerVisible: boolean;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  setVoicePlaying: (playing: boolean) => void;
  enterWorld: () => void;
  setIsPlayerVisible: (visible: boolean) => void;
  switchTrack: (trackSlot: MusicTrackSlot) => Promise<void>;
}
