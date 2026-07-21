create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  image_path text not null,
  alt_text text not null default 'Print de depoimento de cliente',
  source text not null default 'WhatsApp',
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "Published testimonials are public" on public.testimonials
for select to anon, authenticated using (published or public.is_admin());
create policy "Admins insert testimonials" on public.testimonials
for insert to authenticated with check (public.is_admin());
create policy "Admins update testimonials" on public.testimonials
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins delete testimonials" on public.testimonials
for delete to authenticated using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('testimonial-images', 'testimonial-images', true)
on conflict (id) do update set public = true;

create policy "Testimonial images are public" on storage.objects
for select to public using (bucket_id = 'testimonial-images');
create policy "Admins upload testimonial images" on storage.objects
for insert to authenticated with check (bucket_id = 'testimonial-images' and public.is_admin());
create policy "Admins update testimonial images" on storage.objects
for update to authenticated using (bucket_id = 'testimonial-images' and public.is_admin());
create policy "Admins delete testimonial images" on storage.objects
for delete to authenticated using (bucket_id = 'testimonial-images' and public.is_admin());

grant select on public.testimonials to anon, authenticated;
grant insert, update, delete on public.testimonials to authenticated;
