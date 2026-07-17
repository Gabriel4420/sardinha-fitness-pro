import { useRef, useState, type DragEvent } from "react";
import { Check, FileSpreadsheet, Loader2, Upload, X } from "lucide-react";
import type { ProductDraft } from "../../domain/product";
import { parseCatalogFile } from "../../domain/catalog-import";

type Props = {
  busy: boolean;
  importProducts: (products: ProductDraft[]) => void;
};

export function CatalogImporter({ busy, importProducts }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<ProductDraft[]>([]);
  const [fileName, setFileName] = useState("");
  const [reading, setReading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const dragDepth = useRef(0);

  const readFile = async (file: File) => {
    setReading(true);
    setError("");
    try {
      setProducts(await parseCatalogFile(file));
      setFileName(file.name);
    } catch (reason) {
      setProducts([]);
      setError((reason as Error).message);
    } finally {
      setReading(false);
    }
  };

  const clear = () => {
    setProducts([]);
    setFileName("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const enterDropZone = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragDepth.current += 1;
    setDragging(true);
  };

  const leaveDropZone = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragDepth.current -= 1;
    if (dragDepth.current <= 0) {
      dragDepth.current = 0;
      setDragging(false);
    }
  };

  const dropFile = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragDepth.current = 0;
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && !reading && !busy) void readFile(file);
  };

  return (
    <section className="mb-8 overflow-hidden rounded-3xl border border-brand-blue/30 bg-card shadow-elegant">
      <div
        onDragEnter={enterDropZone}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "copy";
        }}
        onDragLeave={leaveDropZone}
        onDrop={dropFile}
        className={`relative grid gap-5 border-2 border-dashed p-5 transition md:grid-cols-[1fr_auto] md:items-center md:p-6 ${dragging ? "border-primary bg-primary/10" : "border-transparent"}`}
      >
        {dragging && (
          <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center bg-card/90 backdrop-blur-sm">
            <div className="text-center text-primary">
              <Upload className="mx-auto mb-2" size={28} />
              <p className="font-display text-lg font-bold">Solte o arquivo para importar</p>
              <p className="text-xs text-muted-foreground">PDF, XLSX, DOCX ou JSON</p>
            </div>
          </div>
        )}
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-blue/10 text-brand-blue dark:text-blue-300">
            <FileSpreadsheet size={22} />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Importação</p>
            <h2 className="font-display text-xl font-bold">Trazer catálogo de um arquivo</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use cabeçalhos como Nome, Categoria, Descrição, Especificações e Destaques.
            </p>
            <p className="mt-2 text-xs font-semibold text-primary">
              Arraste um arquivo para esta área ou selecione no botão.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={reading || busy}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-primary bg-gradient-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-[1.02] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
        >
          {reading ? <Loader2 className="animate-spin" size={17} /> : <Upload size={17} />}
          Selecionar arquivo
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.xlsx,.xls,.docx,.json,application/pdf,application/json"
          className="hidden"
          onChange={(event) => event.target.files?.[0] && void readFile(event.target.files[0])}
        />
      </div>

      {error && (
        <p className="mx-5 mb-5 rounded-xl bg-destructive/10 p-3 text-sm text-destructive md:mx-6">
          {error}
        </p>
      )}

      {products.length > 0 && (
        <div className="border-t border-border bg-brand-blue/[0.04] p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold">{products.length} produto(s) encontrado(s)</p>
              <p className="text-xs text-muted-foreground">{fileName} · revise antes de importar</p>
            </div>
            <button
              type="button"
              onClick={clear}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
              aria-label="Cancelar importação"
            >
              <X size={18} />
            </button>
          </div>
          <div className="max-h-56 overflow-auto rounded-2xl border border-border bg-card">
            {products.map((product, index) => (
              <div
                key={`${product.name}-${index}`}
                className="flex items-center justify-between gap-4 border-b border-border/70 px-4 py-3 last:border-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{product.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{product.category}</p>
                </div>
                <Check className="shrink-0 text-primary" size={17} />
              </div>
            ))}
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              importProducts(products);
              clear();
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01] disabled:opacity-60"
          >
            {busy ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
            Importar {products.length} produto(s)
          </button>
        </div>
      )}
    </section>
  );
}
