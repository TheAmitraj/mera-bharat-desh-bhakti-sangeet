import React, { useState } from 'react';
import { Instagram, Mail, Copy, Check, ExternalLink, Heart, Award, Sparkles, X, UserCheck, ShieldCheck } from 'lucide-react';

interface DeveloperContactProps {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export const DeveloperContact: React.FC<DeveloperContactProps> = ({
  isOpen = false,
  onClose,
  isModal = false,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const developerInfo = {
    name: 'Amit Raj (अमित राज)',
    handle: 'theamitraj_official',
    instagramUrl: 'https://instagram.com/theamitraj_official',
    email: 'theamitraj.developer@gmail.com',
    role: 'Creator & Lead Developer',
    description: 'भारत के अमर शहीदों, वीर सैनिकों और राष्ट्रीय गौरव को समर्पित इस मंच का विकास देशभक्ति की भावना और आधुनिक वेब तकनीकों के साथ किया गया है।',
    location: 'India 🇮🇳',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Full-Stack Web', 'Creative UI'],
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const cardContent = (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900/90 via-neutral-900/80 to-neutral-950/95 border border-amber-500/30 p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      {/* Tricolor top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Background ambient glow */}
      <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors z-20"
          aria-label="Close Developer modal"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
        {/* Developer Photo with Tricolor Glow & Verification Badge */}
        <div className="relative shrink-0 group">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-[#FF9933] via-white to-[#138808] shadow-[0_0_25px_rgba(245,158,11,0.3)] group-hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-all duration-300">
            {/* Developer Portrait Image */}
            <div className="w-full h-full rounded-xl overflow-hidden bg-neutral-900 relative">
              <img
                src="../arts.jpeg"
                alt="Amit Raj - Developer"
                className="hidden"
              />
              {/* Profile Avatar Graphic matching uploaded photo characteristics: Blue Traditional Kurta, Tilak, Indian Flag Backdrop */}
              <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-amber-950/40 via-neutral-900 to-emerald-950/50">
                <svg viewBox="0 0 200 240" className="w-full h-full object-cover">
                  <defs>
                    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ea580c" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="kurtaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="50%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#020617" />
                    </linearGradient>
                    <pattern id="kurtaPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M0 5 Q 2.5 0, 5 5 T 10 5" fill="none" stroke="#334155" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  {/* Backdrop */}
                  <rect width="200" height="240" fill="url(#bgGrad)" />
                  {/* Background curtain folds */}
                  <path d="M 0 0 L 80 0 L 60 240 L 0 240 Z" fill="#f97316" opacity="0.35" />
                  <path d="M 80 0 L 200 0 L 200 240 L 60 240 Z" fill="#ffffff" opacity="0.15" />
                  {/* Shoulders & Traditional Dark Blue Kurta */}
                  <path d="M 30 190 C 30 160, 60 145, 100 145 C 140 145, 170 160, 170 190 L 180 240 L 20 240 Z" fill="url(#kurtaGrad)" />
                  <path d="M 30 190 C 30 160, 60 145, 100 145 C 140 145, 170 160, 170 190 L 180 240 L 20 240 Z" fill="url(#kurtaPattern)" opacity="0.6" />
                  {/* Kurta Collar & Buttons */}
                  <path d="M 85 145 L 85 130 C 85 125, 115 125, 115 130 L 115 145 Z" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  <line x1="100" y1="130" x2="100" y2="200" stroke="#475569" strokeWidth="2" />
                  <circle cx="100" cy="140" r="2" fill="#94a3b8" />
                  <circle cx="100" cy="152" r="2" fill="#94a3b8" />
                  <circle cx="100" cy="164" r="2" fill="#94a3b8" />
                  <circle cx="100" cy="176" r="2" fill="#94a3b8" />
                  <circle cx="100" cy="188" r="2" fill="#94a3b8" />
                  {/* Neck */}
                  <path d="M 85 125 L 115 125 L 110 95 L 90 95 Z" fill="#e29578" />
                  {/* Face Head */}
                  <ellipse cx="100" cy="85" rx="35" ry="42" fill="#e29578" />
                  {/* Hair */}
                  <path d="M 65 75 C 65 45, 80 40, 100 40 C 125 40, 140 50, 138 75 C 132 55, 110 50, 95 55 C 80 60, 70 65, 65 75 Z" fill="#0f172a" />
                  {/* Beard / Stubble */}
                  <path d="M 70 88 C 70 115, 80 125, 100 125 C 120 125, 130 115, 130 88 C 125 110, 115 118, 100 118 C 85 118, 75 110, 70 88 Z" fill="#1e293b" opacity="0.85" />
                  {/* Mustache */}
                  <path d="M 85 98 Q 100 102, 115 98 Q 100 105, 85 98" fill="#0f172a" />
                  {/* Red Tilak on Forehead */}
                  <ellipse cx="100" cy="68" rx="2.5" ry="5" fill="#dc2626" />
                  <circle cx="100" cy="74" r="1.5" fill="#facc15" />
                  {/* Eyes */}
                  <ellipse cx="88" cy="78" rx="4" ry="2" fill="#0f172a" />
                  <ellipse cx="112" cy="78" rx="4" ry="2" fill="#0f172a" />
                </svg>
                {/* Overlay Name Tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-2">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                    Amit Raj
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Verified Badge */}
          <div
            className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-1.5 rounded-full border-2 border-neutral-900 shadow-lg flex items-center justify-center"
            title="Verified Creator"
          >
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Developer Bio & Details */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white font-hindi">
                  {developerInfo.name}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                  Developer
                </span>
              </div>
              <p className="text-xs text-amber-400 font-medium tracking-wide">
                {developerInfo.role} • {developerInfo.location}
              </p>
            </div>

            {/* Indian Flag Badge */}
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800/80 border border-white/10 text-xs text-neutral-300">
              <span>🇮🇳</span>
              <span className="font-hindi text-[11px] font-medium">वंदे मातरम्</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl">
            {developerInfo.description}
          </p>

          {/* Social Contact Links */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            {/* Instagram Profile Button */}
            <a
              href={developerInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white font-semibold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(225,29,72,0.35)] hover:shadow-[0_0_22px_rgba(225,29,72,0.55)] transition-all transform hover:-translate-y-0.5"
            >
              <Instagram className="w-4 h-4" />
              <span>@{developerInfo.handle}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            {/* Email Contact & Copy Button */}
            <div className="flex items-center rounded-xl bg-neutral-800/90 border border-neutral-700/80 p-0.5 text-xs text-neutral-200">
              <a
                href={`mailto:${developerInfo.email}`}
                className="px-3 py-1.5 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                title="Send Email"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate max-w-[180px] sm:max-w-none">{developerInfo.email}</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
        <div className="w-full max-w-2xl">{cardContent}</div>
      </div>
    );
  }

  return (
    <section id="developer-section" className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>निर्माता एवं डेवलपर परिचय</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-hindi">
          डेवलपर से जुड़ें (Developer Contact)
        </h2>
      </div>
      {cardContent}
    </section>
  );
};
