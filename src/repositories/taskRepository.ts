import { Task, Prisma } from "@prisma/client";

export interface TaskRepository {
  find(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  create(data: Prisma.TaskCreateInput): Promise<Task>;
  updateById(id: number, data: Partial<Prisma.TaskUpdateInput>): Promise<Task | null>;
  deleteById(id: number): Promise<Task | null>;
}