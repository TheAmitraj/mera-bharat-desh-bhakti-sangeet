import React, { useState, useEffect } from 'react';
import { Quote as QuoteIcon, ChevronLeft, ChevronRight, Pause, Play, Heart } from 'lucide-react';
import { PATRIOTIC_QUOTES } from '../data/playlist';

export const QuotesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate quote every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PATRIOTIC_QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? PATRIOTIC_QUOTES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PATRIOTIC_QUOTES.length);
  };

  const currentQuote = PATRIOTIC_QUOTES[currentIndex];

  return (
    <section
      id="patriotic-quotes-section"
      className="max-w-4xl mx-auto px-4 py-12 select-none"
    >
      <div className="relative glass-card rounded-2xl p-6 sm:p-10 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header with quote icon and tag */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <QuoteIcon className="w-4 h-4" />
            </div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              राष्ट्र वंदना • विचार
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 text-[11px] rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium">
              {currentQuote.tag || 'देशभक्ति'}
            </span>
          </div>
        </div>

        {/* Main Quote Text with smooth transition */}
        <div className="min-h-[110px] sm:min-h-[90px] flex flex-col justify-center my-2">
          <p
            key={currentQuote.id}
            className="font-hindi text-xl sm:text-2xl md:text-3xl text-neutral-100 font-medium leading-relaxed drop-shadow-sm transition-all duration-500 animate-fade-in"
          >
            "{currentQuote.textHindi}"
          </p>
          <p className="mt-3 text-xs sm:text-sm text-amber-400/90 font-medium font-devanagari">
            — {currentQuote.authorOrContext}
          </p>
        </div>

        {/* Footer controls: Previous, Indicators, Next, Pause/Play */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          {/* Indicator dots */}
          <div className="flex items-center gap-1.5">
            {PATRIOTIC_QUOTES.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to quote ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 bg-amber-400'
                    : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
              title={isAutoPlaying ? 'स्वचालित बदलाव रोकें' : 'स्वचालित बदलाव शुरू करें'}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
              title="पिछला विचार"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
              title="अगला विचार"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
