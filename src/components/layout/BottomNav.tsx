import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Image, Mail, Heart, Menu, X, Mic, CheckCircle2, Sparkles, BookOpen, Lock } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  // Hide on Entrance screen
  if (location.pathname === '/') return null;

  const isActive = (path: string) => location.pathname === path;

  const mainTabs = [
    { to: '/home', label: 'Home', icon: Home },
    { to: '/story', label: 'Story', icon: Compass },
    { to: '/comfort', label: 'Need Juu', icon: Heart, isSpecial: true },
    { to: '/memories', label: 'Memories', icon: Image },
  ];

  const drawerLinks = [
    { to: '/letters', label: 'Open When Letters', icon: Mail, highlight: true },
    { to: '/letter', label: 'A Letter For You', icon: BookOpen },
    { to: '/voice', label: 'Hear My Voice', icon: Mic },
    { to: '/promises', label: 'Our Little Promises', icon: CheckCircle2 },
    { to: '/about-juu', label: 'Little Things About Juu', icon: Sparkles },
    { to: '/future', label: 'Someday, Together', icon: Compass },
    { to: '/ending', label: 'Until We Meet Again', icon: Sparkles },
    { to: '/admin', label: "Juu's Admin Studio", icon: Lock },
  ];

  return (
    <>
      {/* Mobile Bottom Fixed Bar (hidden on desktop lg:hidden) */}
      <nav 
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#101725]/95 backdrop-blur-2xl border-t border-[#C6A56B]/25 pb-safe"
        aria-label="Mobile Navigation"
      >
        <div className="grid grid-cols-5 h-16 w-full max-w-lg mx-auto px-1 items-center">
          {mainTabs.map(tab => {
            const active = isActive(tab.to);
            const Icon = tab.icon;

            if (tab.isSpecial) {
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className="flex flex-col items-center justify-center w-full -mt-5 focus:outline-none touch-target"
                  aria-label="I Need Juu Right Now"
                >
                  <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#75485B] via-[#943F5B] to-[#C6A56B] flex items-center justify-center shadow-[0_0_20px_rgba(148,63,91,0.7)] border-2 border-[#F5EBDD] active:scale-90 transition-transform">
                    <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
                  </div>
                  <span className="text-[10px] font-sans font-semibold tracking-wider text-[#C6A56B] mt-1 whitespace-nowrap">
                    Need Juu
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={tab.to}
                to={tab.to}
                className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] transition-colors ${
                  active ? 'text-[#C6A56B]' : 'text-[#F5EBDD]/60 hover:text-[#F5EBDD]'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.2]' : 'stroke-1.5'}`} />
                <span className={`text-[10px] font-sans tracking-wide mt-1 ${active ? 'font-medium' : 'font-light'}`}>
                  {tab.label}
                </span>
                {active && <span className="w-1 h-1 rounded-full bg-[#C6A56B] mt-0.5" />}
              </Link>
            );
          })}

          {/* More Sheet Trigger */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={`flex flex-col items-center justify-center w-full py-1 min-h-[44px] transition-colors ${
              isMoreOpen ? 'text-[#C6A56B]' : 'text-[#F5EBDD]/60 hover:text-[#F5EBDD]'
            }`}
            aria-label="Open more navigation options"
          >
            <Menu className="w-5 h-5 stroke-1.5" />
            <span className="text-[10px] font-sans tracking-wide mt-1 font-light">More</span>
          </button>
        </div>
      </nav>

      {/* Slide-out "More" Menu Drawer */}
      {isMoreOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#101725]/80 backdrop-blur-md flex flex-col justify-end">
          <div 
            className="w-full bg-[#182338] border-t border-[#C6A56B]/30 rounded-t-3xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="All Sections"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#C6A56B]/20 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌙</span>
                <span className="font-serif text-lg text-[#F5EBDD]">A Little World of Juu</span>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-2 rounded-full bg-[#202C40] text-[#F5EBDD]/70 hover:text-[#F5EBDD] touch-target"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {drawerLinks.map(link => {
                const Icon = link.icon;
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMoreOpen(false)}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all ${
                      link.highlight 
                        ? 'bg-gradient-to-r from-[#75485B]/50 to-[#202C40] border border-[#C6A56B]/40 text-[#F5EBDD]' 
                        : active 
                          ? 'bg-[#202C40] text-[#C6A56B] border border-[#C6A56B]/30 font-medium'
                          : 'bg-[#101725]/60 text-[#F5EBDD]/80 hover:bg-[#202C40]/60'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 ${link.highlight ? 'text-[#C6A56B]' : ''}`} />
                    <span className="text-sm font-sans tracking-wide">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#C6A56B]/15 text-center text-xs text-[#F5EBDD]/50 font-serif italic">
              "Some places are not found on maps. They are found in the hearts of two people."
            </div>
          </div>
        </div>
      )}
    </>
  );
};
