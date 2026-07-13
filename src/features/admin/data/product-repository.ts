import { supabase } from "@/lib/supabase";
import type { Product, ProductDraft } from "../domain/product";

export const productRepository = {
  async list(): Promise<Product[]> {
    const { data, error } = await supabase!.from("products").select("*").order("sort_order").order("name");
    if (error) throw error;
    return data ?? [];
  },
  async save(draft: ProductDraft, id?: string | null) {
    const payload = { ...draft, image_url: draft.image_url || null };
    const result = id
      ? await supabase!.from("products").update(payload).eq("id", id)
      : await supabase!.from("products").insert(payload);
    if (result.error) throw result.error;
  },
  async remove(id: string) {
    const { error } = await supabase!.from("products").delete().eq("id", id);
    if (error) throw error;
  },
  async uploadImage(file: File) {
    const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
    const bucket = supabase!.storage.from("product-images");
    const { error } = await bucket.upload(path, file);
    if (error) throw error;
    return bucket.getPublicUrl(path).data.publicUrl;
  },
};
