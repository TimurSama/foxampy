"use client";

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { Sparkles } from 'lucide-react';

export default function AboutSection() {
  const { language } = useI18n();

  return (
    <section id="about" className="px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header with Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Photo placeholder */}
            <motion.div 
              className="lg:col-span-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="aspect-[3/4] max-w-sm mx-auto lg:mx-0 bg-white/5 border border-white/10 rounded-sm overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                      <Sparkles size={32} className="text-white/40" />
                    </div>
                    <p className="text-sm text-white/40 font-mono">
                      {language === 'ru' ? 'Фото скоро' : 'Photo soon'}
                    </p>
                  </div>
                </div>
                {/* Placeholder for actual image - uncomment when ready */}
                {/* <img 
                  src="/photo.jpg" 
                  alt="foxampy" 
                  className="w-full h-full object-cover"
                /> */}
              </div>
            </motion.div>

            {/* Main info */}
            <div className="lg:col-span-8 space-y-6">
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full"
                whileHover={{ scale: 1.02 }}
              >
                <Sparkles size={14} className="text-white/60" />
                <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
                  {language === 'ru' ? 'Инновационный креатор' : 'Innovative Creator'}
                </span>
              </motion.div>
              
              <h1 className="text-3xl md:text-5xl font-mono text-white leading-tight">
                foxampy
              </h1>

              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
                {language === 'ru' 
                  ? 'Создаю устойчивые системы на пересечении бизнеса, дизайна и технологий. Работаю с комплексными проектами требующими системного подхода и междисциплинарного мышления.'
                  : 'Creating sustainable systems at the intersection of business, design and technology. Working with complex projects requiring a systematic approach and interdisciplinary thinking.'
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
