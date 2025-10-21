import { UserTaskRepository } from "../repositories/userTaskRepository";
import { HttpError } from "../errors/HttpError";
import { Task, TaskStatus, UserRole, UserTask } from "../../generated/prisma";
import { TaskRepository } from "../repositories/taskRepository";

interface CreateTaskForUserData {
  title: string,
  description: string,
  status: TaskStatus,
  role?: UserRole
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


  async createUserTask(userId: number, data: CreateTaskForUserData): Promise<Task> {
    const task = await this.taskRepository.create({
      title: data.title,
      description: data.description,
      status: data.status,
    })

    // associar a task ao user
    try {
      await this.userTaskRepository.createTaskByUser(
      userId, 
      task.id,
      data.role ?? "MEMBER"
    );

     return task;
  
    } catch (error: any) {
      // verificação genérica de erro de duplicidade (ou qualquer regra de negócio)
    if (error.code === "P2002") { 
        throw new HttpError(400, "Usuário já está vinculado a esta tarefa");
    }

    // qualquer outro erro é repassado
    throw new HttpError(500, "Erro interno ao vincular usuário à tarefa");
    } 
  }
    
    

  async updateUserTask(userId: number, taskId: number, role?: UserRole ): Promise<UserTask | null> {
    const existing = await this.userTaskRepository.findByIdTaskAndUser(userId, taskId);
    if (!existing) throw new HttpError(404, "Tarefa não encontrada para este usuário");

    // Só envia role se definido
    const data: { role?: UserRole } = {};
    if (role) data.role = role;

    return this.userTaskRepository.updateUserTask(userId, taskId, role);
  }


  async deleteUserTask(userId: number, taskId: number) {
    const existing = await this.userTaskRepository.findByIdTaskAndUser(userId, taskId);
    if (!existing) throw new HttpError(404, "Tarefa não encontrada para este usuário");

    return this.userTaskRepository.deleteUserTask(userId, taskId);
  }
}