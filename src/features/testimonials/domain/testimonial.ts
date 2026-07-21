export type Testimonial = {
  id: string;
  image_url: string;
  image_path: string;
  alt_text: string;
  source: string;
  published: boolean;
  sort_order: number;
  created_at: string;
};

export type TestimonialDraft = Pick<
  Testimonial,
  "alt_text" | "source" | "published" | "sort_order"
>;
