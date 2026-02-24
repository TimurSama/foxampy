"use client";

import { useEffect, useState } from 'react';

export default function OilWaveBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10" style={{ background: '#030303' }} />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#030303' }}>
      {/* Base gradient - subtle silver sheen */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 10%, rgba(80, 80, 90, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 90%, rgba(60, 60, 70, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(40, 40, 50, 0.05) 0%, transparent 70%)
          `
        }}
      />

      {/* Animated SVG Waves - Silver & White monochrome */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'blur(30px)' }}
      >
        <defs>
          {/* Silver-white gradient for wave 1 */}
          <linearGradient id="silverGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(200, 200, 210, 0.25)" />
            <stop offset="50%" stopColor="rgba(160, 160, 170, 0.18)" />
            <stop offset="100%" stopColor="rgba(100, 100, 110, 0.08)" />
          </linearGradient>
          
          {/* Bright silver gradient for wave 2 */}
          <linearGradient id="silverGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(220, 220, 230, 0.2)" />
            <stop offset="50%" stopColor="rgba(180, 180, 190, 0.15)" />
            <stop offset="100%" stopColor="rgba(120, 120, 130, 0.06)" />
          </linearGradient>
          
          {/* White-pearl gradient for wave 3 */}
          <linearGradient id="silverGradient3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(240, 240, 245, 0.15)" />
            <stop offset="100%" stopColor="rgba(140, 140, 150, 0.05)" />
          </linearGradient>

          {/* Chrome/silver highlight */}
          <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="50%" stopColor="rgba(200, 200, 210, 0.2)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
          </linearGradient>
        </defs>

        {/* Wave 1 - Slow, deep silver */}
        <g className="wave-1">
          <path
            d="M0,280 Q360,180 720,280 T1440,280 L1440,900 L0,900 Z"
            fill="url(#silverGradient1)"
          />
          <path
            d="M0,340 Q360,240 720,340 T1440,340 L1440,900 L0,900 Z"
            fill="url(#silverGradient1)"
            opacity="0.6"
          />
        </g>

        {/* Wave 2 - Medium, bright silver */}
        <g className="wave-2">
          <path
            d="M0,420 Q360,320 720,420 T1440,420 L1440,900 L0,900 Z"
            fill="url(#silverGradient2)"
          />
          <path
            d="M0,480 Q360,380 720,480 T1440,480 L1440,900 L0,900 Z"
            fill="url(#silverGradient2)"
            opacity="0.5"
          />
        </g>

        {/* Wave 3 - Fast, pearl white highlight */}
        <g className="wave-3">
          <path
            d="M0,580 Q360,480 720,580 T1440,580 L1440,900 L0,900 Z"
            fill="url(#silverGradient3)"
          />
          <path
            d="M0,640 Q360,540 720,640 T1440,640 L1440,900 L0,900 Z"
            fill="url(#silverGradient3)"
            opacity="0.4"
          />
        </g>

        {/* Top waves - subtle chrome */}
        <g className="wave-4" opacity="0.35">
          <path
            d="M0,80 Q360,30 720,80 T1440,80 L1440,0 L0,0 Z"
            fill="url(#chromeGradient)"
          />
        </g>

        <g className="wave-5" opacity="0.25">
          <path
            d="M0,140 Q360,90 720,140 T1440,140 L1440,0 L0,0 Z"
            fill="url(#silverGradient2)"
          />
        </g>
      </svg>

      {/* Animated silver orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%)
          `
        }}
      />

      <style jsx>{`
        @keyframes wave1 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          25% { transform: translateX(-25px) translateY(12px) scale(1.02); }
          50% { transform: translateX(0) translateY(25px) scale(1); }
          75% { transform: translateX(25px) translateY(12px) scale(0.98); }
        }

        @keyframes wave2 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          33% { transform: translateX(35px) translateY(-18px) scale(1.03); }
          66% { transform: translateX(-25px) translateY(12px) scale(0.97); }
        }

        @keyframes wave3 {
          0%, 100% { transform: translateX(0) translateY(0) scale(1); }
          50% { transform: translateX(-45px) translateY(-25px) scale(1.02); }
        }

        @keyframes wave4 {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(35px) translateY(-8px); }
        }

        @keyframes wave5 {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-30px) translateY(10px); }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(40px, -40px) scale(1.15); opacity: 0.5; }
          66% { transform: translate(-25px, 25px) scale(0.9); opacity: 0.25; }
        }

        .wave-1 {
          animation: wave1 25s ease-in-out infinite;
          transform-origin: center;
        }

        .wave-2 {
          animation: wave2 18s ease-in-out infinite;
          transform-origin: center;
        }

        .wave-3 {
          animation: wave3 14s ease-in-out infinite;
          transform-origin: center;
        }

        .wave-4 {
          animation: wave4 22s ease-in-out infinite;
          transform-origin: center;
        }

        .wave-5 {
          animation: wave5 28s ease-in-out infinite;
          transform-origin: center;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(200, 200, 210, 0.25) 0%, transparent 70%);
          top: 5%;
          left: 5%;
          animation: float 30s ease-in-out infinite;
        }

        .orb-2 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(180, 180, 190, 0.2) 0%, transparent 70%);
          top: 40%;
          right: 0%;
          animation: float 35s ease-in-out infinite reverse;
        }

        .orb-3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(220, 220, 230, 0.18) 0%, transparent 70%);
          bottom: 15%;
          left: 25%;
          animation: float 25s ease-in-out infinite;
          animation-delay: -5s;
        }

        .orb-4 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(160, 160, 170, 0.22) 0%, transparent 70%);
          top: 25%;
          right: 25%;
          animation: float 32s ease-in-out infinite;
          animation-delay: -12s;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .wave-1, .wave-2, .wave-3, .wave-4, .wave-5,
          .orb-1, .orb-2, .orb-3, .orb-4 {
            animation: none;
          }
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .orb {
            opacity: 0.6;
          }
          .orb-1 { width: 300px; height: 300px; }
          .orb-2 { width: 350px; height: 350px; }
          .orb-3 { width: 250px; height: 250px; }
          .orb-4 { width: 200px; height: 200px; }
        }
      `}</style>
    </div>
  );
}
