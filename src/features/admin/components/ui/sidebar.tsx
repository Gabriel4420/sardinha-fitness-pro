import { Link } from "@tanstack/react-router";
import { EMPTY_PRODUCT as empty } from "../../domain/product";
import { Boxes, ExternalLink, LayoutDashboard, PackagePlus, X } from "lucide-react";
import { ProductDraft } from "../../domain/product";
import { Dispatch, SetStateAction } from "react";

function SideItem({
  icon: Icon,
  label,
  active = false,
}: {
  icon: typeof Boxes;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${active ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground"}`}
    >
      <Icon size={18} />
      {label}
    </div>
  );
}

export interface SidebarProps {
  setMenu: Dispatch<SetStateAction<boolean>>;
  setEditing: (value: string | null) => void;
  setForm: (value: ProductDraft | ((current: ProductDraft) => ProductDraft)) => void;
}

export const sidebar = ({ setMenu, setEditing, setForm }: SidebarProps) => {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-border bg-card/95 p-5 backdrop-blur-xl">
      <div className="mb-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Boxes className="size-5 text-primary-foreground" />
          </span>
          <span>
            <b className="block font-display text-lg leading-none">Sardinha</b>
            <small className="text-[10px] font-bold uppercase tracking-[.24em] text-primary">
              Central fitness
            </small>
          </span>
        </Link>
        <button
          className="lg:hidden"
          onClick={() => setMenu(false) /* false  */}
          aria-label="Fechar menu"
        >
          <X />
        </button>
      </div>
      <nav className="space-y-2">
        <SideItem icon={LayoutDashboard} label="Visão geral" />
        <SideItem icon={Boxes} label="Produtos" active />
        <button
          onClick={() => {
            setEditing(null);
            setForm(empty);
            setMenu(false); /* false */
            scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <PackagePlus size={18} />
          Novo produto
        </button>
      </nav>
      <div className="mt-auto rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Catálogo online</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Produtos publicados aparecem automaticamente no site.
        </p>
        <Link to="/" className="mt-4 flex items-center gap-2 text-sm font-bold text-foreground">
          Abrir site <ExternalLink size={14} />
        </Link>
      </div>
    </aside>
  );
};
