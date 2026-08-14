import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { QuotesSection } from './components/QuotesSection';
import { PlaylistSection } from './components/PlaylistSection';
import { MusicPlayer } from './components/MusicPlayer';
import { YouTubeSync } from './components/YouTubeSync';
import { TricolorEffects } from './components/TricolorEffects';
import { DeveloperContact } from './components/DeveloperContact';
import { Footer } from './components/Footer';
import { PATRIOTIC_TRACKS, PLAYLIST_TITLE } from './data/playlist';
import { CelebrationMode, Track } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  // 1. Automatic Date Detection for Independence / Republic Day
  const getInitialMode = (): CelebrationMode => {
    const today = new Date();
    const month = today.getMonth(); // 0 = Jan, 7 = Aug
    const day = today.getDate();

    if (month === 7 && day === 15) {
      return '15-august';
    } else if (month === 0 && day === 26) {
      return '26-january';
    }
    return 'everyday';
  };

  const [activeMode, setActiveMode] = useState<CelebrationMode>(getInitialMode);
  const [isDevModalOpen, setIsDevModalOpen] = useState<boolean>(false);

  // 2. Tracks State (Default curated list + custom added songs)
  const [tracks, setTracks] = useState<Track[]>(() => {
    try {
      const savedCustom = localStorage.getItem('mb_custom_tracks');
      if (savedCustom) {
        const parsed = JSON.parse(savedCustom);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return [...PATRIOTIC_TRACKS, ...parsed];
        }
      }
    } catch (e) {
      // ignore
    }
    return PATRIOTIC_TRACKS;
  });

  // 3. Playback and Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(() => {
    const saved = localStorage.getItem('mb_track_idx');
    const idx = saved !== null ? Number(saved) : 0;
    return idx >= 0 && idx < PATRIOTIC_TRACKS.length ? idx : 0;
  });
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(PATRIOTIC_TRACKS[0].duration);
  const [targetSeekTime, setTargetSeekTime] = useState<number | null>(null);

  const [volume, setVolume] = useState<number>(() => {
    const savedVol = localStorage.getItem('mb_volume');
    return savedVol !== null ? Number(savedVol) : 85;
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  // 4. Tricolor wave visual effect state & toast
  const [isTricolorWaveActive, setIsTricolorWaveActive] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<any>(null);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Show Toast Feedback
  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Trigger Tricolor Wave
  const triggerTricolorWave = useCallback(() => {
    setIsTricolorWaveActive(true);
    showToast('🇮🇳 तिरंगा तरंग सक्रिय!');
    setTimeout(() => {
      setIsTricolorWaveActive(false);
    }, 2500);
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('mb_track_idx', currentTrackIndex.toString());
  }, [currentTrackIndex]);

  useEffect(() => {
    localStorage.setItem('mb_volume', volume.toString());
  }, [volume]);

  // Track selection handler
  const handleSelectTrack = (index: number) => {
    const targetTrack = tracks[index];
    if (!targetTrack) return;
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setDuration(targetTrack.duration || 180);
    setTargetSeekTime(targetTrack.startTime || 0);
    setIsPlaying(true);
    showToast(`▶ ${targetTrack.title}`);
  };

  // Play / Pause Toggle
  const handlePlayPause = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    showToast(nextState ? '▶ संगीत शुरू' : '⏸ संगीत रुका हुआ');
  };

  // Prev / Next Track handlers
  const handlePrevTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1;
    handleSelectTrack(prevIndex);
  };

  const handleNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    handleSelectTrack(nextIndex);
  };

  // Seek handler from progress bar
  const handleSeek = (seconds: number) => {
    setTargetSeekTime(seconds);
    setCurrentTime(seconds);
  };

  // Volume Handlers
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (newVol > 0 && isMuted) setIsMuted(false);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Add custom track handler
  const handleAddTrack = (newTrack: Track) => {
    const updated = [...tracks, newTrack];
    setTracks(updated);
    try {
      const customOnly = updated.filter(t => t.isCustom);
      localStorage.setItem('mb_custom_tracks', JSON.stringify(customOnly));
    } catch (e) {
      // ignore
    }
    const newIdx = updated.length - 1;
    handleSelectTrack(newIdx);
    showToast(`✨ नया गीत जोड़ा गया: ${newTrack.title}`);
  };

  // Global Keyboard Shortcuts (T for Tricolor wave, Space for Play/Pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        triggerTricolorWave();
      } else if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, triggerTricolorWave]);

  // Time update from YouTube player sync
  const handleTimeUpdate = (curr: number, dur: number) => {
    setCurrentTime(curr);
    if (dur > 0) setDuration(dur);
  };

  // Main CTA action: Start music and smoothly scroll to playlist
  const handleMainStartCTA = () => {
    setIsPlaying(true);
    showToast('▶ देशभक्ति संगीत शुरू हुआ');
    const playlistElement = document.getElementById('playlist-section');
    if (playlistElement) {
      playlistElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-600 selection:text-white relative pb-28">
      {/* Background Visual Effects (Tricolor glow, floating particles, wave animation) */}
      <TricolorEffects isTricolorWaveActive={isTricolorWaveActive} mode={activeMode} />

      {/* Floating Interactive Toast */}
      {toastMessage && (
        <div
          id="status-toast"
          className="fixed top-18 right-4 sm:right-8 z-50 px-4 py-2.5 rounded-xl glass-card border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center gap-2 animate-bounce-subtle select-none"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <Navbar
        currentMode={activeMode}
        onSelectMode={(mode) => {
          setActiveMode(mode);
          showToast(
            mode === '15-august'
              ? '🇮🇳 स्वतंत्रता दिवस मोड'
              : mode === '26-january'
              ? '🏛️ गणतंत्र दिवस मोड'
              : '✨ सदाबहार देशभक्ति मोड'
          );
        }}
        onTriggerTricolor={triggerTricolorWave}
        isPlaying={isPlaying}
        onTogglePlay={handlePlayPause}
        onOpenDeveloper={() => setIsDevModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onStartMusic={handleMainStartCTA}
          onTriggerTricolor={triggerTricolorWave}
          isPlaying={isPlaying}
          activeMode={activeMode}
        />

        {/* Emotional Patriotic Quotes Section */}
        <QuotesSection />

        {/* Patriotic Music Playlist Section */}
        <PlaylistSection
          tracks={tracks}
          currentTrackIndex={currentTrackIndex}
          isPlaying={isPlaying}
          onSelectTrack={handleSelectTrack}
          showVideo={showVideo}
          onToggleVideo={() => setShowVideo(!showVideo)}
          onAddTrack={handleAddTrack}
        />

        {/* Dedicated Developer Profile & Contact Section */}
        <DeveloperContact />
      </main>

      {/* Developer Profile Modal Dialog */}
      <DeveloperContact
        isModal
        isOpen={isDevModalOpen}
        onClose={() => setIsDevModalOpen(false)}
      />

      {/* YouTube Player Controller & Sync engine */}
      <YouTubeSync
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayerReady={() => setIsPlayerReady(true)}
        onStateChange={(playing) => setIsPlaying(playing)}
        onTimeUpdate={handleTimeUpdate}
        onTrackEnded={handleNextTrack}
        targetSeekTime={targetSeekTime}
        onSeekComplete={() => setTargetSeekTime(null)}
        volume={volume}
        isMuted={isMuted}
        showVideo={showVideo}
        onCloseVideo={() => setShowVideo(false)}
      />

      {/* Fixed Bottom Glassmorphism Music Player */}
      <MusicPlayer
        tracks={tracks}
        currentTrackIndex={currentTrackIndex}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onPrev={handlePrevTrack}
        onNext={handleNextTrack}
        onSeek={handleSeek}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        onVolumeChange={handleVolumeChange}
        onToggleMute={handleToggleMute}
        onSelectTrack={handleSelectTrack}
        showVideo={showVideo}
        onToggleVideo={() => setShowVideo(!showVideo)}
      />

      {/* Respectful National Pride Footer */}
      <Footer onOpenDeveloper={() => setIsDevModalOpen(true)} />
    </div>
  );
}
