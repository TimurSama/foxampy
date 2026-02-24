"use client";

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';

export default function AboutSection() {
  const { language } = useI18n();

  return (
    <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="w-full grid grid-cols-12 min-h-screen">
        {/* Left Photo Container - Mobile: small strip at top, Desktop: side */}
        <motion.div 
          className="col-span-12 lg:col-span-2 relative h-[30vh] lg:h-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Photo */}
          <div 
            className="absolute inset-0 lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-full lg:h-[80vh] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
            style={{
              backgroundImage: `url('/photo/слева.png')`,
              backgroundPosition: 'center 20%',
            }}
          />
          {/* Fade overlays - mobile: fade bottom, desktop: fade right */}
          <div className="absolute inset-x-0 bottom-0 h-16 lg:hidden bg-gradient-to-t from-[#030303] to-transparent" />
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-24 lg:bg-gradient-to-l lg:from-[#030303] lg:to-transparent" />
          <div className="hidden lg:block lg:absolute lg:inset-x-0 lg:top-0 lg:h-24 lg:bg-gradient-to-b lg:from-[#030303] lg:to-transparent" />
          <div className="hidden lg:block lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-24 lg:bg-gradient-to-t lg:from-[#030303] lg:to-transparent" />
        </motion.div>

        {/* Center Content */}
        <motion.div 
          className="col-span-12 lg:col-span-8 flex flex-col items-center justify-center px-6 py-12 lg:py-0 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Badge - No emoji */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 
                       border border-white/20 bg-white/[0.03] backdrop-blur-sm
                       rounded-full transition-all duration-300
                       hover:border-white/40"
          >
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
              {language === 'ru' ? 'Креативный инноватор' : 'Creative Innovator'}
            </span>
          </motion.div>
          
          {/* Name - Capitalized */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono text-white leading-none mb-4 tracking-tight">
            Foxampy
          </h1>

          {/* Real name */}
          <p className="text-sm md:text-base font-mono text-white/40 tracking-[0.2em] uppercase mb-8">
            Timur Cadik
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-lg text-center mb-12 font-light">
            {language === 'ru' 
              ? 'Создаю устойчивые системы на пересечении бизнеса, дизайна и технологий. Работаю с комплексными проектами требующими системного подхода и междисциплинарного мышления.'
              : 'Creating sustainable systems at the intersection of business, design and technology. Working with complex projects requiring a systematic approach and interdisciplinary thinking.'
            }
          </p>
        </motion.div>

        {/* Right Photo Container - Mobile: small strip at bottom, Desktop: side */}
        <motion.div 
          className="col-span-12 lg:col-span-2 relative h-[30vh] lg:h-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Photo */}
          <div 
            className="absolute inset-0 lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-full lg:h-[80vh] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
            style={{
              backgroundImage: `url('/photo/справа.png')`,
              backgroundPosition: 'center 20%',
            }}
          />
          {/* Fade overlays - mobile: fade top, desktop: fade left */}
          <div className="absolute inset-x-0 top-0 h-16 lg:hidden bg-gradient-to-b from-[#030303] to-transparent" />
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:left-0 lg:w-24 lg:bg-gradient-to-r lg:from-[#030303] lg:to-transparent" />
          <div className="hidden lg:block lg:absolute lg:inset-x-0 lg:top-0 lg:h-24 lg:bg-gradient-to-b lg:from-[#030303] lg:to-transparent" />
          <div className="hidden lg:block lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-24 lg:bg-gradient-to-t lg:from-[#030303] lg:to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
