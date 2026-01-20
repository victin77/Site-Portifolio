import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Dashboard de Comissões',
    description: 'Dashboard web para gestão de vendas com rastreamento de clientes, leads, comissões e pagamentos parcelados. Inclui acesso baseado em funções, alerta de pagamentos vencidos e automação de fluxo de trabalho.',
    tags: ['Node.js', 'JavaScript', 'SQLite'],
    image: '/placeholder.svg',
    link: 'https://github.com/victin77/ddaa',
    github: 'https://github.com/victin77/ddaa',
  },
  {
    id: 2,
    title: 'SOV',
    description: 'Sistema operacional de vendas com pipeline Kanban, seguimentos obrigatórios, histórico de interações, tarefas e dashboard gerencial com acesso baseado em funções.',
    tags: ['Node.js', 'JavaScript', 'SQLite'],
    image: '/placeholder.svg',
    link: 'https://github.com/victin77/projeto-SOV-',
    github: 'https://github.com/victin77/projeto-SOV-',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="card-luxury group overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
          transition={{ duration: 0.4 }}
        />
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
        
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href={project.link}
            className="btn-luxury-primary text-xs px-6 py-3"
          >
            Ver Projeto
          </a>
          <a
            href={project.github}
            className="btn-luxury text-xs px-6 py-3"
          >
            GitHub
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="font-display text-xl md:text-2xl font-medium mb-3 group-hover:text-foreground transition-colors">
          {project.title}
        </h3>
        <p className="text-body text-sm mb-6 line-clamp-2">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-secondary text-secondary-foreground tracking-wider uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={ref}
      className="section-padding relative"
    >
      <div className="max-w-6xl mx-auto md:ml-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-caption text-muted-foreground mb-4 block">
              03 — Projetos
            </span>
            <h2 className="text-headline">
              Trabalhos
              <br />
              <span className="text-muted-foreground">Selecionados</span>
            </h2>
          </div>
          <a
            href="#"
            className="text-caption text-muted-foreground hover:text-foreground transition-colors link-underline self-start md:self-auto"
          >
            Ver Todos →
          </a>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
