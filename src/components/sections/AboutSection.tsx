import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding relative"
    >
      <div className="max-w-6xl mx-auto md:ml-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left - Label */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="text-caption text-muted-foreground mb-4 block">
              01 — Sobre
            </span>
            <h2 className="text-headline mb-8">
              Criando
              <br />
              <span className="text-muted-foreground">Experiências</span>
            </h2>
            
            <div className="space-y-6 text-body">
              <p>
                Sou um desenvolvedor Full Stack apaixonado por criar soluções 
                digitais que combinam funcionalidade impecável com design elegante.
              </p>
              <p>
                Com experiência em diversas tecnologias, desde front-end até 
                back-end, busco sempre entregar código limpo, escalável e que 
                proporcione a melhor experiência ao usuário.
              </p>
              <p>
                Minha abordagem une criatividade técnica com atenção obsessiva 
                aos detalhes, resultando em produtos digitais que se destacam.
              </p>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="grid grid-cols-2 gap-8"
          >
            {[
              { number: '3+', label: 'Anos de Experiência' },
              { number: '20+', label: 'Projetos Realizados' },
              { number: '15+', label: 'Tecnologias' },
              { number: '100%', label: 'Dedicação' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="card-luxury p-8 text-center"
              >
                <span className="text-4xl md:text-5xl font-display font-light block mb-2">
                  {stat.number}
                </span>
                <span className="text-caption text-muted-foreground">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
