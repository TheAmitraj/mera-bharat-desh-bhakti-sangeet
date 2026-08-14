import React from 'react';
import { Sparkles, Calendar, Music, Flame, ExternalLink, Keyboard, User } from 'lucide-react';
import { CelebrationMode } from '../types';
import { YOUTUBE_URL } from '../data/playlist';

interface NavbarProps {
  currentMode: CelebrationMode;
  onSelectMode: (mode: CelebrationMode) => void;
  onTriggerTricolor: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenDeveloper?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  onTriggerTricolor,
  isPlaying,
  onTogglePlay,
  onOpenDeveloper,
}) => {
  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full glass-card border-b border-white/10 px-4 py-3 sm:px-6 lg:px-8 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 select-none">
          <div className="w-9 h-9 rounded-full bg-neutral-900 border border-amber-500/30 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FF9933] via-white to-[#138808] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-900 border border-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-hindi text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-400 via-neutral-100 to-emerald-400 bg-clip-text text-transparent tracking-wide">
                भारत • मेरी शान
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded">
                जय हिंद
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 hidden sm:block">
              राष्ट्रीय देशभक्ति संगीत मंच
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs (15 Aug / 26 Jan / Everyday) */}
        <div
          id="mode-selector-nav"
          className="flex items-center bg-neutral-900/90 p-1 rounded-xl border border-white/10 text-xs"
        >
          <button
            id="nav-mode-15aug"
            onClick={() => onSelectMode(currentMode === '15-august' ? 'everyday' : '15-august')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              currentMode === '15-august'
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-[0_0_10px_rgba(217,119,6,0.4)]'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
            }`}
            title="15 अगस्त स्वतंत्रता दिवस मोड"
          >
            <span>🇮🇳</span>
            <span className="hidden md:inline">15 अगस्त</span>
            <span className="text-[10px] text-amber-200 hidden lg:inline">(स्वतंत्रता दिवस)</span>
          </button>

          <button
            id="nav-mode-26jan"
            onClick={() => onSelectMode(currentMode === '26-january' ? 'everyday' : '26-january')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              currentMode === '26-january'
                ? 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-[0_0_10px_rgba(29,78,216,0.4)]'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
            }`}
            title="26 जनवरी गणतंत्र दिवस मोड"
          >
            <span>🏛️</span>
            <span className="hidden md:inline">26 जनवरी</span>
            <span className="text-[10px] text-blue-200 hidden lg:inline">(गणतंत्र दिवस)</span>
          </button>

          <button
            id="nav-mode-everyday"
            onClick={() => onSelectMode('everyday')}
            className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              currentMode === 'everyday' || currentMode === 'auto'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-850'
            }`}
            title="सदाबहार देशभक्ति मोड"
          >
            <span>✨</span>
            <span className="hidden sm:inline">सदाबहार</span>
          </button>
        </div>

        {/* Action Controls & Hotkey Hints */}
        <div className="flex items-center gap-2">
          {/* Developer Contact Trigger */}
          {onOpenDeveloper && (
            <button
              id="nav-btn-developer"
              onClick={onOpenDeveloper}
              className="px-2.5 py-1.5 text-xs rounded-lg font-medium bg-neutral-900 border border-neutral-700/80 text-neutral-300 hover:text-amber-300 hover:border-amber-500/40 transition-all flex items-center gap-1.5 group"
              title="डेवलपर परिचय व संपर्क (Amit Raj)"
            >
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-[9px] font-bold text-white">
                A
              </div>
              <span className="hidden sm:inline font-hindi">डेवलपर</span>
            </button>
          )}

          {/* Tricolor Wave Trigger */}
          <button
            id="nav-btn-tricolor-wave"
            onClick={onTriggerTricolor}
            className="p-2 sm:px-3 sm:py-1.5 text-xs rounded-lg font-medium bg-neutral-900 border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 hover:border-amber-400 transition-all flex items-center gap-1.5 group"
            title="तिरंगे की तरंग सक्रिय करें (Press 'T')"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden md:inline">तिरंगा तरंग</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] bg-neutral-800 rounded border border-neutral-700 text-neutral-300 font-mono">
              T
            </kbd>
          </button>

          {/* Quick Play/Pause indicator */}
          <button
            id="nav-btn-play-toggle"
            onClick={onTogglePlay}
            className={`p-2 sm:px-3 sm:py-1.5 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              isPlaying
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:text-white'
            }`}
            title={isPlaying ? 'संगीत रोकें (Space)' : 'संगीत चलाएँ (Space)'}
          >
            {isPlaying ? (
              <>
                <span className="flex gap-0.5 items-end h-3.5">
                  <span className="w-1 bg-emerald-400 animate-soundbar-1 rounded-full" />
                  <span className="w-1 bg-emerald-400 animate-soundbar-2 rounded-full" />
                  <span className="w-1 bg-emerald-400 animate-soundbar-3 rounded-full" />
                </span>
                <span className="hidden sm:inline font-semibold">चल रहा है</span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">प्ले करें</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
