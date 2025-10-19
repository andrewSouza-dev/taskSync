import { Task, UserTask } from "../../../generated/prisma";
import { prisma } from "../../database";
import { UserTaskRepository } from "../userTaskRepository";


export class PrismaUserTaskRepository implements UserTaskRepository {
  async findAllByUser(userId: number): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        users: true, // opcional: incluir dados da relação
      },
    });

    return tasks;
  }

  async findByIdTaskAndUser(userId: number, taskId: number): Promise<UserTask | null> {
    return await prisma.userTask.findUnique({
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
}