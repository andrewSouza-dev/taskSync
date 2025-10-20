import { CreateTaskAttributes, TaskRepository } from "../repositories/taskRepository";
import { HttpError } from "../errors/HttpError";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  
  async findAll() {
    return this.taskRepository.findAll();
  }

  async findById(id: number) {
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

  async updateById(id: number, data: Partial<CreateTaskAttributes>) {
    const task = await this.taskRepository.updateById(id, data);
    if (!task) throw new HttpError(404, "Tarefa não encontrada");
    return this.taskRepository.updateById(id, data);
  }

  async deleteById(id: number) {
    const task = await this.taskRepository.deleteById(id);
    if (!task) throw new HttpError(404, "Tarefa não encontrada");
    return this.taskRepository.deleteById(id);
  }
}