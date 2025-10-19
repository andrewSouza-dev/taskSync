import { CreateTaskAttributes, TaskRepository } from "../repositories/taskRepository";
import { HttpError } from "../errors/HttpError";
import { Task } from "../../generated/prisma";

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

  async create(data: CreateTaskAttributes){
    if (!data.title) throw new HttpError(400, "O título da tarefa é obrigatório.");
    const task = await this.taskRepository.create({
      ...data,
    });

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