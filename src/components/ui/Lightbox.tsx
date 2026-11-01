import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { Memory } from '../../types';

interface LightboxProps {
  memory: Memory | null;
  memories?: Memory[];
  onClose: () => void;
  onSelectMemory?: (memory: Memory) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  memory,
  onClose
}) => {
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
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [memory, onClose]);

  if (!memory) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-3 sm:p-6 bg-[#080D17]/95 backdrop-blur-2xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
      onClick={onClose}
    >
      {/* Fixed Close Button: Always in the EXACT same place above the image for every photo */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] p-2.5 sm:p-3 rounded-full bg-[#182338]/90 hover:bg-[#75485B] text-[#F5EBDD] hover:text-white border border-[#C6A56B]/40 shadow-2xl transition-all touch-target flex items-center justify-center hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xl"
        aria-label="Close photo viewer"
        title="Close (Esc)"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Pure Image Container - Centered, no arrows, no overlay buttons */}
      <div 
        className="relative max-w-full max-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl border border-[#C6A56B]/30 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.95)] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={memory.imageUrl}
          alt=""
          className="object-contain max-h-[82vh] sm:max-h-[85vh] max-w-[92vw] sm:max-w-[85vw] md:max-w-4xl select-none"
          onError={(e) => {
            e.currentTarget.style.opacity = '0.5';
          }}
        />
      </div>
    </div>,
    document.body
  );
};
