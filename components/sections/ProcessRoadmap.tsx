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
      icon: <Search size={18} />,
      title: language === 'ru' ? 'Исследование' : 'Discovery',
      subtitle: language === 'ru' ? 'Анализ и аудит' : 'Analysis & Audit',
      description: language === 'ru' 
        ? 'Погружение в контекст, изучение рынка, конкурентов и аудитории. Формирование стратегического видения.'
        : 'Deep dive into context, market research, competitor analysis.',
      number: '01'
    },
    {
      id: 'concept',
      icon: <Lightbulb size={18} />,
      title: language === 'ru' ? 'Концепция' : 'Concept',
      subtitle: language === 'ru' ? 'Идея и позиционирование' : 'Idea & Positioning',
      description: language === 'ru'
        ? 'Разработка концептуальных решений, креативных подходов и уникального торгового предложения.'
        : 'Developing conceptual solutions and creative approaches.',
      number: '02'
    },
    {
      id: 'design',
      icon: <Compass size={18} />,
      title: language === 'ru' ? 'Проектирование' : 'Design',
      subtitle: language === 'ru' ? 'Стратегия и архитектура' : 'Strategy & Architecture',
      description: language === 'ru'
        ? 'Стратегирование, разработка архитектуры, брендирование, визуализация дизайна и UX/UI.'
        : 'Strategic planning, architecture, branding, visual design.',
      number: '03'
    },
    {
      id: 'development',
      icon: <Hammer size={18} />,
      title: language === 'ru' ? 'Разработка' : 'Development',
      subtitle: language === 'ru' ? 'Создание' : 'Creation',
      description: language === 'ru'
        ? 'Прототипирование, производство, строительство, техническая разработка и интеграции.'
        : 'Prototyping, manufacturing, construction, technical development.',
      number: '04'
    },
    {
      id: 'launch',
      icon: <Rocket size={18} />,
      title: language === 'ru' ? 'Запуск' : 'Launch',
      subtitle: language === 'ru' ? 'Релиз' : 'Release',
      description: language === 'ru'
        ? 'Запуск продукта, вывод на рынок, маркетинговые кампании.'
        : 'Product launch, market entry, marketing campaigns.',
      number: '05'
    },
    {
      id: 'evolution',
      icon: <TrendingUp size={18} />,
      title: language === 'ru' ? 'Развитие' : 'Evolution',
      subtitle: language === 'ru' ? 'Масштабирование' : 'Scaling',
      description: language === 'ru'
        ? 'Поддержка, оптимизация, выход на новые рынки и масштабирование.'
        : 'Support, optimization, entering new markets.',
      number: '06'
    }
  ];

  const StageCard = ({ stage, index }: { stage: Stage; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group relative"
    >
      {/* Glass Card */}
      <div className="relative p-5 md:p-6
                      bg-white/[0.02] backdrop-blur-xl
                      border border-white/[0.08]
                      rounded-xl
                      transition-all duration-500 ease-out
                      hover:bg-white/[0.04] hover:border-white/[0.15]
                      hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]
                      h-full">
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                        bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

        {/* Large number background */}
        <div className="absolute top-3 right-3 font-mono text-4xl text-white/[0.03] select-none">
          {stage.number}
        </div>

        <div className="relative z-10">
          {/* Icon */}
          <div className="w-10 h-10 mb-4 
                          flex items-center justify-center 
                          text-white/40 
                          border border-white/10 bg-white/[0.03]
                          rounded-lg
                          transition-all duration-300
                          group-hover:border-white/20 group-hover:text-white/70">
            {stage.icon}
          </div>

          {/* Small number */}
          <div className="font-mono text-[9px] text-white/25 mb-1.5 tracking-widest">
            {stage.number}
          </div>

          {/* Title */}
          <h3 className="font-mono text-sm text-white mb-1 
                         group-hover:text-white/90 transition-colors">
            {stage.title}
          </h3>
          
          {/* Subtitle */}
          <p className="text-[10px] text-white/30 mb-3 
                        group-hover:text-white/40 transition-colors">
            {stage.subtitle}
          </p>

          {/* Description */}
          <p className="text-[11px] text-white/35 leading-relaxed
                        group-hover:text-white/50 transition-colors">
            {stage.description}
          </p>
        </div>

        {/* Corner dot */}
        <div className="absolute bottom-3 right-3 w-1 h-1 rounded-full bg-white/30
                        opacity-0 group-hover:opacity-100 transition-opacity" />
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
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-mono text-white mb-2">
            {language === 'ru' ? 'Полный цикл' : 'Full Cycle'}
          </h2>
          <p className="text-[11px] text-white/25 font-mono tracking-[0.2em] uppercase">
            {language === 'ru' ? 'от идеи до масштабирования' : 'from idea to scaling'}
          </p>
        </motion.div>

        {/* Snake Grid */}
        <div className="space-y-4 md:space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            <StageCard stage={stages[0]} index={0} />
            <StageCard stage={stages[1]} index={1} />
            <StageCard stage={stages[2]} index={2} />
          </div>

          {/* Row 2 - reversed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
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
