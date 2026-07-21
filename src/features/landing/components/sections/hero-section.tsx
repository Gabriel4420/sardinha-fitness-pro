import heroImg from "@/assets/hero-gym.jpg.asset.json";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, MessageCircle, Sparkles } from "lucide-react";
import { useRef } from "react";
import { HERO_BENEFITS } from "../../helpers/landing-content";
import { WHATSAPP_URL } from "../../helpers/landing-links";
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <div id="top" ref={ref} className="relative min-h-svh flex items-center overflow-hidden pt-16">
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        <img
          src={heroImg.url}
          alt="Academia profissional premium com equipamentos de Ãºltima geraÃ§Ã£o"
          width={1920}
          height={1200}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-brand-blue/35" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-[8%] hidden w-px overflow-hidden bg-border/50 lg:block"
      >
        <motion.span
          initial={{ y: "-100%" }}
          animate={{ y: reduceMotion ? "0%" : "400%" }}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: reduceMotion ? 0 : Infinity,
            repeatDelay: 0.8,
          }}
          className="block h-1/4 w-full bg-linear-to-b from-transparent via-primary to-transparent shadow-glow"
        />
      </div>
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-16 h-1 w-28 origin-left bg-gradient-primary md:w-52"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 md:py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold mb-6 uppercase tracking-widest"
        >
          <Sparkles className="w-3.5 h-3.5" /> Consultor Fitness Especializado
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] max-w-4xl text-balance"
        >
          Equipamentos Fitness <span className="text-gradient-primary">Profissionais</span> para
          quem busca resultado de verdade.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          Transformamos projetos em academias completas com equipamentos profissionais, acessórios e
          atendimento personalizado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden px-7 py-4 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.03] transition-transform before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:skew-x-[-20deg] before:bg-white/25 before:transition-transform before:duration-700 hover:before:translate-x-[500%]"
          >
            Solicitar Orçamento{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-secondary border border-border text-foreground font-semibold hover:bg-secondary/70 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-sm"
        >
          {HERO_BENEFITS.map((t) => (
            <div key={t} className="flex items-center gap-2 text-muted-foreground">
              <span className="grid place-items-center w-5 h-5 rounded-full bg-primary/20 text-primary">
                <Check className="w-3 h-3" strokeWidth={3} />
              </span>
              {t}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
