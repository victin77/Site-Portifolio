import { motion } from 'framer-motion';
import Scene3D from '../Scene3D';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <Scene3D />

      {/* Gradient Overlays - more subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 md:px-12 max-w-4xl mx-auto md:ml-24"
      >
        {/* Eyebrow */}
        <motion.span
          variants={itemVariants}
          className="inline-block text-caption mb-6 text-muted-foreground"
        >
          Full Stack Developer
        </motion.span>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-display leading-none mb-8"
        >
          Victor
          <br />
          <span className="text-muted-foreground">Cauã</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-body max-w-xl mx-auto mb-12"
        >
          Transformando ideias em experiências digitais elegantes.
          <br />
          Código limpo. Design refinado. Resultados excepcionais.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={scrollToProjects} className="btn-luxury">
            Ver Projetos
          </button>
          <button onClick={scrollToContact} className="btn-luxury-primary">
            Entrar em Contato
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
