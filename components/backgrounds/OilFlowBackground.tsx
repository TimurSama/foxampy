"use client";

import { useEffect, useState, useRef, useCallback } from 'react';

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: { r: number; g: number; b: number };
  pulse: number;
  pulseSpeed: number;
}

export default function OilFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const blobsRef = useRef<Blob[]>([]);
  const rafRef = useRef<number>();
  const [isReady, setIsReady] = useState(false);

  const createBlob = useCallback((x: number, y: number): Blob => {
    // Oil colors: dark grays with subtle blue/purple undertones
    const oilColors = [
      { r: 35, g: 35, b: 40 },    // Dark slate
      { r: 30, g: 30, b: 35 },    // Darker
      { r: 40, g: 38, b: 45 },    // Slight purple
      { r: 25, g: 28, b: 35 },    // Blue-gray
      { r: 45, g: 42, b: 48 },    // Lighter oil
    ];
    
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 150 + 100,
      color: oilColors[Math.floor(Math.random() * oilColors.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.005 + Math.random() * 0.01
    };
  }, []);

  useEffect(() => {
    // Initialize blobs after mount
    const blobs: Blob[] = [];
    const width = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const height = typeof window !== 'undefined' ? window.innerHeight : 1080;
    
    for (let i = 0; i < 6; i++) {
      blobs.push(createBlob(
        Math.random() * width,
        Math.random() * height
      ));
    }
    blobsRef.current = blobs;
    setIsReady(true);
  }, [createBlob]);

  useEffect(() => {
    if (!isReady) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let frameCount = 0;
    
    const animate = () => {
      frameCount++;
      
      // Clear with base color
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const blobs = blobsRef.current;
      const mouse = mouseRef.current;

      // Sort blobs by size for proper layering
      blobs.sort((a, b) => a.radius - b.radius);

      blobs.forEach((blob, i) => {
        // Mouse interaction - gentle repulsion
        const dx = blob.x - mouse.x;
        const dy = blob.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 400 && dist > 0) {
          const force = (400 - dist) / 400 * 0.02;
          blob.vx += (dx / dist) * force;
          blob.vy += (dy / dist) * force;
        }

        // Apply velocity with damping
        blob.x += blob.vx;
        blob.y += blob.vy;
        blob.vx *= 0.995;
        blob.vy *= 0.995;

        // Very subtle drift movement
        blob.vx += Math.sin(frameCount * 0.001 + i) * 0.002;
        blob.vy += Math.cos(frameCount * 0.001 + i * 1.5) * 0.002;

        // Wrap around edges
        if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
        if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
        if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;

        // Pulse effect
        blob.pulse += blob.pulseSpeed;
        const pulseFactor = 1 + Math.sin(blob.pulse) * 0.1;
        const currentRadius = blob.radius * pulseFactor;

        // Draw oil blob with gradient
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, currentRadius
        );
        
        const { r, g, b } = blob.color;
        // More visible oil colors
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.5)`);
        gradient.addColorStop(0.3, `rgba(${r * 0.8}, ${g * 0.8}, ${b * 0.9}, 0.35)`);
        gradient.addColorStop(0.6, `rgba(${r * 0.6}, ${g * 0.6}, ${b * 0.7}, 0.15)`);
        gradient.addColorStop(1, 'rgba(3, 3, 3, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(blob.x, blob.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Add subtle highlight for oil sheen effect
        const shineGradient = ctx.createRadialGradient(
          blob.x - currentRadius * 0.3, 
          blob.y - currentRadius * 0.3, 
          0,
          blob.x - currentRadius * 0.3, 
          blob.y - currentRadius * 0.3, 
          currentRadius * 0.4
        );
        shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
        shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
        shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = shineGradient;
        ctx.arc(blob.x, blob.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw subtle connections between close blobs
      ctx.strokeStyle = 'rgba(60, 60, 70, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < blobs.length; i++) {
        for (let j = i + 1; j < blobs.length; j++) {
          const dx = blobs[i].x - blobs[j].x;
          const dy = blobs[i].y - blobs[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            ctx.beginPath();
            ctx.moveTo(blobs[i].x, blobs[i].y);
            ctx.lineTo(blobs[j].x, blobs[j].y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReady]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#030303' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          filter: 'blur(60px)',
          transform: 'translate3d(0, 0, 0)',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
      />
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.5) 100%)'
        }}
      />
    </div>
  );
}
