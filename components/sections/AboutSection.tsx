"use client";

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/context';
import { useState } from 'react';
import { 
  Code2, 
  Palette, 
  Building2, 
  Clapperboard, 
  Sparkles,
  ArrowUpRight,
  Zap,
  Globe
} from 'lucide-react';

interface Skill {
  icon: React.ReactNode;
  name: string;
  level: number;
  description: string;
}

export default function AboutSection() {
  const { t, language } = useI18n();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const skills: Skill[] = [
    {
      icon: <Code2 size={20} />,
      name: language === 'ru' ? 'IT & Разработка' : 'IT & Development',
      level: 95,
      description: language === 'ru' 
        ? 'Веб-приложения, системная архитектура, Web3 решения'
        : 'Web applications, system architecture, Web3 solutions'
    },
    {
      icon: <Palette size={20} />,
      name: language === 'ru' ? 'Дизайн' : 'Design',
      level: 90,
      description: language === 'ru'
        ? 'UI/UX, брендинг, визуальные системы'
        : 'UI/UX, branding, visual systems'
    },
    {
      icon: <Building2 size={20} />,
      name: language === 'ru' ? 'Архитектура' : 'Architecture',
      level: 85,
      description: language === 'ru'
        ? 'Параметрический дизайн, визуализация, концепции'
        : 'Parametric design, visualization, concepts'
    },
    {
      icon: <Clapperboard size={20} />,
      name: language === 'ru' ? 'CGI & Кино' : 'CGI & Cinema',
      level: 88,
      description: language === 'ru'
        ? '3D анимация, VFX, постпродакшн'
        : '3D animation, VFX, post-production'
    }
  ];

  const stats = [
    { value: '7+', label: language === 'ru' ? 'Лет опыта' : 'Years exp' },
    { value: '50+', label: language === 'ru' ? 'Проектов' : 'Projects' },
    { value: '4', label: language === 'ru' ? 'Направления' : 'Directions' },
    { value: '∞', label: language === 'ru' ? 'Идей' : 'Ideas' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <section id="about" className="px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
        >
          {/* Left Column - Main Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <motion.div 
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full"
                whileHover={{ scale: 1.02 }}
              >
                <Sparkles size={14} className="text-white/60" />
                <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
                  {language === 'ru' ? 'Обо мне' : 'About me'}
                </span>
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-mono text-white leading-tight">
                {language === 'ru' 
                  ? 'Мультидисциплинарный разработчик и дизайнер'
                  : 'Multidisciplinary Developer & Designer'
                }
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                {language === 'ru'
                  ? 'Создаю цифровые продукты на пересечении технологий и искусства. Специализируюсь на разработке сложных веб-приложений, системном дизайне и CGI-продакшне.'
                  : 'Creating digital products at the intersection of technology and art. Specializing in complex web applications, system design, and CGI production.'
                }
              </p>
              
              <motion.div
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pt-4">
                  {language === 'ru'
                    ? 'Мой подход основан на глубоком понимании как технической, так и творческой сторон каждого проекта. Верю в силу деталей и продуманность на каждом этапе — от концепции до финальной реализации.'
                    : 'My approach is based on a deep understanding of both the technical and creative sides of each project. I believe in the power of details and thoughtfulness at every stage — from concept to final implementation.'
                  }
                </p>
                <p className="pt-4">
                  {language === 'ru'
                    ? 'Работаю с современными технологиями: React, TypeScript, Three.js, WebGL, а также с инструментами дизайна и 3D графики. Постоянно изучаю новые направления и технологии.'
                    : 'Working with modern technologies: React, TypeScript, Three.js, WebGL, as well as design and 3D graphics tools. Constantly exploring new directions and technologies.'
                  }
                </p>
              </motion.div>

              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-sm font-mono text-white/50 hover:text-white transition-colors group"
                whileHover={{ x: 4 }}
              >
                <span>{isExpanded 
                  ? (language === 'ru' ? 'Свернуть' : 'Collapse') 
                  : (language === 'ru' ? 'Читать дальше' : 'Read more')
                }</span>
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight size={14} className="rotate-90" />
                </motion.span>
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-4 gap-4 pt-4"
              variants={itemVariants}
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 bg-white/5 border border-white/10 rounded-sm"
                  whileHover={{ 
                    scale: 1.05, 
                    borderColor: 'rgba(255,255,255,0.2)',
                    transition: { duration: 0.2 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <div className="text-2xl font-mono text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap size={18} className="text-white/60" />
              <h3 className="font-mono text-sm text-white/60 uppercase tracking-widest">
                {language === 'ru' ? 'Компетенции' : 'Expertise'}
              </h3>
            </div>

            <div className="space-y-4">
              {skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  className="group relative p-5 bg-white/5 border border-white/10 rounded-sm cursor-pointer overflow-hidden"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    borderColor: 'rgba(255,255,255,0.2)',
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={{ 
                      opacity: hoveredSkill === skill.name ? 1 : 0,
                      x: hoveredSkill === skill.name ? 0 : '-100%'
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative flex items-start gap-4">
                    <motion.div 
                      className="p-2 bg-white/5 border border-white/10 text-white/60"
                      animate={{ 
                        scale: hoveredSkill === skill.name ? 1.1 : 1,
                        borderColor: hoveredSkill === skill.name ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill.icon}
                    </motion.div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm text-white">{skill.name}</span>
                        <motion.span 
                          className="font-mono text-xs text-white/40"
                          animate={{ opacity: hoveredSkill === skill.name ? 1 : 0.4 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white/40 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                        />
                      </div>
                      
                      <motion.p 
                        className="text-xs text-white/50"
                        animate={{ 
                          opacity: hoveredSkill === skill.name ? 1 : 0.5,
                          y: hoveredSkill === skill.name ? 0 : 4
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {skill.description}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact hint */}
            <motion.div 
              className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-sm mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Globe size={16} className="text-white/40" />
              <span className="text-sm text-white/60">
                {language === 'ru' 
                  ? 'Открыт для интересных проектов и коллабораций'
                  : 'Open for interesting projects and collaborations'
                }
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
