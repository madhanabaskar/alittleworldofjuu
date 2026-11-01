import React, { useEffect, useState } from 'react';
import { Maximize2, Sparkles, Heart } from 'lucide-react';
import type { Memory } from '../types';
import { memoryService } from '../services/memoryService';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Lightbox } from '../components/ui/Lightbox';
import { Link } from 'react-router-dom';

export const PhotoGallery: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>(() => memoryService.getMemoriesSync());
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    memoryService.getMemories().then(data => {
      setMemories(data);
    });
  }, []);

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADING */}
      <SectionHeading
        badge="Visual Archive • Pure Gallery"
        title="Just You, Just Us"
        subtitle="Images of Juu"
      />

      {/* QUICK STATS & SWITCHER BAR */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-4 border-b border-[#C6A56B]/20">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C6A56B] bg-[#101725]/80 px-4 py-2 rounded-full border border-[#C6A56B]/25">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A56B]" />
          <span>{memories.length} Photographs Frozen in Time</span>
        </div>

        <Link
          to="/memories"
          className="text-xs font-sans text-[#F5EBDD]/75 hover:text-[#C6A56B] glass-card px-4 py-2 rounded-full border border-[#C6A56B]/30 hover:border-[#C6A56B] transition-all flex items-center gap-2"
        >
          <Heart className="w-3.5 h-3.5 text-[#C6A56B]" />
          <span>View With Story Captions & Memories</span>
        </Link>
      </div>

      {/* PURE PHOTO GALLERY GRID (NO CONTENT, ONLY IMAGES) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
        {memories.map((mem, index) => (
          <div
            key={mem.id || index}
            onClick={() => setSelectedMemory(mem)}
            className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-[#C6A56B]/25 hover:border-[#C6A56B]/80 transition-all duration-500 hover:-translate-y-1.5 shadow-lg hover:shadow-[0_12px_35px_rgba(198,165,107,0.3)] cursor-pointer bg-black/40"
            title="Click to view full screen"
          >
            {/* Pure Photo */}
            {mem.imageUrl && (mem.imageUrl.startsWith('http://') || mem.imageUrl.startsWith('https://') || mem.imageUrl.startsWith('data:')) ? (
              <img
                src={mem.imageUrl}
                alt=""
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0.5';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#101725]/60 animate-pulse">
                <Sparkles className="w-5 h-5 text-[#C6A56B]/40 animate-spin" />
              </div>
            )}

            {/* Subtle Gradient Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101725]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Subtle Zoom/Expand Badge */}
            <div className="absolute bottom-3 right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#101725]/85 backdrop-blur-md border border-[#C6A56B]/40 flex items-center justify-center text-[#C6A56B] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-md">
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX FOR FULL SCREEN VIEW */}
      <Lightbox
        memory={selectedMemory}
        memories={memories}
        onClose={() => setSelectedMemory(null)}
        onSelectMemory={(m) => setSelectedMemory(m)}
      />
    </div>
  );
};
