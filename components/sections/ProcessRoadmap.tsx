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
      icon: <Search size={18} />,
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
      icon: <Lightbulb size={18} />,
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
      icon: <Compass size={18} />,
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
      icon: <Hammer size={18} />,
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
      icon: <Rocket size={18} />,
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
      icon: <TrendingUp size={18} />,
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
    
    setTimeout(() => {
      setActiveCard(prev => prev === stageId ? null : stageId);
    }, 150);
    
    setTimeout(() => {
      setAnimatingCard(null);
    }, 300);
  };

  return (
    <section id="process" className="px-4 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-mono text-white mb-2">
            {language === 'ru' ? 'Полный цикл' : 'Full Cycle'}
          </h2>
          <p className="text-sm text-white/30 font-mono tracking-[0.2em] uppercase">
            {language === 'ru' ? 'от идеи до масштабирования' : 'from idea to scaling'}
          </p>
        </div>

        {/* Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {stages.map((stage) => {
            const isActive = activeCard === stage.id;
            const isAnimating = animatingCard === stage.id;
            
            return (
              <div
                key={stage.id}
                className="cursor-pointer"
                onClick={() => handleCardClick(stage.id)}
              >
                <div className="card-outer">
                  <div className="card-middle">
                    <div className="card-inner">
                      <div className={`content-frame ${isAnimating ? 'contract' : ''}`}>
                        <div className="card-content">
                          <div className="flex items-start justify-between mb-3 md:mb-4">
                            <div className="icon-box">
                              {stage.icon}
                            </div>
                            <span className="font-mono text-sm md:text-xl text-white/20">{stage.number}</span>
                          </div>

                          <div className="text-container">
                            {!isActive ? (
                              <div className="front-text">
                                <h3 className="text-sm md:text-lg font-mono text-white mb-1 md:mb-2">
                                  {stage.title}
                                </h3>
                                <p className="text-[10px] md:text-xs text-white/40 mb-2 md:mb-3 font-mono uppercase tracking-wider">
                                  {stage.subtitle}
                                </p>
                                <p className="text-[10px] md:text-sm text-white/50 leading-relaxed line-clamp-3 md:line-clamp-none">
                                  {stage.description}
                                </p>
                              </div>
                            ) : (
                              <div className="back-text">
                                <h3 className="text-sm md:text-lg font-mono text-white mb-2 md:mb-3">
                                  {stage.title}
                                </h3>
                                <ul className="space-y-1 md:space-y-2">
                                  {stage.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-[10px] md:text-sm text-white/60">
                                      <span className="w-1 h-1 bg-white/40 mt-1 flex-shrink-0" />
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
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
        .card-outer {
          background: #0a0a0a;
          padding: 3px;
          box-shadow: 
            4px 4px 8px #020202,
            -4px -4px 8px #121212;
        }

        @media (min-width: 768px) {
          .card-outer {
            padding: 4px;
            box-shadow: 
              6px 6px 12px #020202,
              -6px -6px 12px #121212;
          }
        }

        .card-middle {
          background: #070707;
          padding: 2px;
          box-shadow: 
            inset 2px 2px 4px rgba(0,0,0,0.9),
            inset -2px -2px 4px rgba(255,255,255,0.04);
        }

        .card-inner {
          background: #050505;
          padding: 2px;
          box-shadow: 
            inset 1px 1px 3px rgba(0,0,0,0.9),
            inset -1px -1px 3px rgba(255,255,255,0.03);
        }

        .content-frame {
          background: #080808;
          padding: 2px;
          box-shadow: 
            inset 2px 2px 4px rgba(0,0,0,0.8),
            inset -2px -2px 4px rgba(255,255,255,0.02);
        }

        .content-frame.contract {
          animation: contractPulse 0.3s ease-in-out;
        }

        @keyframes contractPulse {
          0% {
            padding: 2px;
            box-shadow: 
              inset 2px 2px 4px rgba(0,0,0,0.8),
              inset -2px -2px 4px rgba(255,255,255,0.02);
          }
          50% {
            padding: 6px;
            box-shadow: 
              inset 4px 4px 8px rgba(0,0,0,1),
              inset -4px -4px 8px rgba(255,255,255,0.06);
          }
          100% {
            padding: 2px;
            box-shadow: 
              inset 2px 2px 4px rgba(0,0,0,0.8),
              inset -2px -2px 4px rgba(255,255,255,0.02);
          }
        }

        @media (min-width: 768px) {
          @keyframes contractPulse {
            0% {
              padding: 2px;
              box-shadow: 
                inset 2px 2px 4px rgba(0,0,0,0.8),
                inset -2px -2px 4px rgba(255,255,255,0.02);
            }
            50% {
              padding: 8px;
              box-shadow: 
                inset 6px 6px 12px rgba(0,0,0,1),
                inset -6px -6px 12px rgba(255,255,255,0.06);
            }
            100% {
              padding: 2px;
              box-shadow: 
                inset 2px 2px 4px rgba(0,0,0,0.8),
                inset -2px -2px 4px rgba(255,255,255,0.02);
            }
          }
        }

        .card-content {
          padding: 16px;
          background: #060606;
          min-height: 200px;
        }

        @media (min-width: 768px) {
          .card-content {
            padding: 24px;
            min-height: 260px;
          }
        }

        .icon-box {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.4);
          background: #090909;
          box-shadow: 
            2px 2px 4px #020202,
            -2px -2px 4px #101010;
          border: 1px solid rgba(255,255,255,0.06);
        }

        @media (min-width: 768px) {
          .icon-box {
            width: 40px;
            height: 40px;
          }
        }

        .text-container {
          min-height: 120px;
        }

        @media (min-width: 768px) {
          .text-container {
            min-height: 140px;
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
