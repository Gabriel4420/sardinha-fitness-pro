import { Link } from "@tanstack/react-router";
import type { FormEvent } from "react";
import {
  Boxes,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  PackagePlus,
  Plus,
  Search,
  Upload,
  X,
} from "lucide-react";

import { useAdminController } from "../hooks/use-admin-controller";
import { Login } from "./login";

import { ProductRow } from "./ui/productrow";
import { AdminSkeleton } from "./ui/admin-skeleton";
import { sidebar } from "./ui/sidebar";
import { Header } from "./ui/header";
import { FormAdmin } from "./ui/form-admin";
import { CatalogImporter } from "./ui/catalog-importer";

export function AdminScreen() {
  const controller = useAdminController();
  const {
    session,
    ready,
    credentials,
    setCredentials,
    products,
    filtered,
    categories,
    form,
    editing,
    busy,
    message,
    search,
    setSearch,
    menu,
    setMenu,
    patchForm,
    resetForm,
    login,
    save,
    upload,
    importProducts,
    remove,
    edit,
  } = controller;
  const setForm = (value: typeof form | ((current: typeof form) => typeof form)) =>
    patchForm(typeof value === "function" ? value(form) : value);
  const setEditing = (value: string | null) => {
    if (value === null) resetForm();
  };

  if (!ready) return <AdminSkeleton />;
  if (!session)
    return (
      <Login
        email={credentials.email}
        password={credentials.password}
        busy={busy}
        message={message}
        setEmail={(email) => setCredentials({ ...credentials, email })}
        setPassword={(password) => setCredentials({ ...credentials, password })}
        login={login}
      />
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        {sidebar({ setEditing, setForm, setMenu })}
      </div>
      {menu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Fechar menu"
            onClick={() => setMenu(false)}
            className="absolute inset-0 bg-black/70"
          />
          <div className="relative h-full">{sidebar({ setEditing, setForm, setMenu })}</div>
        </div>
      )}
      <div className="lg:pl-72">
        <Header session={session} setMenu={setMenu} search={search} setSearch={setSearch} />
        <main className="mx-auto max-w-7xl p-4 md:p-8">
          <section className="relative mb-8 overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8">
            <div className="absolute -right-16 -top-28 h-72 w-36 rotate-35 bg-gradient-primary opacity-80" />
            <p className="text-xs font-bold uppercase tracking-[.22em] text-primary">
              Gestão do catálogo
            </p>
            <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold md:text-4xl">
              Equipamentos organizados.{" "}
              <span className="text-gradient-primary">Vendas em movimento.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Cadastre, revise e publique os produtos apresentados aos seus clientes.
            </p>
          </section>
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            <Stat label="Produtos" value={products.length} icon={Boxes} />
            <Stat
              label="Publicados"
              value={products.filter((p) => p.published).length}
              icon={CheckCircle2}
            />
            <Stat label="Categorias" value={categories} icon={LayoutDashboard} />
          </div>
          <CatalogImporter busy={busy} importProducts={importProducts} />
          <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(340px,.75fr)]">
            <div className="order-2 xl:order-1">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    Inventário
                  </p>
                  <h2 className="font-display text-2xl font-bold">Produtos cadastrados</h2>
                </div>
                <span className="text-xs text-muted-foreground">{filtered.length} item(ns)</span>
              </div>
              <div className="space-y-3">
                {filtered.length ? (
                  filtered.map((p) => (
                    <ProductRow
                      key={p.id}
                      product={p}
                      edit={() => edit(p)}
                      remove={() => remove(p.id)}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-border p-10 text-center">
                    <Boxes className="mx-auto mb-3 text-muted-foreground" />
                    <p className="font-semibold">Nenhum produto encontrado</p>
                    <p className="text-sm text-muted-foreground">
                      Altere a busca ou cadastre um novo item.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <FormAdmin
              setEditing={setEditing}
              setForm={setForm}
              busy={busy}
              message={message}
              editing={editing}
              form={form}
              save={save}
              upload={upload}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Boxes }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
      <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon size={20} />
      </span>
      <div>
        <b className="font-display text-2xl">{value}</b>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
