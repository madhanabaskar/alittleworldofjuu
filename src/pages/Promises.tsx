import React, { useEffect, useState } from 'react';
import { CheckCircle2, Heart, AlertCircle, Feather } from 'lucide-react';
import type { PromiseItem } from '../types';
import { memoryService } from '../services/memoryService';
import { SectionHeading } from '../components/ui/SectionHeading';

export const Promises: React.FC = () => {
  const [promises, setPromises] = useState<PromiseItem[]>(() => memoryService.getPromisesSync());

  useEffect(() => {
    memoryService.getPromises().then(data => setPromises(data));
  }, []);

  const standardPromises = promises.filter(p => !p.isAccountabilityNote);
  const accountabilityNotes = promises.filter(p => p.isAccountabilityNote);

  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* SECTION HEADING */}
      <SectionHeading
        badge="Section 08 • Sacred Commitments"
        title="Things I Want to Keep Choosing"
        subtitle="Love is not just a feeling experienced on easy days; it is a daily discipline of patience, communication, and showing up with consistency."
      />

      {/* CORE PROMISES JOURNAL */}
      <div className="space-y-6 mb-16">
        {standardPromises.map((promise, index) => (
          <div
            key={promise.id}
            className="glass-panel p-6 sm:p-7 rounded-2xl border border-[#C6A56B]/25 hover:border-[#C6A56B]/60 transition-all shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#182338] border border-[#C6A56B]/40 flex items-center justify-center shrink-0 text-[#C6A56B] mt-0.5 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F5EBDD]">
                    {promise.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#C6A56B] bg-[#101725] px-2.5 py-0.5 rounded-full border border-[#C6A56B]/20">
                    Promise 0{index + 1}
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#C6A56B] font-medium mb-2">
                  {promise.summary}
                </p>

                <p className="font-sans text-xs sm:text-sm text-[#F5EBDD]/80 font-light leading-relaxed">
                  {promise.detail}
                </p>

                <div className="mt-4 pt-3 border-t border-[#C6A56B]/15 flex items-center justify-between text-xs text-[#F5EBDD]/50 font-sans">
                  <span>Juu’s personal commitment</span>
                  <span className="text-[#C6A56B] flex items-center gap-1">
                    <Feather className="w-3 h-3" /> Dedicated to Laddu
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SECTION: EMPATHY, ACKNOWLEDGEMENT & ACCOUNTABILITY */}
      <div className="mt-20 pt-12 border-t border-[#C6A56B]/30">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-sans tracking-widest uppercase font-medium bg-[#75485B]/50 border border-[#75485B] text-[#F5EBDD] mb-3">
            <Heart className="w-3.5 h-3.5 text-[#C6A56B]" />
            <span>Honesty, Apology & Healing</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-[#F5EBDD]">
            Accountability For Difficult Moments
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#F5EBDD]/70 max-w-xl mx-auto mt-2 font-light leading-relaxed">
            Real growth requires acknowledging pain without excuses. Your feelings were never "too sensitive" — they were human, valid, and hurt by mistakes I made.
          </p>
        </div>

        <div className="space-y-8">
          {accountabilityNotes.map((note) => (
            <div
              key={note.id}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#75485B]/80 bg-[#182338]/90 relative overflow-hidden shadow-xl"
            >
              {/* Incident Header */}
              <div className="flex items-center gap-2.5 text-xs text-[#C6A56B] font-mono uppercase tracking-wider mb-2">
                <AlertCircle className="w-4 h-4 text-[#C6A56B]" />
                <span>{note.incidentTitle}</span>
              </div>

              <h4 className="font-serif text-2xl sm:text-3xl text-[#F5EBDD] mb-4">
                {note.title}
              </h4>

              {/* Sincere Narrative Apology */}
              <p className="font-sans text-sm sm:text-base text-[#F5EBDD]/85 leading-relaxed font-light mb-6">
                {note.detail}
              </p>

              {/* Two Column Breakdown: What was felt vs Juu's commitment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#C6A56B]/20">
                <div className="p-4 rounded-xl bg-[#101725]/80 border border-[#75485B]/50">
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#F5EBDD]/50 block mb-1">
                    What Laddu Felt (Validated & Acknowledged)
                  </span>
                  <p className="font-serif text-sm text-[#F5EBDD]/90 italic leading-relaxed">
                    "{note.ladduFeelingAcknowledged}"
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#202C40]/80 border border-[#C6A56B]/30">
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#C6A56B] block mb-1">
                    Juu’s Chosen Commitment Going Forward
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#F5EBDD]/90 leading-relaxed font-light">
                    {note.juuCommitment}
                  </p>
                </div>
              </div>

              {/* Juu review banner */}
              <div className="mt-5 text-[11px] font-sans text-[#F5EBDD]/40 text-center italic">
                * Kept as a permanent reminder of empathy, listening, and prioritizing your safety above ego.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
