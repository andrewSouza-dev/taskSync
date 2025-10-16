import { optional, z } from "zod";

export const CreateTaskRequestSchema = z.object({
    title: z.string(),
    description: z.string(),
  //  status: TaskStatusSchema.optional(),
})

export const UpdateTaskRequestSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
})

const TaskStatusSchema = z.enum({
  //  "PENDING",
  //  "RUNNING",
   // "COMPLETED",
  //  "FAILED",
})


