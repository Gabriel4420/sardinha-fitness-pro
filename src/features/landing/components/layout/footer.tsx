import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { EMAIL, INSTAGRAM_URL, WHATSAPP_URL } from "../../helpers/landing-links";
import { LandingLogo } from "../ui/landing-logo";
export function Footer() {
  return (
    <footer className="border-t border-brand-blue/30 bg-brand-blue/[0.07] py-14 px-4 sm:px-6 lg:px-10 dark:bg-brand-blue/20">
      <div className="mx-auto max-w-7xl grid md:grid-cols-4 gap-10">
        <div>
          <a
            href="#top"
            aria-label="Antônio Sardinha - Início"
            className="inline-block size-20 overflow-hidden rounded-full"
          >
            <LandingLogo className="size-full object-cover" />
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
        <div>
          <h4 className="font-display font-bold mb-4">Politicas do site</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link to="/privacidade" className="hover:text-primary transition-colors">
                Privacidade e cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-border flex flex-col items-center gap-2 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} Antônio Sardinha — Consultor Fitness. Todos os direitos
          reservados.
        </p>
        <p>
          Desenvolvido por{" "}
          <a
            href="https://gabrielrodrigues.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary transition hover:text-primary/80"
          >
            @gabriel4420
          </a>
        </p>
      </div>
    </footer>
  );
}
