import { UserTaskRepository } from "../repositories/userTaskRepository";
import { HttpError } from "../errors/HttpError";
import { UserTask } from "../../generated/prisma";
import { TaskRepository } from "../repositories/taskRepository";
import { Prisma } from "@prisma/client";

interface CreateTaskForUserData {
  title: string,
  description: string,
  status?: string,
  role?: string
}

export class UserTaskService {
  constructor(
    private readonly userTaskRepository: UserTaskRepository,
    private readonly taskRepository: TaskRepository
  ) {}

  async getTasksByUserId(userId: number){
    const tasks = await this.userTaskRepository.findAllByUser(userId);
    return tasks;
  }


  async getTaskByUserAndTaskId(userId: number, taskId: number) {
    const userTask = await this.userTaskRepository.findByIdTaskAndUser(userId, taskId);

    if (!userTask) throw new HttpError(404, "Tarefa não encontrada para este usuário");

    return userTask;
  }


  async createUserTask(userId: number, data: CreateTaskForUserData) {
    const task = await this.taskRepository.create({
      title: data.title,
      description: data.description ?? "",
      status: (data.status as any) || "PENDING",
    })

    // associar a task ao user
    try {
      const userTask = await this.userTaskRepository.createTaskByUser(
      userId, 
      task.id,
      data.role ?? "MEMBER"
    );

    if (!userTask) throw new HttpError(500, "Erro ao associar usuário à tarefa");

    // 3️⃣ Retorna os dados completos
    return {
      ...userTask,
      task,
    };

    } catch (error: any) {
      // verificação genérica de erro de duplicidade (ou qualquer regra de negócio)
    if (error?.message?.includes("duplicado")) { 
        throw new HttpError(400, "Usuário já está vinculado a esta tarefa");
    }

    // qualquer outro erro é repassado
    throw new HttpError(500, "Erro interno ao vincular usuário à tarefa");
    } 
  }
    
    

  async updateUserTask(userId: number, taskId: number, role?: string): Promise<UserTask | null> {
    const existing = await this.userTaskRepository.findByIdTaskAndUser(userId, taskId);
    if (!existing) throw new HttpError(404, "Tarefa não encontrada para este usuário");

    return this.userTaskRepository.updateUserTask(userId, taskId, role);
  }


  async deleteUserTask(userId: number, taskId: number) {
    const existing = await this.userTaskRepository.findByIdTaskAndUser(userId, taskId);
    if (!existing) throw new HttpError(404, "Tarefa não encontrada para este usuário");

    return this.userTaskRepository.deleteUserTask(userId, taskId);
  }
}