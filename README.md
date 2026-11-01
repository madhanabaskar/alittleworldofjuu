# A LITTLE WORLD OF JUU
### A Private Memory Universe for Juu × Laddu
**Tagline:** *Whenever You Need Me ❤️*  
**Supporting Line:** *A little piece of Juu, always close to your heart.*

---

## 🌙 Overview

A world-class, emotionally immersive, cinematic, mobile-first private relationship memory web application built exclusively for **Laddu** by **Juu**.

Whenever Laddu feels sad, lonely, stressed, misses Juu, or doubts whether she is loved, she can open this website and revisit their memories, listen to his voice, break the wax seal on personal letters, and find a safe, reassuring harbor.

---

## ✨ Features & The 12 Cinematic Sections

1. **Section 01 — The Secret Entrance (`/`)**
   - Full-screen midnight navy celestial background with glowing moon, twinkling starfield, floating golden stardust, and the welcome quote:
     > *"Some places are not found on maps. They are found in the hearts of two people."*
   - Password entry UI with visibility toggle and one-tap instant entrance for Laddu.

2. **Section 02 — Welcome to My Little World (`/home`)**
   - Hero greeting: *"Hey, my Laduuu..."*
   - Peaceful ambient chords toggle (synthesized Web Audio, never autoplays).
   - Direct gateway portals to all 12 memory chambers.
   - Prominent **"I NEED JUU RIGHT NOW ❤️"** emergency beacon.

3. **Section 03 — Our Story (`/story`)**
   - Interactive celestial timeline tracking the relationship journey:
     - **19 September 2025** hospital first encounter where Laddu accidentally hit Juu.
     - Growing closer through daily check-ins.
     - Meaningful conversations late into the night.
     - Falling in love without realizing when.
     - Standing strong through challenges and supporting each other.

4. **Section 04 — Our Little Memories (`/memories`)**
   - Responsive masonry/editorial gallery with category filters (*Firsts, Quiet Moments, Candid Smiles, Milestones & Dreams, Breeze & Travel*).
   - Full-screen interactive **Lightbox** with previous/next navigation, zoom toggle, and narrative captions.

5. **Section 05 — Letters for Every Little Feeling (`/letters`)**
   - 10 interactive wax-sealed envelopes that open with an animation and sound chime:
     1. Open when you miss me
     2. Open when you feel alone
     3. Open when you cry
     4. Open when you doubt yourself
     5. Open when you are stressed
     6. Open when you cannot sleep
     7. Open when you achieve something (with celebratory confetti!)
     8. Open when you need a hug
     9. Open when you are angry with me
     10. Open when you need to remember how special you are
   - Warm ivory typography on deep navy letter parchment with handwriting accents.

6. **Section 06 — Hear My Voice (`/voice`)**
   - Audio message vault with customized players, waveform visualizers, progress scrubbing, and replay.
   - Recording categories: *A Little Reassurance, When You Miss Me, When You Feel Low, Make You Smile, Random Check-in*.

7. **Section 07 — I Need Juu Right Now ❤️ (`/comfort`)**
   - The emotional centerpiece of the website.
   - Guided **Box Breathing Circle** (*Inhale 4s, Hold 4s, Exhale 4s*) with gentle visual pulse.
   - Exact comforting message reinforcing her self-worth, dreams, and feelings without invalidation.
   - Reassurance voice note and randomized happy memory spotlight.

8. **Section 08 — Things I Want to Keep Choosing (`/promises`)**
   - Sacred commitment journal covering patient communication, no blocking/uninstalling threats, quality time, and supporting Laddu's education.
   - **Dedicated Empathy & Accountability Section** for the two difficult memories:
     1. *The beach night ride incident* (acknowledging the hurt of "neeye poiko").
     2. *The argument threatening cut-off and uninstallation*.
     - Written with genuine apology, validation of Laddu's feelings, and clear commitments.

9. **Section 09 — All the Little Things About Juu (`/about-juu`)**
   - Playful interactive cards with nicknames (*Laduuu, Kutty, My Little Moon*), funny habits, favorite songs, food cravings, and what Juu adores about Laddu.

10. **Section 10 — Places We Still Have to See (`/future`)**
    - Dreamy future bucket list chapters:
      - A peaceful beach night ride (done right with warmth and care)
      - Watching the golden sunset together
      - Cheering at Laddu's graduation and achievements
      - Exploring cozy new towns together

11. **Section 11 — One Letter I Want You to Keep (`/letter`)**
    - Editorial full-screen personal letter from Juu with interactive wax seal break.
    - Honors her dreams, independence, studies, and promises consistency through actions.

12. **Section 12 — Until We Meet Again (`/ending`)**
    - Cinematic finale under a deep midnight sky with a glowing infinity emblem and parting words:
      > *"Whenever the world feels a little too loud, come back and remember the beautiful parts of our story..."*

13. **Juu's Private Admin Studio (`/admin`)**
    - Secret portal for Juu to manage memories, add letters, upload voice notes, update promises, and manage bucket list items.
    - Passcode: `juuadmin`

---

## 🛠️ Technology Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** & Custom CSS Keyframe Animations
- **React Router DOM v7**
- **Lucide React Icons**
- **Web Audio API** (Procedural ambient celestial synthesizer chords)
- **Canvas Confetti**
- **@supabase/supabase-js** (Prepared architecture)

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🎶 Music System Architecture (Placeholder Mode)

The website features a decoupled, section-reactive background music controller:

- **Global Context Provider:** [MusicContext.tsx](file:///d:/Always_laddu/src/context/MusicContext.tsx) manages a single audio controller, persisted volume, mute state, and smooth volume crossfading.
- **Section-Based Themes:** Track mapping in [musicConfig.ts](file:///d:/Always_laddu/src/config/musicConfig.ts) automatically shifts themes as Laddu navigates:
  - **Main Theme:** `public/music/main-theme.mp3` (*Home, About Juu*)
  - **Memories Theme:** `public/music/memories-theme.mp3` (*Our Story, Memories*)
  - **Letters Theme:** `public/music/letters-theme.mp3` (*Open When, Love Letter*)
  - **Comfort Theme:** `public/music/comfort-theme.mp3` (*I Need Juu Right Now*)
  - **Future Theme:** `public/music/future-theme.mp3` (*Someday, Together*)
  - **Ending Theme:** `public/music/ending-theme.mp3` (*Until We Meet Again*)
- **Voice Note Ducking:** When a voice recording plays in `AudioPlayer`, the background music volume automatically drops to 15% (audio ducking), and restores smoothly when the voice note ends.
- **Floating Player:** [FloatingMusicPlayer.tsx](file:///d:/Always_laddu/src/components/music/FloatingMusicPlayer.tsx) provides a compact, collapsible UI with dancing audio visualizer bars, volume slider, and track info. Sits safely above the bottom navigation on mobile.
- **Placeholder Mode:** Missing audio files are caught and handled gracefully with zero console crashes or playback errors. Simply drop the actual `.mp3` files into `public/music/` and `public/audio/` whenever ready.

---

## 🔐 Supabase Integration Guide

The frontend operates with a decoupled service layer in `src/services/memoryService.ts` and `src/lib/supabase.ts`.

To connect your private Supabase backend:
1. Copy `.env.example` to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
2. Enable Row Level Security (RLS) and create the recommended tables:
   - `memories`
   - `letters`
   - `voice_notes`
   - `promises`
   - `future_dreams`
3. Create private storage buckets for photos and voice recordings.
