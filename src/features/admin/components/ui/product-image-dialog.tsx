import * as Dialog from "@radix-ui/react-dialog";
import { ClipboardPaste, ImagePlus, Loader2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState, type ClipboardEvent, type DragEvent } from "react";
import type { Product } from "../../domain/product";

type Props = {
  product: Product | null;
  busy: boolean;
  onClose: () => void;
  onUpdate: (product: Product, file: File) => Promise<boolean>;
};

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export function ProductImageDialog({ product, busy, onClose, onUpdate }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!product) {
      setFile(null);
      setError("");
      setDragging(false);
    }
  }, [product]);

  const selectFile = (candidate: File | null) => {
    if (!candidate) return;
    if (!candidate.type.startsWith("image/")) {
      setError("Escolha um arquivo de imagem.");
      return;
    }
    if (candidate.size > MAX_IMAGE_SIZE) {
      setError("A imagem deve ter no máximo 10 MB.");
      return;
    }
    setError("");
    setFile(candidate);
  };

  const pasteImage = (event: ClipboardEvent<HTMLDivElement>) => {
    const item = Array.from(event.clipboardData.items).find((entry) =>
      entry.type.startsWith("image/"),
    );
    if (item) {
      event.preventDefault();
      selectFile(item.getAsFile());
    }
  };

  const dropImage = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files[0] ?? null);
  };

  const saveImage = async () => {
    if (!product || !file) return;
    if (await onUpdate(product, file)) onClose();
  };

  return (
    <Dialog.Root open={Boolean(product)} onOpenChange={(open) => !open && !busy && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[71] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-primary/30 bg-card shadow-2xl outline-none data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95">
          <div className="flex items-start justify-between border-b border-border p-5 sm:p-6">
            <div className="min-w-0 pr-4">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">
                Imagem do produto
              </p>
              <Dialog.Title className="mt-1 truncate font-display text-2xl font-bold">
                {product?.name}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                Somente a imagem será alterada. Os outros dados permanecem iguais.
              </Dialog.Description>
            </div>
            <Dialog.Close
              disabled={busy}
              className="rounded-xl p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Fechar"
            >
              <X size={20} />
            </Dialog.Close>
          </div>

          <div className="p-5 sm:p-6">
            <div
              tabIndex={0}
              onPaste={pasteImage}
              onDragEnter={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragging(false)}
              onDrop={dropImage}
              className={`relative grid min-h-72 place-items-center overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center outline-none transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card ${dragging ? "border-primary bg-primary/10" : "border-border bg-background/50 hover:border-primary/60"}`}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Prévia da nova imagem"
                  className="absolute inset-0 size-full object-contain p-4"
                />
              ) : product?.image_url ? (
                <img
                  src={product.image_url}
                  alt="Imagem atual"
                  className="absolute inset-0 size-full object-contain p-4 opacity-25"
                />
              ) : null}
              <div
                className={`relative z-10 ${preview ? "rounded-2xl bg-black/75 p-4 text-white backdrop-blur-sm" : ""}`}
              >
                <span className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <ImagePlus size={23} />
                </span>
                <p className="font-bold">Arraste a nova imagem para cá</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  ou cole com Ctrl+V dentro desta área
                </p>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Upload size={16} /> Procurar imagem
                </button>
              </div>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => selectFile(event.target.files?.[0] ?? null)}
            />
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <ClipboardPaste size={14} /> PNG, JPG, WEBP ou GIF · máximo 10 MB
            </div>
            {error && (
              <p
                role="alert"
                className="mt-3 rounded-xl bg-destructive/10 p-3 text-sm text-destructive"
              >
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-border bg-muted/20 p-5 sm:flex-row sm:justify-end sm:p-6">
            <Dialog.Close
              disabled={busy}
              className="rounded-full px-5 py-2.5 text-sm font-bold text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="button"
              disabled={!file || busy}
              onClick={() => void saveImage()}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? <Loader2 className="animate-spin" size={17} /> : <ImagePlus size={17} />}
              {busy ? "Atualizando..." : "Atualizar imagem"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
