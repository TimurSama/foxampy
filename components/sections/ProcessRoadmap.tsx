"use client";

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { useState } from 'react';
import { 
  Search,
  Lightbulb,
  FileText,
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
  deliverables: string[];
}

export default function ProcessRoadmap() {
  const { language } = useI18n();
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const stages: Stage[] = [
    {
      id: 'discovery',
      icon: <Search size={18} />,
      title: language === 'ru' ? 'Исследование' : 'Discovery',
      subtitle: language === 'ru' ? 'Анализ и аудит' : 'Analysis & Audit',
      description: language === 'ru' 
        ? 'Погружение в контекст, изучение рынка, конкурентов и аудитории. Формирование стратегического видения.'
        : 'Deep dive into context, market research, competitor analysis and audience study. Forming strategic vision.',
      deliverables: language === 'ru' 
        ? ['Бриф', 'Исследование', 'Стратегия'] 
        : ['Brief', 'Research', 'Strategy'],
    },
    {
      id: 'concept',
      icon: <Lightbulb size={18} />,
      title: language === 'ru' ? 'Концепция' : 'Concept',
      subtitle: language === 'ru' ? 'Идея и позиционирование' : 'Idea & Positioning',
      description: language === 'ru'
        ? 'Разработка концептуальных решений, креативных подходов и уникального торгового предложения.'
        : 'Developing conceptual solutions, creative approaches and unique value proposition.',
      deliverables: language === 'ru'
        ? ['Концепт', 'Moodboard', 'Позиционирование']
        : ['Concept', 'Moodboard', 'Positioning'],
    },
    {
      id: 'design',
      icon: <Compass size={18} />,
      title: language === 'ru' ? 'Проектирование' : 'Design',
      subtitle: language === 'ru' ? 'Стратегия и архитектура' : 'Strategy & Architecture',
      description: language === 'ru'
        ? 'Стратегирование, разработка верхнеуровневой проектной архитектуры, брендирование, визуализация дизайна и UX/UI проработка.'
        : 'Strategic planning, high-level project architecture, branding, visual design and UX/UI development.',
      deliverables: language === 'ru'
        ? ['Архитектура', 'Бренд', 'UX/UI', 'Гайдлайны']
        : ['Architecture', 'Brand', 'UX/UI', 'Guidelines'],
    },
    {
      id: 'development',
      icon: <Hammer size={18} />,
      title: language === 'ru' ? 'Разработка' : 'Development',
      subtitle: language === 'ru' ? 'Создание и реализация' : 'Creation & Implementation',
      description: language === 'ru'
        ? 'Полный цикл создания: прототипирование, производство, строительство, техническая разработка, программирование и интеграции.'
        : 'Full creation cycle: prototyping, manufacturing, construction, technical development, programming and integrations.',
      deliverables: language === 'ru'
        ? ['Прототипы', 'Продукция', 'Код', 'Документация']
        : ['Prototypes', 'Production', 'Code', 'Documentation'],
    },
    {
      id: 'launch',
      icon: <Rocket size={18} />,
      title: language === 'ru' ? 'Запуск' : 'Launch',
      subtitle: language === 'ru' ? 'Релиз и продвижение' : 'Release & Promotion',
      description: language === 'ru'
        ? 'Запуск продукта, вывод на рынок, маркетинговые кампании и первичный сбор обратной связи.'
        : 'Product launch, market entry, marketing campaigns and initial feedback collection.',
      deliverables: language === 'ru'
        ? ['Релиз', 'Маркетинг', 'PR']
        : ['Release', 'Marketing', 'PR'],
    },
    {
      id: 'evolution',
      icon: <TrendingUp size={18} />,
      title: language === 'ru' ? 'Развитие' : 'Evolution',
      subtitle: language === 'ru' ? 'Масштабирование' : 'Scaling',
      description: language === 'ru'
        ? 'Поддержка, оптимизация, доработка, выход на новые рынки и масштабирование.'
        : 'Support, optimization, refinement, entering new markets and scaling.',
      deliverables: language === 'ru'
        ? ['Аналитика', 'Обновления', 'Рост']
        : ['Analytics', 'Updates', 'Growth'],
    }
  ];

  return (
    <section id="process" className="px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <FileText size={14} className="text-white/60" />
            <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
              {language === 'ru' ? 'Процесс' : 'Process'}
            </span>
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-mono text-white">
            {language === 'ru' 
              ? 'Полный цикл'
              : 'Full Cycle'
            }
          </h2>
          
          <p className="text-xs text-white/40 mt-2 font-mono tracking-wider">
            {language === 'ru'
              ? 'от идеи до масштабирования'
              : 'from idea to scaling'
            }
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-[60px] left-[calc(8.33%+20px)] right-[calc(8.33%+20px)] h-px bg-white/10" />
          
          {/* Stages */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-2">
            {stages.map((stage, idx) => (
              <motion.div
                key={stage.id}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setActiveStage(stage.id)}
                onMouseLeave={() => setActiveStage(null)}
              >
                {/* Stage Card */}
                <motion.div
                  className="relative p-4 bg-white/[0.02] border border-white/10 rounded-sm cursor-pointer h-full"
                  whileHover={{ 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(255,255,255,0.2)',
                    y: -4
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Number */}
                  <div className="absolute -top-3 -left-1 w-6 h-6 bg-black border border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-mono text-white/60">{idx + 1}</span>
                  </div>

                  {/* Icon */}
                  <motion.div 
                    className="w-10 h-10 mb-3 border border-white/10 flex items-center justify-center text-white/50"
                    animate={{ 
                      borderColor: activeStage === stage.id ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                      color: activeStage === stage.id ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)'
                    }}
                  >
                    {stage.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-mono text-xs text-white mb-1">
                    {stage.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-[10px] text-white/40 mb-3">
                    {stage.subtitle}
                  </p>

                  {/* Description - shown on hover */}
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: activeStage === stage.id ? 'auto' : 0,
                      opacity: activeStage === stage.id ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[10px] text-white/50 leading-relaxed mb-3">
                      {stage.description}
                    </p>
                    
                    {/* Deliverables */}
                    <div className="flex flex-wrap gap-1">
                      {stage.deliverables.map((item) => (
                        <span 
                          key={item}
                          className="text-[9px] px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Arrow for mobile */}
                  {idx < stages.length - 1 && (
                    <div className="md:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 text-white/20">
                      <span className="text-xs">↓</span>
                    </div>
                  )}
                </motion.div>

                {/* Dot on timeline (desktop) */}
                <div className="hidden md:flex absolute top-[52px] left-1/2 -translate-x-1/2 justify-center">
                  <motion.div 
                    className="w-3 h-3 rounded-full border-2 border-white/30 bg-black"
                    animate={{ 
                      scale: activeStage === stage.id ? 1.3 : 1,
                      borderColor: activeStage === stage.id ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
