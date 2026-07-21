import catAcess from "@/assets/cat-acessorios.jpg.asset.json";
import catCardio from "@/assets/cat-cardio.jpg.asset.json";
import catCross from "@/assets/cat-cross.jpg.asset.json";
import catEstr from "@/assets/cat-estruturas.jpg.asset.json";
import catFunc from "@/assets/cat-funcional.jpg.asset.json";
import catHome from "@/assets/cat-home.jpg.asset.json";
import catMusc from "@/assets/cat-musculacao.jpg.asset.json";
import {
  Activity,
  Bike,
  Boxes,
  Building2,
  Check,
  Dumbbell,
  HeartPulse,
  Home,
  Hotel,
  MessageCircle,
  Package,
  Stethoscope,
  Truck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
export const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#acessorios", label: "Acessórios" },
  { href: "#como-funciona", label: "Como Funciona" },
];
export const HERO_BENEFITS = [
  "Atendimento personalizado",
  "Mais de 100 produtos",
  "Pronta entrega",
  "Entrega para todo Brasil",
];
export const STATS = [
  { n: 100, s: "+", label: "Equipamentos e acessórios em estoque pronta entrega envio imediato" },
  { n: 6, s: "+", label: "Anos de experiência" },
  { n: 500, s: "+", label: "Projetos entregues" },
  { n: 27, s: "", label: "Estados atendidos" },
];
export const DIFERENCIAIS = [
  { icon: Users, title: "Atendimento consultivo", desc: "Análise individual para cada projeto" },
  { icon: Dumbbell, title: "Equipamentos profissionais", desc: "Marcas líderes de mercado" },
  { icon: Check, title: "Produtos selecionados", desc: "Curadoria criteriosa de qualidade" },
  { icon: Boxes, title: "Mais de 100 itens", desc: "Amplo portfólio disponível" },
  { icon: Truck, title: "Pronta entrega", desc: "Estoque nacional para envio imediato" },
  { icon: MessageCircle, title: "Atendimento via WhatsApp", desc: "Rápido, direto e eficiente" },
  { icon: Building2, title: "Todos os portes", desc: "De home gyms a grandes redes" },
  { icon: HeartPulse, title: "Suporte pós-venda", desc: "Acompanhamento antes e depois" },
];

export const CATEGORIAS = [
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
export const ACESSORIOS = [
  "Halteres",
  "Barras",
  "Anilhas",
  "Colchonetes",
  "Kettlebells",
  "Cordas",

  "Caneleiras",
  "Pegadores",
  "Cintos",

  "Equipamentos funcionais",
];
export const CLIENTES = [
  { icon: Dumbbell, name: "Academias" },
  { icon: Activity, name: "Studios" },
  { icon: Users, name: "Personal Trainers" },
  { icon: Building2, name: "Condomínios" },
  { icon: Hotel, name: "Hotéis" },
  { icon: Stethoscope, name: "Clínicas" },
  { icon: Zap, name: "Cross Training" },
  { icon: Home, name: "Home Gym" },
];
export const STEPS = [
  { n: "1", t: "Você entra em contato", d: "Pelo WhatsApp, telefone ou e-mail" },
  { n: "2", t: "Entendemos sua necessidade", d: "Diagnóstico completo do seu projeto" },
  { n: "3", t: "Indicamos os equipamentos ideais", d: "Consultoria especializada e imparcial" },
  { n: "4", t: "Enviamos orçamento", d: "Proposta clara e transparente" },
  { n: "5", t: "Entrega rápida", d: "Envio para todo o Brasil" },
];
export const DEPOIMENTOS = [
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
