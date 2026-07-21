import { supabase } from "@/lib/supabase";
import type { Testimonial, TestimonialDraft } from "../domain/testimonial";

const BUCKET = "testimonial-images";
const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

function validateImage(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("Selecione um arquivo de imagem válido.");
  if (file.size > MAX_IMAGE_SIZE) throw new Error("A imagem deve ter no máximo 8 MB.");
}

export const testimonialRepository = {
  async list(): Promise<Testimonial[]> {
    const { data, error } = await supabase!
      .from("testimonials")
      .select("*")
      .order("sort_order")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async listPublished(): Promise<Testimonial[]> {
    const { data, error } = await supabase!
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("sort_order")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  async create(file: File, draft: TestimonialDraft) {
    validateImage(file);
    const extension =
      file.name
        .split(".")
        .pop()
        ?.replace(/[^a-zA-Z0-9]/g, "") || "jpg";
    const imagePath = `${crypto.randomUUID()}.${extension}`;
    const bucket = supabase!.storage.from(BUCKET);
    const { error: uploadError } = await bucket.upload(imagePath, file, {
      contentType: file.type,
      upsert: false,
    });
    if (uploadError) throw uploadError;

    const imageUrl = bucket.getPublicUrl(imagePath).data.publicUrl;
    const { error } = await supabase!.from("testimonials").insert({
      ...draft,
      image_url: imageUrl,
      image_path: imagePath,
    });
    if (error) {
      await bucket.remove([imagePath]);
      throw error;
    }
  },

  async update(id: string, changes: Partial<TestimonialDraft>) {
    const { error } = await supabase!.from("testimonials").update(changes).eq("id", id);
    if (error) throw error;
  },

  async remove(testimonial: Testimonial) {
    const { error } = await supabase!.from("testimonials").delete().eq("id", testimonial.id);
    if (error) throw error;
    const { error: storageError } = await supabase!.storage
      .from(BUCKET)
      .remove([testimonial.image_path]);
    if (storageError) throw storageError;
  },
};
