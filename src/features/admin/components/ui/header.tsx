import { LogOut, Menu, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SetStateAction } from "react";

import { Session } from "@supabase/supabase-js";

interface HeaderAdminProps {
  search: string;
  session: Session;
  setMenu: (value: SetStateAction<boolean>) => void;
  setSearch: (value: SetStateAction<string>) => void;
}

export const Header = ({ session, search, setMenu, setSearch }: HeaderAdminProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-border bg-background/85 px-4 backdrop-blur-xl md:px-8">
      <button
        onClick={() => setMenu(true)}
        className="rounded-xl border border-border p-2 lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu />
      </button>
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar no catálogo"
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </div>
      <div className="ml-auto hidden text-right sm:block">
        <p className="max-w-52 truncate text-sm font-semibold">{session.user.email}</p>
        <p className="text-xs text-muted-foreground">Administrador</p>
      </div>
      <button
        onClick={() => supabase!.auth.signOut()}
        className="rounded-xl border border-border p-2.5 transition hover:border-primary hover:text-primary"
        aria-label="Sair"
      >
        <LogOut size={18} />
      </button>
    </header>
  );
};
