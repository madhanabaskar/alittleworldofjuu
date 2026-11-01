import type { 
  TimelineEvent, 
  Memory, 
  Letter, 
  VoiceNote, 
  PromiseItem, 
  LittleThingItem, 
  FutureDreamItem,
  ComfortContent,
  SiteSettings 
} from '../types';
import { 
  INITIAL_TIMELINE, 
  INITIAL_MEMORIES, 
  INITIAL_LETTERS, 
  INITIAL_VOICE_NOTES, 
  INITIAL_PROMISES, 
  INITIAL_LITTLE_THINGS, 
  INITIAL_FUTURE_DREAMS,
  INITIAL_COMFORT_CONTENT,
  INITIAL_SITE_SETTINGS
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEYS = {
  TIMELINE: 'juu_timeline',
  MEMORIES: 'juu_memories',
  LETTERS: 'juu_letters',
  VOICE_NOTES: 'juu_voice_notes',
  PROMISES: 'juu_promises',
  LITTLE_THINGS: 'juu_little_things',
  FUTURE_DREAMS: 'juu_future_dreams',
  COMFORT: 'juu_comfort',
  SETTINGS: 'juu_settings'
};

function getLocal<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.warn(`Error reading from localStorage key ${key}:`, e);
    return defaultValue;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing to localStorage key ${key}:`, e);
  }
}

// In-memory instant cache (populated synchronously on load for 0ms render speed)
let timelineCache: TimelineEvent[] = getLocal<TimelineEvent[]>(STORAGE_KEYS.TIMELINE, INITIAL_TIMELINE);
let memoriesCache: Memory[] = getLocal<Memory[]>(STORAGE_KEYS.MEMORIES, INITIAL_MEMORIES);
let lettersCache: Letter[] = getLocal<Letter[]>(STORAGE_KEYS.LETTERS, INITIAL_LETTERS);
let voiceNotesCache: VoiceNote[] = getLocal<VoiceNote[]>(STORAGE_KEYS.VOICE_NOTES, INITIAL_VOICE_NOTES);
let promisesCache: PromiseItem[] = getLocal<PromiseItem[]>(STORAGE_KEYS.PROMISES, INITIAL_PROMISES);
let littleThingsCache: LittleThingItem[] = getLocal<LittleThingItem[]>(STORAGE_KEYS.LITTLE_THINGS, INITIAL_LITTLE_THINGS);
let futureDreamsCache: FutureDreamItem[] = getLocal<FutureDreamItem[]>(STORAGE_KEYS.FUTURE_DREAMS, INITIAL_FUTURE_DREAMS);
let comfortCache: ComfortContent = getLocal<ComfortContent>(STORAGE_KEYS.COMFORT, INITIAL_COMFORT_CONTENT);
let settingsCache: SiteSettings = getLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);

export const memoryService = {
  // Synchronous Instant Getters (0ms, zero lag, no layout jump)
  getTimelineSync(): TimelineEvent[] {
    return timelineCache;
  },
  getMemoriesSync(): Memory[] {
    return memoriesCache;
  },
  getLettersSync(): Letter[] {
    return lettersCache;
  },
  getVoiceNotesSync(): VoiceNote[] {
    return voiceNotesCache;
  },
  getPromisesSync(): PromiseItem[] {
    return promisesCache;
  },
  getLittleThingsSync(): LittleThingItem[] {
    return littleThingsCache;
  },
  getFutureDreamsSync(): FutureDreamItem[] {
    return futureDreamsCache;
  },
  getComfortSync(): ComfortContent {
    return comfortCache;
  },
  getSettingsSync(): SiteSettings {
    return settingsCache;
  },

  // ==========================================
  // TIMELINE
  // ==========================================
  async getTimeline(): Promise<TimelineEvent[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('timeline').select('*').order('date', { ascending: true });
        if (!error && data && data.length > 0) {
          timelineCache = data as TimelineEvent[];
          setLocal(STORAGE_KEYS.TIMELINE, data);
          return timelineCache;
        }
      } catch (e) {
        console.warn('Supabase timeline query failed, falling back to local:', e);
      }
    }
    return timelineCache;
  },

  async saveTimeline(timeline: TimelineEvent[]): Promise<void> {
    timelineCache = timeline;
    setLocal(STORAGE_KEYS.TIMELINE, timeline);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('timeline').upsert(timeline);
      } catch (e) {
        console.error('Failed to sync timeline to Supabase:', e);
      }
    }
  },

  // ==========================================
  // MEMORIES
  // ==========================================
  async getMemories(): Promise<Memory[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('memories').select('*').order('date', { ascending: false });
        if (!error && data && data.length > 0) {
          memoriesCache = data as Memory[];
          setLocal(STORAGE_KEYS.MEMORIES, data);
          return memoriesCache;
        }
      } catch (e) {
        console.warn('Supabase memories query failed, falling back to local:', e);
      }
    }
    return memoriesCache;
  },

  async addMemory(memory: Omit<Memory, 'id'>): Promise<Memory> {
    const memories = await this.getMemories();
    const newMemory: Memory = {
      ...memory,
      id: `mem-${Date.now()}`
    };

    const updated = [newMemory, ...memories];
    setLocal(STORAGE_KEYS.MEMORIES, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('memories').insert(newMemory);
        if (error) console.error('Error adding memory to Supabase:', error.message);
      } catch (e) {
        console.error('Failed to sync new memory to Supabase:', e);
      }
    }

    return newMemory;
  },

  async deleteMemory(id: string): Promise<void> {
    const memories = await this.getMemories();
    const updated = memories.filter(m => m.id !== id);
    setLocal(STORAGE_KEYS.MEMORIES, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('memories').delete().eq('id', id);
        if (error) console.error('Error deleting memory from Supabase:', error.message);
      } catch (e) {
        console.error('Failed to delete memory from Supabase:', e);
      }
    }
  },

  // ==========================================
  // LETTERS
  // ==========================================
  async getLetters(): Promise<Letter[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('letters').select('*');
        if (!error && data && data.length > 0) {
          lettersCache = data as Letter[];
          setLocal(STORAGE_KEYS.LETTERS, data);
          return lettersCache;
        }
      } catch (e) {
        console.warn('Supabase letters query fallback:', e);
      }
    }
    return lettersCache;
  },

  async updateLetter(letter: Letter): Promise<void> {
    const letters = await this.getLetters();
    const updated = letters.map(l => l.id === letter.id ? letter : l);
    lettersCache = updated;
    setLocal(STORAGE_KEYS.LETTERS, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('letters').upsert(letter);
        if (error) console.error('Error updating letter in Supabase:', error.message);
      } catch (e) {
        console.error('Failed to update letter in Supabase:', e);
      }
    }
  },

  async addLetter(letter: Omit<Letter, 'id'>): Promise<Letter> {
    const letters = await this.getLetters();
    const newLetter: Letter = {
      ...letter,
      id: `let-${Date.now()}`
    };
    lettersCache = [...letters, newLetter];
    setLocal(STORAGE_KEYS.LETTERS, lettersCache);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('letters').insert(newLetter);
        if (error) console.error('Error inserting letter into Supabase:', error.message);
      } catch (e) {
        console.error('Failed to sync new letter to Supabase:', e);
      }
    }

    return newLetter;
  },

  // ==========================================
  // VOICE NOTES
  // ==========================================
  async getVoiceNotes(): Promise<VoiceNote[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('voice_notes').select('*');
        if (!error && data && data.length > 0) {
          voiceNotesCache = data as VoiceNote[];
          setLocal(STORAGE_KEYS.VOICE_NOTES, data);
          return voiceNotesCache;
        }
      } catch (e) {
        console.warn('Supabase voice notes query fallback:', e);
      }
    }
    return voiceNotesCache;
  },

  async addVoiceNote(note: Omit<VoiceNote, 'id'>): Promise<VoiceNote> {
    const notes = await this.getVoiceNotes();
    const newNote: VoiceNote = {
      ...note,
      id: `voice-${Date.now()}`
    };
    voiceNotesCache = [newNote, ...notes];
    setLocal(STORAGE_KEYS.VOICE_NOTES, voiceNotesCache);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('voice_notes').insert(newNote);
        if (error) console.error('Error inserting voice note into Supabase:', error.message);
      } catch (e) {
        console.error('Failed to sync voice note to Supabase:', e);
      }
    }

    return newNote;
  },

  async deleteVoiceNote(id: string): Promise<void> {
    const notes = await this.getVoiceNotes();
    voiceNotesCache = notes.filter(n => n.id !== id);
    setLocal(STORAGE_KEYS.VOICE_NOTES, voiceNotesCache);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('voice_notes').delete().eq('id', id);
        if (error) console.error('Error deleting voice note from Supabase:', error.message);
      } catch (e) {
        console.error('Failed to delete voice note from Supabase:', e);
      }
    }
  },

  // ==========================================
  // PROMISES
  // ==========================================
  async getPromises(): Promise<PromiseItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('promises').select('*');
        if (!error && data && data.length > 0) {
          promisesCache = data as PromiseItem[];
          setLocal(STORAGE_KEYS.PROMISES, data);
          return promisesCache;
        }
      } catch (e) {
        console.warn('Supabase promises query fallback:', e);
      }
    }
    return promisesCache;
  },

  async updatePromise(promise: PromiseItem): Promise<void> {
    const promises = await this.getPromises();
    const updated = promises.map(p => p.id === promise.id ? promise : p);
    promisesCache = updated;
    setLocal(STORAGE_KEYS.PROMISES, updated);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('promises').upsert(promise);
        if (error) console.error('Error updating promise in Supabase:', error.message);
      } catch (e) {
        console.error('Failed to sync updated promise to Supabase:', e);
      }
    }
  },

  async addPromise(promise: Omit<PromiseItem, 'id'>): Promise<PromiseItem> {
    const promises = await this.getPromises();
    const newPromise: PromiseItem = {
      ...promise,
      id: `prom-${Date.now()}`
    };
    promisesCache = [...promises, newPromise];
    setLocal(STORAGE_KEYS.PROMISES, promisesCache);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('promises').insert(newPromise);
        if (error) console.error('Error adding promise to Supabase:', error.message);
      } catch (e) {
        console.error('Failed to sync new promise to Supabase:', e);
      }
    }

    return newPromise;
  },

  // ==========================================
  // LITTLE THINGS
  // ==========================================
  async getLittleThings(): Promise<LittleThingItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('little_things').select('*');
        if (!error && data && data.length > 0) {
          littleThingsCache = data as LittleThingItem[];
          setLocal(STORAGE_KEYS.LITTLE_THINGS, data);
          return littleThingsCache;
        }
      } catch (e) {
        console.warn('Supabase little things query fallback:', e);
      }
    }
    return littleThingsCache;
  },

  async saveLittleThings(items: LittleThingItem[]): Promise<void> {
    littleThingsCache = items;
    setLocal(STORAGE_KEYS.LITTLE_THINGS, items);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('little_things').upsert(items);
      } catch (e) {
        console.error('Failed to sync little things to Supabase:', e);
      }
    }
  },

  // ==========================================
  // FUTURE DREAMS
  // ==========================================
  async getFutureDreams(): Promise<FutureDreamItem[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('future_dreams').select('*');
        if (!error && data && data.length > 0) {
          futureDreamsCache = data as FutureDreamItem[];
          setLocal(STORAGE_KEYS.FUTURE_DREAMS, data);
          return futureDreamsCache;
        }
      } catch (e) {
        console.warn('Supabase future dreams query fallback:', e);
      }
    }
    return futureDreamsCache;
  },

  async addFutureDream(dream: Omit<FutureDreamItem, 'id'>): Promise<FutureDreamItem> {
    const list = await this.getFutureDreams();
    const newDream: FutureDreamItem = {
      ...dream,
      id: `dream-${Date.now()}`
    };
    futureDreamsCache = [...list, newDream];
    setLocal(STORAGE_KEYS.FUTURE_DREAMS, futureDreamsCache);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('future_dreams').insert(newDream);
        if (error) console.error('Error adding future dream to Supabase:', error.message);
      } catch (e) {
        console.error('Failed to sync future dream to Supabase:', e);
      }
    }

    return newDream;
  },

  async deleteFutureDream(id: string): Promise<void> {
    const list = await this.getFutureDreams();
    futureDreamsCache = list.filter(d => d.id !== id);
    setLocal(STORAGE_KEYS.FUTURE_DREAMS, futureDreamsCache);

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('future_dreams').delete().eq('id', id);
        if (error) console.error('Error deleting future dream from Supabase:', error.message);
      } catch (e) {
        console.error('Failed to delete future dream from Supabase:', e);
      }
    }
  },

  // ==========================================
  // COMFORT CONTENT
  // ==========================================
  async getComfortContent(): Promise<ComfortContent> {
    return comfortCache;
  },

  async saveComfortContent(content: ComfortContent): Promise<void> {
    comfortCache = content;
    setLocal(STORAGE_KEYS.COMFORT, content);
  },

  // ==========================================
  // SITE SETTINGS
  // ==========================================
  async getSettings(): Promise<SiteSettings> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
        if (!error && data) {
          settingsCache = data as SiteSettings;
          setLocal(STORAGE_KEYS.SETTINGS, data);
          return settingsCache;
        }
      } catch (e) {
        console.warn('Supabase settings query fallback:', e);
      }
    }
    return settingsCache;
  },

  async saveSettings(settings: SiteSettings): Promise<void> {
    settingsCache = settings;
    setLocal(STORAGE_KEYS.SETTINGS, settings);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('site_settings').upsert({ ...settings, id: 'primary' });
      } catch (e) {
        console.error('Failed to sync site settings to Supabase:', e);
      }
    }
  },

  // Reset to default
  async resetAllToDefault(): Promise<void> {
    localStorage.clear();
  }
};
