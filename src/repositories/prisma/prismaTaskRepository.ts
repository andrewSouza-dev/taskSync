import { prisma } from "../../database";
import { TaskRepository, CreateTaskAttributes } from "../taskRepository";
import { Task, UserTask } from "../../../generated/prisma";

export class PrismaTaskRepository implements TaskRepository {
  async findAll(): Promise<Task[]> {
    return prisma.task.findMany({
      include: { users: true },
    });
  }

  async findById(id: number): Promise<Task | null> {
    return prisma.task.findUnique({ 
      where: { id },
      include: { users: true } 
    });
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
    const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return null;

  await prisma.userTask.deleteMany({ where: { taskId: id } });

  return prisma.task.delete({ where: { id } }) 
  }

  /** 🔹 Buscar todas as tasks associadas a um usuário específico */
  async findAllByUser(userId: number): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
      users: {
        some: { userId } 
         } 
        }, include: {
          users: true
      },
      orderBy: { id: "desc" }
  });
}}