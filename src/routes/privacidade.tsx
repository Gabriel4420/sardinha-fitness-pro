import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPolicyContent } from "@/components/PrivacyPolicyContent";
import { Nav, Footer } from "@/routes/index";
const EMAIL = "ajsardinhaf@gmail.com";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade e Cookies — Antônio Sardinha Consultor Fitness" },
      {
        name: "description",
        content:
          "Política de Privacidade e Cookies em conformidade com a LGPD (Lei nº 13.709/2018) do site Antônio Sardinha Consultor Fitness.",
      },
      { name: "robots", content: "index,follow" },
      {
        property: "og:title",
        content: "Política de Privacidade e Cookies — Antônio Sardinha Consultor Fitness",
      },
      {
        property: "og:description",
        content: "Como coletamos, usamos e protegemos seus dados em conformidade com a LGPD.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const updated = new Date().toLocaleDateString("pt-BR", { year: "numeric", month: "long" });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main className="min-h-dvh bg-background px-4 py-20 sm:px-6 lg:px-10">
        <article className="mx-auto max-w-3xl">
          <header className="mb-8 border-b border-border pb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              LGPD — Lei nº 13.709/2018
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Política de Privacidade e Cookies
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Última atualização: {updated}</p>
          </header>
          <PrivacyPolicyContent email={EMAIL} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
