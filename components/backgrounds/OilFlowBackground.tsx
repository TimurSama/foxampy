"use client";

import { useEffect, useState, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
}

export default function OilFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const createParticle = useCallback((x: number, y: number): Particle => ({
    x,
    y,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 80 + 40,
    life: 0,
    maxLife: Math.random() * 200 + 100
  }), []);

  // Initialize particles
  useEffect(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < 8; i++) {
      particles.push(createParticle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      ));
    }
    particlesRef.current = particles;
  }, [createParticle]);

  // Mouse tracking
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

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
      if (!isVisible) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      frameCount++;
      // Render every 2nd frame for performance (30fps)
      if (frameCount % 2 !== 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = 'rgba(3, 3, 3, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((p, i) => {
        // Mouse interaction
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300) {
            const force = (300 - dist) / 300 * 0.02;
            p.vx += dx * force * 0.01;
            p.vy += dy * force * 0.01;
          }
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Subtle drift
        p.vx += Math.sin(p.life * 0.01 + i) * 0.02;
        p.vy += Math.cos(p.life * 0.01 + i) * 0.02;

        // Boundary wrap
        if (p.x < -p.radius) p.x = canvas.width + p.radius;
        if (p.x > canvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = canvas.height + p.radius;
        if (p.y > canvas.height + p.radius) p.y = -p.radius;

        p.life++;

        // Draw oil blob
        const opacity = Math.sin((p.life / p.maxLife) * Math.PI) * 0.4;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(25, 25, 30, ${opacity})`);
        gradient.addColorStop(0.4, `rgba(15, 15, 20, ${opacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(3, 3, 3, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Reset particle if lifetime exceeded
        if (p.life > p.maxLife) {
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = 'rgba(30, 30, 35, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
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
  }, [isVisible, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-[#030303]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#050505] to-[#030303]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 bg-[#030303] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          filter: 'blur(40px)',
          transform: 'translate3d(0, 0, 0)'
        }}
      />
      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 100%)'
        }}
      />
    </div>
  );
}
