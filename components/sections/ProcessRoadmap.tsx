"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { useState } from 'react';
import { 
  Search,
  Lightbulb,
  Compass,
  Hammer,
  Rocket,
  TrendingUp,
  ChevronDown,
  X
} from 'lucide-react';

interface Stage {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  number: string;
  style: 'neural' | 'organic' | 'geometric' | 'fluid' | 'crystalline' | 'minimal';
}

export default function ProcessRoadmap() {
  const { language } = useI18n();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const stages: Stage[] = [
    {
      id: 'discovery',
      icon: <Search size={22} />,
      title: language === 'ru' ? 'Исследование' : 'Discovery',
      subtitle: language === 'ru' ? 'Анализ и аудит' : 'Analysis & Audit',
      description: language === 'ru' 
        ? 'Погружение в контекст проекта, изучение рынка, анализ конкурентов и целевой аудитории.'
        : 'Deep dive into project context, market research, competitor and audience analysis.',
      details: language === 'ru' ? [
        'Интервью со стейкхолдерами',
        'Анализ рынка и трендов',
        'Исследование пользователей',
        'Аудит существующих решений',
        'Формирование гипотез'
      ] : [
        'Stakeholder interviews',
        'Market and trend analysis',
        'User research',
        'Audit of existing solutions',
        'Hypothesis formation'
      ],
      number: '01',
      style: 'neural'
    },
    {
      id: 'concept',
      icon: <Lightbulb size={22} />,
      title: language === 'ru' ? 'Концепция' : 'Concept',
      subtitle: language === 'ru' ? 'Идея и позиционирование' : 'Idea & Positioning',
      description: language === 'ru'
        ? 'Разработка концептуальных решений, креативных подходов и уникального торгового предложения.'
        : 'Developing conceptual solutions, creative approaches and unique value proposition.',
      details: language === 'ru' ? [
        'Brainstorming идей',
        'Определение ценностей',
        'Позиционирование бренда',
        'Создание moodboards',
        'Формулирование УТП'
      ] : [
        'Idea brainstorming',
        'Value definition',
        'Brand positioning',
        'Creating moodboards',
        'Formulating UVP'
      ],
      number: '02',
      style: 'organic'
    },
    {
      id: 'design',
      icon: <Compass size={22} />,
      title: language === 'ru' ? 'Проектирование' : 'Design',
      subtitle: language === 'ru' ? 'Стратегия и архитектура' : 'Strategy & Architecture',
      description: language === 'ru'
        ? 'Стратегирование, разработка архитектуры, брендирование, визуализация дизайна и UX/UI.'
        : 'Strategic planning, architecture development, branding, visual design and UX/UI.',
      details: language === 'ru' ? [
        'Проектная архитектура',
        'Дизайн-система',
        'Брендинг и айдентика',
        'UX/UI прототипы',
        'Визуальные гайдлайны'
      ] : [
        'Project architecture',
        'Design system',
        'Branding and identity',
        'UX/UI prototypes',
        'Visual guidelines'
      ],
      number: '03',
      style: 'geometric'
    },
    {
      id: 'development',
      icon: <Hammer size={22} />,
      title: language === 'ru' ? 'Разработка' : 'Development',
      subtitle: language === 'ru' ? 'Создание' : 'Creation',
      description: language === 'ru'
        ? 'Прототипирование, производство, строительство, техническая разработка и интеграции.'
        : 'Prototyping, manufacturing, construction, technical development and integrations.',
      details: language === 'ru' ? [
        'Создание прототипов',
        'Производство MVP',
        'Техническая разработка',
        'Интеграция систем',
        'Тестирование и QA'
      ] : [
        'Prototype creation',
        'MVP production',
        'Technical development',
        'System integration',
        'Testing and QA'
      ],
      number: '04',
      style: 'fluid'
    },
    {
      id: 'launch',
      icon: <Rocket size={22} />,
      title: language === 'ru' ? 'Запуск' : 'Launch',
      subtitle: language === 'ru' ? 'Релиз' : 'Release',
      description: language === 'ru'
        ? 'Запуск продукта, вывод на рынок, маркетинговые кампании и первичный сбор обратной связи.'
        : 'Product launch, market entry, marketing campaigns and initial feedback collection.',
      details: language === 'ru' ? [
        'Подготовка к запуску',
        'Маркетинговая стратегия',
        'PR и коммуникации',
        'Запуск продукта',
        'Сбор обратной связи'
      ] : [
        'Launch preparation',
        'Marketing strategy',
        'PR and communications',
        'Product launch',
        'Feedback collection'
      ],
      number: '05',
      style: 'crystalline'
    },
    {
      id: 'evolution',
      icon: <TrendingUp size={22} />,
      title: language === 'ru' ? 'Развитие' : 'Evolution',
      subtitle: language === 'ru' ? 'Масштабирование' : 'Scaling',
      description: language === 'ru'
        ? 'Поддержка, оптимизация, выход на новые рынки и масштабирование продукта.'
        : 'Support, optimization, entering new markets and product scaling.',
      details: language === 'ru' ? [
        'Аналитика и метрики',
        'Оптимизация процессов',
        'Масштабирование',
        'Новые фичи',
        'Долгосрочная стратегия'
      ] : [
        'Analytics and metrics',
        'Process optimization',
        'Scaling',
        'New features',
        'Long-term strategy'
      ],
      number: '06',
      style: 'minimal'
    }
  ];

  const getCardBorderStyles = (style: Stage['style']) => {
    switch (style) {
      case 'neural': return 'border-white/[0.15] rounded-2xl';
      case 'organic': return 'border-white/[0.12] rounded-[2rem]';
      case 'geometric': return 'border-white/[0.18] rounded-lg';
      case 'fluid': return 'border-white/[0.1] rounded-[1.5rem_0.5rem]';
      case 'crystalline': return 'border-white/[0.2] rounded-sm';
      case 'minimal': return 'border-white/[0.08] rounded-xl';
      default: return 'border-white/10 rounded-xl';
    }
  };

  const getIconContainerStyles = (style: Stage['style']) => {
    switch (style) {
      case 'neural': return 'w-12 h-12 rounded-full border border-white/20';
      case 'organic': return 'w-12 h-12 rounded-2xl border border-white/15';
      case 'geometric': return 'w-11 h-11 border border-white/25';
      case 'fluid': return 'w-12 h-12 rounded-full bg-white/[0.05]';
      case 'crystalline': return 'w-11 h-11 border border-white/30';
      case 'minimal': return 'w-10 h-10 rounded-lg border border-white/10';
      default: return 'w-11 h-11 border border-white/20';
    }
  };

  const StageCard = ({ stage, index }: { stage: Stage; index: number }) => {
    const isExpanded = expandedCard === stage.id;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        layout
        className={`relative cursor-pointer border bg-white/[0.02] backdrop-blur-xl
                    transition-all duration-500 hover:bg-white/[0.04]
                    ${getCardBorderStyles(stage.style)}
                    ${isExpanded ? 'bg-white/[0.05]' : ''}
                   `}
        onClick={() => setExpandedCard(isExpanded ? null : stage.id)}
      >
        {/* Style-specific decorations */}
        {stage.style === 'neural' && !isExpanded && (
          <div className="absolute top-3 right-3 w-16 h-16 opacity-20 pointer-events-none">
            <div className="absolute inset-0 border border-white/30 rounded-full" />
            <div className="absolute inset-2 border border-white/20 rounded-full" />
            <div className="absolute inset-4 border border-white/10 rounded-full" />
          </div>
        )}
        {stage.style === 'organic' && (
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/[0.03] rounded-full blur-xl pointer-events-none" />
        )}
        {stage.style === 'geometric' && !isExpanded && (
          <div className="absolute top-4 right-4 w-8 h-8 border border-white/20 rotate-45 pointer-events-none" />
        )}
        {stage.style === 'fluid' && (
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/[0.05] to-transparent pointer-events-none" 
               style={{ borderRadius: 'inherit' }} />
        )}
        {stage.style === 'crystalline' && !isExpanded && (
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-white/[0.08] border-l-[40px] border-l-transparent pointer-events-none" />
        )}

        <div className="relative z-10 p-6">
          {/* Header - Always visible */}
          <div className="flex items-start justify-between mb-4">
            <div className={`flex items-center justify-center text-white/50 ${getIconContainerStyles(stage.style)}`}>
              {stage.icon}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl text-white/10">{stage.number}</span>
              {/* Expand/Collapse indicator */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/10"
              >
                {isExpanded ? <X size={14} className="text-white/60" /> : <ChevronDown size={14} className="text-white/40" />}
              </motion.div>
            </div>
          </div>

          {/* Basic Content - Always visible */}
          <div>
            <h3 className="text-lg md:text-xl font-mono text-white mb-2">
              {stage.title}
            </h3>
            <p className="text-sm text-white/40 mb-3">
              {stage.subtitle}
            </p>
            <p className="text-base text-white/50 leading-relaxed">
              {stage.description}
            </p>
          </div>

          {/* Expanded Content - Details list */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-white/10">
                  <ul className="space-y-3">
                    {stage.details.map((detail, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start gap-3 text-base text-white/60"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Methodology note */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-white/30 font-mono uppercase tracking-wider">
                      {language === 'ru' ? 'Методология' : 'Methodology'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Click hint - shown when not expanded */}
          {!isExpanded && (
            <div className="flex items-center gap-2 text-white/20 mt-4">
              <span className="text-xs font-mono uppercase tracking-wider">
                {language === 'ru' ? 'Подробнее' : 'Details'}
              </span>
              <div className="w-4 h-px bg-white/20" />
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="process" className="px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-mono text-white mb-2">
            {language === 'ru' ? 'Полный цикл' : 'Full Cycle'}
          </h2>
          <p className="text-sm text-white/30 font-mono tracking-[0.2em] uppercase">
            {language === 'ru' ? 'от идеи до масштабирования' : 'from idea to scaling'}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StageCard stage={stages[0]} index={0} />
            <StageCard stage={stages[1]} index={1} />
            <StageCard stage={stages[2]} index={2} />
          </div>

          {/* Row 2 - reversed on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
