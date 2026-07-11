import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Loader2, LogOut, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Product = { id: string; name: string; category: string; description: string; specifications: string; highlights: string; image_url: string | null; published: boolean; sort_order: number };
const empty = { name: "", category: "Musculação", description: "", specifications: "", highlights: "", image_url: "", published: true, sort_order: 0 };

export const Route = createFileRoute("/admin")({ component: Admin });

function Admin() {
  const [session, setSession] = useState<unknown>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase?.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const listener = supabase?.auth.onAuthStateChange((_event, value) => setSession(value));
    return () => listener?.data.subscription.unsubscribe();
  }, []);
  useEffect(() => { if (session) void loadProducts(); }, [session]);

  async function loadProducts() {
    const { data, error } = await supabase!.from("products").select("*").order("sort_order").order("name");
    if (error) setMessage(error.message); else setProducts(data ?? []);
  }
  async function login(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const { error } = await supabase!.auth.signInWithPassword({ email, password });
    if (error) setMessage("E-mail ou senha inválidos.");
    setBusy(false);
  }
  async function save(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const payload = { ...form, image_url: form.image_url || null };
    const result = editing
      ? await supabase!.from("products").update(payload).eq("id", editing)
      : await supabase!.from("products").insert(payload);
    if (result.error) setMessage(result.error.message);
    else { setForm(empty); setEditing(null); setMessage("Produto salvo com sucesso."); await loadProducts(); }
    setBusy(false);
  }
  async function upload(file: File) {
    setBusy(true);
    const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
    const { error } = await supabase!.storage.from("product-images").upload(path, file);
    if (error) setMessage(error.message);
    else setForm((value) => ({ ...value, image_url: supabase!.storage.from("product-images").getPublicUrl(path).data.publicUrl }));
    setBusy(false);
  }
  async function remove(id: string) {
    if (!confirm("Excluir este produto?")) return;
    const { error } = await supabase!.from("products").delete().eq("id", id);
    if (error) setMessage(error.message); else await loadProducts();
  }

  if (!ready) return <Center><Loader2 className="animate-spin" /></Center>;
  if (!session) return <Center><form onSubmit={login} className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-8"><h1 className="font-display text-2xl font-bold">Painel administrativo</h1><Input type="email" placeholder="E-mail" value={email} onChange={setEmail} /><Input type="password" placeholder="Senha" value={password} onChange={setPassword} />{message && <p className="text-sm text-destructive">{message}</p>}<button disabled={busy} className="w-full rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground">{busy ? "Entrando..." : "Entrar"}</button><Link to="/" className="block text-center text-sm text-muted-foreground">Voltar ao site</Link></form></Center>;

  return <main className="min-h-screen bg-background p-4 text-foreground md:p-8"><div className="mx-auto max-w-6xl"><header className="mb-8 flex items-center justify-between"><div><h1 className="font-display text-3xl font-bold">Produtos do catálogo</h1><p className="text-muted-foreground">Cadastre e publique equipamentos no site.</p></div><button onClick={() => supabase!.auth.signOut()} className="flex items-center gap-2 rounded-full border border-border px-4 py-2"><LogOut size={16}/> Sair</button></header>
    <form onSubmit={save} className="grid gap-4 rounded-2xl border border-border bg-card p-5 md:grid-cols-2"><Input placeholder="Nome do produto" value={form.name} onChange={(name) => setForm({...form,name})}/><Input placeholder="Categoria" value={form.category} onChange={(category) => setForm({...form,category})}/><Area placeholder="Descrição" value={form.description} onChange={(description) => setForm({...form,description})}/><Area placeholder="Especificações técnicas" value={form.specifications} onChange={(specifications) => setForm({...form,specifications})}/><Area placeholder="Destaques (um por linha)" value={form.highlights} onChange={(highlights) => setForm({...form,highlights})}/><div className="space-y-3"><label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border p-4"><Upload size={18}/> Enviar imagem<input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}/></label>{form.image_url && <img src={form.image_url} alt="Prévia" className="h-32 w-full rounded-xl object-contain"/>}<label className="flex gap-2"><input type="checkbox" checked={form.published} onChange={(e)=>setForm({...form,published:e.target.checked})}/> Publicado</label></div><div className="md:col-span-2 flex gap-2"><button disabled={busy} className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"><Plus size={18}/>{editing ? "Atualizar" : "Cadastrar"}</button>{editing && <button type="button" onClick={()=>{setEditing(null);setForm(empty)}} className="rounded-full border border-border px-6">Cancelar</button>}</div>{message && <p className="md:col-span-2 text-sm">{message}</p>}</form>
    <div className="mt-8 grid gap-3">{products.map((p)=><article key={p.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">{p.image_url ? <img src={p.image_url} alt="" className="h-16 w-20 rounded-lg object-contain"/>:<div className="h-16 w-20 rounded-lg bg-muted"/>}<div className="min-w-0 flex-1"><h2 className="font-bold">{p.name}</h2><p className="text-sm text-muted-foreground">{p.category} · {p.published ? "Publicado" : "Rascunho"}</p></div><button aria-label="Editar" onClick={()=>{setEditing(p.id);setForm({...p,image_url:p.image_url??""});scrollTo({top:0,behavior:"smooth"})}} className="p-2"><Pencil size={18}/></button><button aria-label="Excluir" onClick={()=>remove(p.id)} className="p-2 text-destructive"><Trash2 size={18}/></button></article>)}</div></div></main>;
}

function Center({children}:{children:React.ReactNode}) { return <main className="grid min-h-screen place-items-center bg-background p-4 text-foreground">{children}</main> }
function Input({value,onChange,...props}:{value:string;onChange:(v:string)=>void;type?:string;placeholder:string}) { return <input {...props} required value={value} onChange={(e)=>onChange(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"/> }
function Area({value,onChange,placeholder}:{value:string;onChange:(v:string)=>void;placeholder:string}) { return <textarea placeholder={placeholder} value={value} onChange={(e)=>onChange(e.target.value)} rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"/> }
