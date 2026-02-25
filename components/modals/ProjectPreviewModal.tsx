"use client";

import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe, Github, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface ProjectPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  projectName: string;
}

// Проекты, которые можно открыть в iframe
const iframeAllowedProjects = [
  'etholife.vercel.app',
  'etholife',
];

export function ProjectPreviewModal({ isOpen, onClose, url, projectName }: ProjectPreviewModalProps) {
  const { language } = useI18n();
  const isRussian = language !== 'en';
  const [isLoading, setIsLoading] = useState(true);

  // Закрытие по Escape
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const isGithub = url.includes('github.com');
  const domain = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  
  // Проверяем, можно ли открыть проект в iframe
  const canUseIframe = iframeAllowedProjects.some(project => 
    url.toLowerCase().includes(project.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container - Smaller size, positioned below header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed left-1/2 -translate-x-1/2 z-[101] 
                       ${canUseIframe 
                         ? 'top-[80px] w-[95vw] max-w-4xl h-[calc(100vh-100px)]' 
                         : 'top-1/2 -translate-y-1/2 w-[90vw] max-w-md'
                       }`}
          >
            {/* Card */}
            <div className={`bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl h-full flex flex-col ${!canUseIframe ? '' : ''}`}>
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 bg-white/[0.02] border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-xs text-white/60 ml-2">{projectName}</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* External link button */}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-white/40 hover:text-white/80 hover:bg-white/10 rounded transition-all"
                    aria-label="Открыть в новой вкладке"
                  >
                    <ExternalLink size={14} />
                  </a>
                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="p-1.5 text-white/60 hover:text-white/90 hover:bg-white/10 rounded transition-all"
                    aria-label="Закрыть"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Content */}
              {canUseIframe ? (
                // Iframe preview для разрешённых проектов
                <div className="flex-1 relative bg-white">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 size={24} className="text-white/40 animate-spin" />
                        <span className="font-mono text-xs text-white/40">
                          {isRussian ? 'Загрузка...' : 'Loading...'}
                        </span>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={url}
                    className="w-full h-full border-none"
                    onLoad={() => setIsLoading(false)}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    title={projectName}
                  />
                </div>
              ) : (
                // Обычный вид для проектов без iframe
                <div className="p-6 space-y-5">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center">
                      {isGithub ? (
                        <Github size={28} className="text-white/60" />
                      ) : (
                        <Globe size={28} className="text-white/60" />
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-mono text-white">{projectName}</h3>
                    <p className="font-mono text-xs text-white/40">{domain}</p>
                  </div>

                  {/* Message */}
                  <p className="text-sm text-white/50 text-center leading-relaxed">
                    {isRussian 
                      ? 'Предпросмотр недоступен из-за политики безопасности сайта. Откройте проект в новой вкладке.'
                      : 'Preview is not available due to site security policy. Open the project in a new tab.'
                    }
                  </p>

                  {/* Action Button */}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 
                             bg-white/[0.05] border border-white/20 rounded-lg
                             hover:bg-white/[0.08] hover:border-white/30 
                             transition-all duration-300 group"
                  >
                    <ExternalLink size={16} className="text-white/60 group-hover:text-white/80" />
                    <span className="font-mono text-sm text-white/80 group-hover:text-white">
                      {isRussian ? 'Открыть проект' : 'Open Project'}
                    </span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
