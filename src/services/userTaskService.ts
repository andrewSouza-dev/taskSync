import { UserTaskRepository } from "../repositories/userTaskRepository";
import { HttpError } from "../errors/HttpError";

export class UserTaskService {
  constructor(private readonly userTaskRepository: UserTaskRepository) {}

  async getTasksByUserId(userId: number) {
    const tasks = await this.userTaskRepository.findAllByUser(userId);
    return tasks;
  }

  async getTaskByUserAndTaskId(userId: number, taskId: number) {
    const userTask = await this.userTaskRepository.findByIdTaskAndUser(userId, taskId);

    if (!userTask) throw new HttpError(404, "Tarefa não encontrada para este usuário");

    return userTask;
  }

  async createUserTask(userId: number, taskId: number, role?: string) {
    return this.userTaskRepository.createTaskByUser(userId, taskId, role);
  }

  async updateUserTask(userId: number, taskId: number, role?: string) {
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