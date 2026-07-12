import { createFileRoute } from "@tanstack/react-router";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { z } from "zod";
import {
  Dumbbell,
  Bike,
  Activity,
  Zap,
  Home,
  Wrench,
  Package,
  MessageCircle,
  Instagram,
  MapPin,
  Mail,
  Check,
  Truck,
  Boxes,
  Star,
  ArrowRight,
  Phone,
  ChevronRight,
  Sparkles,
  Users,
  Building2,
  Hotel,
  Stethoscope,
  Trophy,
  HeartPulse,
  Loader2,
  Send,
} from "lucide-react";
import heroImg from "@/assets/hero-gym.jpg.asset.json";
import consultorImg from "@/assets/consultor.jpg.asset.json";
import catMusc from "@/assets/cat-musculacao.jpg.asset.json";
import catCardio from "@/assets/cat-cardio.jpg.asset.json";
import catFunc from "@/assets/cat-funcional.jpg.asset.json";
import catCross from "@/assets/cat-cross.jpg.asset.json";
import catHome from "@/assets/cat-home.jpg.asset.json";
import catEstr from "@/assets/cat-estruturas.jpg.asset.json";
import catAcess from "@/assets/cat-acessorios.jpg.asset.json";
import acessHero from "@/assets/acessorios-hero.jpg.asset.json";
import logoImg from "@/assets/Logo.png";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const WHATSAPP = "5517988311000";
const WHATSAPP_MSG = encodeURIComponent("Olá! Gostaria de conhecer os equipamentos disponíveis.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${WHATSAPP_MSG}`;
const INSTAGRAM_URL = "https://www.instagram.com/consultorasfitness";
const EMAIL = "ajsardinhaf@gmail.com";

const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome completo (mínimo 2 caracteres).")
    .max(100, "Nome muito longo (máximo 100 caracteres)."),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .email("E-mail inválido. Verifique o formato (ex.: nome@dominio.com).")
    .max(160, "E-mail muito longo."),
  objective: z
    .string()
    .trim()
    .min(10, "Descreva seu objetivo com pelo menos 10 caracteres.")
    .max(1500, "Mensagem muito longa (máximo 1500 caracteres)."),
  website: z.string().max(0).optional(),
});

