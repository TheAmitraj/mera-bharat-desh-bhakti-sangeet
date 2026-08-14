import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ListMusic,
  Youtube,
  Radio,
  ExternalLink,
  X
} from 'lucide-react';
import { PATRIOTIC_TRACKS } from '../data/playlist';
import { Track } from '../types';

interface MusicPlayerProps {
  tracks?: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (seconds: number) => void;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onSelectTrack: (index: number) => void;
  showVideo: boolean;
  onToggleVideo: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  tracks = PATRIOTIC_TRACKS,
  currentTrackIndex,
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
  onSeek,
  currentTime,
  duration,
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
  onSelectTrack,
  showVideo,
  onToggleVideo,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHoveringProgress, setIsHoveringProgress] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);

  const allTracks = tracks && tracks.length > 0 ? tracks : PATRIOTIC_TRACKS;
  const currentTrack: Track = allTracks[currentTrackIndex] || allTracks[0];

  // Each song now plays as its own individual video stream
  const effectiveDuration = duration > 0 ? duration : (currentTrack.duration || 180);
  const trackElapsed = Math.max(0, Math.min(currentTime, effectiveDuration));
  const trackProgressPercent = effectiveDuration > 0
    ? Math.min(100, Math.max(0, (trackElapsed / effectiveDuration) * 100))
    : 0;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const fraction = Math.max(0, Math.min(1, clickX / width));
    const targetSecond = fraction * effectiveDuration;
    onSeek(targetSecond);
  };

  const handleProgressBarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const width = rect.width;
    const fraction = Math.max(0, Math.min(1, moveX / width));
    setHoverTime(fraction * effectiveDuration);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const activeVideoUrl = currentTrack?.youtubeUrl || `https://www.youtube.com/watch?v=${currentTrack?.youtubeVideoId}`;

  return (
    <>
      {/* Tracklist Drawer Modal */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
          onClick={() => setIsDrawerOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-neutral-900 border border-white/10 rounded-t-3xl sm:rounded-3xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListMusic className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-hindi text-lg font-bold text-white">गीतों की सूची (Tracklist)</h3>
                  <p className="text-xs text-neutral-400">सभी गानों के अपने ओरिजिनल यूट्यूब लिंक्स मौजूद हैं</p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-3 space-y-1.5 flex-1">
              {allTracks.map((track, idx) => {
                const isSelected = idx === currentTrackIndex;
                return (
                  <div
                    key={track.id}
                    className={`w-full p-3 rounded-xl flex items-center justify-between gap-3 transition-all ${
                      isSelected
                        ? 'bg-amber-500/15 border border-amber-500/40 text-amber-300'
                        : 'hover:bg-neutral-800/80 text-neutral-300 border border-transparent'
                    }`}
                  >
                    <button
                      onClick={() => {
                        onSelectTrack(idx);
                        setIsDrawerOpen(false);
                      }}
                      className="flex-1 flex items-center gap-3 overflow-hidden text-left cursor-pointer"
                    >
                      <span className="w-6 text-center text-xs font-mono text-neutral-500">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <div className="font-hindi font-medium text-sm truncate">{track.title}</div>
                        <div className="text-xs text-neutral-400 truncate">{track.movieOrArtist}</div>
                      </div>
                    </button>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={track.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                        title="सीधे यूट्यूब पर देखें"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Youtube className="w-4 h-4" />
                      </a>
                      <span className="text-xs font-mono text-neutral-400">
                        {formatTime(track.duration)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Glassmorphism Player */}
      <div
        id="fixed-music-player"
        className="fixed bottom-0 left-0 right-0 z-40 glass-player border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] select-none px-3 py-2.5 sm:px-6 sm:py-3"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          {/* Top Row: Progress Bar (interactive seek) */}
          <div className="w-full flex items-center gap-3 text-[11px] font-mono text-neutral-400">
            <span className="w-9 text-right">{formatTime(trackElapsed)}</span>
            
            <div
              className="relative flex-1 h-2 bg-neutral-800/90 rounded-full cursor-pointer group py-1"
              onClick={handleProgressBarClick}
              onMouseMove={handleProgressBarMouseMove}
              onMouseEnter={() => setIsHoveringProgress(true)}
              onMouseLeave={() => setIsHoveringProgress(false)}
            >
              {/* Background Track */}
              <div className="absolute inset-0 bg-neutral-800 rounded-full overflow-hidden">
                {/* Buffered / Filled Track with saffron/gold gradient */}
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-full transition-all duration-100 relative shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                  style={{ width: `${trackProgressPercent}%` }}
                />
              </div>

              {/* Progress Thumb Knob */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.8)] border border-amber-400 scale-0 group-hover:scale-100 transition-transform pointer-events-none"
                style={{ left: `calc(${trackProgressPercent}% - 7px)` }}
              />

              {/* Tooltip on Hover */}
              {isHoveringProgress && hoverTime !== null && (
                <div
                  className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 bg-neutral-900 border border-white/10 rounded text-[10px] text-white shadow-lg pointer-events-none"
                  style={{ left: `${(hoverTime / effectiveDuration) * 100}%` }}
                >
                  {formatTime(hoverTime)}
                </div>
              )}
            </div>

            <span className="w-9 text-left">{formatTime(effectiveDuration)}</span>
          </div>

          {/* Bottom Row: Track Info, Playback Controls, Volume & Extra Tools */}
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Current Playing Info */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 max-w-[40%] sm:max-w-[32%]">
              {/* Disc Artwork / Soundwave icon */}
              <div
                onClick={() => setIsDrawerOpen(true)}
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neutral-900 border border-amber-500/30 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden group shadow-md"
                title="गीतों की सूची खोलें"
              >
                <div className="w-full h-full bg-gradient-to-tr from-amber-950/60 to-neutral-900 flex items-center justify-center">
                  {isPlaying ? (
                    <div className="flex items-end gap-0.5 h-4 sm:h-5">
                      <span className="w-0.5 bg-amber-400 animate-soundbar-1 rounded-full" />
                      <span className="w-0.5 bg-amber-400 animate-soundbar-2 rounded-full" />
                      <span className="w-0.5 bg-amber-400 animate-soundbar-3 rounded-full" />
                      <span className="w-0.5 bg-amber-400 animate-soundbar-4 rounded-full" />
                    </div>
                  ) : (
                    <Radio className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  )}
                </div>
              </div>

              {/* Title & Artist */}
              <div className="min-w-0 overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-hindi text-xs sm:text-sm font-bold text-neutral-100 truncate">
                    {currentTrack.title}
                  </h4>
                  <a
                    href={activeVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-red-500 hover:text-red-400"
                    title="इस गीत का यूट्यूब लिंक"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-400 truncate">
                  {currentTrack.originalSinger || currentTrack.movieOrArtist}
                </p>
              </div>
            </div>

            {/* Middle: Core Playback Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Previous Track */}
              <button
                id="player-btn-prev"
                onClick={onPrev}
                className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-full transition-all cursor-pointer"
                title="पिछला गीत"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Play / Pause Main Button */}
              <button
                id="player-btn-play-pause"
                onClick={onPlayPause}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-300/40"
                title={isPlaying ? 'संगीत रोकें (Space)' : 'संगीत चलाएँ (Space)'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>

              {/* Next Track */}
              <button
                id="player-btn-next"
                onClick={onNext}
                className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-800/80 rounded-full transition-all cursor-pointer"
                title="अगला गीत"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Right: Volume & Utility Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Volume Slider & Mute Toggle */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  id="player-btn-mute"
                  onClick={onToggleMute}
                  className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? 'अनम्यूट करें' : 'म्यूट करें'}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="w-16 lg:w-24 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  title={`आवाज़: ${volume}%`}
                />
              </div>

              {/* Toggle Video Preview */}
              <button
                id="player-btn-video-toggle"
                onClick={onToggleVideo}
                className={`p-2 rounded-xl text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${
                  showVideo
                    ? 'bg-red-600/20 border-red-500/40 text-red-300'
                    : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
                title="यूट्यूब वीडियो विंडो"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span className="hidden md:inline text-[11px]">वीडियो</span>
              </button>

              {/* Tracklist Drawer button */}
              <button
                id="player-btn-drawer"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="p-2 rounded-xl bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white hover:border-amber-400/40 transition-all cursor-pointer"
                title="गीतों की सूची"
              >
                <ListMusic className="w-4 h-4 text-amber-400" />
              </button>

              {/* Fullscreen Button */}
              <button
                id="player-btn-fullscreen"
                onClick={toggleFullscreen}
                className="hidden lg:block p-2 rounded-xl bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
                title="पूर्ण स्क्रीन (Fullscreen)"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
