import { PrivacyPolicyContent } from "@/components/PrivacyPolicyContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EMAIL } from "../../helpers/landing-links";
export function CookieConsent() {
  return <CookieConsentInner />;
}

function PrivacyPolicyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const updated = new Date().toLocaleDateString("pt-BR", { year: "numeric", month: "long" });
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[85vh] w-[calc(100%-2rem)] max-w-3xl gap-0 overflow-hidden border-border bg-card p-0 sm:rounded-2xl">
        <DialogHeader className="border-b border-border px-6 py-4 text-left">
          <DialogTitle className="font-display text-xl font-bold text-foreground">
            Política de Privacidade e Cookies
          </DialogTitle>
          <DialogDescription className="mt-1 text-xs text-muted-foreground">
            Última atualização: {updated}. Em conformidade com a LGPD (Lei nº 13.709/2018).
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
          <PrivacyPolicyContent email={EMAIL} />
        </div>
        <div className="flex flex-col-reverse justify-end gap-2 border-t border-border bg-background/40 px-6 py-3 sm:flex-row">
          <Link
            to="/privacidade"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Abrir página completa
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-gradient-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Entendi
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CookieConsentInner() {
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
      role="region"
      aria-live="polite"
      aria-labelledby="lgpd-banner-title"
      aria-describedby="lgpd-banner-desc"
      className="fixed inset-x-3 bottom-3 z-60 mx-auto max-w-4xl rounded-2xl border border-border bg-card/95 p-5 shadow-elegant backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-6"
    >
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <h3 id="lgpd-banner-title" className="font-display text-base font-bold text-foreground">
            Sua privacidade é importante 🍪
          </h3>
          <p id="lgpd-banner-desc" className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Utilizamos cookies essenciais para o funcionamento do site e, com sua permissão, cookies
            para análise de navegação e melhoria da experiência, em conformidade com a{" "}
            <strong className="text-foreground">LGPD (Lei nº 13.709/2018)</strong>. Você pode
            aceitar ou recusar os cookies opcionais a qualquer momento. Saiba mais na nossa{" "}
            <button
              type="button"
              onClick={() => setPolicyOpen(true)}
              className="font-semibold text-primary underline underline-offset-2 transition hover:text-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              aria-haspopup="dialog"
            >
              Política de Privacidade e Cookies
            </button>{" "}
            ou acesse a{" "}
            <Link
              to="/privacidade"
              className="font-semibold text-primary underline underline-offset-2 transition hover:text-primary/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              página completa
            </Link>
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
              title="Análise"
              description="Ajuda a entender como o site é utilizado."
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
