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
      {/* Base gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(20, 20, 25, 0.8) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(25, 25, 30, 0.6) 0%, transparent 50%)'
        }}
      />

      {/* Animated SVG Waves */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'blur(40px)' }}
      >
        <defs>
          <linearGradient id="oilGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(40, 40, 50, 0.4)" />
            <stop offset="50%" stopColor="rgba(30, 30, 40, 0.3)" />
            <stop offset="100%" stopColor="rgba(20, 20, 25, 0.2)" />
          </linearGradient>
          <linearGradient id="oilGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(35, 35, 45, 0.35)" />
            <stop offset="50%" stopColor="rgba(25, 25, 35, 0.25)" />
            <stop offset="100%" stopColor="rgba(15, 15, 20, 0.15)" />
          </linearGradient>
          <linearGradient id="oilGradient3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(45, 42, 52, 0.3)" />
            <stop offset="100%" stopColor="rgba(25, 25, 30, 0.1)" />
          </linearGradient>
        </defs>

        {/* Wave 1 - Slow */}
        <g className="wave-1">
          <path
            d="M0,300 Q360,200 720,300 T1440,300 L1440,900 L0,900 Z"
            fill="url(#oilGradient1)"
          />
          <path
            d="M0,350 Q360,250 720,350 T1440,350 L1440,900 L0,900 Z"
            fill="url(#oilGradient1)"
            opacity="0.7"
          />
        </g>

        {/* Wave 2 - Medium */}
        <g className="wave-2">
          <path
            d="M0,450 Q360,350 720,450 T1440,450 L1440,900 L0,900 Z"
            fill="url(#oilGradient2)"
          />
          <path
            d="M0,500 Q360,400 720,500 T1440,500 L1440,900 L0,900 Z"
            fill="url(#oilGradient2)"
            opacity="0.6"
          />
        </g>

        {/* Wave 3 - Fast */}
        <g className="wave-3">
          <path
            d="M0,600 Q360,500 720,600 T1440,600 L1440,900 L0,900 Z"
            fill="url(#oilGradient3)"
          />
          <path
            d="M0,650 Q360,550 720,650 T1440,650 L1440,900 L0,900 Z"
            fill="url(#oilGradient3)"
            opacity="0.5"
          />
        </g>

        {/* Top waves */}
        <g className="wave-4" opacity="0.4">
          <path
            d="M0,100 Q360,50 720,100 T1440,100 L1440,0 L0,0 Z"
            fill="url(#oilGradient1)"
          />
        </g>

        <g className="wave-5" opacity="0.3">
          <path
            d="M0,150 Q360,100 720,150 T1440,150 L1440,0 L0,0 Z"
            fill="url(#oilGradient2)"
          />
        </g>
      </svg>

      {/* Animated orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      <style jsx>{`
        @keyframes wave1 {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-20px) translateY(10px); }
          50% { transform: translateX(0) translateY(20px); }
          75% { transform: translateX(20px) translateY(10px); }
        }

        @keyframes wave2 {
          0%, 100% { transform: translateX(0) translateY(0); }
          33% { transform: translateX(30px) translateY(-15px); }
          66% { transform: translateX(-20px) translateY(10px); }
        }

        @keyframes wave3 {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-40px) translateY(-20px); }
        }

        @keyframes wave4 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }

        @keyframes wave5 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-25px); }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }

        .wave-1 {
          animation: wave1 20s ease-in-out infinite;
        }

        .wave-2 {
          animation: wave2 15s ease-in-out infinite;
        }

        .wave-3 {
          animation: wave3 12s ease-in-out infinite;
        }

        .wave-4 {
          animation: wave4 18s ease-in-out infinite;
        }

        .wave-5 {
          animation: wave5 22s ease-in-out infinite;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(40, 40, 50, 0.5) 0%, transparent 70%);
          top: 10%;
          left: 10%;
          animation: float 25s ease-in-out infinite;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(35, 35, 45, 0.4) 0%, transparent 70%);
          top: 50%;
          right: 5%;
          animation: float 30s ease-in-out infinite reverse;
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(45, 42, 52, 0.35) 0%, transparent 70%);
          bottom: 20%;
          left: 30%;
          animation: float 20s ease-in-out infinite;
          animation-delay: -5s;
        }

        .orb-4 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(30, 35, 45, 0.4) 0%, transparent 70%);
          top: 30%;
          right: 30%;
          animation: float 28s ease-in-out infinite;
          animation-delay: -10s;
        }
      `}</style>
    </div>
  );
}
