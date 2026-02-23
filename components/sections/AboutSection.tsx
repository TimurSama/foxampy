"use client";

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles } from 'lucide-react';

export default function AboutSection() {
  const { language } = useI18n();

  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="w-full grid grid-cols-12 min-h-screen">
        {/* Left Photo - Smaller with fade mask */}
        <motion.div 
          className="hidden lg:flex lg:col-span-2 items-center justify-end relative"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-[180px] h-[60vh]">
            {/* Photo with mask fade */}
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
              style={{
                backgroundImage: `url('/photo/слева.png')`,
                maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
              }}
            />
          </div>
        </motion.div>

        {/* Center Content - Wider */}
        <motion.div 
          className="col-span-12 lg:col-span-8 flex flex-col items-center justify-center px-6 py-20 lg:py-0 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 
                       border border-white/20 bg-white/[0.03] backdrop-blur-sm
                       rounded-full relative overflow-hidden group"
            whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.4)' }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Sparkles size={14} className="text-white/60 relative z-10" />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider relative z-10">
              {language === 'ru' ? 'Инновационный креатор' : 'Innovative Creator'}
            </span>
          </motion.div>
          
          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono text-white leading-none mb-6 tracking-tight">
            foxampy
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-lg text-center mb-8 font-light">
            {language === 'ru' 
              ? 'Создаю устойчивые системы на пересечении бизнеса, дизайна и технологий. Работаю с комплексными проектами требующими системного подхода и междисциплинарного мышления.'
              : 'Creating sustainable systems at the intersection of business, design and technology. Working with complex projects requiring a systematic approach and interdisciplinary thinking.'
            }
          </p>

          {/* Decorative line */}
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
            <span className="text-xs font-mono text-white/30 tracking-[0.3em]">2025</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </motion.div>

        {/* Right Photo - Smaller with fade mask */}
        <motion.div 
          className="hidden lg:flex lg:col-span-2 items-center justify-start relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative w-full max-w-[180px] h-[60vh]">
            {/* Photo with mask fade */}
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
              style={{
                backgroundImage: `url('/photo/справа.png')`,
                maskImage: 'linear-gradient(to left, transparent 0%, black 30%, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 30%, black 70%, transparent 100%)',
              }}
            />
          </div>
        </motion.div>

        {/* Mobile Photos - Hidden on mobile for cleaner look */}
        <div className="lg:hidden hidden">
          {/* Mobile layout simplified */}
        </div>
      </div>
    </section>
  );
}
