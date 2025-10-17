import { TaskRepository } from "../repositories/taskRepository";
import { HttpError } from "../errors/HttpError";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAllTasks() {
    return this.taskRepository.findAll();
  }

  async show(id: number) {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new HttpError(404, "Tarefa não encontrada");
    return task;
  }

  async create(data: any, userId: number) {
    const task = await this.taskRepository.create(data);

    await this.taskRepository.linkUserToTask(userId, task.id);

    return task;
  }

  async update(id: number, data: any) {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new HttpError(404, "Tarefa não encontrada");
    return this.taskRepository.updateById(id, data);
  }

  async delete(id: number) {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new HttpError(404, "Tarefa não encontrada");
    return this.taskRepository.deleteById(id);
  }
}