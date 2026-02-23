"use client";

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface FloatingContactButtonProps {
  onClick: () => void;
}

export default function FloatingContactButton({ onClick }: FloatingContactButtonProps) {
  const { language } = useI18n();

  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-4
               bg-cyan-500/20 backdrop-blur-xl border border-cyan-500/50 rounded-2xl
               text-cyan-400 shadow-lg shadow-cyan-500/10
               hover:bg-cyan-500/30 hover:border-cyan-500/70 hover:shadow-cyan-500/20
               transition-all duration-300 group"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <MessageCircle size={22} />
      </motion.div>
      <span className="font-mono text-sm font-medium hidden md:block">
        {language === 'ru' ? 'Написать' : 'Contact'}
      </span>
      
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-cyan-400/50"
        animate={{
          scale: [1, 1.3, 1.5],
          opacity: [0.5, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </motion.button>
  );
}
