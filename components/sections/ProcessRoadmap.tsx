"use client";

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { useState } from 'react';
import { 
  Search,
  Lightbulb,
  FileText,
  Palette,
  Code,
  Rocket,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

interface Stage {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  color: string;
}

export default function ProcessRoadmap() {
  const { language } = useI18n();
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const stages: Stage[] = [
    {
      id: 'discovery',
      icon: <Search size={18} />,
      title: language === 'ru' ? 'Исследование' : 'Discovery',
      subtitle: language === 'ru' ? 'Аудит и анализ' : 'Audit & Analysis',
      description: language === 'ru' 
        ? 'Погружение в контекст, изучение рынка, конкурентов и целевой аудитории. Формирование видения проекта.'
        : 'Immersion into context, market research, competitor analysis and target audience study. Forming project vision.',
      deliverables: language === 'ru' 
        ? ['Бриф', 'Аудит', 'Стратегия'] 
        : ['Brief', 'Audit', 'Strategy'],
      color: '#3a3a45'
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
      color: '#4a4a55'
    },
    {
      id: 'design',
      icon: <Palette size={18} />,
      title: language === 'ru' ? 'Проектирование' : 'Design',
      subtitle: language === 'ru' ? 'Архитектура и визуал' : 'Architecture & Visual',
      description: language === 'ru'
        ? 'Создание структуры, прототипов, визуальной системы и детальной проработки всех элементов.'
        : 'Creating structure, prototypes, visual system and detailed elaboration of all elements.',
      deliverables: language === 'ru'
        ? ['Прототипы', 'Дизайн-система', 'Гайдлайны']
        : ['Prototypes', 'Design System', 'Guidelines'],
      color: '#5a5a65'
    },
    {
      id: 'development',
      icon: <Code size={18} />,
      title: language === 'ru' ? 'Разработка' : 'Development',
      subtitle: language === 'ru' ? 'Создание продукта' : 'Product Creation',
      description: language === 'ru'
        ? 'Техническая реализация, программирование, интеграции и подготовка к запуску.'
        : 'Technical implementation, programming, integrations and launch preparation.',
      deliverables: language === 'ru'
        ? ['Код', 'Тестирование', 'Документация']
        : ['Code', 'Testing', 'Documentation'],
      color: '#6a6a75'
    },
    {
      id: 'launch',
      icon: <Rocket size={18} />,
      title: language === 'ru' ? 'Запуск' : 'Launch',
      subtitle: language === 'ru' ? 'Релиз и продвижение' : 'Release & Promotion',
      description: language === 'ru'
        ? 'Публикация продукта, маркетинговые активности и первичный сбор обратной связи.'
        : 'Product publication, marketing activities and initial feedback collection.',
      deliverables: language === 'ru'
        ? ['Релиз', 'Маркетинг', 'PR']
        : ['Release', 'Marketing', 'PR'],
      color: '#7a7a85'
    },
    {
      id: 'evolution',
      icon: <TrendingUp size={18} />,
      title: language === 'ru' ? 'Развитие' : 'Evolution',
      subtitle: language === 'ru' ? 'Масштабирование' : 'Scaling',
      description: language === 'ru'
        ? 'Поддержка, оптимизация, добавление новых функций и масштабирование продукта.'
        : 'Support, optimization, adding new features and product scaling.',
      deliverables: language === 'ru'
        ? ['Аналитика', 'Обновления', 'Рост']
        : ['Analytics', 'Updates', 'Growth'],
      color: '#8a8a95'
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
          
          <h2 className="text-2xl md:text-3xl font-mono text-white mb-4">
            {language === 'ru' 
              ? 'Дорожная карта разработки'
              : 'Development Roadmap'
            }
          </h2>
          
          <p className="text-sm text-white/50 max-w-xl mx-auto">
            {language === 'ru'
              ? 'От идеи до масштабирования — работаю с проектами на любой стадии'
              : 'From idea to scaling — working with projects at any stage'
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
                      <ChevronRight size={16} className="rotate-90" />
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

          {/* Entry point note */}
          <motion.div 
            className="mt-12 p-4 border border-white/10 bg-white/[0.02] text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs text-white/50">
              {language === 'ru' 
                ? '↳ Можно начать с любого этапа — от аудита существующего проекта до создания с нуля'
                : '↳ Can start at any stage — from auditing existing project to creating from scratch'
              }
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
