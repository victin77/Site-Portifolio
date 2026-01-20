import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-20 border-t border-border/30 md:ml-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left */}
          <div className="flex items-center gap-8">
            <span className="font-display font-semibold text-lg tracking-widest">
              VICTOR CAUÃ
            </span>
            <span className="text-caption text-muted-foreground">
              Full Stack Developer
            </span>
          </div>

          {/* Center */}
          <nav className="flex items-center gap-6">
            <a
              href="https://github.com/victin77"
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              GitHub
            </a>
            <a
              href="https://wa.me/5566996068252"
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              WhatsApp
            </a>
            <a
              href="mailto:victorcbgs@gmail.com"
              className="text-caption text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              Email
            </a>
          </nav>

          {/* Right */}
          <span className="text-caption text-muted-foreground">
            © {currentYear} — Todos os direitos reservados
          </span>
        </div>
      </div>
    </footer>
  );
}
