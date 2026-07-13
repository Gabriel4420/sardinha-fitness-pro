import { ImageIcon, Pencil, Trash2 } from "lucide-react";
import { Product } from "../../domain/product";

export function ProductRow({
  product: p,
  edit,
  remove,
}: {
  product: Product;
  edit: () => void;
  remove: () => void;
}) {
  return (
    <article className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition hover:border-primary/50">
      <div className="grid h-18 w-22 shrink-0 place-items-center overflow-hidden rounded-xl bg-muted">
        {p.image_url ? (
          <img src={p.image_url} alt="" className="size-full object-contain" />
        ) : (
          <ImageIcon className="text-muted-foreground" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display font-bold">{p.name}</h3>
        <p className="truncate text-sm text-muted-foreground">{p.category}</p>
        <span
          className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${p.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
        >
          {p.published ? "Publicado" : "Rascunho"}
        </span>
      </div>
      <button
        onClick={edit}
        aria-label="Editar"
        className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-primary"
      >
        <Pencil size={17} />
      </button>
      <button
        onClick={remove}
        aria-label="Excluir"
        className="rounded-xl p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 size={17} />
      </button>
    </article>
  );
}
