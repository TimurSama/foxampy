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
      subtitle: 'Заполните форму, и я свяжусь с вами',
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
      success: 'Заявка отправлена!',
      successMessage: 'Я свяжусь с вами в ближайшее время',
      close: 'Закрыть',
      error: 'Произошла ошибка. Попробуйте позже.',
    },
    en: {
      title: 'Contact',
      subtitle: 'Fill out the form and I will get in touch',
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
      success: 'Message sent!',
      successMessage: 'I will contact you soon',
      close: 'Close',
      error: 'An error occurred. Please try again later.',
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

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                     md:w-full md:max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl z-50
                     overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-medium text-white">{t.title}</h2>
                <p className="text-sm text-white/50 mt-0.5">{t.subtitle}</p>
              </div>
              <motion.button
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{t.success}</h3>
                  <p className="text-white/50">{t.successMessage}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      {t.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.namePlaceholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                               text-white placeholder-white/30
                               focus:outline-none focus:border-white/30 focus:bg-white/10
                               transition-all"
                    />
                  </div>

                  {/* Region */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      {t.region}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      placeholder={t.regionPlaceholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                               text-white placeholder-white/30
                               focus:outline-none focus:border-white/30 focus:bg-white/10
                               transition-all"
                    />
                  </div>

                  {/* Social Network */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      {t.socialNetwork}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {socialNetworks.map((network) => (
                        <motion.button
                          key={network.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, socialNetwork: network.value })}
                          className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all border
                                   ${formData.socialNetwork === network.value
                              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                              : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70'
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
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      {t.nickname}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nickname}
                      onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                      placeholder={t.nicknamePlaceholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                               text-white placeholder-white/30
                               focus:outline-none focus:border-white/30 focus:bg-white/10
                               transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.phonePlaceholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                               text-white placeholder-white/30
                               focus:outline-none focus:border-white/30 focus:bg-white/10
                               transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">
                      {t.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.emailPlaceholder}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                               text-white placeholder-white/30
                               focus:outline-none focus:border-white/30 focus:bg-white/10
                               transition-all"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-cyan-500/20 border border-cyan-500/50 rounded-xl
                             text-cyan-400 font-medium
                             hover:bg-cyan-500/30 hover:border-cyan-500/70
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {t.sending}
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        {t.submit}
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
