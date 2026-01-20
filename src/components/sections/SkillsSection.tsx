import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Front-end',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'Bootstrap', level: 80 },
    ],
  },
  {
    title: 'Back-end',
    skills: [
      { name: 'Java', level: 85 },
      { name: 'PHP', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'Express.js', level: 70 },
    ],
  },
  {
    title: 'Bancos de Dados',
    skills: [
      { name: 'MySQL', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'SQL Server', level: 75 },
    ],
  },
  {
    title: 'Ferramentas',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 90 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
          {name}
        </span>
        <span className="text-caption text-muted-foreground">{level}%</span>
      </div>
      <div className="progress-luxury">
        <motion.div
          className="progress-luxury-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="skills"
      ref={ref}
      className="section-padding relative bg-card/30"
    >
      <div className="max-w-6xl mx-auto md:ml-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16"
        >
          <span className="text-caption text-muted-foreground mb-4 block">
            02 — Habilidades
          </span>
          <h2 className="text-headline">
            Tech
            <br />
            <span className="text-muted-foreground">Stack</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: categoryIndex * 0.15,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="card-luxury p-8"
            >
              <h3 className="text-subhead text-sm mb-8">{category.title}</h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={categoryIndex * 0.15 + skillIndex * 0.1 + 0.3}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
