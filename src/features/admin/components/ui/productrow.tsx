import { ImageIcon, Pencil, Trash2 } from "lucide-react";
import { Product } from "../../domain/product";

export function ProductRow({
  product: p,
  edit,
  remove,
  changeImage,
}: {
  product: Product;
  edit: () => void;
  remove: () => void;
  changeImage: () => void;
}) {
  return (
    <article className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition hover:border-primary/50">
      <button
        type="button"
        onClick={changeImage}
        className="group/image relative grid h-18 w-22 shrink-0 place-items-center overflow-hidden rounded-xl bg-muted outline-none ring-primary transition hover:ring-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Atualizar imagem de ${p.name}`}
      >
        {p.image_url ? (
          <img
            src={p.image_url}
            alt=""
            className="size-full object-contain transition group-hover/image:scale-105"
          />
        ) : (
          <ImageIcon className="text-muted-foreground" />
        )}
        <span className="absolute inset-x-1 bottom-1 translate-y-2 rounded-md bg-black/80 px-1.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white opacity-0 transition group-hover/image:translate-y-0 group-hover/image:opacity-100 group-focus-visible/image:translate-y-0 group-focus-visible/image:opacity-100">
          Trocar imagem
        </span>
      </button>
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
