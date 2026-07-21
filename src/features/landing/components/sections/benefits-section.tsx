import { motion } from "framer-motion";
import { DIFERENCIAIS } from "../../helpers/landing-content";
import { fadeUp } from "../../helpers/motion";
import { Section } from "../ui/section";
export function Diferenciais() {
  return (
    <Section id="diferenciais" className="bg-brand-blue/6 dark:bg-brand-blue/15">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-3xl"
      >
        <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
          Por que trabalhar comigo
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold">
          Diferenciais que fazem <span className="text-gradient-primary">a diferenÃ§a</span>
        </h2>
      </motion.div>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {DIFERENCIAIS.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -6 }}
            className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="grid place-items-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-gradient-primary group-hover:text-primary-foreground transition-all">
              <d.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg">{d.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
