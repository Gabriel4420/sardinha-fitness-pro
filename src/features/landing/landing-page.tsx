import { Footer } from "./components/layout/footer";
import { Nav } from "./components/layout/navigation";
import { Sobre } from "./components/sections/about-section";
import { Acessorios } from "./components/sections/accessories-section";
import { ParaQuem } from "./components/sections/audiences-section";
import { Diferenciais } from "./components/sections/benefits-section";
import { Catalogo } from "./components/sections/catalog-section";
import { Contato } from "./components/sections/contact-section";
import { CTA } from "./components/sections/cta-section";
import { Hero } from "./components/sections/hero-section";
import { ComoFunciona } from "./components/sections/process-section";
import { Stats } from "./components/sections/stats-section";
import { Depoimentos } from "./components/sections/testimonials-section";
import { CookieConsent } from "./components/shared/cookie-consent";
import { WhatsFloat } from "./components/shared/whatsapp-float";

export { Footer, Nav };
export function LandingPage() {
  return (
    <div className="landing-theme min-h-screen bg-background text-foreground">
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
