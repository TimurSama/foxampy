"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Search, ChevronDown, Globe } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import type { Language } from '@/lib/i18n/translations';

const menuItemsConfig = [
  { path: '#apps', label: 'ПРИЛОЖЕНИЯ', labelEn: 'APPS' },
  { path: '#fashion', label: 'МОДА', labelEn: 'FASHION' },
  { path: '#architecture', label: 'АРХИТЕКТУРА', labelEn: 'ARCHITECTURE' },
  { path: '#video', label: 'ВИДЕО', labelEn: 'VIDEO' },
  { path: '#research', label: 'R&D', labelEn: 'R&D' },
];

export default function Header() {
  const { language, setLanguage } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchQuery('');
      setSearchOpen(false);
    }
  }, [searchQuery]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-2 md:mx-8 mt-1 bg-glass-matte/95 backdrop-blur-xl shadow-[0_2px_12px_0_rgba(0,0,0,0.2)] rounded-sm">
        <div className="px-4 md:px-8 py-2 flex items-center justify-between relative">
          {/* Burger Menu - Left */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 border border-stone-anthracite/30 text-stone-slate 
                       hover:text-engrave-line hover:border-engrave-line/20 transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-ink-chrome/95 border border-stone-anthracite/50 
                           backdrop-blur-md min-w-[180px] z-50 shadow-lg"
                >
                  {menuItemsConfig.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleMenuClick(item.path)}
                      className="w-full px-4 py-2.5 text-left font-mono text-xs text-stone-slate 
                               hover:bg-ink-deep hover:text-engrave-line transition-colors
                               border-b border-stone-anthracite/20 last:border-b-0"
                    >
                      {language !== 'en' ? item.label : item.labelEn}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logo - Center */}
          <div className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-200 ${searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <motion.div
              className="font-mono text-sm md:text-base tracking-[0.2em] text-engrave-fresco cursor-pointer whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              FOXAMPY LAB
            </motion.div>
          </div>

          {/* Search + Language - Right */}
          <div className="flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-3">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'ru' ? 'поиск...' : 'search...'}
                    autoFocus
                    className="w-32 md:w-48 px-3 py-1.5 bg-ink-chrome/30 border border-stone-anthracite/50 
                             font-mono text-xs text-engrave-fresco placeholder-stone-anthracite
                             focus:border-engrave-line/30 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="p-1.5 text-stone-slate hover:text-engrave-line ml-1"
                  >
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 border border-stone-anthracite/30 text-stone-slate 
                           hover:text-engrave-line hover:border-engrave-line/20 transition-colors"
                >
                  <Search size={14} />
                </button>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative" ref={languageMenuRef}>
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="px-3 py-2 border border-stone-anthracite/30 text-stone-slate 
                         hover:text-engrave-line hover:border-engrave-line/20 transition-colors
                         flex items-center gap-1.5 font-mono text-xs"
              >
                <Globe size={14} />
                <span>{languageNames[language]}</span>
                <ChevronDown size={12} className={languageMenuOpen ? 'rotate-180' : ''} />
              </button>

              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-ink-chrome/95 border border-stone-anthracite/50 
                             backdrop-blur-xl min-w-[120px] z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLanguageMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left font-mono text-xs transition-colors
                                 border-b border-stone-anthracite/20 last:border-b-0
                                 ${language === lang
                            ? 'bg-ink-deep text-engrave-line'
                            : 'text-stone-slate hover:bg-ink-deep hover:text-engrave-line'
                          }`}
                      >
                        {languageNames[lang]}
                      </button>
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
