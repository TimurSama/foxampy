"use client";

import { useEffect, useState, useRef } from 'react';

export default function LiquidCSS() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const rafRef = useRef<number>();
  const targetRef = useRef({ x: 50, y: 50 });
  const currentRef = useRef({ x: 50, y: 50 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Respect user preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let frameCount = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      };
    };

    const animate = () => {
      frameCount++;
      // Update every 2nd frame (30fps) for performance
      if (frameCount % 2 === 0) {
        const lerp = 0.03; // Slower, smoother follow
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;
        
        // Only update state if changed significantly
        if (Math.abs(currentRef.current.x - mousePos.x) > 0.3 || 
            Math.abs(currentRef.current.y - mousePos.y) > 0.3) {
          setMousePos({ ...currentRef.current });
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, mousePos.x, mousePos.y]);

  // Static fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#080808]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#050505] to-[#030303]" />
      
      {/* Animated mesh gradient - GPU accelerated */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at ${mousePos.x}% ${mousePos.y}%, 
              rgba(25, 25, 30, 0.9) 0%, 
              rgba(15, 15, 18, 0.6) 30%, 
              transparent 60%
            ),
            radial-gradient(ellipse 60% 40% at ${100 - mousePos.x * 0.5}% ${100 - mousePos.y * 0.3}%, 
              rgba(35, 35, 40, 0.5) 0%, 
              transparent 50%
            ),
            radial-gradient(circle at 20% 80%, 
              rgba(20, 20, 25, 0.4) 0%, 
              transparent 40%
            )
          `,
          filter: 'blur(60px)',
          transform: 'translate3d(0, 0, 0)', // GPU layer
          willChange: 'transform',
          transition: 'background 0.3s ease-out'
        }}
      />

      {/* Metallic sheen - static position, animated via CSS */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              ${120 + mousePos.x * 0.2}deg,
              transparent 0%,
              rgba(255, 255, 255, 0.03) 25%,
              rgba(200, 200, 210, 0.08) 50%,
              rgba(255, 255, 255, 0.03) 75%,
              transparent 100%
            )
          `,
          mixBlendMode: 'screen'
        }}
      />

      {/* Liquid layers - pure CSS animations */}
      <div className="liquid-layer liquid-layer-1" />
      <div className="liquid-layer liquid-layer-2" />
      <div className="liquid-layer liquid-layer-3" />

      {/* Subtle noise overlay - static image, not animated */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)'
        }}
      />

      <style jsx>{`
        .liquid-layer {
          position: absolute;
          inset: -50%;
          pointer-events: none;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .liquid-layer-1 {
          background: conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            rgba(20, 20, 25, 0.3) 60deg,
            transparent 120deg,
            rgba(25, 25, 30, 0.2) 180deg,
            transparent 240deg,
            rgba(20, 20, 25, 0.3) 300deg,
            transparent 360deg
          );
          filter: blur(80px);
          animation: rotate1 30s linear infinite;
        }

        .liquid-layer-2 {
          background: conic-gradient(
            from 180deg at 50% 50%,
            transparent 0deg,
            rgba(30, 30, 35, 0.2) 90deg,
            transparent 180deg,
            rgba(25, 25, 30, 0.25) 270deg,
            transparent 360deg
          );
          filter: blur(100px);
          animation: rotate2 40s linear infinite reverse;
        }

        .liquid-layer-3 {
          background: radial-gradient(
            circle at 50% 50%,
            rgba(40, 40, 45, 0.15) 0%,
            transparent 50%
          );
          filter: blur(60px);
          animation: pulse 20s ease-in-out infinite;
        }

        @keyframes rotate1 {
          from { transform: rotate(0deg) scale(1.5); }
          to { transform: rotate(360deg) scale(1.5); }
        }

        @keyframes rotate2 {
          from { transform: rotate(360deg) scale(1.2); }
          to { transform: rotate(0deg) scale(1.2); }
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
