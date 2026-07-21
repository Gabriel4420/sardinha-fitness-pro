import { ImagePlus, Loader2, MessageSquareQuote, Trash2 } from "lucide-react";
import { useTestimonialsController } from "../../hooks/use-testimonials-controller";

export function TestimonialManager({ enabled }: { enabled: boolean }) {
  const controller = useTestimonialsController(enabled);

  return (
    <section id="depoimentos-admin" className="mb-10 scroll-mt-28">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Prova social</p>
        <h2 className="font-display text-2xl font-bold">Carrossel de depoimentos</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Envie prints do WhatsApp, Instagram, e-mail ou qualquer outro canal.
        </p>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(320px,.7fr)_minmax(0,1.3fr)]">
        <form onSubmit={controller.create} className="rounded-2xl border border-border bg-card p-5">
          <label className="block text-sm font-semibold">
            Print do depoimento
            <span className="mt-2 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 text-center transition hover:bg-primary/10">
              <ImagePlus className="mb-2 text-primary" />
              <span className="text-sm">PNG, JPG, WEBP ou outra imagem, até 8 MB</span>
              <input name="image" type="file" accept="image/*" required className="mt-3 text-xs" />
            </span>
          </label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Origem
              <input
                name="source"
                defaultValue="WhatsApp"
                maxLength={80}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 font-normal outline-none focus:border-primary"
              />
            </label>
            <label className="text-sm font-semibold">
              Ordem
              <input
                name="sort_order"
                type="number"
                defaultValue={0}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 font-normal outline-none focus:border-primary"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm font-semibold">
            Descrição acessível
            <input
              name="alt_text"
              defaultValue="Print de depoimento de cliente"
              maxLength={180}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 font-normal outline-none focus:border-primary"
            />
          </label>
          <label className="mt-4 flex items-center gap-2 text-sm font-semibold">
            <input
              name="published"
              type="checkbox"
              defaultChecked
              className="size-4 accent-primary"
            />
            Publicar no site
          </label>
          <button
            type="submit"
            disabled={controller.busy}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 font-bold text-primary-foreground disabled:opacity-60"
          >
            {controller.busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ImagePlus size={18} />
            )}
            Cadastrar depoimento
          </button>
          <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-muted-foreground">
            {controller.message}
          </p>
        </form>

        <div>
          {controller.testimonials.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {controller.testimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.alt_text}
                    className="aspect-4/3 w-full bg-muted object-contain"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-bold">{testimonial.source}</span>
                      <button
                        type="button"
                        onClick={() => controller.remove(testimonial)}
                        disabled={controller.busy}
                        aria-label="Excluir depoimento"
                        className="rounded-lg p-2 text-destructive transition hover:bg-destructive/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <label className="flex items-center gap-2 text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={testimonial.published}
                          onChange={() => controller.togglePublished(testimonial)}
                          className="size-4 accent-primary"
                        />
                        Publicado
                      </label>
                      <label className="ml-auto flex items-center gap-2 text-xs">
                        Ordem
                        <input
                          type="number"
                          defaultValue={testimonial.sort_order}
                          onBlur={(event) =>
                            controller.updateOrder(testimonial, Number(event.target.value || 0))
                          }
                          className="w-16 rounded-lg border border-border bg-background px-2 py-1.5"
                        />
                      </label>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-border p-8 text-center">
              <div>
                <MessageSquareQuote className="mx-auto mb-3 text-muted-foreground" />
                <p className="font-semibold">Nenhum print cadastrado</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Os depoimentos em texto continuarão aparecendo até o primeiro print ser publicado.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
