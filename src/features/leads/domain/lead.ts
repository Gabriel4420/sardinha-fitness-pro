import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo (mínimo 2 caracteres).").max(100),
  email: z.string().trim().min(1, "Informe seu e-mail.").email("E-mail inválido.").max(160),
  objective: z.string().trim().min(10, "Descreva seu objetivo com pelo menos 10 caracteres.").max(1500),
  website: z.string().max(0).optional(),
});

export type Lead = z.infer<typeof leadSchema>;
