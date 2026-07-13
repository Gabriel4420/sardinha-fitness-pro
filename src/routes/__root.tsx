import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { supabaseEnvIssues } from "@/lib/supabase";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Antônio Sardinha — Consultor Fitness | Equipamentos para Academia" },
      { name: "description", content: "Equipamentos fitness profissionais para academias, studios, condomínios, hotéis e home gyms. Mais de 100 acessórios à pronta entrega. Atendimento personalizado em todo Brasil." },
      { name: "keywords", content: "equipamentos fitness, equipamentos para academia, aparelhos de musculação, academia completa, acessórios fitness, equipamentos profissionais, equipamentos para studio, consultor fitness, academia residencial, home gym, aparelhos profissionais, equipamentos de academia pronta entrega, São José do Rio Preto" },
      { name: "author", content: "Antônio Sardinha" },
      { property: "og:title", content: "Antônio Sardinha — Consultor Fitness | Equipamentos para Academia" },
      { property: "og:description", content: "Equipamentos fitness profissionais para academias, studios, condomínios, hotéis e home gyms. Mais de 100 acessórios à pronta entrega. Atendimento personalizado em todo Brasil." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Antônio Sardinha Consultor Fitness" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Antônio Sardinha — Consultor Fitness | Equipamentos para Academia" },
      { name: "twitter:description", content: "Equipamentos fitness profissionais para academias, studios, condomínios, hotéis e home gyms. Mais de 100 acessórios à pronta entrega. Atendimento personalizado em todo Brasil." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2318ae5b-6eae-4d31-9b09-5801cc60eb11/id-preview-51df7f68--d1c52a39-2597-49b0-8c5a-b4410353c395.lovable.app-1783708759618.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2318ae5b-6eae-4d31-9b09-5801cc60eb11/id-preview-51df7f68--d1c52a39-2597-49b0-8c5a-b4410353c395.lovable.app-1783708759618.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('sardinha-fitness-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t}catch(e){}})()` }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <ThemeProvider>
        <SupabaseEnvBanner />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function SupabaseEnvBanner() {
  if (!import.meta.env.DEV || supabaseEnvIssues.length === 0) return null;
  return (
    <div
      role="alert"
      className="fixed inset-x-0 top-0 z-[100] border-b border-red-500/40 bg-red-600 px-4 py-2 text-center text-xs font-semibold text-white shadow-lg"
    >
      <span className="mr-2">⚠ Supabase mal configurado:</span>
      {supabaseEnvIssues.map((issue, i) => (
        <span key={issue.variable} className="mx-1">
          {i > 0 && "· "}
          <code className="font-mono">{issue.variable}</code> — {issue.reason}
        </span>
      ))}
      <div className="mt-0.5 text-[10px] font-normal text-red-100">
        Ajuste o <code className="font-mono">.env.local</code> e reinicie o servidor.
      </div>
    </div>
  );
}
