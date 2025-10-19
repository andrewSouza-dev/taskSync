import { Task, UserTask } from "../../generated/prisma";

export interface CreateTaskAttributes {
    title: string,
    description: string,
    status: TaskStatus
}

export type TaskStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED"
  
  
export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  create(data: CreateTaskAttributes): Promise<Task>;
  updateById(id: number, data: Partial<CreateTaskAttributes>): Promise<Task | null>;
  deleteById(id: number): Promise<Task | null>;
}