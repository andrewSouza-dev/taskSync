import { prisma } from "../../database";
import { TaskRepository, CreateTaskAttributes } from "../taskRepository";
import { Task, UserTask } from "../../../generated/prisma";

export class PrismaTaskRepository implements TaskRepository {
  async findAll(): Promise<Task[]> {
    return prisma.task.findMany();
  }

  async findById(id: number): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  async create(data: CreateTaskAttributes): Promise<Task> {
    return prisma.task.create({ data });
  }

  async updateById(id: number, data: Partial<CreateTaskAttributes>): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: number): Promise<Task | null> {
    return prisma.task.delete({ where: { id } });
  }

  async linkUserToTask(userId: number, taskId: number): Promise<UserTask> {
    return prisma.task.linkUserToTask({ userId, taskId })
  }
}