"use client";

import { motion } from 'framer-motion';
import { Briefcase, ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

interface Company {
  id: string;
  name: string;
  url: string;
  role: string;
  roleEn: string;
  achievements: string[];
  achievementsEn: string[];
}

export default function ExperienceSection() {
  const { language } = useI18n();
  const isRussian = language !== 'en';

  const companies: Company[] = [
    {
      id: 'done',
      name: 'Done',
      url: 'https://done.co.il',
      role: 'Brand & Creative Lead',
      roleEn: 'Brand & Creative Lead',
      achievements: [
        'Брендинг и айдентика',
        'Разработка приложения',
        'Маркетинговые кампании',
        'Режиссирование и продюсирование видеосъёмок'
      ],
      achievementsEn: [
        'Branding and identity',
        'App development',
        'Marketing campaigns',
        'Directing and producing video shoots'
      ]
    },
    {
      id: 'unicap',
      name: 'UNICAP',
      url: 'https://unicap.invest.org',
      role: 'Creative Director',
      roleEn: 'Creative Director',
      achievements: [
        'Маркетинг фонда',
        'Портфель инвестиционных проектов',
        'Презентации для инвесторов'
      ],
      achievementsEn: [
        'Fund marketing',
        'Investment project portfolio',
        'Investor presentations'
      ]
    },
    {
      id: 'culligan',
      name: 'Culligan Eurasia',
      url: 'https://www.culligan.com',
      role: 'Marketing Specialist',
      roleEn: 'Marketing Specialist',
      achievements: [
        'Тендеры и выставки',
        'Развитие Евразийского направления',
        'B2B маркетинг'
      ],
      achievementsEn: [
        'Tenders and exhibitions',
        'Eurasian direction development',
        'B2B marketing'
      ]
    },
    {
      id: 'realting',
      name: 'Realting',
      url: 'https://realting.uz',
      role: 'Product & Research Lead',
      roleEn: 'Product & Research Lead',
      achievements: [
        'Исследование рынка B2B/B2C/B2G',
        'Цифровой реестр прав собственности (Title Registry)',
        'Chain of Title — полная история сделок',
        'Аккредитация риелторов и агентств',
        'Смарт-контракты для токенизации недвижимости'
      ],
      achievementsEn: [
        'B2B/B2C/B2G market research',
        'Digital Title Registry',
        'Chain of Title — complete transaction history',
        'Realtor and agency accreditation',
        'Smart contracts for real estate tokenization'
      ]
    }
  ];

  return (
    <section id="experience" className="px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/[0.03] rounded-full mb-6"
          >
            <Briefcase size={14} className="text-white/50" />
            <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
              {isRussian ? 'Карьерный путь' : 'Career Path'}
            </span>
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-mono text-white mb-3">
            {isRussian ? 'Опыт работы' : 'Work Experience'}
          </h2>
          <p className="text-xs text-white/30 font-mono tracking-[0.2em] uppercase">
            {isRussian ? 'компании и проекты' : 'companies & projects'}
          </p>
        </motion.div>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="h-full p-6 md:p-8
                              bg-white/[0.02] backdrop-blur-xl
                              border border-white/[0.08]
                              rounded-lg
                              transition-all duration-500 ease-out
                              hover:bg-white/[0.04] hover:border-white/[0.15]
                              hover:shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                                bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.01]" />

                <div className="relative z-10 space-y-5">
                  {/* Company Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-mono text-white group-hover:text-white/90 transition-colors">
                        {company.name}
                      </h3>
                      <p className="font-mono text-xs text-cyan-400/70 mt-1">
                        {isRussian ? company.role : company.roleEn}
                      </p>
                    </div>
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
                      aria-label={`Visit ${company.name}`}
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* Achievements List */}
                  <ul className="space-y-2">
                    {(isRussian ? company.achievements : company.achievementsEn).map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                        className="flex items-start gap-2 font-mono text-xs text-white/40 leading-relaxed"
                      >
                        <span className="w-1 h-1 rounded-full bg-white/30 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-white/20
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
