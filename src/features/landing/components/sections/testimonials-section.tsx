import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { DEPOIMENTOS } from "../../helpers/landing-content";
import { fadeUp } from "../../helpers/motion";
import { Section } from "../ui/section";

export function Depoimentos() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % DEPOIMENTOS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <Section id="depoimentos">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
          Depoimentos
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold">
          Quem já contratou <span className="text-gradient-primary">recomenda</span>
        </h2>
      </motion.div>

      <div className="mt-12 relative max-w-3xl mx-auto">
        <div className="relative min-h-60">
          {DEPOIMENTOS.map((d, i) => (
            <motion.div
              key={i}
              animate={{ opacity: idx === i ? 1 : 0, y: idx === i ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className={`${idx === i ? "relative" : "absolute inset-0 pointer-events-none"} p-8 md:p-12 rounded-3xl bg-card border border-border text-center`}
            >
              <div className="flex justify-center gap-1 mb-6">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
                "{d.text}"
              </p>
              <div className="mt-6 text-sm text-muted-foreground uppercase tracking-wider">
                — {d.author}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {DEPOIMENTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Depoimento ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-1.5 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
