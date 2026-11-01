import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Image, Mail, Mic, CheckCircle2, Compass, 
  Database, LogOut, Plus, Trash2, ArrowLeft, Sparkles, Check,
  Upload, Loader2
} from 'lucide-react';
import { authService } from '../services/authService';
import { memoryService } from '../services/memoryService';
import { storageService, STORAGE_BUCKETS } from '../services/storageService';
import { getSupabaseStatus } from '../lib/supabase';
import type { Memory, Letter, VoiceNote, PromiseItem, FutureDreamItem } from '../types';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'memories' | 'letters' | 'voice' | 'promises' | 'future' | 'supabase'>('overview');
  const [isAdmin, setIsAdmin] = useState(authService.isAdminLoggedIn());
  const [loginMode, setLoginMode] = useState<'passcode' | 'supabase'>('passcode');
  const [adminKeyInput, setAdminKeyInput] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data states
  const [memories, setMemories] = useState<Memory[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [promises, setPromises] = useState<PromiseItem[]>([]);
  const [futureDreams, setFutureDreams] = useState<FutureDreamItem[]>([]);
  const [saveToast, setSaveToast] = useState('');

  // Form states for adding items
  const [newMemTitle, setNewMemTitle] = useState('');
  const [newMemDate, setNewMemDate] = useState('');
  const [newMemLocation, setNewMemLocation] = useState('');
  const [newMemUrl, setNewMemUrl] = useState('');
  const [newMemCaption, setNewMemCaption] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Voice note form states
  const [newVoiceTitle, setNewVoiceTitle] = useState('');
  const [newVoiceCategory, setNewVoiceCategory] = useState<'reassurance' | 'miss_me' | 'feel_low' | 'make_smile' | 'random'>('reassurance');
  const [newVoiceCaption, setNewVoiceCaption] = useState('');
  const [newVoiceUrl, setNewVoiceUrl] = useState('');
  const [newVoiceDuration, setNewVoiceDuration] = useState('');
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);

  const [newDreamTitle, setNewDreamTitle] = useState('');
  const [newDreamDesc, setNewDreamDesc] = useState('');
  const [newDreamLoc, setNewDreamLoc] = useState('');

  const supabaseStatus = getSupabaseStatus();

  useEffect(() => {
    // Check active session on mount
    authService.checkAdminSession().then((loggedIn) => {
      if (loggedIn) {
        setIsAdmin(true);
        loadAllData();
      }
    });
  }, []);

  const loadAllData = async () => {
    const mems = await memoryService.getMemories();
    const lets = await memoryService.getLetters();
    const voices = await memoryService.getVoiceNotes();
    const proms = await memoryService.getPromises();
    const dreams = await memoryService.getFutureDreams();

    setMemories(mems);
    setLetters(lets);
    setVoiceNotes(voices);
    setPromises(proms);
    setFutureDreams(dreams);
  };

  const showFeedback = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3500);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    if (loginMode === 'passcode') {
      const res = authService.loginAdmin(adminKeyInput);
      setIsLoggingIn(false);
      if (res.success) {
        setIsAdmin(true);
        loadAllData();
      } else {
        setLoginError(res.message);
      }
    } else {
      // Supabase Email & Password Login
      const res = await authService.supabaseSignIn(adminEmail, adminPassword);
      setIsLoggingIn(false);
      if (res.error) {
        setLoginError(res.error.message);
      } else {
        setIsAdmin(true);
        loadAllData();
      }
    }
  };

  const handleLogout = async () => {
    await authService.logoutAdmin();
    setIsAdmin(false);
  };

  // Direct Image File Upload to 'image-of_juu'
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const { url, error } = await storageService.uploadImage(file);
    setIsUploadingImage(false);

    if (error || !url) {
      showFeedback('Upload failed: ' + (error?.message || 'Check storage policies'));
    } else {
      setNewMemUrl(url);
      showFeedback('Photo uploaded to ' + STORAGE_BUCKETS.IMAGES + '!');
    }
  };

  // Direct Audio File Upload to 'voice_notes'
  const handleAudioFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Detect duration from audio file directly
    try {
      const audioUrl = URL.createObjectURL(file);
      const tempAudio = new Audio(audioUrl);
      tempAudio.addEventListener('loadedmetadata', () => {
        if (tempAudio.duration && isFinite(tempAudio.duration)) {
          const totalSecs = Math.round(tempAudio.duration);
          const m = Math.floor(totalSecs / 60);
          const s = totalSecs % 60;
          setNewVoiceDuration(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
        }
      });
    } catch (err) {
      console.warn('Could not read audio file metadata:', err);
    }

    setIsUploadingAudio(true);
    const { url, error } = await storageService.uploadVoiceNote(file);
    setIsUploadingAudio(false);

    if (error || !url) {
      showFeedback('Audio upload failed: ' + (error?.message || 'Check storage policies'));
    } else {
      setNewVoiceUrl(url);
      showFeedback('Audio uploaded to ' + STORAGE_BUCKETS.VOICE_NOTES + '!');
    }
  };

  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemTitle) return;

    await memoryService.addMemory({
      title: newMemTitle,
      date: newMemDate || new Date().toISOString().split('T')[0],
      displayDate: newMemDate || 'Recent Memory',
      location: newMemLocation || 'Our Safe Place',
      category: 'special',
      imageUrl: newMemUrl || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=800',
      caption: newMemCaption || 'A beautiful memory with my Laduuu.',
      isPlaceholder: false,
      tags: ['New Memory', 'Cherished']
    });

    setNewMemTitle('');
    setNewMemDate('');
    setNewMemLocation('');
    setNewMemUrl('');
    setNewMemCaption('');
    await loadAllData();
    showFeedback('New memory added to Supabase!');
  };

  const handleDeleteMemory = async (id: string) => {
    await memoryService.deleteMemory(id);
    await loadAllData();
    showFeedback('Memory removed.');
  };

  const handleAddVoiceNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVoiceTitle) return;

    const labels: Record<string, string> = {
      reassurance: 'A Little Reassurance',
      miss_me: 'When You Miss Me',
      feel_low: 'When You Feel Low',
      make_smile: 'When I Want to Make You Smile',
      random: 'Message from Juu'
    };

    // Parse MM:SS or seconds into integer seconds
    let parsedSeconds = 10;
    if (newVoiceDuration) {
      const parts = newVoiceDuration.trim().split(':').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        parsedSeconds = parts[0] * 60 + parts[1];
      } else if (parts.length === 1 && !isNaN(parts[0])) {
        parsedSeconds = parts[0];
      }
    }

    await memoryService.addVoiceNote({
      title: newVoiceTitle,
      category: newVoiceCategory,
      categoryLabel: labels[newVoiceCategory] || 'Message from Juu',
      duration: newVoiceDuration || '00:10',
      durationSeconds: parsedSeconds,
      caption: newVoiceCaption || 'Recorded with love for my Laddu.',
      audioUrl: newVoiceUrl,
      isPlaceholder: false
    });

    setNewVoiceTitle('');
    setNewVoiceCaption('');
    setNewVoiceUrl('');
    setNewVoiceDuration('');
    await loadAllData();
    showFeedback('Voice note added to Supabase!');
  };

  const handleDeleteVoiceNote = async (id: string) => {
    await memoryService.deleteVoiceNote(id);
    await loadAllData();
    showFeedback('Voice note removed.');
  };

  const handleAddDream = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDreamTitle) return;

    await memoryService.addFutureDream({
      title: newDreamTitle,
      description: newDreamDesc || 'An unforgettable adventure waiting for us.',
      location: newDreamLoc || 'A peaceful place',
      status: 'planned',
      category: 'peace',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800'
    });

    setNewDreamTitle('');
    setNewDreamDesc('');
    setNewDreamLoc('');
    await loadAllData();
    showFeedback('Future plan added to bucket list!');
  };

  // If Juu is not logged in as Admin, show login portal
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-radial-celestial">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-[#C6A56B]/30 text-center shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#182338] border border-[#C6A56B]/50 flex items-center justify-center mx-auto mb-4 text-[#C6A56B]">
            <Shield className="w-7 h-7" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#F5EBDD] mb-1">
            Juu's Private Studio
          </h2>
          <p className="font-sans text-xs text-[#F5EBDD]/60 mb-6 font-light">
            Cloud management portal for memories, letters, voice notes, and promises.
          </p>

          {/* Mode Switcher */}
          <div className="flex rounded-full bg-[#101725] p-1 border border-[#C6A56B]/20 mb-5 text-xs font-sans">
            <button
              type="button"
              onClick={() => { setLoginMode('passcode'); setLoginError(''); }}
              className={`flex-1 py-1.5 rounded-full transition-all ${
                loginMode === 'passcode'
                  ? 'bg-[#C6A56B] text-[#101725] font-semibold'
                  : 'text-[#F5EBDD]/60 hover:text-[#F5EBDD]'
              }`}
            >
              Secret Passcode
            </button>
            <button
              type="button"
              onClick={() => { setLoginMode('supabase'); setLoginError(''); }}
              className={`flex-1 py-1.5 rounded-full transition-all ${
                loginMode === 'supabase'
                  ? 'bg-[#C6A56B] text-[#101725] font-semibold'
                  : 'text-[#F5EBDD]/60 hover:text-[#F5EBDD]'
              }`}
            >
              Supabase Auth
            </button>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            {loginMode === 'passcode' ? (
              <input
                type="password"
                value={adminKeyInput}
                onChange={(e) => setAdminKeyInput(e.target.value)}
                placeholder="Enter Juu admin key..."
                className="w-full px-4 py-3 rounded-full bg-[#101725] text-sm text-[#F5EBDD] placeholder-[#F5EBDD]/40 border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B] touch-target"
                required
              />
            ) : (
              <div className="space-y-3">
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Supabase admin email..."
                  className="w-full px-4 py-2.5 rounded-full bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] placeholder-[#F5EBDD]/40 border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                  required
                />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Supabase password..."
                  className="w-full px-4 py-2.5 rounded-full bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] placeholder-[#F5EBDD]/40 border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                  required
                />
              </div>
            )}

            {loginError && (
              <p className="text-xs text-rose-300 font-sans">{loginError}</p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-full bg-[#C6A56B] hover:bg-[#E0C79B] disabled:opacity-50 text-[#101725] font-sans font-semibold text-xs tracking-widest uppercase transition-all touch-target flex items-center justify-center gap-2"
            >
              {isLoggingIn && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isLoggingIn ? 'Verifying...' : 'Unlock Studio'}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#C6A56B]/15">
            <Link to="/home" className="text-xs text-[#C6A56B] hover:underline font-sans">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101725] text-[#F5EBDD] py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast feedback notification */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#C6A56B] text-[#101725] px-4 py-2.5 rounded-full font-sans text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#C6A56B]/20 mb-8">
        <div className="flex items-center gap-3">
          <Link
            to="/home"
            className="p-2 rounded-full bg-[#182338] text-[#F5EBDD]/70 hover:text-[#C6A56B] border border-[#C6A56B]/20 touch-target"
            aria-label="Return home"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-cinzel text-lg sm:text-xl font-semibold text-[#F5EBDD] tracking-wider">
              JUU'S PRIVATE STUDIO
            </h1>
            <p className="font-sans text-xs text-[#C6A56B]">
              Supabase Cloud Manager • Buckets: <span className="font-mono text-[#F5EBDD]">{STORAGE_BUCKETS.IMAGES}</span> & <span className="font-mono text-[#F5EBDD]">{STORAGE_BUCKETS.VOICE_NOTES}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/home"
            className="px-3.5 py-1.5 rounded-full text-xs font-sans bg-[#182338] text-[#F5EBDD]/80 hover:text-[#F5EBDD] border border-[#C6A56B]/20"
          >
            Preview Site
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans bg-rose-950/60 text-rose-300 border border-rose-800/40 hover:bg-rose-900 transition-colors touch-target"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Tabs & Right Panel */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-1.5">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'memories', label: 'Memories', icon: Image, count: memories.length },
            { id: 'letters', label: 'Letters', icon: Mail, count: letters.length },
            { id: 'voice', label: 'Voice Notes', icon: Mic, count: voiceNotes.length },
            { id: 'promises', label: 'Promises', icon: CheckCircle2, count: promises.length },
            { id: 'future', label: 'Future Dreams', icon: Compass, count: futureDreams.length },
            { id: 'supabase', label: 'Supabase Info', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-sans text-xs tracking-wide transition-all touch-target ${
                  active
                    ? 'bg-[#C6A56B] text-[#101725] font-semibold shadow-lg shadow-[#C6A56B]/20'
                    : 'bg-[#182338]/60 text-[#F5EBDD]/70 hover:bg-[#182338] hover:text-[#F5EBDD]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                    active ? 'bg-[#101725] text-[#C6A56B]' : 'bg-[#101725]/60 text-[#F5EBDD]/60'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Main Work Area */}
        <div className="lg:col-span-4">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#C6A56B]/30">
                <h3 className="font-serif text-2xl text-[#F5EBDD] mb-2">
                  Welcome to your studio, Juu
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#F5EBDD]/70 font-light leading-relaxed max-w-2xl mb-6">
                  Here you can customize every letter, upload real photographs directly to your Supabase <code className="text-[#C6A56B] bg-[#101725] px-1.5 py-0.5 rounded">{STORAGE_BUCKETS.IMAGES}</code> bucket, record audio notes to <code className="text-[#C6A56B] bg-[#101725] px-1.5 py-0.5 rounded">{STORAGE_BUCKETS.VOICE_NOTES}</code>, and ensure Laddu always feels reassuring warmth whenever she visits.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#101725]/80 border border-[#C6A56B]/20">
                    <span className="text-2xl font-serif text-[#C6A56B]">{memories.length}</span>
                    <span className="block text-xs text-[#F5EBDD]/60 mt-1">Total Memories</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#101725]/80 border border-[#C6A56B]/20">
                    <span className="text-2xl font-serif text-[#C6A56B]">{letters.length}</span>
                    <span className="block text-xs text-[#F5EBDD]/60 mt-1">Open-When Letters</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#101725]/80 border border-[#C6A56B]/20">
                    <span className="text-2xl font-serif text-[#C6A56B]">{voiceNotes.length}</span>
                    <span className="block text-xs text-[#F5EBDD]/60 mt-1">Voice Notes</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#101725]/80 border border-[#C6A56B]/20">
                    <span className="text-2xl font-serif text-[#C6A56B]">{promises.length}</span>
                    <span className="block text-xs text-[#F5EBDD]/60 mt-1">Active Promises</span>
                  </div>
                </div>
              </div>

              {/* Status Alert */}
              <div className="glass-card p-6 rounded-2xl border border-[#C6A56B]/20 flex items-start gap-4">
                <Sparkles className="w-5 h-5 text-[#C6A56B] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#F5EBDD]/80 leading-relaxed font-sans font-light">
                  <p className="font-medium text-[#C6A56B] mb-1">Architecture Status: Live Supabase Connected</p>
                  <p>
                    All memory and audio services are directly connected to Supabase. Uploading photographs saves directly to <code className="text-[#C6A56B]">{STORAGE_BUCKETS.IMAGES}</code>, audio notes save to <code className="text-[#C6A56B]">{STORAGE_BUCKETS.VOICE_NOTES}</code>, and database records sync across all devices in real-time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MEMORIES MANAGER */}
          {activeTab === 'memories' && (
            <div className="space-y-6">
              {/* Add Memory Form */}
              <div className="glass-panel p-6 rounded-2xl border border-[#C6A56B]/30">
                <h3 className="font-serif text-xl text-[#F5EBDD] mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#C6A56B]" /> Add New Memory
                </h3>
                <form onSubmit={handleAddMemory} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Memory Title (e.g. Laughing by the shore)"
                      value={newMemTitle}
                      onChange={(e) => setNewMemTitle(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Display Date (e.g. 19 September 2025)"
                      value={newMemDate}
                      onChange={(e) => setNewMemDate(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                    />
                    <input
                      type="text"
                      placeholder="Location (e.g. Hospital Grounds)"
                      value={newMemLocation}
                      onChange={(e) => setNewMemLocation(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Image URL or upload from device →"
                        value={newMemUrl}
                        onChange={(e) => setNewMemUrl(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#182338] text-xs text-[#C6A56B] border border-[#C6A56B]/30 hover:bg-[#1f2d47] transition-colors shrink-0">
                        {isUploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        <span>{isUploadingImage ? 'Uploading...' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageFileChange}
                          disabled={isUploadingImage}
                        />
                      </label>
                    </div>
                  </div>
                  <textarea
                    placeholder="Heartfelt caption or story behind this memory..."
                    value={newMemCaption}
                    onChange={(e) => setNewMemCaption(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#C6A56B] text-[#101725] font-sans font-semibold text-xs tracking-wider uppercase hover:bg-[#E0C79B] transition-colors"
                  >
                    Save Memory to Cloud
                  </button>
                </form>
              </div>

              {/* Memory List */}
              <div className="space-y-3">
                {memories.map(m => (
                  <div key={m.id} className="glass-card p-4 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={m.imageUrl} alt={m.title} className="w-14 h-14 object-cover rounded-lg shrink-0 bg-black/40" />
                      <div>
                        <h4 className="font-serif text-base text-[#F5EBDD]">{m.title}</h4>
                        <span className="text-[11px] font-mono text-[#C6A56B]">{m.displayDate} • {m.location}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteMemory(m.id)}
                      className="p-2 rounded-lg text-rose-300 hover:bg-rose-950/60 transition-colors"
                      title="Delete memory"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LETTERS LIST */}
          {activeTab === 'letters' && (
            <div className="space-y-4">
              <div className="glass-panel p-6 rounded-2xl border border-[#C6A56B]/30">
                <h3 className="font-serif text-xl text-[#F5EBDD] mb-2">Open When Letters</h3>
                <p className="font-sans text-xs text-[#F5EBDD]/60 mb-6">
                  Review and customize the contents of Laddu’s 10 letters anytime.
                </p>
                <div className="space-y-3">
                  {letters.map((l, i) => (
                    <div key={l.id} className="p-4 rounded-xl bg-[#101725]/80 border border-[#C6A56B]/15 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#C6A56B]">Letter {i + 1} • {l.triggerFeeling}</span>
                        <h4 className="font-serif text-base text-[#F5EBDD] mt-0.5">{l.title}</h4>
                        <p className="text-xs text-[#F5EBDD]/60 font-sans line-clamp-1">{l.previewExcerpt}</p>
                      </div>
                      <span className="text-xs text-[#C6A56B] font-sans px-3 py-1 rounded-full bg-[#182338]">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VOICE NOTES */}
          {activeTab === 'voice' && (
            <div className="space-y-6">
              {/* Add Voice Note Form */}
              <div className="glass-panel p-6 rounded-2xl border border-[#C6A56B]/30">
                <h3 className="font-serif text-xl text-[#F5EBDD] mb-4 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#C6A56B]" /> Add New Voice Note
                </h3>
                <form onSubmit={handleAddVoiceNote} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Title (e.g. When You Miss My Voice)"
                      value={newVoiceTitle}
                      onChange={(e) => setNewVoiceTitle(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                      required
                    />
                    <select
                      value={newVoiceCategory}
                      onChange={(e) => setNewVoiceCategory(e.target.value as any)}
                      className="px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                    >
                      <option value="reassurance">Reassurance</option>
                      <option value="miss_me">When You Miss Me</option>
                      <option value="feel_low">When You Feel Low</option>
                      <option value="make_smile">When I Want to Make You Smile</option>
                      <option value="random">Random Message</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Estimated Duration (e.g. 02:15)"
                      value={newVoiceDuration}
                      onChange={(e) => setNewVoiceDuration(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Audio URL or upload audio file →"
                        value={newVoiceUrl}
                        onChange={(e) => setNewVoiceUrl(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#182338] text-xs text-[#C6A56B] border border-[#C6A56B]/30 hover:bg-[#1f2d47] transition-colors shrink-0">
                        {isUploadingAudio ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        <span>{isUploadingAudio ? 'Uploading...' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="audio/*"
                          className="hidden"
                          onChange={handleAudioFileChange}
                          disabled={isUploadingAudio}
                        />
                      </label>
                    </div>
                  </div>
                  <textarea
                    placeholder="Short description or gentle note about this recording..."
                    value={newVoiceCaption}
                    onChange={(e) => setNewVoiceCaption(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#C6A56B] text-[#101725] font-sans font-semibold text-xs tracking-wider uppercase hover:bg-[#E0C79B] transition-colors"
                  >
                    Save Voice Note
                  </button>
                </form>
              </div>

              {/* Voice Notes List */}
              <div className="space-y-3">
                {voiceNotes.map(v => (
                  <div key={v.id} className="p-4 rounded-xl bg-[#101725]/80 border border-[#C6A56B]/15 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#C6A56B]">{v.categoryLabel}</span>
                      <h4 className="font-serif text-base text-[#F5EBDD]">{v.title}</h4>
                      <p className="text-xs text-[#F5EBDD]/60 font-sans">{v.caption}</p>
                      {v.audioUrl && (
                        <span className="text-[10px] font-mono text-emerald-400 mt-1 block">Audio Linked ✓</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#E0C79B]">{v.duration}</span>
                      <button
                        onClick={() => handleDeleteVoiceNote(v.id)}
                        className="p-1.5 rounded-lg text-rose-300 hover:bg-rose-950/60 transition-colors"
                        title="Delete voice note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROMISES & ACCOUNTABILITY */}
          {activeTab === 'promises' && (
            <div className="glass-panel p-6 rounded-2xl border border-[#C6A56B]/30 space-y-4">
              <h3 className="font-serif text-xl text-[#F5EBDD]">Promises & Accountability Entries</h3>
              <p className="font-sans text-xs text-[#F5EBDD]/60 mb-4">
                Contains your personal commitments, including the beach night ride and argument accountability notes.
              </p>
              <div className="space-y-3">
                {promises.map(p => (
                  <div key={p.id} className="p-4 rounded-xl bg-[#101725]/80 border border-[#C6A56B]/15">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base text-[#F5EBDD]">{p.title}</h4>
                      <span className="text-[10px] font-mono text-[#C6A56B] uppercase">{p.category}</span>
                    </div>
                    <p className="text-xs text-[#F5EBDD]/70 font-sans mt-1">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FUTURE DREAMS */}
          {activeTab === 'future' && (
            <div className="space-y-6">
              <div className="glass-panel p-6 rounded-2xl border border-[#C6A56B]/30">
                <h3 className="font-serif text-xl text-[#F5EBDD] mb-4 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#C6A56B]" /> Add Future Dream
                </h3>
                <form onSubmit={handleAddDream} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Title of Dream (e.g. Seaside Sunrise Walk)"
                      value={newDreamTitle}
                      onChange={(e) => setNewDreamTitle(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Location (e.g. Pondicherry / Maldives)"
                      value={newDreamLoc}
                      onChange={(e) => setNewDreamLoc(e.target.value)}
                      className="px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                    />
                  </div>
                  <textarea
                    placeholder="Details about this dream and what you want to experience together..."
                    value={newDreamDesc}
                    onChange={(e) => setNewDreamDesc(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101725] text-xs sm:text-sm text-[#F5EBDD] border border-[#C6A56B]/30 focus:outline-none focus:border-[#C6A56B]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#C6A56B] text-[#101725] font-sans font-semibold text-xs tracking-wider uppercase hover:bg-[#E0C79B] transition-colors"
                  >
                    Add Dream
                  </button>
                </form>
              </div>

              <div className="space-y-3">
                {futureDreams.map(d => (
                  <div key={d.id} className="p-4 rounded-xl glass-card flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-base text-[#F5EBDD]">{d.title}</h4>
                      <p className="text-xs text-[#F5EBDD]/60 font-sans mt-0.5">{d.description}</p>
                    </div>
                    <span className="text-xs font-sans text-[#C6A56B] px-3 py-1 rounded-full bg-[#182338]">
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SUPABASE ARCHITECTURE INTEGRATION GUIDE */}
          {activeTab === 'supabase' && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#C6A56B]/30 space-y-6">
              <div className="flex items-center gap-3">
                <Database className="w-6 h-6 text-[#C6A56B]" />
                <h3 className="font-serif text-2xl text-[#F5EBDD]">
                  Supabase Cloud Status
                </h3>
              </div>

              <div className="p-4 rounded-2xl bg-[#101725] border border-[#C6A56B]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#F5EBDD]/70">Connection Status:</span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">ONLINE ✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#F5EBDD]/70">Images Bucket:</span>
                  <span className="text-xs font-mono text-[#C6A56B]">{STORAGE_BUCKETS.IMAGES}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#F5EBDD]/70">Voice Bucket:</span>
                  <span className="text-xs font-mono text-[#C6A56B]">{STORAGE_BUCKETS.VOICE_NOTES}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#101725] border border-[#C6A56B]/20">
                <span className="text-xs font-mono text-[#C6A56B] block mb-2 font-semibold">
                  Database Tables Active
                </span>
                <ul className="text-xs font-sans text-[#F5EBDD]/80 space-y-1.5 list-disc list-inside">
                  {supabaseStatus.recommendedTables.map((tbl, i) => (
                    <li key={i}>{tbl}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
