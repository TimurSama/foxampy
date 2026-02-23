"use client";

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { useState } from 'react';
import { 
  Network,
  Layers,
  Box,
  Settings,
  TrendingUp,
  Palette,
  GitBranch,
  Sparkles
} from 'lucide-react';

interface ApproachItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function AboutSection() {
  const { language } = useI18n();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const approaches: ApproachItem[] = [
    {
      icon: <Network size={20} />,
      title: language === 'ru' ? 'Системное проектирование' : 'System Design',
      description: language === 'ru' 
        ? 'Построение устойчивых бизнес-структур через чёткую системную организацию всех элементов.'
        : 'Building sustainable business structures through clear systematic organization of all elements.'
    },
    {
      icon: <Layers size={20} />,
      title: language === 'ru' ? 'Междисциплинарный подход' : 'Interdisciplinary Approach',
      description: language === 'ru'
        ? 'Интеграция знаний из науки, бизнеса, дизайна и цифровых технологий для комплексного решения задач.'
        : 'Integrating knowledge from science, business, design and digital technologies for comprehensive problem solving.'
    },
    {
      icon: <Box size={20} />,
      title: language === 'ru' ? 'Архитектура среды' : 'Environment Architecture',
      description: language === 'ru'
        ? 'Проектирование пространств, бизнес-структур и брендов как взаимосвязанных систем, работающих в едином пространстве.'
        : 'Designing spaces, business structures and brands as interconnected systems working in a unified environment.'
    },
    {
      icon: <Settings size={20} />,
      title: language === 'ru' ? 'Оптимизация процессов' : 'Process Optimization',
      description: language === 'ru'
        ? 'Дробление сложных задач на управляемые части, обеспечивающие гибкость и адаптивность.'
        : 'Breaking down complex tasks into manageable parts that ensure flexibility and adaptability.'
    },
    {
      icon: <TrendingUp size={20} />,
      title: language === 'ru' ? 'Стратегическое развитие' : 'Strategic Development',
      description: language === 'ru'
        ? 'Планирование шагов от начальной концепции до долгосрочного роста, с фокусом на устойчивость и масштабируемость.'
        : 'Planning steps from initial concept to long-term growth, with a focus on sustainability and scalability.'
    },
    {
      icon: <Palette size={20} />,
      title: language === 'ru' ? 'Бренд-система' : 'Brand System',
      description: language === 'ru'
        ? 'Разработка визуальных и смысловых кодов, объединяющих пользователей, продукты и смыслы.'
        : 'Developing visual and semantic codes that connect users, products and meanings.'
    },
    {
      icon: <GitBranch size={20} />,
      title: language === 'ru' ? 'Гибкая методология' : 'Flexible Methodology',
      description: language === 'ru'
        ? 'Использование адаптивных моделей, которые позволяют быстро реагировать на изменения, сохраняя структурную целостность.'
        : 'Using adaptive models that enable quick response to changes while maintaining structural integrity.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header with Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Photo placeholder */}
            <motion.div 
              className="lg:col-span-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="aspect-[3/4] max-w-sm mx-auto lg:mx-0 bg-white/5 border border-white/10 rounded-sm overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                      <Sparkles size={32} className="text-white/40" />
                    </div>
                    <p className="text-sm text-white/40 font-mono">
                      {language === 'ru' ? 'Фото скоро' : 'Photo soon'}
                    </p>
                  </div>
                </div>
                {/* Placeholder for actual image - uncomment when ready */}
                {/* <img 
                  src="/photo.jpg" 
                  alt="foxampy" 
                  className="w-full h-full object-cover"
                /> */}
              </div>
            </motion.div>

            {/* Main info */}
            <div className="lg:col-span-8 space-y-6">
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full"
                whileHover={{ scale: 1.02 }}
              >
                <Sparkles size={14} className="text-white/60" />
                <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
                  {language === 'ru' ? 'Инновационный креатор' : 'Innovative Creator'}
                </span>
              </motion.div>
              
              <h1 className="text-3xl md:text-5xl font-mono text-white leading-tight">
                foxampy
              </h1>

              <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
                {language === 'ru' 
                  ? 'Создаю устойчивые системы на пересечении бизнеса, дизайна и технологий. Работаю с комплексными проектами требующими системного подхода и междисциплинарного мышления.'
                  : 'Creating sustainable systems at the intersection of business, design and technology. Working with complex projects requiring a systematic approach and interdisciplinary thinking.'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Approach Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {approaches.map((item, idx) => (
            <motion.div
              key={item.title}
              className="group relative p-6 bg-white/[0.03] border border-white/10 rounded-sm cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredItem(item.title)}
              onMouseLeave={() => setHoveredItem(null)}
              variants={itemVariants}
              whileHover={{ 
                borderColor: 'rgba(255,255,255,0.2)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                transition: { duration: 0.2 }
              }}
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredItem === item.title ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative space-y-4">
                <motion.div 
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/60 bg-white/5"
                  animate={{ 
                    scale: hoveredItem === item.title ? 1.1 : 1,
                    borderColor: hoveredItem === item.title ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>
                
                <div>
                  <h3 className="font-mono text-sm text-white mb-2 group-hover:text-white/90 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Corner accent */}
              <motion.div 
                className="absolute top-0 right-0 w-8 h-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredItem === item.title ? 1 : 0 }}
              >
                <div className="absolute top-3 right-3 w-1 h-1 bg-white/40 rounded-full" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom tagline */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-mono text-xs text-white/30 tracking-[0.3em] uppercase">
            {language === 'ru' ? 'Системы • Бренды • Среды' : 'Systems • Brands • Environments'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
