import { z } from "zod";

const TaskStatusSchema = z.enum([
    "PENDING",
    "RUNNING",
    "COMPLETED",
    "FAILED",
])

export const CreateTaskRequestSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: TaskStatusSchema
})

export const UpdateTaskRequestSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
})




