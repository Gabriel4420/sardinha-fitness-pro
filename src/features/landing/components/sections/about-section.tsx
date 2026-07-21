import consultorImg from "@/assets/consultor.jpg.asset.json";
import { motion } from "framer-motion";
import { MessageCircle, Trophy } from "lucide-react";
import { WHATSAPP_URL } from "../../helpers/landing-links";
import { fadeUp } from "../../helpers/motion";
import { Section } from "../ui/section";
export function Sobre() {
  return (
    <Section id="sobre">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
          <div className="relative overflow-hidden rounded-3xl shadow-elegant">
            <img
              src={consultorImg.url}
              alt="Antônio Sardinha, consultor fitness"
              width={900}
              height={1100}
              loading="lazy"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-elegant hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-primary">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display font-bold">Especialista</div>
                <div className="text-xs text-muted-foreground">em equipamentos fitness</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Sobre o consultor
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Antônio Sardinha —{" "}
            <span className="text-gradient-primary">autoridade em equipamentos fitness</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Sou especialista em equipamentos fitness e ajudo academias, studios e profissionais da
            área a montarem espaços completos, funcionais e altamente duráveis.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Meu objetivo é indicar exatamente o equipamento ideal para cada necessidade, evitando
            gastos desnecessários e entregando a melhor relação custo-benefício.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform"
          >
            Falar com o consultor <MessageCircle className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
