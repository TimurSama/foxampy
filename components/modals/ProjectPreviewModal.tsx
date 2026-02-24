"use client";

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface ProjectPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  projectName: string;
}

export function ProjectPreviewModal({ isOpen, onClose, url, projectName }: ProjectPreviewModalProps) {
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 border-b-0 rounded-t-lg backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-xs text-white/60 ml-2">{projectName}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-white/60 hover:text-white/90 hover:bg-white/10 rounded transition-all"
                >
                  <ExternalLink size={12} />
                  <span className="hidden sm:inline">Открыть в новой вкладке</span>
                  <span className="sm:hidden">Открыть</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-2 text-white/60 hover:text-white/90 hover:bg-white/10 rounded transition-all"
                  aria-label="Закрыть"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 bg-black border border-white/10 rounded-b-lg overflow-hidden">
              <iframe
                src={url}
                title={projectName}
                className="w-full h-full"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; payment"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
