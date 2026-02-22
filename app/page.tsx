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

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-[50vh] overflow-hidden border border-[#E0E0E0]/10 bg-[#0A0A0A]">
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
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-[#050505]/50 border border-[#E0E0E0]/10 text-white hover:bg-[#E0E0E0]/10 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center bg-[#050505]/50 border border-[#E0E0E0]/10 text-white hover:bg-[#E0E0E0]/10 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-300 ${i === index ? 'w-8 bg-[#E0E0E0]' : 'w-2 bg-[#E0E0E0]/20'}`}
          />
        ))}
      </div>
    </div>
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
      {/* Background elements */}
      <div className="fixed inset-0 oil-shimmer opacity-[0.03] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />

      <Header />

      <main className="relative z-10 pt-32 pb-24">
        {/* Hero section */}
        <section className="px-4 mb-24">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block p-12 bg-glass-matte rounded-sm shadow-2xl space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-[10px] text-[#E0E0E0]/60 tracking-[0.5em]"
              >
                ─── {t('gallery.tagline')} ───
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-mono text-[#E0E0E0]"
              >
                {t('gallery.title')}
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Video showcase */}
        <section id="video" className="px-4 mb-32">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <div className="text-[#E0E0E0]">
                <Film size={18} />
              </div>
              <div className="font-mono text-xs text-[#E0E0E0]/60 tracking-[0.25em] uppercase">
                {t('gallery.video.title')}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videoShowcase.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="border border-[#E0E0E0]/20 bg-[#0A0A0A] overflow-hidden group"
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
                  <div className="p-4 flex items-center justify-between border-t border-[#E0E0E0]/10">
                    <h3 className="font-mono text-sm text-[#E0E0E0]">{item.title}</h3>
                    <div className="flex gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="font-mono text-[8px] px-1.5 py-0.5 border border-[#E0E0E0]/10 text-[#E0E0E0]/40">
                          {tag}
                        </span>
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
                <div className="inline-flex items-center gap-6 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-sm shadow-xl">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-[#E0E0E0] bg-white/5">
                    {block.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#E0E0E0]/40 tracking-[0.3em] uppercase mb-1">
                      {block.accent}
                    </div>
                    <h2 className="font-mono text-2xl text-[#E0E0E0] uppercase tracking-widest">
                      {block.title}
                    </h2>
                  </div>
                </div>

                {block.description && (
                  <p className="font-mono text-sm text-[#E0E0E0]/60 max-w-2xl leading-relaxed">
                    {block.description}
                  </p>
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
                        className={`group border transition-all duration-500 ${activeProject === project.id
                          ? 'border-[#E0E0E0]/40 bg-[#E0E0E0]/5'
                          : 'border-[#E0E0E0]/10 bg-[#0A0A0A]/50 hover:border-[#E0E0E0]/20'
                          }`}
                        onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                      >
                        <div className="p-8">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
                            <div className="space-y-2">
                              <div className="font-mono text-[10px] text-[#E0E0E0]/40 uppercase tracking-widest">
                                {project.category}
                              </div>
                              <h3 className="font-mono text-xl text-[#E0E0E0] group-hover:text-white transition-colors">
                                {project.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-4">
                              <motion.div
                                animate={{ rotate: activeProject === project.id ? 90 : 0 }}
                                className="text-[#E0E0E0]/40"
                              >
                                <ChevronRight size={20} />
                              </motion.div>
                            </div>
                          </div>

                          {activeProject === project.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-8 pt-8 border-t border-[#E0E0E0]/10 overflow-hidden"
                            >
                              <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                  <div className="space-y-3">
                                    <h4 className="font-mono text-[10px] text-[#E0E0E0]/40 uppercase tracking-widest">
                                      {language === 'ru' ? 'Описание' : 'Description'}
                                    </h4>
                                    <p className="font-mono text-sm text-[#E0E0E0]/80 leading-relaxed whitespace-pre-line">
                                      {project.description}
                                    </p>
                                  </div>
                                  {project.solution && (
                                    <div className="space-y-3">
                                      <h4 className="font-mono text-[10px] text-[#E0E0E0]/40 uppercase tracking-widest">
                                        {language === 'ru' ? 'Решение' : 'Solution'}
                                      </h4>
                                      <p className="font-mono text-sm text-[#E0E0E0]/80 leading-relaxed italic">
                                        {project.solution}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="space-y-6">
                                  {project.visuals && (
                                    <div className="space-y-3">
                                      <h4 className="font-mono text-[10px] text-[#E0E0E0]/40 uppercase tracking-widest">
                                        {language === 'ru' ? 'Визуальная концепция' : 'Visual Concept'}
                                      </h4>
                                      <div className="p-6 border border-[#E0E0E0]/10 bg-[#050505] font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
                                        {project.visuals}
                                      </div>
                                    </div>
                                  )}
                                  <button 
                                    className="w-full py-4 border border-[#E0E0E0]/20 hover:bg-[#E0E0E0] hover:text-[#050505] transition-all font-mono text-xs tracking-[0.2em] uppercase"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      alert('Contact form coming soon!');
                                    }}
                                  >
                                    {language === 'ru' ? 'Обсудить похожий проект' : 'Discuss similar project'}
                                  </button>
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
          <div className="max-w-6xl mx-auto pt-12 border-t border-[#E0E0E0]/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="font-mono text-sm text-[#E0E0E0]/60 tracking-[0.2em]">
                FOXAMPY LAB
              </div>
              <div className="font-mono text-xs text-[#E0E0E0]/40">
                © 2025 Foxampy Lab. {language === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
