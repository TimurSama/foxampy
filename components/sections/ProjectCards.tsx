"use client";

import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp, Target } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';

// ============================================
// ТИПЫ ДАННЫХ
// ============================================
export interface Project {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  url: string;
  status: 'active' | 'pilot' | 'beta' | 'planning';
  category: string;
  categoryEn: string;
  focus: string[];
  stageLabel: string;
}

// ============================================
// ДАННЫЕ ПРОЕКТОВ
// ============================================
export const projects: Project[] = [
  {
    id: 'civilization-protocol',
    name: 'Civilization Protocol',
    nameEn: 'Civilization Protocol',
    description: 'Децентрализованная кибер-физическая платформа для управления водными ресурсами через блокчейн. VODeco (Value of Data – Water Ecosystem) включает двойную токеномику (VODeco + VOD), DAO-управление, мониторинг через IoT и AI, токенизацию водных ресурсов и инвестиционные проекты.',
    descriptionEn: 'Decentralized cyber-physical platform for water resource management through blockchain. VODeco includes dual tokenomics, DAO governance, IoT and AI monitoring, water resource tokenization.',
    url: 'https://civilization-protocol.vercel.app/',
    status: 'active',
    category: 'Блокчейн / Экосистема',
    categoryEn: 'Blockchain / Ecosystem',
    focus: ['Blockchain', 'IoT', 'AI', 'Tokenomics'],
    stageLabel: 'Phase 2',
  },
  {
    id: 'tradeplus',
    name: 'TradePlus',
    nameEn: 'TradePlus',
    description: 'Продвинутая платформа для торговли и инвестиций с интеграцией множественных криптовалютных бирж, инструментами технического и фундаментального анализа, автоматизацией торговых стратегий.',
    descriptionEn: 'Advanced trading platform with multi-exchange integration, technical analysis tools, and trading strategy automation.',
    url: 'https://github.com/TimurSama/TradePlus',
    status: 'active',
    category: 'Финтех / Трейдинг',
    categoryEn: 'Fintech / Trading',
    focus: ['Fintech', 'Quant', 'UX', 'Automation'],
    stageLabel: 'Active',
  },
  {
    id: 'dogymorbios',
    name: 'Dogymorbios',
    nameEn: 'Dogymorbios',
    description: 'Платформенная экосистема и социальная сеть для собак и их владельцев. Объединяет интерактивную карту прогулок с GPS-трекингом, социальную ленту, маркетплейс товаров и услуг, внутреннюю валюту BoneCoin.',
    descriptionEn: 'Platform ecosystem and social network for dogs and their owners. GPS tracking, social feed, marketplace, BoneCoin currency, and DAO governance.',
    url: 'https://github.com/TimurSama/dogymorbios',
    status: 'pilot',
    category: 'Социальная сеть',
    categoryEn: 'Social Network',
    focus: ['Geo', 'Mobile', 'Community'],
    stageLabel: 'Pilot',
  },
  {
    id: 'nexusvita',
    name: 'NexusVita',
    nameEn: 'NexusVita',
    description: 'Платформа интеграции жизненных данных и сервисов в единую экосистему здоровья и благополучия. Обеспечивает связность между медицинскими приложениями и фитнес-трекерами.',
    descriptionEn: 'Platform for integrating life data into a unified health ecosystem. Connectivity between medical applications and fitness trackers.',
    url: 'https://github.com/TimurSama/NexusVita',
    status: 'active',
    category: 'Здоровье',
    categoryEn: 'Health',
    focus: ['Health API', 'AI', 'Security'],
    stageLabel: 'Active',
  },
];

// ============================================
// КОНФИГУРАЦИЯ СТАТУСОВ
// ============================================
const statusLabels: Record<string, string> = {
  active: 'Активен',
  pilot: 'Пилот',
  beta: 'Бета',
  planning: 'Планирование',
};

const statusColors: Record<string, string> = {
  active: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/5',
  pilot: 'border-amber-500/40 text-amber-400 bg-amber-500/5',
  beta: 'border-blue-500/40 text-blue-400 bg-blue-500/5',
  planning: 'border-gray-500/40 text-gray-400 bg-gray-500/5',
};

// ============================================
// КОМПОНЕНТ КАРТОЧКИ ПРОЕКТА
// ============================================
interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { language } = useI18n();
  const isRussian = language !== 'en';

  return (
    <motion.div
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

        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="space-y-3">
            {/* Category Badge */}
            <div className="inline-flex px-3 py-1 
                            border border-white/10 bg-white/[0.03] 
                            rounded-full">
              <span className="font-mono text-[10px] text-white/50 tracking-wider uppercase">
                {isRussian ? project.category : project.categoryEn}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-mono text-white 
                           group-hover:text-white/90 transition-colors duration-300">
              {isRussian ? project.name : project.nameEn}
            </h3>

            {/* Description */}
            <p className="font-mono text-sm text-white/40 leading-relaxed">
              {isRussian ? project.description : project.descriptionEn}
            </p>
          </div>

          {/* Status & Tech Stack */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
            {/* Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target size={12} className="text-white/30" />
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">
                  {isRussian ? 'Статус' : 'Status'}
                </span>
              </div>
              <span className={`inline-flex px-2.5 py-1 border rounded-md font-mono text-[9px] tracking-wider ${statusColors[project.status]}`}>
                {statusLabels[project.status]} · {project.stageLabel}
              </span>
            </div>

            {/* Tech Focus */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={12} className="text-white/30" />
                <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">
                  {isRussian ? 'Технологии' : 'Stack'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.focus.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] text-cyan-400/70 
                               border border-cyan-400/20 
                               px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 
                         px-4 py-2 
                         border border-white/10 bg-white/[0.03]
                         rounded-full
                         font-mono text-[10px] text-white/60 tracking-wider
                         transition-all duration-300
                         hover:border-white/25 hover:bg-white/[0.06] hover:text-white/90
                         group/btn"
            >
              {isRussian ? 'Открыть проект' : 'Open Project'}
              <ExternalLink size={10} 
                           className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Corner accent dot */}
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-white/20 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}

// ============================================
// КОМПОНЕНТ СЕТКИ ПРОЕКТОВ
// ============================================
export function ProjectsGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`grid md:grid-cols-2 gap-5 ${className}`}>
      {projects.map((project, index) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          index={index}
        />
      ))}
    </div>
  );
}
