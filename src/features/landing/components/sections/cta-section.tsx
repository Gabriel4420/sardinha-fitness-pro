import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "../../helpers/landing-links";
export function CTA() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-brand-blue/30 p-10 md:p-16 text-center bg-gradient-primary shadow-glow"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <h2 className="relative font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">
            Vamos montar sua academia?
          </h2>
          <p className="relative mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Solicite agora um orÃ§amento personalizado sem compromisso.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-10 inline-flex items-center gap-2 px-10 py-5 rounded-full bg-background text-foreground font-bold text-lg hover:scale-105 transition-transform shadow-elegant"
          >
            Solicitar OrÃ§amento <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
