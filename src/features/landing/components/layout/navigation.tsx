import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { MessageCircle } from "lucide-react";
import { NAV_LINKS } from "../../helpers/landing-content";
import { WHATSAPP_URL } from "../../helpers/landing-links";
import { LandingLogo } from "../ui/landing-logo";
export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-background/80 border-b border-brand-blue/25">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" aria-label="Antônio Sardinha - Início" className="group flex items-center">
          <span className="relative size-14 overflow-hidden rounded-full shadow-elegant ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.02]">
            <LandingLogo className="absolute inset-0 size-full object-cover" />
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" /> Orçamento
          </a>
        </div>
      </div>
    </header>
  );
}
