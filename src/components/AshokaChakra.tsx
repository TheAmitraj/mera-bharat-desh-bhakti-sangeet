import React from 'react';

interface AshokaChakraProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export const AshokaChakra: React.FC<AshokaChakraProps> = ({
  className = '',
  size = 120,
  animate = true,
}) => {
  // 24 spokes with 15-degree separation
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      id="ashoka-chakra-container"
    >
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full text-blue-900 drop-shadow-[0_0_12px_rgba(30,64,175,0.45)] ${
          animate ? 'animate-spin-slow' : ''
        }`}
        id="ashoka-chakra-svg"
      >
        {/* Outer Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="3.5"
          className="opacity-90"
        />
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="0.8"
          className="opacity-50"
        />

        {/* Center Hub */}
        <circle cx="50" cy="50" r="9" fill="#1e3a8a" />
        <circle cx="50" cy="50" r="4.5" fill="#ffffff" />
        <circle cx="50" cy="50" r="2" fill="#1e3a8a" />

        {/* 24 Spokes */}
        <g stroke="#1e3a8a" strokeWidth="1.6" strokeLinecap="round">
          {spokes.map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x2 = 50 + 43 * Math.sin(rad);
            const y2 = 50 - 43 * Math.cos(rad);
            return (
              <line
                key={angle}
                x1="50"
                y1="50"
                x2={x2}
                y2={y2}
                stroke="#1e3a8a"
              />
            );
          })}
        </g>

        {/* 24 Outer Dots on Rim */}
        {spokes.map((angle) => {
          const rad = ((angle + 7.5) * Math.PI) / 180;
          const cx = 50 + 44.5 * Math.sin(rad);
          const cy = 50 - 44.5 * Math.cos(rad);
          return (
            <circle
              key={`dot-${angle}`}
              cx={cx}
              cy={cy}
              r="1.2"
              fill="#2563eb"
            />
          );
        })}
      </svg>
    </div>
  );
};
