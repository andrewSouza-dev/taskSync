import { z } from "zod";

// Schema para validação do campo 'role'
export const UserTaskRoleSchema = z.object({
  role: z.string().optional(),
});