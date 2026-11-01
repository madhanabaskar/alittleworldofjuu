import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Sparkles, Heart } from 'lucide-react';
import type { TimelineEvent } from '../types';
import { memoryService } from '../services/memoryService';
import { SectionHeading } from '../components/ui/SectionHeading';

export const OurStory: React.FC = () => {
  const [timeline, setTimeline] = useState<TimelineEvent[]>(() => memoryService.getTimelineSync());

  useEffect(() => {
    memoryService.getTimeline().then(events => {
      setTimeline(events);
    });
  }, []);

  return (
    <div className="py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADING */}
      <SectionHeading
        badge="Section 03 • The Timeline"
        title="Where Our Story Began"
        subtitle="Every unexpected coincidence, every whispered phone call, and every step that brought us here."
      />

      {/* SPECIAL HIGHLIGHT: 19 SEPTEMBER 2025 FIRST ENCOUNTER */}
      <div className="mb-16 glass-panel p-6 sm:p-8 rounded-3xl border border-[#C6A56B]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Heart className="w-48 h-48 text-[#C6A56B]" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-[#C6A56B] bg-[#101725]/80 border border-[#C6A56B]/25 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Origin • 19 September 2025</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#F5EBDD] mb-3">
            The Hospital Visit & The Accidental Strike
          </h3>

          <p className="font-sans text-sm sm:text-base text-[#F5EBDD]/80 leading-relaxed font-light mb-6">
            Juu was visiting the hospital, minding his own steps, when Laddu accidentally hit him during their very first encounter. It wasn't scripted like a movie — it was clumsy, unexpected, and completely genuine. That little accident became the opening sentence of our entire story.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#E0C79B]">
            <span className="flex items-center gap-1.5 bg-[#202C40]/80 px-3 py-1.5 rounded-full border border-[#C6A56B]/20">
              <Calendar className="w-3.5 h-3.5" /> 19 September 2025
            </span>
            <span className="flex items-center gap-1.5 bg-[#202C40]/80 px-3 py-1.5 rounded-full border border-[#C6A56B]/20">
              <MapPin className="w-3.5 h-3.5" /> Hospital Grounds
            </span>
            <span className="flex items-center gap-1.5 bg-[#75485B]/50 px-3 py-1.5 rounded-full border border-[#75485B]">
              <Heart className="w-3.5 h-3.5" /> Destiny's Favorite Clumsy Moment
            </span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE TIMELINE CONTAINER */}
      <div className="relative">
        {/* Central glowing vertical timeline connector line */}
        <div 
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#C6A56B] via-[#C6A56B]/40 to-transparent pointer-events-none"
        />

        <div className="space-y-12 md:space-y-16">
          {timeline.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={event.id}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? 'md:flex-row-reverse' : ''
                } gap-6 md:gap-12 pl-12 md:pl-0`}
              >
                {/* Timeline Node Orb */}
                <div 
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#182338] border-2 border-[#C6A56B] flex items-center justify-center shadow-[0_0_15px_rgba(198,165,107,0.5)] z-10"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F5EBDD] animate-ping" />
                </div>

                {/* Event Card Content */}
                <div className="w-full md:w-[calc(50%-2rem)]">
                  <div className="glass-card p-6 sm:p-7 rounded-2xl border border-[#C6A56B]/25 hover:border-[#C6A56B]/60 transition-all">
                    {/* Location Header */}
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-xs text-[#C6A56B] mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#C6A56B]" />
                        <span className="font-sans text-[11px] text-[#F5EBDD]/70">{event.location}</span>
                      </div>
                    )}

                    {/* Title */}
                    <h4 className="font-serif text-xl sm:text-2xl text-[#F5EBDD] mb-3">
                      {event.title}
                    </h4>

                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-[#F5EBDD]/80 leading-relaxed font-light mb-4">
                      {event.description}
                    </p>

                    {/* Optional Artistic Photo Frame */}
                    {event.photoUrl && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-[#C6A56B]/20 relative group">
                        <img
                          src={event.photoUrl}
                          alt={event.title}
                          className="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#101725] via-transparent to-transparent opacity-80" />
                        {event.photoCaption && (
                          <div className="absolute bottom-2 inset-x-3 text-[11px] font-sans text-[#F5EBDD]/70 italic">
                            {event.photoCaption}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Laddu Emotion Tag */}
                    {event.ladduEmotion && (
                      <div className="mt-4 pt-3 border-t border-[#C6A56B]/15 flex items-center gap-2 text-xs text-[#C6A56B] font-sans">
                        <span className="text-[11px] text-[#F5EBDD]/50">Emotion:</span>
                        <span className="italic">{event.ladduEmotion}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
