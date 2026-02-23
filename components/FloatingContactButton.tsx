"use client";

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface FloatingContactButtonProps {
  onClick: () => void;
}

export default function FloatingContactButton({ onClick }: FloatingContactButtonProps) {
  const { language } = useI18n();

  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3.5
               bg-white/5 backdrop-blur-xl border border-white/20 
               text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30
               transition-all duration-300 group"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <Mail size={18} strokeWidth={1.5} />
      <span className="font-mono text-xs tracking-wider hidden md:block">
        {language === 'ru' ? 'НАПИСАТЬ' : 'CONTACT'}
      </span>
    </motion.button>
  );
}