async function sendLead(data: z.infer<typeof leadSchema>) {
  const parsed = leadSchema.parse(data);
  if (parsed.website) return { success: true };
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("O formulário ainda não foi conectado ao Supabase.");
  }
  const { error } = await supabase.from("leads").insert({
    name: parsed.name,
    email: parsed.email,
    objective: parsed.objective,
  });
  if (error) throw new Error("Não foi possível enviar o contato.");
  return { success: true };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Antônio Sardinha — Consultor Fitness | Equipamentos para Academia" },
      {
        name: "description",
        content:
          "Equipamentos fitness profissionais para academias, studios, condomínios, hotéis e home gyms. Mais de 100 acessórios à pronta entrega. Atendimento personalizado em todo Brasil.",
      },
      {
        property: "og:title",
        content: "Antônio Sardinha — Consultor Fitness | Equipamentos para Academia",
      },
      {
        property: "og:description",
        content:
          "Equipamentos fitness profissionais para academias, studios, condomínios, hotéis e home gyms. Mais de 100 acessórios à pronta entrega. Atendimento personalizado em todo Brasil.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg.url },
      { name: "twitter:image", content: heroImg.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Antônio Sardinha - Consultor Fitness",
          image: heroImg.url,
          email: EMAIL,
          telephone: "+5517988311000",
          address: {
            "@type": "PostalAddress",
            addressLocality: "São José do Rio Preto",
            addressRegion: "SP",
            addressCountry: "BR",
          },
          url: "/",
          sameAs: [INSTAGRAM_URL],
          description:
            "Consultor especialista em equipamentos fitness profissionais para academias, studios e home gyms.",
        }),
      },
    ],
  }),
  component: Index,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 px-4 sm:px-6 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const dur = 1500;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function Nav() {
  const links = [
    { href: "#sobre", label: "Sobre" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#catalogo", label: "Catálogo" },
    { href: "#acessorios", label: "Acessórios" },
    { href: "#como-funciona", label: "Como Funciona" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" aria-label="Antônio Sardinha - Início" className="group flex items-center">
          <span className="relative h-16 w-36 overflow-hidden rounded-lg shadow-elegant ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.02] sm:w-44">
            <img
              src={logoImg}
              alt="Antônio Sardinha - Consultor de Equipamentos Fitness"
              className="absolute bg-transparent inset-0 size-full scale-[1.38] object-contain"
            />
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover:scale-105"
        >
          <MessageCircle className="w-4 h-4" /> Orçamento
        </a>
      </div>
    </header>
  );
}

function Hero() {
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
          alt="Academia profissional premium com equipamentos de última geração"
          width={1920}
          height={1200}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/40" />
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
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] max-w-4xl [text-wrap:balance]"
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
          {[
            "Atendimento personalizado",
            "Mais de 100 produtos",
            "Pronta entrega",
            "Entrega para todo Brasil",
          ].map((t) => (
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

function Stats() {
  const items = [
    { n: 100, s: "+", label: "Acessórios em estoque" },
    { n: 15, s: "+", label: "Anos de experiência" },
    { n: 500, s: "+", label: "Projetos entregues" },
    { n: 27, s: "", label: "Estados atendidos" },
  ];
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-border/60">
        {items.map((i, index) => (
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

function Sobre() {
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

const DIFERENCIAIS = [
  { icon: Users, title: "Atendimento consultivo", desc: "Análise individual para cada projeto" },
  { icon: Dumbbell, title: "Equipamentos profissionais", desc: "Marcas líderes de mercado" },
  { icon: Check, title: "Produtos selecionados", desc: "Curadoria criteriosa de qualidade" },
  { icon: Boxes, title: "Mais de 100 itens", desc: "Amplo portfólio disponível" },
  { icon: Truck, title: "Pronta entrega", desc: "Estoque nacional para envio imediato" },
  { icon: MessageCircle, title: "Atendimento via WhatsApp", desc: "Rápido, direto e eficiente" },
  { icon: Building2, title: "Todos os portes", desc: "De home gyms a grandes redes" },
  { icon: HeartPulse, title: "Suporte pós-venda", desc: "Acompanhamento antes e depois" },
];

function Diferenciais() {
  return (
    <Section id="diferenciais" className="bg-card/30">
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
          Diferenciais que fazem <span className="text-gradient-primary">a diferença</span>
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

const CATEGORIAS = [
  {
    id: "musculacao",
    icon: Dumbbell,
    name: "Musculação",
    desc: "Máquinas profissionais para todos os grupos musculares",
    img: catMusc.url,
    products: [
      { name: "Supino Reto Profissional", desc: "Estrutura reforçada com bancos ajustáveis" },
      { name: "Leg Press 45º", desc: "Aparelho para treino de membros inferiores" },
      { name: "Cadeira Extensora", desc: "Isolamento total do quadríceps" },
      { name: "Puxador Alto", desc: "Máquina para dorsais e costas" },
    ],
  },
  {
    id: "cardio",
    icon: Bike,
    name: "Cardio",
    desc: "Esteiras, bikes e elípticos de alta performance",
    img: catCardio.url,
    products: [
      { name: "Esteira Profissional", desc: "Motor potente e amortecimento superior" },
      { name: "Bike Spinning", desc: "Volante pesado com regulagem precisa" },
      { name: "Elíptico", desc: "Movimento fluido e baixo impacto" },
      { name: "Bike Ergométrica", desc: "Vertical ou horizontal, altíssima durabilidade" },
    ],
  },
  {
    id: "funcional",
    icon: Activity,
    name: "Funcional",
    desc: "Equipamentos completos para treinamento funcional",
    img: catFunc.url,
    products: [
      { name: "Kit TRX Profissional", desc: "Suspensão para treino funcional completo" },
      { name: "Bola Suíça", desc: "Diversos tamanhos e alta resistência" },
      { name: "Cordas de Batalha", desc: "Battle rope para explosão e resistência" },
      { name: "Medicine Ball", desc: "Diferentes pesos para treinos dinâmicos" },
    ],
  },
  {
    id: "cross",
    icon: Zap,
    name: "Cross Training",
    desc: "Rig, plataformas e equipamentos para cross",
    img: catCross.url,
    products: [
      { name: "Rig Modular", desc: "Estrutura completa para box de cross" },
      { name: "Anilhas Olímpicas", desc: "Bumper plates coloridas e olímpicas" },
      { name: "Barra Olímpica", desc: "20kg profissional com rolamentos" },
      { name: "Plataforma de Levantamento", desc: "Amortecimento e proteção do piso" },
    ],
  },
  {
    id: "home",
    icon: Home,
    name: "Home Gym",
    desc: "Soluções completas para academias residenciais",
    img: catHome.url,
    products: [
      { name: "Estação Multifuncional", desc: "Diversos exercícios em um único aparelho" },
      { name: "Banco Ajustável", desc: "Múltiplas inclinações para treinos variados" },
      { name: "Kit Halteres", desc: "Conjunto completo para casa" },
      { name: "Smith Machine", desc: "Segurança e versatilidade em casa" },
    ],
  },
  {
    id: "estruturas",
    icon: Wrench,
    name: "Estruturas",
    desc: "Racks, gaiolas e estruturas metálicas reforçadas",
    img: catEstr.url,
    products: [
      { name: "Power Rack", desc: "Gaiola completa para treino pesado" },
      { name: "Half Rack", desc: "Estrutura compacta e robusta" },
      { name: "Rack de Agachamento", desc: "Base sólida para levantamento" },
      { name: "Suporte de Anilhas", desc: "Organização e praticidade" },
    ],
  },
  {
    id: "acessorios-cat",
    icon: Package,
    name: "Acessórios",
    desc: "Mais de 100 itens à pronta entrega",
    img: catAcess.url,
    products: [
      { name: "Kit Halteres Sextavados", desc: "Diversos pesos disponíveis" },
      { name: "Kettlebells", desc: "Ferro fundido, todos os pesos" },
      { name: "Faixas Elásticas", desc: "Múltiplas resistências" },
      { name: "Colchonetes Profissionais", desc: "Alta densidade e durabilidade" },
    ],
  },
];

function Catalogo() {
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
          Selecione uma categoria e explore os produtos disponíveis.
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
          {shownProducts.map((p, i) => (
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
                href={WHATSAPP_URL}
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
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary border border-border text-foreground font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
          Ver catálogo completo <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </Section>
  );
}

const ACESSORIOS = [
  "Halteres",
  "Barras",
  "Anilhas",
  "Colchonetes",
  "Kettlebells",
  "Cordas",
  "Faixas elásticas",
  "Step",
  "Medicine Ball",
  "Caneleiras",
  "Pegadores",
  "Cintos",
  "Luvas",
  "Elásticos",
  "Equipamentos funcionais",
];

function Acessorios() {
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

const CLIENTES = [
  { icon: Dumbbell, name: "Academias" },
  { icon: Activity, name: "Studios" },
  { icon: Users, name: "Personal Trainers" },
  { icon: Building2, name: "Condomínios" },
  { icon: Hotel, name: "Hotéis" },
  { icon: Stethoscope, name: "Clínicas" },
  { icon: Zap, name: "Cross Training" },
  { icon: Home, name: "Home Gym" },
];

function ParaQuem() {
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

const STEPS = [
  { n: "1", t: "Você entra em contato", d: "Pelo WhatsApp, telefone ou e-mail" },
  { n: "2", t: "Entendemos sua necessidade", d: "Diagnóstico completo do seu projeto" },
  { n: "3", t: "Indicamos os equipamentos ideais", d: "Consultoria especializada e imparcial" },
  { n: "4", t: "Enviamos orçamento", d: "Proposta clara e transparente" },
  { n: "5", t: "Entrega rápida", d: "Envio para todo o Brasil" },
];

function ComoFunciona() {
  return (
    <Section id="como-funciona" className="bg-card/30">
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

const DEPOIMENTOS = [
  {
    text: "Excelente atendimento. Consultoria detalhada e equipamentos entregues no prazo combinado.",
    author: "Cliente Academia",
  },
  {
    text: "Equipamentos de ótima qualidade. Superou nossas expectativas para o studio.",
    author: "Cliente Studio",
  },
  {
    text: "Entrega rápida e produtos exatamente como descritos. Recomendo!",
    author: "Personal Trainer",
  },
  {
    text: "Atendimento extremamente profissional. Antônio entendeu nosso projeto do zero ao fim.",
    author: "Cliente Condomínio",
  },
];

function Depoimentos() {
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

function Contato() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [values, setValues] = useState({ name: "", email: "", objective: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; objective?: string }>({});
  const [errorMsg, setErrorMsg] = useState<string>("");

  function validate() {
    const result = leadSchema.safeParse({ ...values, website: "" });
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: typeof errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof typeof errors;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    setErrors(fieldErrors);
    return false;
  }

  function updateField(field: "name" | "email" | "objective", value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg("");
    if (!validate()) {
      setStatus("error");
      setErrorMsg("Corrija os campos destacados antes de enviar.");
      return;
    }
    const form = event.currentTarget;
    const website = String(new FormData(form).get("website") || "");
    setStatus("loading");
    try {
      await sendLead({ ...values, website });
      form.reset();
      setValues({ name: "", email: "", objective: "" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.",
      );
    }
  }

  const baseField =
    "mt-2 w-full rounded-xl border bg-background/70 px-4 py-3.5 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:ring-2";
  const fieldClass = (hasError?: boolean) =>
    `${baseField} ${
      hasError
        ? "border-destructive focus:border-destructive focus:ring-destructive/20"
        : "border-border focus:border-primary focus:ring-primary/20"
    }`;
  return (
    <Section id="contato" className="bg-card/30">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Prefere e-mail?
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Conte seu objetivo e receba um{" "}
            <span className="text-gradient-primary">atendimento personalizado</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Preencha os dados ao lado. Vou analisar sua necessidade e entrar em contato para ajudar
            a encontrar os equipamentos ideais para o seu projeto.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
              <Mail className="w-5 h-5" />
            </span>
            Resposta direta no seu e-mail, sem compromisso.
          </div>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-elegant"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="text-sm font-medium">
              Nome
              <input
                className={fieldClass(!!errors.name)}
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Seu nome"
                maxLength={100}
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={validate}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
              />
              {errors.name && (
                <span id="err-name" className="mt-1.5 block text-xs text-destructive">
                  {errors.name}
                </span>
              )}
            </label>
            <label className="text-sm font-medium">
              E-mail
              <input
                className={fieldClass(!!errors.email)}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                maxLength={160}
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                onBlur={validate}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && (
                <span id="err-email" className="mt-1.5 block text-xs text-destructive">
                  {errors.email}
                </span>
              )}
            </label>
          </div>
          <label className="mt-5 block text-sm font-medium">
            Qual é o seu objetivo?
            <textarea
              className={`${fieldClass(!!errors.objective)} min-h-32 resize-y`}
              name="objective"
              placeholder="Ex.: montar uma academia de condomínio, renovar equipamentos do studio..."
              maxLength={1500}
              value={values.objective}
              onChange={(e) => updateField("objective", e.target.value)}
              onBlur={validate}
              aria-invalid={!!errors.objective}
              aria-describedby={errors.objective ? "err-objective" : undefined}
            />
            {errors.objective && (
              <span id="err-objective" className="mt-1.5 block text-xs text-destructive">
                {errors.objective}
              </span>
            )}
          </label>
          <input
            className="hidden"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-4 font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01] disabled:cursor-wait disabled:opacity-70"
          >
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {status === "loading" ? "Enviando..." : "Enviar meu contato"}
          </button>
          <div aria-live="polite" className="mt-4 min-h-5 text-center text-sm">
            {status === "success" && (
              <p className="text-primary">Contato enviado! Em breve retorno para você.</p>
            )}
            {status === "error" && errorMsg && <p className="text-destructive">{errorMsg}</p>}
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function CTA() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center bg-gradient-primary shadow-glow"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <h2 className="relative font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">
            Vamos montar sua academia?
          </h2>
          <p className="relative mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Solicite agora um orçamento personalizado sem compromisso.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-10 inline-flex items-center gap-2 px-10 py-5 rounded-full bg-background text-foreground font-bold text-lg hover:scale-105 transition-transform shadow-elegant"
          >
            Solicitar Orçamento <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 py-14 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-10">
        <div>
          <a
            href="#top"
            aria-label="Antônio Sardinha - Início"
            className="inline-block h-20 w-56 overflow-hidden rounded-xl"
          >
            <img
              src={logoImg}
              alt="Antônio Sardinha - Consultor de Equipamentos Fitness"
              className="size-full scale-[1.32] object-contain"
            />
          </a>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Consultor especialista em equipamentos fitness profissionais. Autoridade em atendimento
            consultivo e curadoria de produtos.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold mb-4">Contato</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" /> +55 17 98831-1000
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" /> {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" /> @consultorasfitness
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" /> São José do Rio Preto - SP
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold mb-4">Navegação</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="#sobre" className="hover:text-primary transition-colors">
                Sobre
              </a>
            </li>
            <li>
              <a href="#diferenciais" className="hover:text-primary transition-colors">
                Diferenciais
              </a>
            </li>
            <li>
              <a href="#catalogo" className="hover:text-primary transition-colors">
                Catálogo
              </a>
            </li>
            <li>
              <a href="#acessorios" className="hover:text-primary transition-colors">
                Acessórios
              </a>
            </li>
            <li>
              <a href="#como-funciona" className="hover:text-primary transition-colors">
                Como funciona
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Antônio Sardinha — Consultor Fitness. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}

function WhatsFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />
      <span className="relative grid place-items-center w-14 h-14 rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:scale-110 transition-transform">
        <MessageCircle className="w-6 h-6" />
      </span>
    </a>
  );
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [managing, setManaging] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [preferences, setPreferences] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lgpd-consent");
      if (!stored) setVisible(true);
      else {
        const saved = JSON.parse(stored);
        setPreferences({
          analytics: saved.categories?.analytics === true,
          marketing: saved.categories?.marketing === true,
        });
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function save(categories: { analytics: boolean; marketing: boolean }) {
    try {
      localStorage.setItem(
        "lgpd-consent",
        JSON.stringify({
          version: 2,
          categories: { necessary: true, ...categories },
          date: new Date().toISOString(),
        }),
      );
    } catch {
      /* ignore */
    }
    setPreferences(categories);
    setVisible(false);
    setManaging(false);
  }

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => {
          setManaging(true);
          setVisible(true);
        }}
        className="fixed bottom-5 left-5 z-50 rounded-full border border-border bg-card/95 px-4 py-2 text-xs font-semibold text-foreground shadow-elegant backdrop-blur-md transition hover:bg-muted"
      >
        Preferências de cookies
      </button>
    );
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies e privacidade (LGPD)"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-4xl rounded-2xl border border-border bg-card/95 p-5 shadow-elegant backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-6"
    >
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <h3 className="font-display text-base font-bold text-foreground">
            Sua privacidade é importante 🍪
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Utilizamos cookies essenciais para o funcionamento do site e, com sua permissão, cookies
            para análise de navegação e melhoria da experiência, em conformidade com a{" "}
            <strong className="text-foreground">LGPD (Lei nº 13.709/2018)</strong>. Você pode
            aceitar ou recusar os cookies opcionais a qualquer momento. Saiba mais na nossa{" "}
            <button
              type="button"
              onClick={() => setPolicyOpen(true)}
              className="font-semibold text-primary underline underline-offset-2 transition hover:text-primary/80"
            >
              Política de Privacidade e Cookies
            </button>
            .
          </p>
        </div>
        {managing && (
          <div className="grid gap-2 sm:grid-cols-3">
            <CookieCategory
              title="Necessários"
              description="Essenciais para o site funcionar."
              checked
              disabled
            />
            <CookieCategory
              title="Analytics"
              description="Ajudam a entender o uso do site."
              checked={preferences.analytics}
              onChange={(analytics) => setPreferences((p) => ({ ...p, analytics }))}
            />
            <CookieCategory
              title="Marketing"
              description="Permitem personalizar campanhas."
              checked={preferences.marketing}
              onChange={(marketing) => setPreferences((p) => ({ ...p, marketing }))}
            />
          </div>
        )}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => save({ analytics: false, marketing: false })}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
          >
            Recusar opcionais
          </button>
          {!managing && (
            <button
              type="button"
              onClick={() => setManaging(true)}
              className="rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Gerenciar preferências
            </button>
          )}
          <button
            type="button"
            onClick={() => save(managing ? preferences : { analytics: true, marketing: true })}
            className="rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-[1.02]"
          >
            {managing ? "Salvar preferências" : "Aceitar todos"}
          </button>
        </div>
      </div>
      <PrivacyPolicyModal open={policyOpen} onClose={() => setPolicyOpen(false)} />
    </motion.div>
  );
}

function CookieCategory({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-xl border border-border p-3 ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
        className="mt-1 h-4 w-4 accent-primary"
      />
      <span>
        <span className="block text-sm font-bold text-foreground">{title}</span>
        <span className="block text-xs leading-relaxed text-muted-foreground">{description}</span>
      </span>
    </label>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Sobre />
        <Diferenciais />
        <Catalogo />
        <Acessorios />
        <ParaQuem />
        <ComoFunciona />
        <Depoimentos />
        <Contato />
        <CTA />
      </main>
      <Footer />
      <WhatsFloat />
      <CookieConsent />
    </div>
  );
}
