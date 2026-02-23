"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Globe, MessageCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import type { Language } from '@/lib/i18n/translations';

const menuItemsConfig = [
  { path: '#about', label: 'ОБО МНЕ', labelEn: 'ABOUT' },
  { path: '#process', label: 'ПРОЦЕСС', labelEn: 'PROCESS' },
  { path: '#projects', label: 'ПРОЕКТЫ', labelEn: 'PROJECTS' },
  { path: '#fashion', label: 'МОДА', labelEn: 'FASHION' },
  { path: '#architecture', label: 'АРХИТЕКТУРА', labelEn: 'ARCHITECTURE' },
  { path: '#video', label: 'ВИДЕО', labelEn: 'VIDEO' },
];

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const { language, setLanguage } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = ['en', 'ru'];
  const languageNames: Record<Language, string> = {
    en: 'EN',
    ru: 'RU',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = useCallback((path: string) => {
    setMenuOpen(false);
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-2 md:mx-8 mt-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg hover:border-white/15 transition-colors duration-300">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between relative">
          {/* Left - Menu + Contact Button */}
          <div className="flex items-center gap-2">
            {/* Burger Menu */}
            <div className="relative" ref={menuRef}>
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2.5 border border-white/10 text-white/60 rounded-lg
                         hover:text-white hover:border-white/30 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: menuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 
                             min-w-[180px] z-50 overflow-hidden rounded-lg"
                  >
                    {menuItemsConfig.map((item) => (
                      <motion.button
                        key={item.path}
                        onClick={() => handleMenuClick(item.path)}
                        className="w-full px-4 py-3 text-left font-mono text-xs text-white/60 
                                 hover:bg-white/5 hover:text-white transition-all duration-200
                                 border-b border-white/5 last:border-b-0 group"
                        whileHover={{ x: 4 }}
                      >
                        <span className="group-hover:tracking-wider transition-all duration-200">
                          {language !== 'en' ? item.label : item.labelEn}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Button - Permanent */}
            <motion.button
              onClick={onContactClick}
              className="flex items-center gap-2 px-4 py-2.5
                       bg-cyan-500/20 border border-cyan-500/50 rounded-lg
                       hover:bg-cyan-500/30 hover:border-cyan-500/70
                       transition-all duration-200 font-mono text-xs text-cyan-400"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={14} />
              <span>{language === 'ru' ? 'Связаться' : 'Contact'}</span>
            </motion.button>
          </div>

          {/* Logo - Center */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <motion.div
              className="font-mono text-sm md:text-base tracking-[0.2em] text-white cursor-pointer whitespace-nowrap
                       hover:text-white/80 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              FOXAMPY
            </motion.div>
          </div>

          {/* Right - Language Switcher */}
          <div className="flex items-center">
            <div className="relative" ref={languageMenuRef}>
              <motion.button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="p-2.5 border border-white/10 text-white/60 rounded-lg
                         hover:text-white hover:border-white/30 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={16} />
              </motion.button>

              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 
                             min-w-[100px] z-50 overflow-hidden rounded-lg"
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left font-mono text-xs transition-colors
                                 border-b border-white/5 last:border-b-0
                                 ${language === lang
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                          }`}
                        whileHover={{ x: 2 }}
                      >
                        {languageNames[lang]}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
