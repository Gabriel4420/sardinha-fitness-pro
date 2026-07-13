export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: string;
  highlights: string;
  image_url: string | null;
  published: boolean;
  sort_order: number;
};

export type ProductDraft = Omit<Product, "id" | "image_url"> & { image_url: string };

export const EMPTY_PRODUCT: ProductDraft = {
  name: "",
  category: "Musculação",
  description: "",
  specifications: "",
  highlights: "",
  image_url: "",
  published: true,
  sort_order: 0,
};
