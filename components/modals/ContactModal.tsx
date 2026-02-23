"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const socialNetworks = [
  { value: 'telegram', label: 'Telegram', labelEn: 'Telegram' },
  { value: 'whatsapp', label: 'WhatsApp', labelEn: 'WhatsApp' },
  { value: 'instagram', label: 'Instagram', labelEn: 'Instagram' },
  { value: 'twitter', label: 'Twitter/X', labelEn: 'Twitter/X' },
  { value: 'linkedin', label: 'LinkedIn', labelEn: 'LinkedIn' },
  { value: 'other', label: 'Другое', labelEn: 'Other' },
];

const quickLinks = [
  { name: 'Telegram', url: 'https://t.me/foxampy', icon: 'TG' },
  { name: 'Instagram', url: 'https://instagram.com/foxampy', icon: 'IG' },
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { language } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    socialNetwork: 'telegram',
    nickname: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const t = {
    ru: {
      title: 'Связаться',
      subtitle: 'Выберите удобный способ для связи',
      name: 'Имя',
      namePlaceholder: 'Ваше имя',
      region: 'Регион',
      regionPlaceholder: 'Страна, город',
      socialNetwork: 'Предпочитаемый способ связи',
      nickname: 'Никнейм',
      nicknamePlaceholder: '@username или никнейм',
      phone: 'Телефон',
      phonePlaceholder: '+7 (999) 999-99-99',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      submit: 'Отправить',
      sending: 'Отправка...',
      success: 'Заявка отправлена',
      successMessage: 'Я свяжусь с вами в ближайшее время',
      or: 'или',
      quickContact: 'Быстрая связь',
      error: 'Ошибка отправки. Попробуйте позже.',
    },
    en: {
      title: 'Contact',
      subtitle: 'Choose your preferred way to connect',
      name: 'Name',
      namePlaceholder: 'Your name',
      region: 'Region',
      regionPlaceholder: 'Country, city',
      socialNetwork: 'Preferred contact method',
      nickname: 'Nickname',
      nicknamePlaceholder: '@username or nickname',
      phone: 'Phone',
      phonePlaceholder: '+1 (999) 999-9999',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      submit: 'Send',
      sending: 'Sending...',
      success: 'Message sent',
      successMessage: 'I will contact you soon',
      or: 'or',
      quickContact: 'Quick contact',
      error: 'Failed to send. Please try again.',
    },
  }[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send');

      setIsSuccess(true);
      setFormData({
        name: '',
        region: '',
        socialNetwork: 'telegram',
        nickname: '',
        phone: '',
        email: '',
      });
    } catch {
      setError(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setIsSuccess(false);
      setError('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal - Centered, fixed size, scrollable content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                     w-auto md:w-[480px] max-w-full max-h-[90vh] md:max-h-[85vh]
                     bg-[#0a0a0a] border border-white/10 z-50
                     flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
              <div>
                <h2 className="text-lg font-mono text-white tracking-wider">{t.title}</h2>
                <p className="text-xs text-white/40 mt-0.5 font-mono">{t.subtitle}</p>
              </div>
              <motion.button
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-2 text-white/40 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-14 h-14 border border-white/20 flex items-center justify-center mb-4">
                    <CheckCircle size={24} className="text-white/70" />
                  </div>
                  <h3 className="text-lg font-mono text-white mb-2 tracking-wider">{t.success}</h3>
                  <p className="text-sm text-white/40 font-mono">{t.successMessage}</p>
                </motion.div>
              ) : (
                <>
                  {/* Quick Links - Social Networks */}
                  <div className="mb-6">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3 font-mono">
                      {t.quickContact}
                    </p>
                    <div className="flex gap-3">
                      {quickLinks.map((link) => (
                        <motion.a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 border border-white/10 
                                   text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5
                                   transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-xs font-mono">{link.icon}</span>
                          <span className="text-xs font-mono">{link.name}</span>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">{t.or}</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                        {t.name}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.namePlaceholder}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10
                                 text-white placeholder-white/20 font-mono text-sm
                                 focus:outline-none focus:border-white/30 focus:bg-white/[0.07]
                                 transition-all"
                      />
                    </div>

                    {/* Region */}
                    <div>
                      <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                        {t.region}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        placeholder={t.regionPlaceholder}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10
                                 text-white placeholder-white/20 font-mono text-sm
                                 focus:outline-none focus:border-white/30 focus:bg-white/[0.07]
                                 transition-all"
                      />
                    </div>

                    {/* Social Network */}
                    <div>
                      <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                        {t.socialNetwork}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {socialNetworks.map((network) => (
                          <motion.button
                            key={network.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, socialNetwork: network.value })}
                            className={`px-2 py-2.5 border text-[10px] font-mono uppercase tracking-wider transition-all
                                     ${formData.socialNetwork === network.value
                                ? 'bg-white/10 border-white/30 text-white'
                                : 'bg-transparent border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {language === 'ru' ? network.label : network.labelEn}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Nickname */}
                    <div>
                      <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                        {t.nickname}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nickname}
                        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                        placeholder={t.nicknamePlaceholder}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10
                                 text-white placeholder-white/20 font-mono text-sm
                                 focus:outline-none focus:border-white/30 focus:bg-white/[0.07]
                                 transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.phonePlaceholder}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10
                                 text-white placeholder-white/20 font-mono text-sm
                                 focus:outline-none focus:border-white/30 focus:bg-white/[0.07]
                                 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.emailPlaceholder}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10
                                 text-white placeholder-white/20 font-mono text-sm
                                 focus:outline-none focus:border-white/30 focus:bg-white/[0.07]
                                 transition-all"
                      />
                    </div>

                    {error && (
                      <div className="p-3 border border-red-500/30 bg-red-500/5">
                        <p className="text-xs text-red-400 font-mono">{error}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 border border-white/20
                               text-white/70 font-mono text-xs uppercase tracking-widest
                               hover:bg-white/10 hover:border-white/30 hover:text-white
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all flex items-center justify-center gap-2 mt-6"
                      whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          {t.sending}
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          {t.submit}
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
