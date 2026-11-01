import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Calendar, MapPin, Tag } from 'lucide-react';
import type { Memory } from '../../types';

interface LightboxProps {
  memory: Memory | null;
  memories: Memory[];
  onClose: () => void;
  onSelectMemory: (memory: Memory) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  memory,
  memories,
  onClose,
  onSelectMemory
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (memory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [memory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!memory) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [memory, memories]);

  if (!memory) return null;

  const currentIndex = memories.findIndex(m => m.id === memory.id);
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex - 1 + memories.length) % memories.length;
    setIsZoomed(false);
    onSelectMemory(memories[nextIdx]);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (currentIndex + 1) % memories.length;
    setIsZoomed(false);
    onSelectMemory(memories[nextIdx]);
  };

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#080D17]/95 backdrop-blur-2xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={memory.title}
      onClick={onClose}
    >
      {/* Modal Card Container */}
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row bg-[#101725] rounded-2xl sm:rounded-3xl overflow-y-auto md:overflow-hidden border border-[#C6A56B]/35 shadow-[0_16px_50px_rgba(0,0,0,0.95)] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Controls Header Bar on Mobile */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#101725]/95 backdrop-blur-md border-b border-[#C6A56B]/20 shrink-0 sm:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#C6A56B] bg-[#182338] px-3 py-1 rounded-full border border-[#C6A56B]/30">
              {currentIndex + 1} / {memories.length}
            </span>
            <span className="text-xs text-[#F5EBDD] font-serif truncate max-w-[160px]">
              {memory.title}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 rounded-full bg-[#182338] text-[#F5EBDD] hover:text-[#C6A56B] border border-[#C6A56B]/20 touch-target flex items-center justify-center"
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#75485B]/70 text-white hover:bg-[#75485B] border border-[#C6A56B]/30 touch-target flex items-center justify-center"
              aria-label="Close memory viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Top Floating Controls */}
        <div className="hidden sm:flex absolute top-4 right-4 items-center gap-2 z-20">
          <div className="text-xs font-mono text-[#C6A56B] bg-[#101725]/90 px-3 py-1 rounded-full border border-[#C6A56B]/30 shadow-md">
            {currentIndex + 1} / {memories.length}
          </div>
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full bg-[#101725]/90 text-[#F5EBDD] hover:text-[#C6A56B] border border-[#C6A56B]/20 shadow-md transition-colors touch-target flex items-center justify-center"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#101725]/90 text-[#F5EBDD] hover:text-[#C6A56B] border border-[#C6A56B]/20 shadow-md transition-colors touch-target flex items-center justify-center"
            aria-label="Close memory viewer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image Frame Section - Shows FULL image with zero dead space above */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-[500px] max-h-[55vh] md:max-h-[85vh] p-2 sm:p-4 shrink-0 md:shrink">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className={`object-contain max-h-full max-w-full rounded-xl transition-transform duration-300 ${
              isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
            onError={(e) => {
              const target = e.currentTarget;
              const parts = memory.imageUrl.split('/');
              const fileName = parts[parts.length - 1]?.split('?')[0];
              if (fileName && !target.src.includes('/images/juu/')) {
                target.src = `/images/juu/${decodeURIComponent(fileName)}`;
              }
            }}
          />

          {/* Navigation Arrows positioned on image */}
          <button
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-[#101725]/85 hover:bg-[#202C40] text-[#F5EBDD] hover:text-[#C6A56B] border border-[#C6A56B]/30 shadow-2xl transition-all z-10 touch-target flex items-center justify-center"
            aria-label="Previous memory"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-[#101725]/85 hover:bg-[#202C40] text-[#F5EBDD] hover:text-[#C6A56B] border border-[#C6A56B]/30 shadow-2xl transition-all z-10 touch-target flex items-center justify-center"
            aria-label="Next memory"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Narrative & Details Section - Smoothly scrollable right below image */}
        <div className="w-full md:w-84 lg:w-96 p-5 sm:p-6 flex flex-col justify-between bg-[#141C2D] overflow-y-visible md:overflow-y-auto border-t md:border-t-0 md:border-l border-[#C6A56B]/20">
          <div>
            <div className="flex items-center gap-2.5 text-xs text-[#C6A56B] mb-2 font-sans">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {memory.displayDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 truncate">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {memory.location}
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#F5EBDD] mb-3 leading-snug">
              {memory.title}
            </h3>

            <p className="font-sans text-sm text-[#F5EBDD]/90 leading-relaxed font-light mb-5">
              {memory.caption}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {memory.tags.map(t => (
                <span key={t} className="inline-flex items-center gap-1 text-[11px] px-3 py-1 rounded-full bg-[#1A253A] text-[#E0C79B] border border-[#C6A56B]/25">
                  <Tag className="w-2.5 h-2.5" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 pb-8 sm:pb-0 border-t border-[#C6A56B]/20 text-xs text-[#F5EBDD]/50 font-sans italic">
            A piece of our story preserved for whenever you look back.
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
