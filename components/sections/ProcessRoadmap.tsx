"use client";

import { useState } from 'react';
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
  details: string[];
  number: string;
}

export default function ProcessRoadmap() {
  const { language } = useI18n();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [animatingCard, setAnimatingCard] = useState<string | null>(null);

  const stages: Stage[] = [
    {
      id: 'discovery',
      icon: <Search size={20} />,
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
      number: '01'
    },
    {
      id: 'concept',
      icon: <Lightbulb size={20} />,
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
      number: '02'
    },
    {
      id: 'design',
      icon: <Compass size={20} />,
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
      number: '03'
    },
    {
      id: 'development',
      icon: <Hammer size={20} />,
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
      number: '04'
    },
    {
      id: 'launch',
      icon: <Rocket size={20} />,
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
      number: '05'
    },
    {
      id: 'evolution',
      icon: <TrendingUp size={20} />,
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
      number: '06'
    }
  ];

  const handleCardClick = (stageId: string) => {
    if (animatingCard) return;
    
    setAnimatingCard(stageId);
    
    // Переключаем контент в середине анимации
    setTimeout(() => {
      setActiveCard(prev => prev === stageId ? null : stageId);
    }, 150);
    
    // Сбрасываем анимацию
    setTimeout(() => {
      setAnimatingCard(null);
    }, 300);
  };

  return (
    <section id="process" className="px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-mono text-white mb-2">
            {language === 'ru' ? 'Полный цикл' : 'Full Cycle'}
          </h2>
          <p className="text-sm text-white/30 font-mono tracking-[0.2em] uppercase">
            {language === 'ru' ? 'от идеи до масштабирования' : 'from idea to scaling'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((stage) => {
            const isActive = activeCard === stage.id;
            const isAnimating = animatingCard === stage.id;
            
            return (
              <div
                key={stage.id}
                className="neo-card-container cursor-pointer"
                onClick={() => handleCardClick(stage.id)}
              >
                {/* Внешняя рамка - неоморфизм */}
                <div className="neo-card-outer">
                  {/* Средняя рамка */}
                  <div className="neo-card-middle">
                    {/* Внутренняя рамка с анимацией */}
                    <div className={`neo-card-inner ${isAnimating ? 'animate-contract' : ''}`}>
                      {/* Контент */}
                      <div className="neo-card-content">
                        {/* Header с номером и иконкой */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="neo-icon">
                            {stage.icon}
                          </div>
                          <span className="font-mono text-xl text-white/20">{stage.number}</span>
                        </div>

                        {/* Текстовый контент с crossfade */}
                        <div className="relative min-h-[140px]">
                          {/* Front content */}
                          <div className={`neo-text-front ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                            <h3 className="text-lg font-mono text-white mb-2">
                              {stage.title}
                            </h3>
                            <p className="text-xs text-white/40 mb-3 font-mono uppercase tracking-wider">
                              {stage.subtitle}
                            </p>
                            <p className="text-sm text-white/50 leading-relaxed">
                              {stage.description}
                            </p>
                          </div>

                          {/* Back content - детали */}
                          <div className={`neo-text-back ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                            <h3 className="text-lg font-mono text-white mb-3">
                              {stage.title}
                            </h3>
                            <ul className="space-y-2">
                              {stage.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                                  <span className="w-1 h-1 bg-white/40 mt-1.5 flex-shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .neo-card-container {
          position: relative;
        }

        .neo-card-outer {
          background: linear-gradient(145deg, #0a0a0a, #050505);
          padding: 3px;
          box-shadow: 
            8px 8px 16px #020202,
            -8px -8px 16px #0c0c0c,
            inset 1px 1px 1px rgba(255,255,255,0.05);
        }

        .neo-card-middle {
          background: linear-gradient(145deg, #080808, #040404);
          padding: 2px;
          box-shadow: 
            inset 2px 2px 4px rgba(0,0,0,0.8),
            inset -2px -2px 4px rgba(255,255,255,0.03);
        }

        .neo-card-inner {
          background: #060606;
          padding: 2px;
          box-shadow: 
            inset 1px 1px 2px rgba(0,0,0,0.9),
            inset -1px -1px 2px rgba(255,255,255,0.02);
          transition: all 0.15s ease-out;
        }

        .neo-card-inner.animate-contract {
          animation: contractRelease 0.3s ease-in-out;
        }

        @keyframes contractRelease {
          0% {
            transform: scale(1);
            box-shadow: 
              inset 1px 1px 2px rgba(0,0,0,0.9),
              inset -1px -1px 2px rgba(255,255,255,0.02);
          }
          50% {
            transform: scale(0.96);
            box-shadow: 
              inset 4px 4px 8px rgba(0,0,0,1),
              inset -4px -4px 8px rgba(255,255,255,0.05);
          }
          100% {
            transform: scale(1);
            box-shadow: 
              inset 1px 1px 2px rgba(0,0,0,0.9),
              inset -1px -1px 2px rgba(255,255,255,0.02);
          }
        }

        .neo-card-content {
          padding: 24px;
          background: linear-gradient(145deg, #070707, #050505);
          min-height: 280px;
          display: flex;
          flex-direction: column;
        }

        .neo-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.5);
          background: linear-gradient(145deg, #0a0a0a, #060606);
          box-shadow: 
            3px 3px 6px #020202,
            -3px -3px 6px #0e0e0e;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .neo-text-front,
        .neo-text-back {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          transition: opacity 0.15s ease-out;
        }

        .neo-text-front {
          pointer-events: none;
        }

        .neo-text-back {
          opacity: 0;
          pointer-events: none;
        }

        .neo-text-back.opacity-100 {
          pointer-events: auto;
        }

        /* Hover эффект только на рамку */
        .neo-card-container:hover .neo-card-outer {
          box-shadow: 
            10px 10px 20px #020202,
            -10px -10px 20px #0e0e0e,
            inset 1px 1px 1px rgba(255,255,255,0.08);
        }

        .neo-card-container:hover .neo-icon {
          box-shadow: 
            4px 4px 8px #020202,
            -4px -4px 8px #0f0f0f;
          color: rgba(255,255,255,0.7);
        }
      `}</style>
    </section>
  );
}
