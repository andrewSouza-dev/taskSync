import { Handler } from "express";
import { TaskRepository, CreateTaskAttributes, TaskStatus } from "../repositories/taskRepository";
import { Task } from "../../generated/prisma";

export class ViewTaskController {
  constructor(private readonly taskService: TaskRepository) {}

  // 📝 Listar todas as tarefas
  listAllTasks: Handler = async (req, res, next) => {
    try {
      const tasks: Task[] = await this.taskService.findAll();
      res.render("tasks/tasks", { title: "Tarefas", tasks });
    } catch (error) {
      next(error);
    }
  };

  // 🧩 Exibir formulário de criação
  createForm: Handler = (req, res) => {
    res.render("tasks/newTask", { title: "Criar Tarefa" });
  };

  // 🆕 Criar nova tarefa
  create: Handler = async (req, res, next) => {
    try {
      const { title, description, status } = req.body as CreateTaskAttributes;
      await this.taskService.create({ title, description, status });
      res.redirect("/tasks");
    } catch (error) {
      next(error);
    }
  };

  // 👀 Exibir detalhes de uma tarefa
  show: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const task: Task | null = await this.taskService.findById(id);
      if (!task) return res.status(404).send("Tarefa não encontrada");
      res.render("tasks/show", { title: "Detalhes da Tarefa", task });
    } catch (error) {
      next(error);
    }
  };

  // 🗑️ Excluir tarefa
  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      await this.taskService.deleteById(id);
      res.redirect("/tasks");
    } catch (error) {
      next(error);
    }
  };
}