import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import type { FutureDreamItem } from '../types';
import { memoryService } from '../services/memoryService';
import { SectionHeading } from '../components/ui/SectionHeading';

export const FutureDreams: React.FC = () => {
  const [dreams, setDreams] = useState<FutureDreamItem[]>(() => memoryService.getFutureDreamsSync());

  useEffect(() => {
    memoryService.getFutureDreams().then(data => setDreams(data));
  }, []);

  const getStatusBadge = (status: FutureDreamItem['status']) => {
    switch (status) {
      case 'planned':
        return { label: 'In Our Plans', color: 'bg-[#C6A56B] text-[#101725] font-semibold' };
      case 'holding_close':
        return { label: 'Holding Close', color: 'bg-[#75485B] text-white' };
      case 'dreaming':
      default:
        return { label: 'Dreaming Together', color: 'bg-[#202C40] text-[#E0C79B] border border-[#C6A56B]/30' };
    }
  };

  return (
    <div className="py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADING */}
      <SectionHeading
        badge="Section 10 • Someday, Together"
        title="Places We Still Have to See"
        subtitle="Future chapters waiting to be written. Quiet evenings, celebrated milestones, and adventures that will make our hearts full."
      />

      {/* DREAMS LIST / CHAPTER CARDS */}
      <div className="space-y-8">
        {dreams.map((dream, index) => {
          const badge = getStatusBadge(dream.status);

          return (
            <div
              key={dream.id}
              className="glass-card rounded-3xl overflow-hidden border border-[#C6A56B]/25 hover:border-[#C6A56B]/60 transition-all duration-300 shadow-xl flex flex-col md:flex-row"
            >
              {/* Optional Landscape Imagery */}
              {dream.imageUrl && (
                <div className="w-full md:w-2/5 aspect-16/9 md:aspect-auto min-h-[200px] relative overflow-hidden bg-black/40">
                  <img
                    src={dream.imageUrl}
                    alt={dream.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#101725] via-transparent to-transparent opacity-75" />
                </div>
              )}

              {/* Dream Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-[#C6A56B] tracking-wider uppercase">
                      Chapter 0{index + 1}
                    </span>
                    <span className={`text-[11px] font-sans px-3 py-1 rounded-full ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F5EBDD] mb-3">
                    {dream.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#F5EBDD]/80 leading-relaxed font-light mb-6">
                    {dream.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C6A56B]/15 flex items-center justify-between text-xs text-[#F5EBDD]/60 font-sans">
                  {dream.location && (
                    <span className="flex items-center gap-1.5 text-[#C6A56B]">
                      <MapPin className="w-3.5 h-3.5" />
                      {dream.location}
                    </span>
                  )}
                  <span className="italic">
                    Waiting for the right quiet day
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
