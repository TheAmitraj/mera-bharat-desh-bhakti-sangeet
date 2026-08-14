import React, { useEffect, useRef } from 'react';
import { CelebrationMode } from '../types';

interface TricolorEffectsProps {
  isTricolorWaveActive: boolean;
  mode: CelebrationMode;
}

export const TricolorEffects: React.FC<TricolorEffectsProps> = ({
  isTricolorWaveActive,
  mode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Floating ambient glow particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle colors: Saffron (#FF9933), White (#FFFFFF), Green (#138808), Gold (#F59E0B)
    const particleColors = [
      'rgba(255, 153, 51, 0.4)',
      'rgba(255, 255, 255, 0.35)',
      'rgba(19, 136, 8, 0.35)',
      'rgba(245, 158, 11, 0.4)',
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
    }

    const particleCount = window.innerWidth < 768 ? 24 : 48;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.15,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    // Flower petals for 15 Aug / 26 Jan celebration mode
    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      color: string;
    }

    const petals: Petal[] = [];
    const petalColors = ['#ff9933', '#fcd34d', '#ffffff', '#22c55e', '#ea580c'];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      // If celebration mode (15 Aug or 26 Jan), spawn and render gentle falling petals
      if (mode === '15-august' || mode === '26-january') {
        if (petals.length < 28 && Math.random() < 0.2) {
          petals.push({
            x: Math.random() * width,
            y: -10,
            size: Math.random() * 6 + 4,
            speedY: Math.random() * 1.2 + 0.8,
            speedX: Math.sin(Math.random() * Math.PI) * 0.8,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 2,
            color: petalColors[Math.floor(Math.random() * petalColors.length)],
          });
        }

        for (let i = petals.length - 1; i >= 0; i--) {
          const pt = petals[i];
          pt.y += pt.speedY;
          pt.x += Math.sin(pt.y * 0.02) * 0.7;
          pt.rotation += pt.rotSpeed;

          ctx.save();
          ctx.translate(pt.x, pt.y);
          ctx.rotate((pt.rotation * Math.PI) / 180);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = 0.55;
          ctx.beginPath();
          ctx.ellipse(0, 0, pt.size, pt.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          if (pt.y > height + 20) {
            petals.splice(i, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <>
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Saffron Aura top-left */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 md:w-[500px] md:h-[500px] rounded-full bg-amber-600/15 blur-[120px] animate-tricolor-pulse"
        />
        {/* Green Aura bottom-right */}
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 md:w-[500px] md:h-[500px] rounded-full bg-emerald-600/15 blur-[120px] animate-tricolor-pulse"
          style={{ animationDelay: '4s' }}
        />
        {/* White / Navy Aura Center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none"
        />
      </div>

      {/* Canvas Particle Overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* Tricolor Wave Sweep Animation (Triggered by 'T' key or Button) */}
      {isTricolorWaveActive && (
        <div
          className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
          id="tricolor-wave-overlay"
        >
          <div className="w-full h-full flex flex-col opacity-30 animate-pulse">
            <div className="flex-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 shadow-[0_0_50px_rgba(234,88,12,0.8)]" />
            <div className="flex-1 bg-gradient-to-r from-white via-neutral-100 to-white shadow-[0_0_50px_rgba(255,255,255,0.8)]" />
            <div className="flex-1 bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 shadow-[0_0_50px_rgba(16,185,129,0.8)]" />
          </div>
        </div>
      )}
    </>
  );
};
