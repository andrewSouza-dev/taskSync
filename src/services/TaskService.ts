import { CreateTaskAttributes, TaskRepository } from "../repositories/taskRepository";
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

  async create(data: CreateTaskAttributes, userId: number) {
    const task = await this.taskRepository.create({
      ...data,
      status: data.status || "PENDING"
    });

    await this.taskRepository.linkUserToTask(userId, task.id);

    return task;
  }

  async update(id: number, data: Partial<CreateTaskAttributes>) {
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