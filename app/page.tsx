"use client";

import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Shirt,
  Compass,
  Film,
  FlaskConical,
  ChevronRight,
  Monitor,
  Cpu,
  ChevronLeft
} from 'lucide-react';
import Header from '@/components/layout/Header';
import AboutSection from '@/components/sections/AboutSection';
import { useI18n } from '@/lib/i18n/context';
import { useState, useEffect } from 'react';

const fashionImages = [
  '/gallery/photo_2026-01-30_12-26-56.jpg',
  '/gallery/photo_2026-01-30_12-27-09.jpg',
  '/gallery/photo_2026-01-30_12-27-19.jpg',
  '/gallery/photo_2026-01-30_12-27-28.jpg',
  '/gallery/photo_2026-01-30_12-27-32.jpg',
  '/gallery/photo_2026-01-30_12-27-35.jpg',
  '/gallery/photo_2026-01-30_12-27-39.jpg',
  '/gallery/photo_2026-01-30_12-27-43.jpg',
  '/gallery/photo_2026-01-30_12-27-46.jpg',
  '/gallery/photo_2026-01-30_12-27-50.jpg',
  '/gallery/photo_2026-01-30_12-27-54.jpg',
  '/gallery/photo_2026-01-30_12-27-58.jpg',
  '/gallery/photo_2026-01-30_12-28-02.jpg',
  '/gallery/photo_2026-01-30_12-28-05.jpg',
  '/gallery/photo_2026-01-30_12-28-08.jpg',
];

const architectureImages = [
  '/architecture/image_2024-08-21_21-32-32.png',
  '/architecture/image_2024-08-21_21-32-39.png',
  '/architecture/image_2024-08-21_21-32-44.png',
  '/architecture/image_2024-08-21_21-32-49.png',
  '/architecture/image_2024-08-21_21-32-54.png',
];

function ImageCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [images.length, isHovered]);

  return (
    <motion.div 
      className="relative w-full aspect-[4/5] md:aspect-auto md:h-[50vh] overflow-hidden border border-white/10 bg-black/30 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full object-contain"
          alt={`Gallery image ${index + 1}`}
        />
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={20} />
        </motion.button>
        <motion.button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === index ? 'bg-white' : 'bg-white/20 hover:bg-white/40'}`}
            animate={{ width: i === index ? 32 : 8 }}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const { t, language } = useI18n();
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const videoShowcase = [
    {
      src: "/media/need-for-speed-underground-2-remaster-2022.mp4",
      title: language === 'ru' ? "CGI 3D кино" : "CGI 3D Cinema",
      meta: "CGI / 01",
      tags: ["DYNAMICS", "VELOCITY", "CORE"]
    },
    {
      src: "/media/ryabov.mp4",
      title: language === 'ru' ? "Рекламный шоурилс" : "Advertising Showreel",
      meta: "R&D / 02",
      tags: ["BIOMORPHIC", "SYNTHESIS", "FLOW"]
    }
  ];

  const gallerySections = [
    {
      id: 'apps',
      title: t('gallery.apps.title'),
      accent: t('gallery.apps.accent'),
      icon: <Layers size={18} />,
      description: t('gallery.apps.description'),
      projects: [
        {
          id: 'web3-bank',
          title: t('cases.web3Bank.title'),
          category: t('cases.web3Bank.category'),
          description: t('cases.web3Bank.description'),
          solution: t('cases.web3Bank.solution'),
          visuals: t('cases.web3Bank.visuals'),
          icon: <Monitor size={20} />
        },
        {
          id: 'mail-services',
          title: t('cases.mailServices.title'),
          category: t('cases.mailServices.category'),
          description: t('cases.mailServices.description'),
          solution: t('cases.mailServices.solution'),
          visuals: t('cases.mailServices.visuals'),
          icon: <Cpu size={20} />
        }
      ]
    },
    {
      id: 'fashion',
      title: t('gallery.fashion.title'),
      accent: t('gallery.fashion.accent'),
      icon: <Shirt size={18} />,
      description: t('gallery.fashion.description'),
      isCarousel: true,
      images: fashionImages,
      projects: []
    },
    {
      id: 'architecture',
      title: t('gallery.architecture.title'),
      accent: t('gallery.architecture.accent'),
      icon: <Compass size={18} />,
      description: t('gallery.architecture.description'),
      isCarousel: true,
      images: architectureImages,
      projects: [
        {
          id: 'parametric-architecture',
          title: t('cases.parametricArchitecture.title'),
          category: t('cases.parametricArchitecture.category'),
          description: t('cases.parametricArchitecture.description'),
          solution: t('cases.parametricArchitecture.solution'),
          visuals: t('cases.parametricArchitecture.visuals'),
          icon: <Compass size={20} />
        }
      ]
    },
    {
      id: 'research',
      title: t('gallery.research.title'),
      accent: t('gallery.research.accent'),
      icon: <FlaskConical size={18} />,
      description: t('gallery.research.description'),
      projects: [
        {
          id: 'rd-iot',
          title: t('cases.rd.iot.title'),
          category: t('cases.rd.iot.category'),
          description: t('cases.rd.iot.description'),
          solution: '',
          visuals: '',
          icon: <Monitor size={20} />
        },
        {
          id: 'rd-quantum',
          title: t('cases.rd.quantum.title'),
          category: t('cases.rd.quantum.category'),
          description: t('cases.rd.quantum.description'),
          solution: '',
          visuals: '',
          icon: <Cpu size={20} />
        },
        {
          id: 'rd-water',
          title: t('cases.rd.water.title'),
          category: t('cases.rd.water.category'),
          description: t('cases.rd.water.description'),
          solution: '',
          visuals: '',
          icon: <FlaskConical size={20} />
        }
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Subtle gradient overlay for depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />

      <Header />

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero section */}
        <section className="px-4 mb-24 min-h-[60vh] flex items-center justify-center">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div 
              className="inline-block p-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm space-y-6 hover:border-white/20 transition-all duration-500"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-mono text-[10px] text-white/50 tracking-[0.5em] uppercase"
              >
                {t('gallery.tagline')}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-mono text-white"
              >
                {t('gallery.title')}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-4 pt-4"
              >
                <motion.div 
                  className="h-px w-12 bg-white/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                />
                <span className="font-mono text-xs text-white/40">2025</span>
                <motion.div 
                  className="h-px w-12 bg-white/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About section */}
        <AboutSection />

        {/* Video showcase */}
        <section id="video" className="px-4 mb-32">
          <div className="max-w-6xl mx-auto space-y-6">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="text-white/70"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Film size={18} />
              </motion.div>
              <div className="font-mono text-xs text-white/50 tracking-[0.25em] uppercase">
                {t('gallery.video.title')}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videoShowcase.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden group hover:border-white/20 transition-all duration-300"
                >
                  <div className="relative aspect-video bg-[#050505]">
                    <video
                      src={item.src}
                      controls
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between border-t border-white/10 group-hover:border-white/20 transition-colors">
                    <h3 className="font-mono text-sm text-white group-hover:text-white/90 transition-colors">{item.title}</h3>
                    <div className="flex gap-2">
                      {item.tags.map((tag, tagIdx) => (
                        <motion.span 
                          key={tag} 
                          className="font-mono text-[8px] px-1.5 py-0.5 border border-white/10 text-white/40 group-hover:border-white/20 group-hover:text-white/60 transition-all"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + tagIdx * 0.05 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="px-4">
          <div className="max-w-6xl mx-auto space-y-24">
            {gallerySections.map((block) => (
              <div key={block.id} id={block.id} className="space-y-12">
                <motion.div 
                  className="inline-flex items-center gap-6 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-sm hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div 
                    className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/70 bg-white/5 group-hover:border-white/20 group-hover:text-white transition-all"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    {block.icon}
                  </motion.div>
                  <div>
                    <div className="font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase mb-1">
                      {block.accent}
                    </div>
                    <h2 className="font-mono text-2xl text-white/90 uppercase tracking-widest group-hover:text-white transition-colors">
                      {block.title}
                    </h2>
                  </div>
                </motion.div>

                {block.description && (
                  <motion.p 
                    className="font-mono text-sm text-white/50 max-w-2xl leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {block.description}
                  </motion.p>
                )}

                {block.isCarousel ? (
                  <ImageCarousel images={block.images || []} />
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {block.projects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`group border backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden ${activeProject === project.id
                          ? 'border-white/30 bg-white/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
                          }`}
                        onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                      >
                        <div className="p-8">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
                            <div className="space-y-2">
                              <motion.div 
                                className="font-mono text-[10px] text-white/40 uppercase tracking-widest"
                                whileHover={{ x: 4 }}
                              >
                                {project.category}
                              </motion.div>
                              <h3 className="font-mono text-xl text-white/90 group-hover:text-white transition-colors">
                                {project.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-4">
                              <motion.div
                                animate={{ rotate: activeProject === project.id ? 90 : 0 }}
                                className="text-white/40 group-hover:text-white/60 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                <ChevronRight size={20} />
                              </motion.div>
                            </div>
                          </div>

                          {activeProject === project.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="mt-8 pt-8 border-t border-white/10 overflow-hidden"
                            >
                              <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                  <div className="space-y-3">
                                    <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                                      {language === 'ru' ? 'Описание' : 'Description'}
                                    </h4>
                                    <p className="font-mono text-sm text-white/70 leading-relaxed whitespace-pre-line">
                                      {project.description}
                                    </p>
                                  </div>
                                  {project.solution && (
                                    <div className="space-y-3">
                                      <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                                        {language === 'ru' ? 'Решение' : 'Solution'}
                                      </h4>
                                      <p className="font-mono text-sm text-white/70 leading-relaxed italic">
                                        {project.solution}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="space-y-6">
                                  {project.visuals && (
                                    <div className="space-y-3">
                                      <h4 className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                                        {language === 'ru' ? 'Визуальная концепция' : 'Visual Concept'}
                                      </h4>
                                      <div className="p-6 border border-white/10 bg-black/30 font-mono text-xs text-white/60 leading-relaxed">
                                        {project.visuals}
                                      </div>
                                    </div>
                                  )}
                                  <motion.button 
                                    className="w-full py-4 border border-white/20 hover:bg-white hover:text-black transition-all font-mono text-xs tracking-[0.2em] uppercase text-white/80 hover:text-black"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      alert('Contact form coming soon!');
                                    }}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                  >
                                    {language === 'ru' ? 'Обсудить похожий проект' : 'Discuss similar project'}
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 mt-32">
          <div className="max-w-6xl mx-auto pt-12 border-t border-white/10">
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-between gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="font-mono text-sm text-white/60 tracking-[0.2em] hover:text-white transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                FOXAMPY LAB
              </motion.div>
              <div className="font-mono text-xs text-white/30">
                © 2025 Foxampy Lab. {language === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}
              </div>
            </motion.div>
          </div>
        </footer>
      </main>
    </div>
  );
}
