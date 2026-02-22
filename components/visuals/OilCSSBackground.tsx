"use client";

import { useEffect, useState, useRef, useMemo } from 'react';

export default function OilCSSBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isLowPerf, setIsLowPerf] = useState(false);
  const animationRef = useRef<number>();
  const targetPos = useRef({ x: 50, y: 50 });
  const currentPos = useRef({ x: 50, y: 50 });

  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const cores = navigator.hardwareConcurrency || 2;
      const memory = (navigator as any).deviceMemory || 4;
      
      setIsLowPerf(isMobile || cores < 4 || memory < 4);
    };
    
    checkPerformance();
  }, []);

  useEffect(() => {
    if (isLowPerf) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      };
    };

    const animate = () => {
      const lerp = 0.08;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;
      
      if (Math.abs(currentPos.current.x - mousePos.x) > 0.5 || 
          Math.abs(currentPos.current.y - mousePos.y) > 0.5) {
        setMousePos({ x: currentPos.current.x, y: currentPos.current.y });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isLowPerf, mousePos.x, mousePos.y]);

  const staticGradient = useMemo(() => ({
    background: `
      radial-gradient(ellipse at 30% 20%, rgba(20, 20, 25, 0.6) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba(30, 30, 35, 0.5) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(15, 15, 20, 0.4) 0%, transparent 70%)
    `
  }), []);

  return (
    <div className="absolute inset-0 overflow-hidden will-change-transform">
      <div 
        className={`absolute inset-0 ${isLowPerf ? 'opacity-30' : 'opacity-40'}`}
        style={isLowPerf ? staticGradient : {
          background: `
            radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
              rgba(20, 20, 25, 0.8) 0%, 
              rgba(10, 10, 15, 0.6) 25%, 
              transparent 60%
            ),
            radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, 
              rgba(30, 30, 35, 0.6) 0%, 
              transparent 50%
            )
          `,
          filter: 'blur(30px)',
          transform: `translate3d(${(mousePos.x - 50) * 0.015}px, ${(mousePos.y - 50) * 0.015}px, 0)`,
          willChange: 'transform'
        }}
      />
      
      <div className={`absolute inset-0 ${isLowPerf ? 'opacity-20' : 'opacity-25'}`}>
        <div className="oil-wave oil-wave-1" />
        {!isLowPerf && <div className="oil-wave oil-wave-2" />}
      </div>

      {!isLowPerf && (
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, 
                rgba(200, 200, 210, 0.3) 0%, 
                transparent 25%
              )
            `,
            mixBlendMode: 'screen',
            willChange: 'transform'
          }}
        />
      )}

      <style jsx>{`
        .oil-wave {
          position: absolute;
          inset: -20%;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        
        .oil-wave-1 {
          background: linear-gradient(45deg, 
            transparent 30%, 
            rgba(25, 25, 30, 0.25) 50%, 
            transparent 70%
          );
          animation: oilLoop1 20s linear infinite;
        }
        
        .oil-wave-2 {
          background: linear-gradient(-45deg, 
            transparent 35%, 
            rgba(35, 35, 40, 0.2) 55%, 
            transparent 75%
          );
          animation: oilLoop2 25s linear infinite reverse;
        }

        @keyframes oilLoop1 {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          100% { transform: translate3d(0, 0, 0) rotate(360deg); }
        }

        @keyframes oilLoop2 {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          100% { transform: translate3d(0, 0, 0) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
