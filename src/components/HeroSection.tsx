import React from 'react';
import { Play, Sparkles, Disc3, ShieldCheck, Heart, Radio, Volume2 } from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { CelebrationMode } from '../types';

interface HeroSectionProps {
  onStartMusic: () => void;
  onTriggerTricolor: () => void;
  isPlaying: boolean;
  activeMode: CelebrationMode;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartMusic,
  onTriggerTricolor,
  isPlaying,
  activeMode,
}) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-12 pb-24 overflow-hidden"
    >
      {/* Decorative Badges Top */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 select-none animate-fade-in">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          🇮🇳 भारत • 1947 → आज
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/15 text-neutral-200">
          वंदे मातरम्
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          सत्यमेव जयते
        </span>
      </div>

      {/* Hero Visual Anchor: Central Ashoka Chakra with Tricolor Halo */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Outer Radiant Tricolor Glow Rings */}
        <div className="absolute w-44 h-44 sm:w-60 sm:h-60 rounded-full border border-amber-500/30 animate-pulse pointer-events-none" />
        <div
          className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full border border-emerald-500/25 pointer-events-none animate-spin-reverse"
          style={{ borderStyle: 'dashed' }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-blue-900/30 to-emerald-500/20 rounded-full blur-2xl -z-10" />

        {/* Ashoka Chakra component */}
        <div className="p-3 sm:p-4 rounded-full bg-neutral-950/80 border border-white/10 shadow-[0_0_35px_rgba(30,58,138,0.5)] backdrop-blur-sm">
          <AshokaChakra size={window?.innerWidth < 640 ? 100 : 130} />
        </div>
      </div>

      {/* Occasion Highlight Tagline */}
      <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-white/10 text-xs sm:text-sm text-neutral-300 font-medium select-none shadow-md">
        <span className="text-amber-400">15 अगस्त</span>
        <span className="text-neutral-500">•</span>
        <span className="text-neutral-100 font-semibold">26 जनवरी</span>
        <span className="text-neutral-500">•</span>
        <span className="text-emerald-400">हर दिन</span>
      </div>

      {/* Main Heading */}
      <h1
        id="hero-heading"
        className="mt-6 font-hindi text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight"
      >
        <span className="bg-gradient-to-r from-amber-400 via-neutral-100 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
          मेरा भारत • मेरी शान
        </span>
      </h1>

      {/* Subheading */}
      <p
        id="hero-subheading"
        className="mt-4 font-devanagari text-lg sm:text-2xl text-neutral-300 font-normal max-w-2xl text-balance"
      >
        देशभक्ति के सुरों में डूब जाइए
      </p>

      <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-xl">
        अमर शहीदों, वीर जवानों और भारत माँ के गौरव को समर्पित प्रतिष्ठित गीतों की संगीतमयी यात्रा।
      </p>

      {/* Mode Banner notification if 15 Aug or 26 Jan */}
      {activeMode === '15-august' && (
        <div className="mt-6 px-5 py-2 rounded-2xl bg-gradient-to-r from-amber-950/80 via-neutral-900/90 to-amber-950/80 border border-amber-500/40 text-amber-200 text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-bounce-subtle">
          <span>🇮🇳</span>
          <span>स्वतंत्रता दिवस की हार्दिक शुभकामनाएँ! विजय विश्व तिरंगा प्यारा</span>
          <span>🇮🇳</span>
        </div>
      )}

      {activeMode === '26-january' && (
        <div className="mt-6 px-5 py-2 rounded-2xl bg-gradient-to-r from-blue-950/80 via-neutral-900/90 to-blue-950/80 border border-blue-500/40 text-blue-200 text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-bounce-subtle">
          <span>🏛️</span>
          <span>गणतंत्र दिवस की हार्दिक शुभकामनाएँ! सत्यमेव जयते</span>
          <span>🇮🇳</span>
        </div>
      )}

      {/* CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
        {/* Primary CTA: Play Patriotic Music */}
        <button
          id="btn-main-play-music"
          onClick={onStartMusic}
          className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base sm:text-lg bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-white shadow-[0_0_30px_rgba(245,158,11,0.45)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group border border-amber-300/30 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
          </div>
          <span>▶ देशभक्ति संगीत सुनें</span>
        </button>

        {/* Secondary CTA: Tricolor Colors Wave Animation */}
        <button
          id="btn-hero-tricolor-wave"
          onClick={onTriggerTricolor}
          className="w-full sm:w-auto px-6 py-4 rounded-xl font-medium text-sm sm:text-base glass-card border border-white/20 text-neutral-100 hover:border-amber-400 hover:bg-neutral-800/80 active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
          <span>🇮🇳 तिरंगे के रंग</span>
          <span className="text-xs text-neutral-400 hidden sm:inline">(Key: T)</span>
        </button>
      </div>

      {/* Keyboard Hint Indicator */}
      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-neutral-400 select-none">
        <span className="flex items-center gap-1.5">
          <kbd className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-neutral-300 font-mono text-[11px]">
            Space
          </kbd>
          <span>प्ले / पॉज़</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 rounded text-neutral-300 font-mono text-[11px]">
            T
          </kbd>
          <span>तिरंगा तरंग</span>
        </span>
      </div>
    </section>
  );
};
