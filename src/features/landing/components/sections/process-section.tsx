import { motion } from "framer-motion";
import { STEPS } from "../../helpers/landing-content";
import { fadeUp } from "../../helpers/motion";
import { Section } from "../ui/section";

export function ComoFunciona() {
  return (
    <Section id="como-funciona" className="bg-brand-blue/6 dark:bg-brand-blue/15">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
          Como funciona
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold">
          Do primeiro contato à <span className="text-gradient-primary">entrega</span>
        </h2>
      </motion.div>

      <div className="mt-16 relative">
        <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/40 to-transparent" />
        <div className="grid lg:grid-cols-5 gap-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="relative mx-auto grid place-items-center w-16 h-16 rounded-2xl bg-gradient-primary text-primary-foreground font-display font-bold text-2xl shadow-glow">
                {s.n}
              </div>
              <h3 className="mt-5 font-display font-bold text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
