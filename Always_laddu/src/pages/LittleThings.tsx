import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, Coffee, Music, Smile, Zap, Moon, Shield, Star } from 'lucide-react';
import type { LittleThingItem } from '../types';
import { memoryService } from '../services/memoryService';
import { SectionHeading } from '../components/ui/SectionHeading';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Heart,
  Coffee,
  Music,
  Smile,
  Zap,
  Moon,
  Shield,
  Star
};

export const LittleThings: React.FC = () => {
  const [items, setItems] = useState<LittleThingItem[]>(() => memoryService.getLittleThingsSync());
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    memoryService.getLittleThings().then(data => setItems(data));
  }, []);

  const categories = [
    { id: 'all', label: 'All Quirks & Details' },
    { id: 'nicknames', label: 'Nicknames' },
    { id: 'about_laddu', label: 'What I Adore About You' },
    { id: 'habits', label: 'Funny Habits' },
    { id: 'jokes', label: 'Inside Jokes' },
    { id: 'favorites', label: 'Favorites & Songs' },
  ];

  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(it => {
        if (activeFilter === 'favorites') return it.category === 'favorites' || it.category === 'songs' || it.category === 'food';
        return it.category === activeFilter;
      });

  return (
    <div className="py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADING */}
      <SectionHeading
        badge="Section 09 • Personal Quirks & Secrets"
        title="All the Little Things That Make Me, Me"
        subtitle="The silly habits, food cravings, unspoken inside jokes, and the things that make Juu laugh and love you even more."
      />

      {/* FILTER TABS */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-all touch-target ${
              activeFilter === cat.id
                ? 'bg-[#C6A56B] text-[#101725] font-semibold shadow-[0_0_15px_rgba(198,165,107,0.4)]'
                : 'glass-card text-[#F5EBDD]/70 hover:text-[#F5EBDD] hover:border-[#C6A56B]/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* INTERACTIVE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const IconComponent = iconMap[item.icon] || Sparkles;

          return (
            <div
              key={item.id}
              className="glass-card p-6 rounded-2xl border border-[#C6A56B]/20 hover:border-[#C6A56B]/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#101725] border border-[#C6A56B]/30 flex items-center justify-center text-[#C6A56B]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  {item.tag && (
                    <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-[#C6A56B] bg-[#182338] px-2.5 py-1 rounded-full border border-[#C6A56B]/20">
                      {item.tag}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl text-[#F5EBDD] mb-2">
                  {item.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#F5EBDD]/75 leading-relaxed font-light mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#C6A56B]/15 text-[11px] font-sans text-[#F5EBDD]/40 italic">
                A tiny slice of Juu’s world
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
