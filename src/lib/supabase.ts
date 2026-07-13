import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

type EnvIssue = { variable: string; reason: string };

function validateUrl(value: unknown): EnvIssue | null {
  if (value === undefined || value === null || value === "")
    return { variable: "VITE_SUPABASE_URL", reason: "variável ausente" };
  if (typeof value !== "string")
    return { variable: "VITE_SUPABASE_URL", reason: "valor não é uma string" };
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:")
      return { variable: "VITE_SUPABASE_URL", reason: "deve começar com https://" };
    if (!/supabase\.(co|in|net)$/.test(parsed.hostname))
      return {
        variable: "VITE_SUPABASE_URL",
        reason: `host inesperado (${parsed.hostname}); esperado *.supabase.co`,
      };
    return null;
  } catch {
    return { variable: "VITE_SUPABASE_URL", reason: "URL inválida" };
  }
}

function validateKey(value: unknown): EnvIssue | null {
  if (value === undefined || value === null || value === "")
    return { variable: "VITE_SUPABASE_PUBLISHABLE_KEY", reason: "variável ausente" };
  if (typeof value !== "string")
    return { variable: "VITE_SUPABASE_PUBLISHABLE_KEY", reason: "valor não é uma string" };
  const isPublishable = value.startsWith("sb_publishable_");
  const isLegacyAnonJwt = value.split(".").length === 3 && value.startsWith("eyJ");
  if (!isPublishable && !isLegacyAnonJwt)
    return {
      variable: "VITE_SUPABASE_PUBLISHABLE_KEY",
      reason: "formato inválido (esperado sb_publishable_… ou JWT anon)",
    };
  if (value.length < 20)
    return { variable: "VITE_SUPABASE_PUBLISHABLE_KEY", reason: "valor curto demais" };
  return null;
}

export const supabaseEnvIssues: EnvIssue[] = [validateUrl(rawUrl), validateKey(rawKey)].filter(
  (issue): issue is EnvIssue => issue !== null,
);

export const isSupabaseConfigured = supabaseEnvIssues.length === 0;

if (!isSupabaseConfigured) {
  const details = supabaseEnvIssues.map((i) => `  • ${i.variable}: ${i.reason}`).join("\n");
  const message =
    `[Supabase] Configuração inválida. Verifique o arquivo .env.local:\n${details}\n` +
    `Após ajustar, reinicie o servidor de desenvolvimento.`;
  if (typeof console !== "undefined") console.error(message);
}

export const supabase = isSupabaseConfigured
  ? createClient(rawUrl as string, rawKey as string, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;
