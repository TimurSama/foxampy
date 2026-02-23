"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { Send, X, CheckCircle, MessageSquare } from 'lucide-react';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const socialNetworks = [
  { value: 'telegram', label: 'Telegram' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'other', label: 'Other' },
];

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const { language } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    socialNetwork: '',
    nickname: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          setFormData({
            name: '',
            region: '',
            socialNetwork: '',
            nickname: '',
            phone: '',
            email: '',
            message: '',
          });
        }, 2000);
      } else {
        alert(language === 'ru' ? 'Ошибка отправки. Попробуйте позже.' : 'Error sending. Please try later.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert(language === 'ru' ? 'Ошибка отправки. Попробуйте позже.' : 'Error sending. Please try later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                       md:w-full md:max-w-lg md:max-h-[90vh]
                       bg-white/[0.03] backdrop-blur-xl
                       border border-white/10 rounded-2xl
                       z-50 overflow-hidden"
          >
            {/* Success State */}
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4"
                >
                  <CheckCircle size={32} className="text-emerald-400" />
                </motion.div>
                <h3 className="text-xl font-mono text-white mb-2">
                  {language === 'ru' ? 'Отправлено!' : 'Sent!'}
                </h3>
                <p className="text-white/50 text-center">
                  {language === 'ru' 
                    ? 'Спасибо! Я свяжусь с вами в ближайшее время.' 
                    : 'Thank you! I will contact you soon.'}
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <MessageSquare size={18} className="text-white/60" />
                    </div>
                    <div>
                      <h3 className="font-mono text-white">
                        {language === 'ru' ? 'Обратная связь' : 'Contact'}
                      </h3>
                      <p className="text-xs text-white/40">
                        {language === 'ru' ? 'Заполните форму ниже' : 'Fill out the form below'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-100px)]">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">
                      {language === 'ru' ? 'Имя *' : 'Name *'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg
                               text-white placeholder-white/20
                               focus:outline-none focus:border-white/30 transition-colors"
                      placeholder={language === 'ru' ? 'Ваше имя' : 'Your name'}
                    />
                  </div>

                  {/* Region */}
                  <div>
                    <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">
                      {language === 'ru' ? 'Регион' : 'Region'}
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg
                               text-white placeholder-white/20
                               focus:outline-none focus:border-white/30 transition-colors"
                      placeholder={language === 'ru' ? 'Город / Страна' : 'City / Country'}
                    />
                  </div>

                  {/* Social Network & Nickname */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">
                        {language === 'ru' ? 'Соц. сеть' : 'Social'}
                      </label>
                      <select
                        name="socialNetwork"
                        value={formData.socialNetwork}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg
                                 text-white focus:outline-none focus:border-white/30 transition-colors
                                 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0a0a0a]">
                          {language === 'ru' ? 'Выбрать...' : 'Select...'}
                        </option>
                        {socialNetworks.map((network) => (
                          <option key={network.value} value={network.value} className="bg-[#0a0a0a]">
                            {network.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">
                        {language === 'ru' ? 'Никнейм' : 'Nickname'}
                      </label>
                      <input
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg
                                 text-white placeholder-white/20
                                 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="@username"
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">
                        {language === 'ru' ? 'Телефон *' : 'Phone *'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg
                                 text-white placeholder-white/20
                                 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="+7..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">
                        {language === 'ru' ? 'Email *' : 'Email *'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg
                                 text-white placeholder-white/20
                                 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">
                      {language === 'ru' ? 'Сообщение' : 'Message'}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg
                               text-white placeholder-white/20 resize-none
                               focus:outline-none focus:border-white/30 transition-colors"
                      placeholder={language === 'ru' ? 'Опишите ваш проект или вопрос...' : 'Describe your project or question...'}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-2
                             bg-white/10 hover:bg-white/15
                             border border-white/20 hover:border-white/30
                             rounded-full
                             font-mono text-sm text-white tracking-wider
                             transition-all duration-300
                             flex items-center justify-center gap-2
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {language === 'ru' ? 'Отправка...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        {language === 'ru' ? 'Отправить' : 'Send'}
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
