"use client";

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { 
  Search,
  Lightbulb,
  Compass,
  Hammer,
  Rocket,
  TrendingUp
} from 'lucide-react';

interface Stage {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  number: string;
}

export default function ProcessRoadmap() {
  const { language } = useI18n();

  const stages: Stage[] = [
    {
      id: 'discovery',
      icon: <Search size={20} />,
      title: language === 'ru' ? 'Исследование' : 'Discovery',
      subtitle: language === 'ru' ? 'Анализ и аудит' : 'Analysis & Audit',
      description: language === 'ru' 
        ? 'Погружение в контекст, изучение рынка, конкурентов и аудитории. Формирование стратегического видения.'
        : 'Deep dive into context, market research, competitor analysis and audience study.',
      number: '01'
    },
    {
      id: 'concept',
      icon: <Lightbulb size={20} />,
      title: language === 'ru' ? 'Концепция' : 'Concept',
      subtitle: language === 'ru' ? 'Идея и позиционирование' : 'Idea & Positioning',
      description: language === 'ru'
        ? 'Разработка концептуальных решений, креативных подходов и уникального торгового предложения.'
        : 'Developing conceptual solutions and creative approaches.',
      number: '02'
    },
    {
      id: 'design',
      icon: <Compass size={20} />,
      title: language === 'ru' ? 'Проектирование' : 'Design',
      subtitle: language === 'ru' ? 'Стратегия и архитектура' : 'Strategy & Architecture',
      description: language === 'ru'
        ? 'Стратегирование, разработка верхнеуровневой проектной архитектуры, брендирование, визуализация дизайна и UX/UI проработка.'
        : 'Strategic planning, high-level architecture, branding, visual design and UX/UI.',
      number: '03'
    },
    {
      id: 'development',
      icon: <Hammer size={20} />,
      title: language === 'ru' ? 'Разработка' : 'Development',
      subtitle: language === 'ru' ? 'Создание и реализация' : 'Creation & Implementation',
      description: language === 'ru'
        ? 'Полный цикл создания: прототипирование, производство, строительство, техническая разработка, программирование и интеграции.'
        : 'Full creation cycle: prototyping, manufacturing, construction, technical development.',
      number: '04'
    },
    {
      id: 'launch',
      icon: <Rocket size={20} />,
      title: language === 'ru' ? 'Запуск' : 'Launch',
      subtitle: language === 'ru' ? 'Релиз и продвижение' : 'Release & Promotion',
      description: language === 'ru'
        ? 'Запуск продукта, вывод на рынок, маркетинговые кампании и первичный сбор обратной связи.'
        : 'Product launch, market entry, marketing campaigns and feedback collection.',
      number: '05'
    },
    {
      id: 'evolution',
      icon: <TrendingUp size={20} />,
      title: language === 'ru' ? 'Развитие' : 'Evolution',
      subtitle: language === 'ru' ? 'Масштабирование' : 'Scaling',
      description: language === 'ru'
        ? 'Поддержка, оптимизация, доработка, выход на новые рынки и масштабирование.'
        : 'Support, optimization, refinement, entering new markets and scaling.',
      number: '06'
    }
  ];

  const StageCard = ({ stage, index }: { stage: Stage; index: number }) => (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <div className="relative p-6 bg-white/[0.02] border border-white/[0.08] rounded-sm cursor-pointer overflow-hidden h-full transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20">
        {/* Background glow on hover - CSS only */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Number - large background */}
        <div className="absolute top-2 right-3 font-mono text-5xl text-white/[0.03] select-none">
          {stage.number}
        </div>

        <div className="relative z-10">
          {/* Icon - CSS hover */}
          <div className="w-11 h-11 mb-5 flex items-center justify-center text-white/40 border border-white/10 bg-white/[0.03] transition-all duration-200 group-hover:border-white/25 group-hover:text-white/90">
            {stage.icon}
          </div>

          {/* Number - small */}
          <div className="font-mono text-[10px] text-white/30 mb-2 tracking-wider">
            {stage.number}
          </div>

          {/* Title */}
          <h3 className="font-mono text-sm text-white mb-1.5 group-hover:text-white/90 transition-colors duration-200">
            {stage.title}
          </h3>
          
          {/* Subtitle */}
          <p className="text-[11px] text-white/35 mb-4 group-hover:text-white/50 transition-colors duration-200">
            {stage.subtitle}
          </p>

          {/* Description - CSS hover opacity */}
          <p className="text-xs text-white/45 leading-relaxed transition-opacity duration-200 group-hover:opacity-90">
            {stage.description}
          </p>
        </div>

        {/* Corner accent - CSS hover */}
        <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-white/30 rounded-full" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="process" className="px-4 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-mono text-white mb-3">
            {language === 'ru' ? 'Полный цикл' : 'Full Cycle'}
          </h2>
          <p className="text-xs text-white/30 font-mono tracking-[0.2em] uppercase">
            {language === 'ru' ? 'от идеи до масштабирования' : 'from idea to scaling'}
          </p>
        </motion.div>

        {/* Snake Layout - Staggered Grid */}
        <div className="space-y-4 md:space-y-0">
          {/* Row 1: 01 02 03 - standard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <StageCard stage={stages[0]} index={0} />
            <StageCard stage={stages[1]} index={1} />
            <StageCard stage={stages[2]} index={2} />
          </div>

          {/* Row 2: 06 05 04 - reversed (snake pattern) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:order-3">
              <StageCard stage={stages[5]} index={3} />
            </div>
            <div className="md:order-2">
              <StageCard stage={stages[4]} index={4} />
            </div>
            <div className="md:order-1">
              <StageCard stage={stages[3]} index={5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
