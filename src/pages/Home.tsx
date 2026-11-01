import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Compass, Image, Mail, Mic, CheckCircle2, Sparkles, BookOpen, ArrowRight, Star } from 'lucide-react';
import { MoonGlow } from '../components/animations/MoonGlow';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  const portalCards = [
    {
      to: '/story',
      badge: 'Section 03',
      title: 'Where Our Story Began',
      desc: 'From our hospital encounter on 19 September 2025 to falling in love.',
      icon: Compass,
      accent: 'from-[#182338] to-[#202C40]',
      highlight: '19 Sep 2025'
    },
    {
      to: '/memories',
      badge: 'Section 04',
      title: 'Little Moments, Forever Treasured',
      desc: 'Every candid smile, quiet evening call, and precious memory preserved.',
      icon: Image,
      accent: 'from-[#202C40] to-[#182338]',
      highlight: 'Gallery & Lightbox'
    },
    {
      to: '/letters',
      badge: 'Section 05',
      title: 'Letters for Every Little Feeling',
      desc: '10 interactive letters to open when you miss me, cry, or need reassurance.',
      icon: Mail,
      accent: 'from-[#75485B]/40 to-[#182338]',
      highlight: '10 Envelopes'
    },
    {
      to: '/voice',
      badge: 'Section 06',
      title: 'If You Cannot Hear Me Right Now...',
      desc: 'Voice notes from Juu for when you miss my voice or need to smile.',
      icon: Mic,
      accent: 'from-[#182338] to-[#202C40]',
      highlight: 'Voice Notes'
    },
    {
      to: '/promises',
      badge: 'Section 08',
      title: 'Things I Want to Keep Choosing',
      desc: 'Listening, patience, supporting your dreams, and honest accountability.',
      icon: CheckCircle2,
      accent: 'from-[#202C40] to-[#182338]',
      highlight: 'Promises & Care'
    },
    {
      to: '/about-juu',
      badge: 'Section 09',
      title: 'All the Little Things About Juu',
      desc: 'Nicknames, silly habits, favorites, and what I secretly adore about you.',
      icon: Sparkles,
      accent: 'from-[#75485B]/30 to-[#202C40]',
      highlight: 'Playful Details'
    },
    {
      to: '/future',
      badge: 'Section 10',
      title: 'Places We Still Have to See',
      desc: 'A peaceful beach ride, sunsets, and celebrating your achievements.',
      icon: Compass,
      accent: 'from-[#182338] to-[#202C40]',
      highlight: 'Future Dreams'
    },
    {
      to: '/letter',
      badge: 'Section 11',
      title: 'One Letter I Want You to Keep',
      desc: 'A full-screen personal letter with handwritten accents from Juu.',
      icon: BookOpen,
      accent: 'from-[#75485B]/50 to-[#182338]',
      highlight: 'From Juu'
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* SECTION 02: HERO HEADER */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Ambient celestial backdrop glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(198,165,107,0.3) 0%, rgba(117,72,91,0.2) 50%, transparent 80%)' }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Glowing Moon Illustration */}
          <div className="mb-6 flex justify-center">
            <MoonGlow size="sm" />
          </div>

          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-sans tracking-widest uppercase font-medium bg-[#182338]/80 border border-[#C6A56B]/30 text-[#C6A56B] mb-6 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#C6A56B]" />
            <span>Whenever You Need Me</span>
          </div>

          {/* Hero Greeting */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-[#F5EBDD] tracking-tight leading-tight mb-6">
            Hey, my <span className="font-handwriting text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#C6A56B]">Laduuu...</span>
          </h1>

          {/* Hero Message */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#F5EBDD]/80 font-sans font-light leading-relaxed mb-10">
            If today feels a little heavy, stay here for a moment. This little world holds pieces of our story, my voice, our memories and everything I want you to remember.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link to="/memories" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                ENTER OUR MEMORIES
              </Button>
            </Link>

            <Link to="/comfort" className="w-full sm:w-auto">
              <Button variant="emergency" size="lg" icon={<Heart className="w-4 h-4 text-white fill-white" />} className="w-full sm:w-auto">
                I NEED JUU RIGHT NOW ❤️
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* REASSURANCE BANNER */}
      <section className="px-4 max-w-5xl mx-auto mb-16">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#C6A56B]/30 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs font-sans tracking-widest uppercase text-[#C6A56B] font-semibold">
                A Gentle Reminder
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F5EBDD] mt-1 mb-2">
                Your feelings matter. Your dreams matter.
              </h3>
              <p className="text-xs sm:text-sm text-[#F5EBDD]/70 font-sans max-w-xl font-light leading-relaxed">
                You deserve consistency, patience, and respect. Difficult days do not define your life, and you don’t have to carry the whole world on your shoulders today.
              </p>
            </div>

            <Link to="/comfort" className="shrink-0">
              <Button variant="wine" size="md">
                Take a Deep Breath
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* EXPLORE ALL EXPERIENCES / PORTALS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="text-center mb-12">
          <span className="text-xs font-sans tracking-widest uppercase text-[#C6A56B] font-semibold">
            Chapters Of Our World
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F5EBDD] mt-1">
            Revisit Every Precious Piece
          </h2>
          <p className="text-xs sm:text-sm text-[#F5EBDD]/60 font-sans mt-2 max-w-md mx-auto font-light">
            Tap any memory chamber below to explore letters, voice notes, and our shared journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {portalCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className="group relative p-6 rounded-2xl glass-card flex flex-col justify-between overflow-hidden border border-[#C6A56B]/20 hover:border-[#C6A56B]/50 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-[#C6A56B] bg-[#101725]/80 px-2.5 py-0.5 rounded-full border border-[#C6A56B]/20">
                      {card.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#101725]/80 flex items-center justify-center text-[#C6A56B] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg text-[#F5EBDD] group-hover:text-[#C6A56B] transition-colors mb-2">
                    {card.title}
                  </h3>

                  <p className="font-sans text-xs text-[#F5EBDD]/65 leading-relaxed font-light mb-4">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#C6A56B]/15 flex items-center justify-between text-xs text-[#C6A56B]">
                  <span className="font-sans text-[11px] tracking-wide text-[#F5EBDD]/50">
                    {card.highlight}
                  </span>
                  <span className="flex items-center gap-1 font-medium group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
