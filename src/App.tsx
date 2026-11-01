import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { StarField } from './components/animations/StarField';
import { FloatingParticles } from './components/animations/FloatingParticles';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { MusicProvider } from './context/MusicContext';
import { FloatingMusicPlayer } from './components/music/FloatingMusicPlayer';
import { authService } from './services/authService';

// Pages
import { Entrance } from './pages/Entrance';
import { Home } from './pages/Home';
import { OurStory } from './pages/OurStory';
import { Memories } from './pages/Memories';
import { PhotoGallery } from './pages/PhotoGallery';
import { OpenWhen } from './pages/OpenWhen';
import { HearMyVoice } from './pages/HearMyVoice';
import { Comfort } from './pages/Comfort';
import { Promises } from './pages/Promises';
import { LittleThings } from './pages/LittleThings';
import { FutureDreams } from './pages/FutureDreams';
import { LoveLetter } from './pages/LoveLetter';
import { Ending } from './pages/Ending';
import { AdminDashboard } from './admin/AdminDashboard';

// Auto-scroll to top on route navigation (instant, eliminates scrolling jumps)
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Strict Protected Route: Only opens if the user entered the correct entrance password
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isUnlocked = authService.isEntranceUnlocked();
  if (!isUnlocked) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Animated Route Container for silky-smooth navigation without jumping or overlap
const AnimatedRouteContent: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <main key={pathname} className="flex-1 z-10 pb-28 lg:pb-12 animate-page-enter">
      <Routes>
        {/* Public Entrance Portal */}
        <Route path="/" element={<Entrance />} />

        {/* Protected Website Routes - Strictly accessible ONLY after correct entrance password */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/story" element={<ProtectedRoute><OurStory /></ProtectedRoute>} />
        <Route path="/memories" element={<ProtectedRoute><Memories /></ProtectedRoute>} />
        <Route path="/gallery" element={<ProtectedRoute><PhotoGallery /></ProtectedRoute>} />
        <Route path="/letters" element={<ProtectedRoute><OpenWhen /></ProtectedRoute>} />
        <Route path="/voice" element={<ProtectedRoute><HearMyVoice /></ProtectedRoute>} />
        <Route path="/comfort" element={<ProtectedRoute><Comfort /></ProtectedRoute>} />
        <Route path="/promises" element={<ProtectedRoute><Promises /></ProtectedRoute>} />
        <Route path="/about-juu" element={<ProtectedRoute><LittleThings /></ProtectedRoute>} />
        <Route path="/future" element={<ProtectedRoute><FutureDreams /></ProtectedRoute>} />
        <Route path="/letter" element={<ProtectedRoute><LoveLetter /></ProtectedRoute>} />
        <Route path="/ending" element={<ProtectedRoute><Ending /></ProtectedRoute>} />

        {/* Admin Studio */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Catch-all redirect to Entrance */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
};

export function App() {
  return (
    <Router>
      <MusicProvider>
        <ScrollToTop />
        {/* Cinematic Star Field & Golden Floating Particles Background */}
        <StarField density={60} />
        <FloatingParticles count={16} />

        <div className="relative min-h-screen flex flex-col justify-between selection:bg-[#C6A56B]/30 selection:text-[#F5EBDD]">
          {/* Top Navbar */}
          <Navbar />

          {/* Dynamic Animated Route Content (Fast, zero delay, zero jumping) */}
          <AnimatedRouteContent />

          {/* Global Floating Music Player */}
          <FloatingMusicPlayer />

          {/* Mobile Navigation (Footer removed) */}
          <BottomNav />
        </div>
      </MusicProvider>
    </Router>
  );
}

export default App;
