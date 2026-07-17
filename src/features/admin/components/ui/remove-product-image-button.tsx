import { Loader2, Trash2 } from "lucide-react";
import type { Product } from "../../domain/product";

type Props = {
  product: Product;
  busy: boolean;
  onRemove: (product: Product) => Promise<boolean>;
  onRemoved: () => void;
};

export function RemoveProductImageButton({ product, busy, onRemove, onRemoved }: Props) {
  if (!product.image_url) return null;

  const removeImage = async () => {
    const confirmed = window.confirm(
      `Remover a imagem de ${product.name}? Os outros dados do produto serão mantidos.`,
    );
    if (!confirmed) return;
    if (await onRemove(product)) onRemoved();
  };

  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => void removeImage()}
      className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-destructive transition hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-not-allowed disabled:opacity-50"
    >
      {busy ? <Loader2 className="animate-spin" size={17} /> : <Trash2 size={17} />}
      Remover imagem
    </button>
  );
}
