import { sendLead } from "@/features/leads/data/supabase-lead-gateway";
import { leadSchema } from "@/features/leads/domain/lead";
import { motion } from "framer-motion";
import { Loader2, Mail, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { fadeUp } from "../../helpers/motion";
import { Section } from "../ui/section";

export function Contato() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [values, setValues] = useState({ name: "", email: "", objective: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; objective?: string }>({});
  const [errorMsg, setErrorMsg] = useState<string>("");

  function validate() {
    const result = leadSchema.safeParse({ ...values, website: "" });
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: typeof errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof typeof errors;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    setErrors(fieldErrors);
    return false;
  }

  function updateField(field: "name" | "email" | "objective", value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMsg("");
    if (!validate()) {
      setStatus("error");
      setErrorMsg("Corrija os campos destacados antes de enviar.");
      return;
    }
    const form = event.currentTarget;
    const website = String(new FormData(form).get("website") || "");
    setStatus("loading");
    try {
      await sendLead({ ...values, website });
      form.reset();
      setValues({ name: "", email: "", objective: "" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.",
      );
    }
  }

  const baseField =
    "mt-2 w-full rounded-xl border bg-background/70 px-4 py-3.5 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:ring-2";
  const fieldClass = (hasError?: boolean) =>
    `${baseField} ${
      hasError
        ? "border-destructive focus:border-destructive focus:ring-destructive/20"
        : "border-border focus:border-primary focus:ring-primary/20"
    }`;
  return (
    <Section id="contato" className="bg-card/30">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <div className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Prefere e-mail?
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Conte seu objetivo e receba um{" "}
            <span className="text-gradient-primary">atendimento personalizado</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Preencha os dados ao lado. Vou analisar sua necessidade e entrar em contato para ajudar
            a encontrar os equipamentos ideais para o seu projeto.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
              <Mail className="w-5 h-5" />
            </span>
            Resposta direta no seu e-mail, sem compromisso.
          </div>
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-elegant"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="text-sm font-medium">
              Nome
              <input
                className={fieldClass(!!errors.name)}
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Seu nome"
                maxLength={100}
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                onBlur={validate}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
              />
              {errors.name && (
                <span id="err-name" className="mt-1.5 block text-xs text-destructive">
                  {errors.name}
                </span>
              )}
            </label>
            <label className="text-sm font-medium">
              E-mail
              <input
                className={fieldClass(!!errors.email)}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                maxLength={160}
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                onBlur={validate}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && (
                <span id="err-email" className="mt-1.5 block text-xs text-destructive">
                  {errors.email}
                </span>
              )}
            </label>
          </div>
          <label className="mt-5 block text-sm font-medium">
            Qual é o seu objetivo?
            <textarea
              className={`${fieldClass(!!errors.objective)} min-h-32 resize-y`}
              name="objective"
              placeholder="Ex.: montar uma academia de condomínio, renovar equipamentos do studio..."
              maxLength={1500}
              value={values.objective}
              onChange={(e) => updateField("objective", e.target.value)}
              onBlur={validate}
              aria-invalid={!!errors.objective}
              aria-describedby={errors.objective ? "err-objective" : undefined}
            />
            {errors.objective && (
              <span id="err-objective" className="mt-1.5 block text-xs text-destructive">
                {errors.objective}
              </span>
            )}
          </label>
          <input
            className="hidden"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-6 py-4 font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01] disabled:cursor-wait disabled:opacity-70"
          >
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {status === "loading" ? "Enviando..." : "Enviar meu contato"}
          </button>
          <div aria-live="polite" className="mt-4 min-h-5 text-center text-sm">
            {status === "success" && (
              <p className="text-primary">Contato enviado! Em breve retorno para você.</p>
            )}
            {status === "error" && errorMsg && <p className="text-destructive">{errorMsg}</p>}
          </div>
        </motion.form>
      </div>
    </Section>
  );
}
