import acessHero from "@/assets/acessorios-hero.jpg.asset.json";
import { motion } from "framer-motion";
import { ArrowRight, Boxes, Truck } from "lucide-react";
import { ACESSORIOS } from "../../helpers/landing-content";
import { WHATSAPP_URL } from "../../helpers/landing-links";
import { fadeUp } from "../../helpers/motion";
import { Section } from "../ui/section";

export function Acessorios() {
  return (
    <Section id="acessorios" className="bg-card/30 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Truck className="w-3.5 h-3.5" /> Pronta entrega
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Acessórios fitness <span className="text-gradient-primary">à pronta entrega</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Tenho uma linha completa de acessórios fitness disponíveis para pronta entrega. Mais de
            100 itens em estoque.
          </p>
          <p className="mt-4 text-muted-foreground">
            Receba rapidamente seus acessórios e monte ou complete sua academia sem precisar esperar
            meses por encomendas.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {ACESSORIOS.map((a) => (
              <span
                key={a}
                className="px-3 py-1.5 rounded-full bg-card border border-border text-sm text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors"
              >
                {a}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-sm">
              <Truck className="w-4 h-4 text-primary" /> Envio rápido
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-sm">
              <Boxes className="w-4 h-4 text-primary" /> Estoque disponível
            </div>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-transform"
          >
            Consultar acessórios <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-8 bg-gradient-primary opacity-30 blur-3xl rounded-full" />
          <div className="relative overflow-hidden rounded-3xl shadow-elegant">
            <img
              src={acessHero.url}
              alt="Halteres e anilhas fitness em estoque"
              width={1400}
              height={900}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -top-4 -left-4 bg-card border border-border rounded-2xl px-5 py-3 shadow-elegant">
            <div className="text-3xl font-display font-bold text-gradient-primary">100+</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              Itens em estoque
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
