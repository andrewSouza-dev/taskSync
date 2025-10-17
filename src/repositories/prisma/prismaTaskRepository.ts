import prisma from "../../database";
import { TaskRepository } from "../taskRepository";
import { Prisma, Task } from "@prisma/client";

export class PrismaTaskRepository implements TaskRepository {
  async find(): Promise<Task[]> {
    return prisma.task.findMany();
  }

  async findById(id: number): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return prisma.task.create({ data });
  }

  async updateById(id: number, data: Partial<Prisma.TaskUpdateInput>): Promise<Task | null> {
    return prisma.task.update({ where: { id }, data });
  }

  async deleteById(id: number): Promise<Task | null> {
    return prisma.task.delete({ where: { id } });
  }
}