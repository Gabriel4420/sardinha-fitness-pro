import { useEffect, useMemo, useReducer, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { EMPTY_PRODUCT, type Product, type ProductDraft } from "../domain/product";
import { productRepository } from "../data/product-repository";

type EditorState = { form: ProductDraft; editing: string | null; busy: boolean; message: string };
type EditorAction =
  | { type: "patch"; value: Partial<ProductDraft> }
  | { type: "edit"; product: Product }
  | { type: "reset" }
  | { type: "busy"; value: boolean }
  | { type: "message"; value: string };

const initialEditor: EditorState = { form: EMPTY_PRODUCT, editing: null, busy: false, message: "" };
function editorReducer(state: EditorState, action: EditorAction): EditorState {
  if (action.type === "patch") return { ...state, form: { ...state.form, ...action.value } };
  if (action.type === "edit") return { ...state, editing: action.product.id, form: { ...action.product, image_url: action.product.image_url ?? "" } };
  if (action.type === "reset") return { ...state, form: EMPTY_PRODUCT, editing: null };
  if (action.type === "busy") return { ...state, busy: action.value };
  return { ...state, message: action.value };
}

export function useAdminController() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState(false);
  const [editor, dispatch] = useReducer(editorReducer, initialEditor);

  async function loadProducts() {
    try { setProducts(await productRepository.list()); } catch (error) { dispatch({ type: "message", value: (error as Error).message }); }
  }
  useEffect(() => {
    void supabase?.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const listener = supabase?.auth.onAuthStateChange((_event, value) => setSession(value));
    return () => listener?.data.subscription.unsubscribe();
  }, []);
  useEffect(() => { if (session) void loadProducts(); }, [session]);

  const filtered = useMemo(() => products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase())), [products, search]);
  async function run(task: () => Promise<void>) {
    dispatch({ type: "busy", value: true }); dispatch({ type: "message", value: "" });
    try { await task(); } catch (error) { dispatch({ type: "message", value: (error as Error).message }); }
    finally { dispatch({ type: "busy", value: false }); }
  }
  const login = (event: FormEvent) => { event.preventDefault(); void run(async () => { const { error } = await supabase!.auth.signInWithPassword(credentials); if (error) throw new Error("E-mail ou senha inválidos."); }); };
  const save = (event: FormEvent) => { event.preventDefault(); void run(async () => { await productRepository.save(editor.form, editor.editing); dispatch({ type: "message", value: editor.editing ? "Alterações salvas." : "Produto cadastrado." }); dispatch({ type: "reset" }); await loadProducts(); }); };
  const upload = (file: File) => void run(async () => dispatch({ type: "patch", value: { image_url: await productRepository.uploadImage(file) } }));
  const remove = (id: string) => { if (confirm("Excluir este produto do catálogo?")) void run(async () => { await productRepository.remove(id); await loadProducts(); }); };
  const edit = (product: Product) => { dispatch({ type: "edit", product }); scrollTo({ top: 0, behavior: "smooth" }); };

  return { session, ready, credentials, setCredentials, products, filtered, categories: new Set(products.map((p) => p.category)).size, search, setSearch, menu, setMenu, ...editor, patchForm: (value: Partial<ProductDraft>) => dispatch({ type: "patch", value }), resetForm: () => dispatch({ type: "reset" }), login, save, upload, remove, edit };
}
