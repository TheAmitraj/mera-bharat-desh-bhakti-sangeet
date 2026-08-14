import React, { useState } from 'react';
import {
  Play,
  Music2,
  Clock,
  Youtube,
  ExternalLink,
} from 'lucide-react';
import { Track } from '../types';

interface PlaylistSectionProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
  showVideo: boolean;
  onToggleVideo: () => void;

  // Kept temporarily so parent component does not throw an error
  // if it is still passing this prop.
  onAddTrack?: (track: Track) => void;
}

export const PlaylistSection: React.FC<PlaylistSectionProps> = ({
  tracks,
  currentTrackIndex,
  isPlaying,
  onSelectTrack,
  showVideo,
  onToggleVideo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    {
      id: 'all',
      label: 'सभी अमर गीत',
      count: tracks.length,
    },
    {
      id: 'emotional',
      label: 'शहादत व भावुक',
      count: tracks.filter((t) => t.category === 'emotional').length,
    },
    {
      id: 'anthem',
      label: 'राष्ट्रगान व वंदना',
      count: tracks.filter((t) => t.category === 'anthem').length,
    },
    {
      id: 'energetic',
      label: 'जोश व ऊर्जा',
      count: tracks.filter((t) => t.category === 'energetic').length,
    },
    {
      id: 'timeless',
      label: 'सदाबहार क्लासिक',
      count: tracks.filter((t) => t.category === 'timeless').length,
    },
  ];

  const filteredTracks =
    selectedCategory === 'all'
      ? tracks
      : tracks.filter((t) => t.category === selectedCategory);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentActiveTrack =
    tracks[currentTrackIndex] || tracks[0];

  return (
    <section
      id="playlist-section"
      className="max-w-7xl mx-auto px-4 py-16 scroll-mt-20 select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold mb-3">
            <Music2 className="w-3.5 h-3.5" />

            <span>
              प्रत्येक गीत का अपना ऑफिशियल यूट्यूब यूआरएल
            </span>
          </div>

          <h2 className="font-hindi text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            देशभक्ति के सुर
          </h2>

          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
            सभी देशभक्ति गीतों के अपने व्यक्तिगत यूट्यूब लिंक्स और वीडियो उपलब्ध हैं।
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">

          {/* Current Video Button */}
          <button
            onClick={onToggleVideo}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 border cursor-pointer ${
              showVideo
                ? 'bg-red-600/20 text-red-300 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                : 'glass-card text-neutral-300 border-white/10 hover:border-red-500/40 hover:text-white'
            }`}
          >
            <Youtube className="w-4 h-4 text-red-500" />

            <span>
              {showVideo
                ? 'वीडियो छिपाएँ'
                : 'वर्तमान वीडियो देखें'}
            </span>
          </button>

          {/* YouTube Link */}
          {currentActiveTrack && (
            <a
              href={currentActiveTrack.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium glass-card border border-white/10 text-neutral-300 hover:text-white hover:border-amber-500/40 transition-all flex items-center gap-1.5"
            >
              <span>यूट्यूब पर देखें</span>

              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)] border border-amber-400/40'
                : 'glass-card text-neutral-400 hover:text-white hover:bg-neutral-800/80 border-white/5'
            }`}
          >
            <span>{cat.label}</span>

            <span
              className={`px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                selectedCategory === cat.id
                  ? 'bg-black/30 text-amber-100'
                  : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredTracks.map((track) => {
          const originalIndex = tracks.findIndex(
            (t) => t.id === track.id
          );

          const isCurrent =
            currentTrackIndex === originalIndex;

          const isTrackPlaying =
            isCurrent && isPlaying;

          return (
            <div
              key={track.id}
              onClick={() => onSelectTrack(originalIndex)}
              className={`group relative glass-card rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden ${
                isCurrent
                  ? 'border-amber-500/60 bg-gradient-to-b from-amber-950/25 via-neutral-900/90 to-neutral-900/95 shadow-[0_0_25px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/40'
                  : 'border-white/5 hover:border-white/20 hover:bg-neutral-900/70 hover:translate-y-[-2px]'
              }`}
              id={`track-card-${track.id}`}
            >
              {/* Subtle Active Glow */}
              {isCurrent && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              )}

              {/* Card Top */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">

                  {/* Track Number / Playing Indicator */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-amber-500 text-neutral-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                          : 'bg-neutral-800/80 text-neutral-400 group-hover:bg-neutral-700 group-hover:text-white'
                      }`}
                    >
                      {isTrackPlaying ? (
                        <div className="flex items-end gap-0.5 h-4">
                          <span className="w-0.5 bg-neutral-950 animate-soundbar-1 rounded-full" />
                          <span className="w-0.5 bg-neutral-950 animate-soundbar-2 rounded-full" />
                          <span className="w-0.5 bg-neutral-950 animate-soundbar-3 rounded-full" />
                        </div>
                      ) : (
                        <Play
                          className={`w-4 h-4 ml-0.5 ${
                            isCurrent
                              ? 'fill-neutral-950'
                              : 'group-hover:fill-white'
                          }`}
                        />
                      )}
                    </div>

                    <div>
                      <h3
                        className={`font-hindi text-base sm:text-lg font-bold leading-snug ${
                          isCurrent
                            ? 'text-amber-300'
                            : 'text-neutral-100 group-hover:text-amber-200'
                        }`}
                      >
                        {track.title}
                      </h3>

                      <p className="text-xs text-neutral-400 font-normal truncate max-w-[180px] sm:max-w-[220px]">
                        {track.movieOrArtist}
                      </p>
                    </div>
                  </div>

                  {/* YouTube + Duration */}
                  <div className="flex items-center gap-2">
                    <a
                      href={track.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors"
                      title="सीधे इस गीत का यूट्यूब वीडियो खोलें"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Youtube className="w-4 h-4 text-red-500 hover:scale-110 transition-transform" />
                    </a>

                    <span className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-600" />

                      {formatTime(track.duration)}
                    </span>
                  </div>
                </div>

                {/* Highlight Lyrics Snippet */}
                <div className="my-3 p-3 rounded-xl bg-neutral-950/60 border border-white/5">
                  <p className="font-devanagari text-xs text-neutral-300 italic line-clamp-2">
                    "{track.highlightLyrics}"
                  </p>
                </div>
              </div>

              {/* Card Bottom Meta */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                <span className="font-medium text-neutral-400 truncate max-w-[180px]">
                  {track.originalSinger || 'देशभक्ति विशेष'}
                </span>

                <div className="flex items-center gap-2">
                  {track.isCustom && (
                    <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                      कस्टम गीत
                    </span>
                  )}

                  <span
                    className={`font-semibold transition-colors ${
                      isCurrent
                        ? 'text-amber-400'
                        : 'text-neutral-500 group-hover:text-neutral-300'
                    }`}
                  >
                    {isCurrent
                      ? isTrackPlaying
                        ? '▶ बज रहा है'
                        : '⏸ थमा हुआ'
                      : 'क्लिक करके बजाएँ'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};