import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Youtube, ExternalLink, AlertTriangle, Play, RefreshCw, Volume2, ShieldCheck } from 'lucide-react';
import { Track } from '../types';
import { getTrackVideoId } from '../data/playlist';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubeSyncProps {
  currentTrack: Track;
  isPlaying: boolean;
  onPlayerReady: () => void;
  onStateChange: (isPlaying: boolean) => void;
  onTimeUpdate: (currentTime: number, duration: number) => void;
  onTrackEnded: () => void;
  targetSeekTime: number | null;
  onSeekComplete: () => void;
  volume: number;
  isMuted: boolean;
  showVideo: boolean;
  onCloseVideo: () => void;
}

export const YouTubeSync: React.FC<YouTubeSyncProps> = ({
  currentTrack,
  isPlaying,
  onPlayerReady,
  onStateChange,
  onTimeUpdate,
  onTrackEnded,
  targetSeekTime,
  onSeekComplete,
  volume,
  isMuted,
  showVideo,
  onCloseVideo,
}) => {
  const playerRef = useRef<any>(null);
  const timeIntervalRef = useRef<any>(null);
  const simulatedTimeRef = useRef<number>(0);
  const isSimulatedActiveRef = useRef<boolean>(false);
  const currentVideoId = getTrackVideoId(currentTrack);
  const currentVideoIdRef = useRef<string>(currentVideoId);
  const [embedError, setEmbedError] = useState<string | null>(null);
  const [apiReady, setApiReady] = useState<boolean>(false);

  // Initialize and load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      initPlayer();
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setApiReady(true);
      initPlayer();
    };

    return () => {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    };
  }, []);

  // Safe timer loop that ensures lyrics and progress bar always advance smoothly
  const startTimeLoop = useCallback(() => {
    if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);

    timeIntervalRef.current = setInterval(() => {
      const trackDuration = currentTrack?.duration || 240;

      // 1. Try to read exact time from YouTube Player
      let realTime = -1;
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const ytState = playerRef.current.getPlayerState?.();
          // If YT is playing (1) or buffering (3)
          if (ytState === 1 || ytState === 3) {
            realTime = playerRef.current.getCurrentTime() || 0;
            const ytDur = playerRef.current.getDuration?.() || trackDuration;
            simulatedTimeRef.current = realTime;
            onTimeUpdate(realTime, ytDur);
            return;
          }
        } catch (e) {
          // fallback
        }
      }

      // 2. Resilient simulated progress fallback if video is restricted or autoplay is blocked
      if (isPlaying) {
        simulatedTimeRef.current += 0.4;
        if (simulatedTimeRef.current >= trackDuration) {
          simulatedTimeRef.current = 0;
          onTimeUpdate(0, trackDuration);
          onTrackEnded();
        } else {
          onTimeUpdate(simulatedTimeRef.current, trackDuration);
        }
      }
    }, 400);
  }, [currentTrack, isPlaying, onTimeUpdate, onTrackEnded]);

  const initPlayer = useCallback(() => {
    if (playerRef.current) return;
    if (!window.YT || !window.YT.Player) return;

    try {
      const activeId = getTrackVideoId(currentTrack);
      const playerEl = document.getElementById('youtube-embedded-player');
      if (!playerEl) return;

      playerRef.current = new window.YT.Player('youtube-embedded-player', {
        videoId: activeId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
          start: currentTrack.startTime || 0,
        },
        events: {
          onReady: (event: any) => {
            onPlayerReady();
            setEmbedError(null);
            try {
              event.target.setVolume(volume);
              if (isMuted) event.target.mute();
            } catch (e) {}
            startTimeLoop();
          },
          onStateChange: (event: any) => {
            // YT.PlayerState: PLAYING = 1, PAUSED = 2, ENDED = 0, BUFFERING = 3
            if (event.data === 1) {
              setEmbedError(null);
              onStateChange(true);
            } else if (event.data === 2) {
              onStateChange(false);
            } else if (event.data === 0) {
              onStateChange(false);
              onTrackEnded();
            }
          },
          onError: (event: any) => {
            console.warn('YouTube playback error code:', event.data);
            if (event.data === 101 || event.data === 150) {
              setEmbedError('इस गीत के कॉपीराइट स्वामी ने इन-ऐप एम्बेडिंग सीमित की है। कृपया सीधे यूट्यूब पर चलाएं।');
            } else if (event.data === 100 || event.data === 2) {
              setEmbedError('वीडियो लोड करने में समस्या हुई। कृपया यूट्यूब लिंक का उपयोग करें।');
            } else {
              setEmbedError('यूट्यूब स्ट्रीम कनेक्ट हो रही है...');
            }
          },
        },
      });
    } catch (err) {
      console.warn('YouTube Player initialization fallback:', err);
    }
  }, [currentTrack, isMuted, onPlayerReady, onStateChange, onTrackEnded, startTimeLoop, volume]);

  // Keep time loop updated
  useEffect(() => {
    startTimeLoop();
    return () => {
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    };
  }, [startTimeLoop]);

  // Switch video whenever currentTrack changes
  useEffect(() => {
    if (!currentTrack) return;
    const newVideoId = getTrackVideoId(currentTrack);
    setEmbedError(null);
    simulatedTimeRef.current = currentTrack.startTime || 0;

    if (playerRef.current) {
      if (currentVideoIdRef.current !== newVideoId) {
        currentVideoIdRef.current = newVideoId;

        try {
          if (isPlaying) {
            if (typeof playerRef.current.loadVideoById === 'function') {
              playerRef.current.loadVideoById({
                videoId: newVideoId,
                startSeconds: currentTrack.startTime || 0,
              });
              setTimeout(() => {
                try {
                  playerRef.current?.playVideo?.();
                } catch (e) {}
              }, 150);
            }
          } else {
            if (typeof playerRef.current.cueVideoById === 'function') {
              playerRef.current.cueVideoById({
                videoId: newVideoId,
                startSeconds: currentTrack.startTime || 0,
              });
            }
          }
        } catch (e) {
          console.warn('Error loading new video ID:', e);
        }
      }
    } else if (apiReady) {
      initPlayer();
    }
  }, [currentTrack, isPlaying, apiReady, initPlayer]);

  // Sync play/pause
  useEffect(() => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        if (typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
      } else {
        if (typeof playerRef.current.pauseVideo === 'function') {
          playerRef.current.pauseVideo();
        }
      }
    } catch (e) {
      // ignore
    }
  }, [isPlaying]);

  // Sync seek time
  useEffect(() => {
    if (targetSeekTime !== null) {
      simulatedTimeRef.current = targetSeekTime;
      if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
        try {
          playerRef.current.seekTo(targetSeekTime, true);
          if (isPlaying && typeof playerRef.current.playVideo === 'function') {
            playerRef.current.playVideo();
          }
        } catch (e) {
          // ignore
        }
      }
      onSeekComplete();
    }
  }, [targetSeekTime, isPlaying, onSeekComplete]);

  // Sync volume & mute
  useEffect(() => {
    if (!playerRef.current) return;
    try {
      if (typeof playerRef.current.setVolume === 'function') {
        playerRef.current.setVolume(volume);
      }
      if (isMuted) {
        if (typeof playerRef.current.mute === 'function') playerRef.current.mute();
      } else {
        if (typeof playerRef.current.unMute === 'function') playerRef.current.unMute();
      }
    } catch (e) {
      // ignore
    }
  }, [volume, isMuted]);

  const activeVideoUrl = currentTrack?.youtubeUrl || `https://www.youtube.com/watch?v=${getTrackVideoId(currentTrack)}`;

  return (
    <>
      {/* Floating Video Drawer / Modal for Watching YouTube Stream */}
      <div
        className={`fixed z-40 transition-all duration-300 ${
          showVideo
            ? 'bottom-24 right-4 sm:right-8 w-[92vw] sm:w-[440px] opacity-100 scale-100 pointer-events-auto'
            : 'bottom-0 right-0 w-[1px] h-[1px] opacity-0 pointer-events-none'
        }`}
        id="youtube-video-container"
      >
        <div className="glass-card rounded-2xl border border-white/20 p-3.5 shadow-2xl overflow-hidden backdrop-blur-2xl bg-neutral-950/95">
          <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/10">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
                <Youtube className="w-3.5 h-3.5 text-red-500" />
              </div>
              <div className="min-w-0">
                <span className="font-hindi text-xs font-semibold text-white truncate block">
                  {currentTrack?.title || 'यूट्यूब वीडियो'}
                </span>
                <span className="text-[10px] text-neutral-400 truncate block">
                  {currentTrack?.originalSinger || currentTrack?.movieOrArtist}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={activeVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded-lg text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-red-600/80 transition-colors text-[10px] flex items-center gap-1 font-medium"
                title="सीधे यूट्यूब पर खोलें"
              >
                <span>YouTube पर</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={onCloseVideo}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer transition-colors"
                title="वीडियो बंद करें"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {embedError && (
            <div className="mb-2.5 p-3 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1 text-[11px]">
                <p className="font-hindi leading-relaxed">{embedError}</p>
                <a
                  href={activeVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white font-medium text-[11px] hover:bg-red-500 shadow-md transition-all"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>यूट्यूब पर फुल वीडियो देखें ↗</span>
                </a>
              </div>
            </div>
          )}

          {/* Player Container */}
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner relative">
            <div id="youtube-embedded-player" className="w-full h-full" />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-400">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px]">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>सत्यापित देशभक्ति सुर</span>
            </div>
            <a
              href={activeVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-medium text-[10px] flex items-center gap-1"
            >
              <span>यूट्यूब लिंक</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
