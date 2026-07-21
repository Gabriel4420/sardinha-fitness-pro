import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonialRepository } from "@/features/testimonials/data/testimonial-repository";
import type { Testimonial } from "@/features/testimonials/domain/testimonial";
import { DEPOIMENTOS } from "../../helpers/landing-content";
import { fadeUp } from "../../helpers/motion";
import { Section } from "../ui/section";

export function Depoimentos() {
  const [idx, setIdx] = useState(0);
  const [screenshots, setScreenshots] = useState<Testimonial[]>([]);
  const slidesCount = screenshots.length || DEPOIMENTOS.length;

  useEffect(() => {
    let active = true;
    testimonialRepository
      .listPublished()
      .then((items) => active && setScreenshots(items))
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setIdx(0);
    const t = setInterval(() => setIdx((i) => (i + 1) % slidesCount), 5000);
    return () => clearInterval(t);
  }, [slidesCount]);
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
        <div
          className={screenshots.length ? "relative min-h-96 md:min-h-140" : "relative min-h-60"}
        >
          {screenshots.length
            ? screenshots.map((testimonial, i) => (
                <motion.figure
                  key={testimonial.id}
                  animate={{ opacity: idx === i ? 1 : 0, y: idx === i ? 0 : 20 }}
                  transition={{ duration: 0.5 }}
                  aria-hidden={idx !== i}
                  className={`${idx === i ? "relative" : "absolute inset-0 pointer-events-none"} overflow-hidden rounded-3xl border border-border bg-card p-3 md:p-5`}
                >
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.alt_text}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="max-h-130 w-full rounded-2xl bg-muted object-contain"
                  />
                  <figcaption className="mt-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Depoimento recebido via {testimonial.source}
                  </figcaption>
                </motion.figure>
              ))
            : DEPOIMENTOS.map((d, i) => (
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
          {Array.from({ length: slidesCount }, (_, i) => (
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
