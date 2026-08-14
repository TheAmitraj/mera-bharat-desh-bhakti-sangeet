import React from 'react';
import { Heart, Sparkles, Youtube, Disc3, Instagram, Code2, UserCheck } from 'lucide-react';
import { AshokaChakra } from './AshokaChakra';
import { YOUTUBE_URL } from '../data/playlist';

interface FooterProps {
  onOpenDeveloper?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeveloper }) => {
  return (
    <footer
      id="main-footer"
      className="relative z-10 border-t border-white/10 bg-neutral-950/80 backdrop-blur-md pt-12 pb-32 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Ashoka Chakra Center Mini Emblem */}
        <div className="mb-4 p-2 rounded-full bg-neutral-900 border border-white/10">
          <AshokaChakra size={40} />
        </div>

        {/* Primary Slogan */}
        <h3 className="font-hindi text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 via-neutral-100 to-emerald-400 bg-clip-text text-transparent">
          🇮🇳 भारत • मेरी शान • मेरा अभिमान
        </h3>

        <p className="mt-2 text-sm text-neutral-300 font-medium font-devanagari">
          जय हिंद • वन्दे मातरम् • सत्यमेव जयते
        </p>

        <p className="mt-1 text-xs text-neutral-400">
          15 अगस्त • 26 जनवरी • हर दिन देशभक्ति
        </p>

        {/* Developer Credit Tag */}
        <div className="my-5 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-neutral-900/90 border border-amber-500/20 shadow-md">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-white to-emerald-500 p-0.5 shrink-0">
            <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center text-[10px] font-bold text-amber-400">
              AR
            </div>
          </div>
          <div className="text-left text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400 font-hindi">विकसित द्वारा:</span>
              <span className="font-bold text-neutral-100">Amit Raj</span>
            </div>
            <a
              href="https://instagram.com/theamitraj_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-pink-400 hover:text-pink-300 flex items-center gap-1 font-medium transition-colors"
            >
              <Instagram className="w-3 h-3" />
              <span>@theamitraj_official</span>
            </a>
          </div>
          {onOpenDeveloper && (
            <button
              onClick={onOpenDeveloper}
              className="ml-2 px-2.5 py-1 text-[11px] font-medium bg-neutral-800 hover:bg-neutral-700 text-amber-300 rounded-lg border border-neutral-700 transition-colors"
            >
              प्रोफ़ाइल देखें
            </button>
          )}
        </div>

        {/* Tribute info & Playlist source */}
        <div className="my-2 max-w-lg text-xs text-neutral-500 leading-relaxed">
          यह मंच राष्ट्र के प्रति असीम निष्ठा, हमारे वीर सैनिकों के सर्वोच्च बलिदान तथा भारत की अखंड एकता और सांस्कृतिक गौरव को समर्पित है।
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-900 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>🇮🇳</span>
            <span>अखंड भारत • अमर संस्कृति</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/theamitraj_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-pink-400 transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>Instagram: @theamitraj_official</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
