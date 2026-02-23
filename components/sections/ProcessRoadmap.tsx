"use client";

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { useState } from 'react';
import { 
  Search,
  Lightbulb,
  Compass,
  Hammer,
  Rocket,
  TrendingUp,
  RotateCcw
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
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

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

  const getCardStyles = (style: Stage['style'], isFlipped: boolean) => {
    const baseStyles = "relative w-full h-[320px] cursor-pointer perspective-1000";
    
    const styleVariants = {
      neural: "",
      organic: "",
      geometric: "",
      fluid: "",
      crystalline: "",
      minimal: ""
    };

    return `${baseStyles} ${styleVariants[style]}`;
  };

  const StageCard = ({ stage, index }: { stage: Stage; index: number }) => {
    const isFlipped = flippedCard === stage.id;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className={getCardStyles(stage.style, isFlipped)}
        onClick={() => setFlippedCard(isFlipped ? null : stage.id)}
      >
        <div 
          className="relative w-full h-full transition-transform duration-700 preserve-3d"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front Side */}
          <div 
            className={`absolute inset-0 backface-hidden p-6 
                       bg-white/[0.02] backdrop-blur-xl
                       transition-all duration-500
                       hover:bg-white/[0.04]
                       ${stage.style === 'neural' ? 'border border-white/[0.15] rounded-2xl' : ''}
                       ${stage.style === 'organic' ? 'border border-white/[0.12] rounded-[2rem]' : ''}
                       ${stage.style === 'geometric' ? 'border border-white/[0.18] rounded-lg' : ''}
                       ${stage.style === 'fluid' ? 'border border-white/[0.1] rounded-[1.5rem_0.5rem]' : ''}
                       ${stage.style === 'crystalline' ? 'border border-white/[0.2] rounded-sm' : ''}
                       ${stage.style === 'minimal' ? 'border border-white/[0.08] rounded-xl' : ''}
                      `}
          >
            {/* Style-specific decorations */}
            {stage.style === 'neural' && (
              <div className="absolute top-3 right-3 w-16 h-16 opacity-20">
                <div className="absolute inset-0 border border-white/30 rounded-full" />
                <div className="absolute inset-2 border border-white/20 rounded-full" />
                <div className="absolute inset-4 border border-white/10 rounded-full" />
              </div>
            )}
            {stage.style === 'organic' && (
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/[0.03] rounded-full blur-xl" />
            )}
            {stage.style === 'geometric' && (
              <div className="absolute top-4 right-4 w-8 h-8 border border-white/20 rotate-45" />
            )}
            {stage.style === 'fluid' && (
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/[0.05] to-transparent rounded-b-[1.5rem_0.5rem]" />
            )}
            {stage.style === 'crystalline' && (
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-white/[0.08] border-l-[40px] border-l-transparent" />
            )}

            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`flex items-center justify-center text-white/50
                                ${stage.style === 'neural' ? 'w-12 h-12 rounded-full border border-white/20' : ''}
                                ${stage.style === 'organic' ? 'w-12 h-12 rounded-2xl border border-white/15' : ''}
                                ${stage.style === 'geometric' ? 'w-11 h-11 border border-white/25' : ''}
                                ${stage.style === 'fluid' ? 'w-12 h-12 rounded-full bg-white/[0.05]' : ''}
                                ${stage.style === 'crystalline' ? 'w-11 h-11 border border-white/30' : ''}
                                ${stage.style === 'minimal' ? 'w-10 h-10 rounded-lg border border-white/10' : ''}
                               `}>
                  {stage.icon}
                </div>
                <span className="font-mono text-2xl text-white/10">{stage.number}</span>
              </div>

              {/* Content - Larger text */}
              <div className="flex-1">
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

              {/* Click hint */}
              <div className="flex items-center gap-2 text-white/20 mt-4">
                <span className="text-xs font-mono uppercase tracking-wider">
                  {language === 'ru' ? 'Подробнее' : 'Details'}
                </span>
                <div className="w-4 h-px bg-white/20" />
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div 
            className={`absolute inset-0 backface-hidden p-6 rotate-y-180
                       bg-white/[0.05] backdrop-blur-xl
                       ${stage.style === 'neural' ? 'border border-white/[0.2] rounded-2xl' : ''}
                       ${stage.style === 'organic' ? 'border border-white/[0.15] rounded-[2rem]' : ''}
                       ${stage.style === 'geometric' ? 'border border-white/[0.22] rounded-lg' : ''}
                       ${stage.style === 'fluid' ? 'border border-white/[0.12] rounded-[1.5rem_0.5rem]' : ''}
                       ${stage.style === 'crystalline' ? 'border border-white/[0.25] rounded-sm' : ''}
                       ${stage.style === 'minimal' ? 'border border-white/[0.1] rounded-xl' : ''}
                      `}
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="h-full flex flex-col">
              {/* Back header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-mono text-white">
                  {stage.title}
                </h3>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlippedCard(null);
                  }}
                  className="p-2 text-white/40 hover:text-white/70 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              {/* Details list */}
              <ul className="space-y-3 flex-1">
                {stage.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base text-white/60">
                    <span className="w-1 h-1 rounded-full bg-white/40 mt-2.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Methodology note */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/30 font-mono uppercase tracking-wider">
                  {language === 'ru' ? 'Методология' : 'Methodology'}
                </p>
              </div>
            </div>
          </div>
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

        {/* Snake Grid */}
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StageCard stage={stages[0]} index={0} />
            <StageCard stage={stages[1]} index={1} />
            <StageCard stage={stages[2]} index={2} />
          </div>

          {/* Row 2 - reversed */}
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
