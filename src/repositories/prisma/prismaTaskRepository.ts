import { prisma } from "../../prisma/client";
import { TaskRepository, CreateTaskDTO, UpdateTaskDTO } from "../taskRepository";
import { Task } from "@prisma/client";

export class PrismaTaskRepository implements TaskRepository {
  async findAll(): Promise<Task[]> {
    return prisma.task.findMany();
  }

  async findById(id: number): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  async create(data: CreateTaskDTO): Promise<Task> {
    return prisma.task.create({ data });
  }

  async updateById(id: number, data: UpdateTaskDTO): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: number): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}