import { Loader2, Plus, Upload, X } from "lucide-react";
import { FormEvent } from "react";
import { Field } from "./field";
import { Area } from "./area";
import { Input } from "./Input";
import { ProductDraft, EMPTY_PRODUCT as empty } from "../../domain/product";
interface FormAdminProps {
  save: (event: FormEvent) => void;
  setEditing: (value: string | null) => void;
  setForm: (value: ProductDraft | ((current: ProductDraft) => ProductDraft)) => void;
  editing: string | null;
  form: ProductDraft;
  upload: (file: File) => undefined;
  message: string;
  busy: boolean;
}

export const FormAdmin = ({
  message,
  busy,
  upload,
  form,
  setEditing,
  setForm,
  editing,
  save,
}: FormAdminProps) => {
  return (
    <form
      onSubmit={save}
      className="order-1 rounded-3xl border border-border bg-card p-5 shadow-elegant xl:sticky xl:top-26 xl:order-2"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            {editing ? "Edição" : "Novo item"}
          </p>
          <h2 className="font-display text-xl font-bold">
            {editing ? "Editar produto" : "Cadastrar produto"}
          </h2>
        </div>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm(empty);
            }}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
            aria-label="Cancelar edição"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <div className="space-y-3">
        <Field label="Nome">
          <Input
            placeholder="Ex.: Cadeira extensora"
            value={form.name}
            onChange={(name) => setForm({ ...form, name })}
          />
        </Field>
        <Field label="Categoria">
          <Input
            placeholder="Ex.: Musculação"
            value={form.category}
            onChange={(category) => setForm({ ...form, category })}
          />
        </Field>
        <Field label="Descrição">
          <Area
            placeholder="Apresente o produto"
            value={form.description}
            onChange={(description) => setForm({ ...form, description })}
          />
        </Field>
        <Field label="Especificações">
          <Area
            placeholder="Altura, largura, peso..."
            value={form.specifications}
            onChange={(specifications) => setForm({ ...form, specifications })}
          />
        </Field>
        <Field label="Destaques">
          <Area
            placeholder="Um benefício por linha"
            value={form.highlights}
            onChange={(highlights) => setForm({ ...form, highlights })}
          />
        </Field>
        <label className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border p-4 transition hover:border-primary hover:bg-primary/5">
          <span className="grid size-10 place-items-center rounded-xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground">
            <Upload size={18} />
          </span>
          <span>
            <b className="block text-sm">Imagem do produto</b>
            <small className="text-muted-foreground">PNG, JPG ou WebP</small>
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          />
        </label>
        {form.image_url && (
          <img
            src={form.image_url}
            alt="Prévia do produto"
            className="h-40 w-full rounded-2xl bg-background object-contain p-2"
          />
        )}
        <label className="flex items-center justify-between rounded-xl bg-muted px-4 py-3 text-sm font-semibold">
          Publicar no catálogo
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="size-4 accent-orange-500"
          />
        </label>
        {message && <p className="rounded-xl bg-muted p-3 text-sm">{message}</p>}
        <button
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01] disabled:opacity-60"
        >
          {busy ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}{" "}
          {editing ? "Salvar alterações" : "Cadastrar produto"}
        </button>
      </div>
    </form>
  );
};
