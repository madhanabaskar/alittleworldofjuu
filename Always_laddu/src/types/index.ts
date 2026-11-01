export type MoodTag = 
  | 'comfort' 
  | 'love' 
  | 'nostalgia' 
  | 'laughter' 
  | 'reassurance' 
  | 'milestone';

export interface TimelineEvent {
  id: string;
  date: string;
  displayDate: string;
  title: string;
  description: string;
  photoUrl?: string;
  photoCaption?: string;
  category: 'first_meet' | 'growing_closer' | 'deep_conversations' | 'falling_in_love' | 'milestone';
  location?: string;
  ladduEmotion?: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  location: string;
  category: 'candid' | 'special' | 'quiet_moments' | 'travel' | 'firsts';
  imageUrl: string;
  caption: string;
  isPlaceholder: boolean;
  tags: string[];
}

export interface Letter {
  id: string;
  slug: string;
  title: string; // e.g. "Open when you miss me"
  subtitle: string;
  triggerFeeling: string;
  envelopeColor?: string;
  content: string[]; // array of paragraphs
  closing: string;
  previewExcerpt: string;
  isCustomizedByJuu: boolean;
  readCount?: number;
}

export interface VoiceNote {
  id: string;
  title: string;
  category: 'reassurance' | 'miss_me' | 'feel_low' | 'make_smile' | 'random';
  categoryLabel: string;
  duration: string; // e.g. "02:14"
  durationSeconds: number;
  caption: string;
  audioUrl?: string; // Real or placeholder
  syntheticVoiceType?: 'gentle_whisper' | 'warm_reassurance' | 'calm_presence';
  isPlaceholder: boolean;
}

export interface PromiseItem {
  id: string;
  title: string;
  summary: string;
  detail: string;
  category: 'communication' | 'patience' | 'dreams_support' | 'consistency' | 'accountability';
  isAccountabilityNote?: boolean;
  incidentTitle?: string;
  ladduFeelingAcknowledged?: string;
  juuCommitment?: string;
  isApprovedByJuu: boolean;
}

export interface LittleThingItem {
  id: string;
  category: 'favorites' | 'food' | 'songs' | 'habits' | 'jokes' | 'nicknames' | 'about_laddu' | 'facts';
  title: string;
  description: string;
  icon: string;
  tag?: string;
}

export interface FutureDreamItem {
  id: string;
  title: string;
  description: string;
  location?: string;
  status: 'dreaming' | 'planned' | 'holding_close';
  category: 'adventure' | 'peace' | 'celebration' | 'quiet_days';
  imageUrl?: string;
}

export interface ComfortContent {
  greeting: string;
  mainMessage: string[];
  breathingGuidance: string;
  reassurances: string[];
  reminderPoints: string[];
}

export interface SiteSettings {
  isEntered: boolean;
  entrancePassphraseHint: string;
  heroTitle: string;
  heroSubtitle: string;
  welcomeMessage: string;
  bgMusicEnabled: boolean;
  lastUpdated: string;
}

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  supabaseUrl?: string;
  hasAnonKey: boolean;
  storageBucketReady: boolean;
}
