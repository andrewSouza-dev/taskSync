import { z } from "zod";

const nameSchema = z.string().trim().min(2, { message: "O nome deve ter pelo menos 2 caracteres" });
const emailSchema = z.string().trim().email(({ message: "E-mail inválido" })).trim();
const passwordSchema = z.string()
  .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
  .regex(/[A-Z]/, { message: "A senha deve conter ao menos uma letra maiúscula" })
  .regex(/[0-9]/, { message: "A senha deve conter ao menos um número" });

// Schema de criação
export const CreateUserRequestSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Schema de atualização (campos opcionais)
export const UpdateUserRequestSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
});


// Para usar no service de users
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;