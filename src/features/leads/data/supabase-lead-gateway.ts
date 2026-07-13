import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { leadSchema, type Lead } from "../domain/lead";

export async function sendLead(data: Lead) {
  const lead = leadSchema.parse(data);
  if (lead.website) return;
  if (!isSupabaseConfigured || !supabase) throw new Error("O formulário ainda não foi conectado ao Supabase.");
  const { error } = await supabase.from("leads").insert({ name: lead.name, email: lead.email, objective: lead.objective });
  if (error) throw new Error("Não foi possível enviar o contato.");
}
