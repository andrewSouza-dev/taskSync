import { Task, UserTask } from "../../../generated/prisma";
import { prisma } from "../../database";
import { UserTaskRepository } from "../userTaskRepository";


export class PrismaUserTaskRepository implements UserTaskRepository {
  // 🔹 Buscar todas as tasks de um usuário
  async findAllByUser(userId: number): Promise<Task[]> {
    return prisma.task.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        users: true, //  incluir dados da relação
      },
    });
  }


  // 🔹 Buscar uma task específica de um usuário
  async findByIdTaskAndUser(userId: number, taskId: number): Promise<UserTask | null> {
    return prisma.userTask.findUnique({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
      },
      include: {
        task: true, // opcional: traz também os dados da task
        user: true, // idem
      },
    });
  }


  // 🔹 Criar/associar task a um usuário
  async createTaskByUser(userId: number, taskId: number, role: string = "MEMBER"): Promise<UserTask> {
      return await prisma.userTask.create({
        data: {
          userId,
          taskId,
          role,
        },
        include: {
          task: true,
          user: true,
        },
      });
  }

  // 🔹 Atualizar task de um usuário (role ou campos do relacionamento)
  async updateUserTask(userId: number, taskId: number, role?: string): Promise<UserTask> {
    return prisma.userTask.update({
      where: { userId_taskId: { userId, taskId } },
      data: { role },
      include: {
        task: true,
        user: true
      }
    });
  }


  // 🔹 Deletar task de um usuário (sem deletar a task global)
  async deleteUserTask(userId: number, taskId: number): Promise<UserTask> {
    return prisma.userTask.delete({
      where: { userId_taskId: { userId, taskId } },
      include: {
        task: true,
        user: true
      }
    });
  }
}


