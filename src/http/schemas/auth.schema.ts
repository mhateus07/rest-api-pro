 import { z } from "zod";

const passwordStrongRegex =
  /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(passwordStrongRegex, "Senha deve ter 1 letra maiúscula e 1 número"),
});

export const authenticateSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});
