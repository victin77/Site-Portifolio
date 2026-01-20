import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  email: z.string().email('Email inválido').max(255),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Form submitted:', validatedData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ContactForm> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactForm] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding relative bg-card/30"
    >
      <div className="max-w-6xl mx-auto md:ml-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="text-caption text-muted-foreground mb-4 block">
              04 — Contato
            </span>
            <h2 className="text-headline mb-8">
              Vamos
              <br />
              <span className="text-muted-foreground">Conversar</span>
            </h2>
            
            <p className="text-body mb-12 max-w-md">
              Interessado em trabalhar juntos? Envie uma mensagem e retornarei 
              o mais breve possível.
            </p>

            <div className="space-y-6">
              <div>
                <span className="text-caption text-muted-foreground block mb-1">Email</span>
                <a href="mailto:victorcbgs@gmail.com" className="text-body hover:text-foreground transition-colors link-underline">
                  victorcbgs@gmail.com
                </a>
              </div>
              <div>
                <span className="text-caption text-muted-foreground block mb-1">WhatsApp</span>
                <a href="https://wa.me/5566996068252" className="text-body hover:text-foreground transition-colors link-underline">
                  +55 66 99606-8252
                </a>
              </div>
              <div>
                <span className="text-caption text-muted-foreground block mb-1">Localização</span>
                <span className="text-body">Brasil</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-luxury p-12 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-foreground/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl mb-3">Mensagem Enviada</h3>
                <p className="text-body text-sm">
                  Obrigado pelo contato. Retornarei em breve!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="text-caption text-muted-foreground block mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Seu nome"
                  />
                  {errors.name && (
                    <span className="text-xs text-destructive-foreground mt-1 block">{errors.name}</span>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="text-caption text-muted-foreground block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <span className="text-xs text-destructive-foreground mt-1 block">{errors.email}</span>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="text-caption text-muted-foreground block mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="Sua mensagem..."
                  />
                  {errors.message && (
                    <span className="text-xs text-destructive-foreground mt-1 block">{errors.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-luxury-primary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
