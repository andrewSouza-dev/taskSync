import { CreateTaskAttributes, TaskRepository } from "../repositories/taskRepository";
import { HttpError } from "../errors/HttpError";
import { Task } from "../../generated/prisma";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  
  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async show(id: number): Promise<Task | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new HttpError(404, "Tarefa não encontrada");
    return task;
  }

  async create(data: CreateTaskAttributes): Promise<Task>{
    if (!data.title) throw new HttpError(400, "O título da tarefa é obrigatório.");
    const task = await this.taskRepository.create({
      ...data,
      status: data.status || "PENDING"
    });

    return task;
  }

  async update(id: number, data: Partial<CreateTaskAttributes>): Promise<Task | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new HttpError(404, "Tarefa não encontrada");
    return this.taskRepository.updateById(id, data);
  }

  async delete(id: number): Promise<Task | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new HttpError(404, "Tarefa não encontrada");
    return this.taskRepository.deleteById(id);
  }
}