import { useCallback, useEffect, useState, type FormEvent } from "react";
import { testimonialRepository } from "@/features/testimonials/data/testimonial-repository";
import type { Testimonial } from "@/features/testimonials/domain/testimonial";

export function useTestimonialsController(enabled: boolean) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    try {
      setTestimonials(await testimonialRepository.list());
    } catch (error) {
      setMessage((error as Error).message);
    }
  }, []);

  useEffect(() => {
    if (enabled) void load();
  }, [enabled, load]);

  async function run(task: () => Promise<void>) {
    setBusy(true);
    setMessage("");
    try {
      await task();
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const create = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const file = form.get("image");
    if (!(file instanceof File) || !file.size) {
      setMessage("Selecione o print do depoimento.");
      return;
    }
    const target = event.currentTarget;
    void run(async () => {
      await testimonialRepository.create(file, {
        alt_text: String(form.get("alt_text") || "Print de depoimento de cliente").trim(),
        source: String(form.get("source") || "WhatsApp").trim(),
        published: form.get("published") === "on",
        sort_order: Number(form.get("sort_order") || 0),
      });
      target.reset();
      setMessage("Depoimento cadastrado com sucesso.");
      await load();
    });
  };

  const togglePublished = (testimonial: Testimonial) =>
    void run(async () => {
      await testimonialRepository.update(testimonial.id, { published: !testimonial.published });
      await load();
    });

  const updateOrder = (testimonial: Testimonial, sortOrder: number) =>
    void run(async () => {
      await testimonialRepository.update(testimonial.id, { sort_order: sortOrder });
      await load();
    });

  const remove = (testimonial: Testimonial) => {
    if (!confirm("Excluir este print de depoimento?")) return;
    void run(async () => {
      await testimonialRepository.remove(testimonial);
      setMessage("Depoimento excluído.");
      await load();
    });
  };

  return { testimonials, busy, message, create, togglePublished, updateOrder, remove };
}
