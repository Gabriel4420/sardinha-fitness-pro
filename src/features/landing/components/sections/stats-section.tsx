import { motion } from "framer-motion";
import { STATS } from "../../helpers/landing-content";
import { Counter } from "../ui/counter";
export function Stats() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-border/60">
        {STATS.map((i, index) => (
          <motion.div
            key={i.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="group relative overflow-hidden py-10 text-center px-4"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-primary transition-transform duration-500 group-hover:scale-x-100"
            />
            <div className="font-display text-4xl md:text-5xl font-bold text-gradient-primary">
              <Counter to={i.n} suffix={i.s} />
            </div>
            <div className="mt-2 text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
              {i.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
