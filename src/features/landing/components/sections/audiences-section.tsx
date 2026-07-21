import { motion } from "framer-motion";
import { CLIENTES } from "../../helpers/landing-content";
import { fadeUp } from "../../helpers/motion";
import { Section } from "../ui/section";

export function ParaQuem() {
  return (
    <Section id="para-quem">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
          Para quem trabalhamos
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold">
          Soluções para <span className="text-gradient-primary">todos os perfis</span>
        </h2>
      </motion.div>

      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
        {CLIENTES.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="group p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/50 transition-colors"
          >
            <div className="grid place-items-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto mb-4 group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
              <c.icon className="w-7 h-7" />
            </div>
            <div className="font-display font-bold">{c.name}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
