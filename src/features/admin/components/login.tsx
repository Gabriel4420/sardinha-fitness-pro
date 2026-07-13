import { Input } from "@/features/admin/components/ui/Input";
import { Boxes, ChevronLeft, Link } from "lucide-react";
import { FormEvent } from "react";

import { Center } from "./ui/center";
import { Field } from "./ui/field";

export function Login(p: {
  email: string;
  password: string;
  busy: boolean;
  message: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  login: (e: FormEvent) => void;
}) {
  return (
    <Center>
      <div className="absolute inset-y-0 left-0 w-2 bg-gradient-primary" />
      <form
        onSubmit={p.login}
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-elegant"
      >
        <span className="mb-8 grid size-12 place-items-center rounded-xl bg-gradient-primary shadow-glow">
          <Boxes />
        </span>
        <p className="text-xs font-bold uppercase tracking-[.22em] text-primary">Acesso restrito</p>
        <h1 className="mt-2 font-display text-3xl font-bold">Central do catálogo</h1>
        <p className="mt-2 mb-7 text-sm text-muted-foreground">
          Entre para gerenciar os equipamentos exibidos no site.
        </p>
        <div className="space-y-4">
          <Field label="E-mail">
            <Input type="email" placeholder="seu@email.com" value={p.email} onChange={p.setEmail} />
          </Field>
          <Field label="Senha">
            <Input
              type="password"
              placeholder="Sua senha"
              value={p.password}
              onChange={p.setPassword}
            />
          </Field>
          {p.message && <p className="text-sm text-destructive">{p.message}</p>}
          <button
            disabled={p.busy}
            className="w-full rounded-full bg-gradient-primary py-3 font-bold text-primary-foreground shadow-glow"
          >
            {p.busy ? "Entrando..." : "Entrar no painel"}
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ChevronLeft size={15} />
            Voltar ao site
          </Link>
        </div>
      </form>
    </Center>
  );
}
