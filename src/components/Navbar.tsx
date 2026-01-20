import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Sobre', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollProgress }}
      />

      {/* Navbar */}
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-4 md:ml-20"
          >
            <nav className="glass rounded-sm px-6 py-3 flex items-center justify-between">
              {/* Logo */}
              <button
                onClick={() => scrollToSection('#home')}
                className="font-display font-semibold text-sm tracking-widest"
              >
                VC
              </button>

              {/* Nav Links - Desktop */}
              <ul className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="text-caption text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2">
                <div className="w-5 h-px bg-foreground mb-1.5" />
                <div className="w-3 h-px bg-foreground" />
              </button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
