import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { CATEGORIAS } from "../../helpers/landing-content";
import { productWhatsappUrl } from "../../helpers/landing-links";
import { fadeUp } from "../../helpers/motion";
import { Section } from "../ui/section";

export function Catalogo() {
  const [active, setActive] = useState(CATEGORIAS[0].id);
  const cat = CATEGORIAS.find((c) => c.id === active)!;
  const [catalogProducts, setCatalogProducts] = useState<
    Array<{
      id: string;
      name: string;
      category: string;
      description: string;
      specifications: string;
      highlights: string;
      image_url: string | null;
    }>
  >([]);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from("products")
      .select("id,name,category,description,specifications,highlights,image_url")
      .eq("published", true)
      .order("sort_order")
      .order("name")
      .then(({ data }) => setCatalogProducts(data ?? []));
  }, []);

  const databaseProducts = catalogProducts.filter((product) =>
    product.category
      .toLocaleLowerCase("pt-BR")
      .includes(cat.name.toLocaleLowerCase("pt-BR").split(" ")[0]),
  );
  const shownProducts = databaseProducts.length
    ? databaseProducts
    : cat.products.map((product, index) => ({
        id: `${cat.id}-${index}`,
        ...product,
        description: product.desc,
        category: cat.name,
        specifications: "",
        highlights: "",
        image_url: null,
      }));
  const featuredProducts = shownProducts.slice(0, 4);

  return (
    <Section id="catalogo">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
          Catálogo
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold">
          Equipamentos para <span className="text-gradient-primary">cada necessidade</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Selecione uma categoria, veja alguns destaques e acesse o catálogo completo em PDF.
        </p>
      </motion.div>

      <div className="mt-12 flex flex-wrap justify-center gap-2 md:gap-3">
        {CATEGORIAS.map((c) => {
          const Ic = c.icon;
          const isActive = c.id === active;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`inline-flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                isActive
                  ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow scale-105"
                  : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              <Ic className="w-4 h-4" /> {c.name}
            </button>
          );
        })}
      </div>

      <motion.div
        key={cat.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-10 grid lg:grid-cols-[1.1fr_2fr] gap-6"
      >
        <div className="relative overflow-hidden rounded-3xl min-h-70 lg:min-h-full">
          <img
            src={cat.img}
            alt={cat.name}
            width={800}
            height={600}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
          <div className="relative h-full p-8 flex flex-col justify-end">
            <div className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-primary shadow-glow mb-4">
              <cat.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-3xl font-bold">{cat.name}</h3>
            <p className="mt-2 text-muted-foreground max-w-sm">{cat.desc}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {featuredProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  loading="lazy"
                  className="mb-4 h-44 w-full rounded-xl bg-muted object-contain"
                />
              )}
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-display font-bold text-lg">{p.name}</h4>
                <div className="grid place-items-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                  <cat.icon className="w-4 h-4" />
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              {p.specifications && (
                <p className="mt-3 whitespace-pre-line text-xs text-muted-foreground">
                  <strong className="text-foreground">Especificações:</strong>
                  {"\n"}
                  {p.specifications}
                </p>
              )}
              <a
                href={productWhatsappUrl(p.name, p.category)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all"
              >
                Solicitar orçamento <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="mt-12 text-center">
        <a
          href="/catalogo-antonio-sardinha.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary border border-border text-foreground font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
          <FileText className="w-4 h-4" /> Abrir catálogo completo (PDF){" "}
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </Section>
  );
}
