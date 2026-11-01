import React, { useEffect, useState } from 'react';
import type { VoiceNote } from '../types';
import { memoryService } from '../services/memoryService';
import { SectionHeading } from '../components/ui/SectionHeading';
import { AudioPlayer } from '../components/ui/AudioPlayer';

export const HearMyVoice: React.FC = () => {
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>(() => memoryService.getVoiceNotesSync());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    memoryService.getVoiceNotes().then(notes => setVoiceNotes(notes));
  }, []);

  const categories = [
    { id: 'all', label: 'All Voice Notes' },
    { id: 'reassurance', label: 'Reassurance' },
    { id: 'miss_me', label: 'When You Miss Me' },
    { id: 'feel_low', label: 'When You Feel Low' },
    { id: 'make_smile', label: 'Make You Smile' },
    { id: 'random', label: 'Random Check-in' },
  ];

  const filteredNotes = selectedCategory === 'all'
    ? voiceNotes
    : voiceNotes.filter(n => n.category === selectedCategory);

  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADING */}
      <SectionHeading
        badge="Section 06 • Audio Vault"
        title="If You Cannot Hear Me Right Now..."
        subtitle="When you crave the sound of my voice, press play. These notes are here to remind you that I am listening and that you are never alone."
      />

      {/* FILTER BUTTONS */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-all touch-target ${
              selectedCategory === cat.id
                ? 'bg-[#C6A56B] text-[#101725] font-semibold shadow-[0_0_15px_rgba(198,165,107,0.4)]'
                : 'glass-card text-[#F5EBDD]/70 hover:text-[#F5EBDD] hover:border-[#C6A56B]/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* AUDIO CARDS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.map(note => (
          <AudioPlayer key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};
