import React, { useEffect, useState } from 'react';
import { MapPin, Sparkles, Maximize2, Image as ImageIcon, BookOpen } from 'lucide-react';
import type { Memory } from '../types';
import { memoryService } from '../services/memoryService';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Lightbox } from '../components/ui/Lightbox';

export const Memories: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>(() => memoryService.getMemoriesSync());
  const [filteredMemories, setFilteredMemories] = useState<Memory[]>(() => memoryService.getMemoriesSync());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [viewMode, setViewMode] = useState<'both' | 'cards' | 'gallery'>('both');

  useEffect(() => {
    memoryService.getMemories().then(data => {
      setMemories(data);
      if (activeCategory === 'all') {
        setFilteredMemories(data);
      } else {
        setFilteredMemories(data.filter(m => m.category === activeCategory));
      }
    });
  }, [activeCategory]);

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredMemories(memories);
    } else {
      setFilteredMemories(memories.filter(m => m.category === category));
    }
  };

  const categories = [
    { id: 'all', label: 'All Memories' },
    { id: 'firsts', label: 'Firsts' },
    { id: 'quiet_moments', label: 'Quiet Moments' },
    { id: 'candid', label: 'Candid Smiles' },
    { id: 'special', label: 'Milestones & Dreams' },
    { id: 'travel', label: 'Breeze & Travel' },
  ];

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADING */}
      <SectionHeading
        badge="Section 04 • Memory Chamber"
        title="Little Moments, Forever Treasured"
        subtitle="Photographs and memories frozen in time. Whenever you doubt how deeply you are loved, revisit these pieces of our journey."
      />

      {/* VIEW MODE TOGGLE SWITCHER */}
      <div className="flex items-center justify-center flex-wrap gap-2.5 mb-8">
        <button
          onClick={() => setViewMode('both')}
          className={`px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-all touch-target flex items-center gap-2 ${
            viewMode === 'both'
              ? 'bg-[#C6A56B] text-[#101725] font-semibold shadow-[0_0_15px_rgba(198,165,107,0.4)]'
              : 'glass-card text-[#F5EBDD]/70 hover:text-[#F5EBDD] hover:border-[#C6A56B]/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full Experience (Stories & Gallery)</span>
        </button>

        <button
          onClick={() => setViewMode('cards')}
          className={`px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-all touch-target flex items-center gap-2 ${
            viewMode === 'cards'
              ? 'bg-[#C6A56B] text-[#101725] font-semibold shadow-[0_0_15px_rgba(198,165,107,0.4)]'
              : 'glass-card text-[#F5EBDD]/70 hover:text-[#F5EBDD] hover:border-[#C6A56B]/40'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Story Cards</span>
        </button>

        <button
          onClick={() => setViewMode('gallery')}
          className={`px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-all touch-target flex items-center gap-2 ${
            viewMode === 'gallery'
              ? 'bg-[#C6A56B] text-[#101725] font-semibold shadow-[0_0_15px_rgba(198,165,107,0.4)]'
              : 'glass-card text-[#F5EBDD]/70 hover:text-[#F5EBDD] hover:border-[#C6A56B]/40'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Pure Gallery (Images Only)</span>
        </button>
      </div>

      {/* CATEGORY FILTER TABS (When showing cards) */}
      {(viewMode === 'both' || viewMode === 'cards') && (
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all touch-target ${
                activeCategory === cat.id
                  ? 'bg-[#C6A56B]/20 text-[#C6A56B] border border-[#C6A56B]/60 font-semibold shadow-[0_0_12px_rgba(198,165,107,0.25)]'
                  : 'glass-card text-[#F5EBDD]/60 hover:text-[#F5EBDD] hover:border-[#C6A56B]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* NOTICE REGARDING REAL MEMORIES */}
      <div className="mb-10 text-center">
        <p className="text-xs text-[#C6A56B]/90 font-sans max-w-lg mx-auto italic">
          ✨ Every candid smile, quiet walk, and look full of love — preserved just for you, Laddu.
        </p>
      </div>

      {/* SECTION 1: EDITORIAL GALLERY GRID (STORY CARDS WITH NARRATIVE) */}
      {(viewMode === 'both' || viewMode === 'cards') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMemories.map((mem) => (
            <div
              key={mem.id}
              onClick={() => setSelectedMemory(mem)}
              className="group glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between border border-[#C6A56B]/20 hover:border-[#C6A56B]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-lg"
            >
              {/* Image Box - Portrait ratio with object-top ensures face is never cropped */}
              <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-black/40">
                <img
                  src={mem.imageUrl}
                  alt={mem.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const parts = mem.imageUrl.split('/');
                    const fileName = parts[parts.length - 1]?.split('?')[0];
                    if (fileName && !target.src.includes('/images/juu/')) {
                      target.src = `/images/juu/${decodeURIComponent(fileName)}`;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101725] via-transparent to-transparent opacity-80" />

                {/* Top floating badges */}
                {mem.isPlaceholder && (
                  <div className="absolute top-3 right-3 flex items-center">
                    <span className="text-[10px] text-[#C6A56B] bg-[#182338]/90 px-2 py-0.5 rounded-full border border-[#C6A56B]/30">
                      Art Placeholder
                    </span>
                  </div>
                )}

                {/* Location pin */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-[#F5EBDD]/80">
                  <MapPin className="w-3.5 h-3.5 text-[#C6A56B]" />
                  <span className="font-sans text-[11px]">{mem.location}</span>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#F5EBDD] group-hover:text-[#C6A56B] transition-colors mb-2">
                    {mem.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#F5EBDD]/85 leading-relaxed font-light mb-4">
                    {mem.caption}
                  </p>
                </div>

                {/* Tags Footer */}
                <div className="pt-3 border-t border-[#C6A56B]/15 flex flex-wrap gap-1.5">
                  {mem.tags.map(tag => (
                    <span key={tag} className="text-[10px] sm:text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-[#182338] text-[#E0C79B] border border-[#C6A56B]/15">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 2: SEPARATE PURE PHOTO GALLERY (IMAGES ONLY, NO CONTENT) */}
      {(viewMode === 'both' || viewMode === 'gallery') && (
        <section 
          id="pure-photo-gallery" 
          className={viewMode === 'both' ? 'mt-24 pt-16 border-t border-[#C6A56B]/20' : 'mt-4'}
        >
          <SectionHeading
            badge="Section 04.B • Unfiltered Frames"
            title="Pure Photo Gallery"
            subtitle="Images of Juu"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {memories.map((mem, index) => (
              <div
                key={`gallery-${mem.id || index}`}
                onClick={() => setSelectedMemory(mem)}
                className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-[#C6A56B]/25 hover:border-[#C6A56B]/80 transition-all duration-500 hover:-translate-y-1.5 shadow-lg hover:shadow-[0_12px_35px_rgba(198,165,107,0.3)] cursor-pointer bg-black/40"
                title="Tap to view full screen"
              >
                {/* Pure Image Only */}
                <img
                  src={mem.imageUrl}
                  alt=""
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const parts = mem.imageUrl.split('/');
                    const fileName = parts[parts.length - 1]?.split('?')[0];
                    if (fileName && !target.src.includes('/images/juu/')) {
                      target.src = `/images/juu/${decodeURIComponent(fileName)}`;
                    }
                  }}
                />

                {/* Ambient Golden Vignette on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101725]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Hover Expand Icon */}
                <div className="absolute bottom-3 right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#101725]/85 backdrop-blur-md border border-[#C6A56B]/40 flex items-center justify-center text-[#C6A56B] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FULL SCREEN LIGHTBOX */}
      <Lightbox
        memory={selectedMemory}
        memories={memories}
        onClose={() => setSelectedMemory(null)}
        onSelectMemory={(m) => setSelectedMemory(m)}
      />
    </div>
  );
};
