"use client";

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe, Github } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface ProjectPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  projectName: string;
}

export function ProjectPreviewModal({ isOpen, onClose, url, projectName }: ProjectPreviewModalProps) {
  const { language } = useI18n();
  const isRussian = language !== 'en';

  // Закрытие по Escape
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const isGithub = url.includes('github.com');
  const domain = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

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

          {/* Modal Container - Smaller size */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90vw] max-w-lg"
          >
            {/* Card */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-white/[0.02] border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-xs text-white/60 ml-2">{projectName}</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-white/60 hover:text-white/90 hover:bg-white/10 rounded transition-all"
                  aria-label="Закрыть"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
