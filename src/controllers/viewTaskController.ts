import { Handler } from "express";
import { TaskRepository, CreateTaskAttributes, TaskStatus } from "../repositories/taskRepository";
import { Task, UserTask } from "../../generated/prisma";
import { UserTaskService } from "../services/userTaskService";

export class ViewTaskController {
  constructor(
    private readonly taskService: TaskRepository,
    private readonly userTaskService: UserTaskService

  ) {}

  // 📝 Listar todas as tarefas
  listAllTasks: Handler = async (req, res, next) => {
    try {
      const tasks: Task[] = await this.taskService.findAll();
      res.render("tasks/tasks", { title: "Tarefas", tasks });
    } catch (error) {
      next(error);
    }
  };

  listByUser: Handler = async (req, res, next) => {
    try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).render("errors/error", { 
        title: "Erro", 
        message: "Usuário não autenticado." 
      });
    }

    const tasks: Task[] = await this.taskService.findAllByUser(userId);
    
    res.render("tasks/myTasks", { 
      title: "Minhas Tarefas", 
      tasks, 
      user: req.user 
    });
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

  editForm: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await this.taskService.findById(Number(id));
      if (!task) return res.status(404).render("errors/404");
      res.render("tasks/editTask", { title: "Editar Tarefa", task });
    } catch (error) {
      next(error)
    }
    
  }

  update: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const updated = await this.taskService.updateById(Number(id), { title, description, status });
      if (!updated) return res.status(404).render("errors/404");
      res.redirect("/tasks");
    } catch (error) {
      next(error)
    }
    
  }

  // 🗑️ Excluir tarefa
  delete: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const deleted = await this.taskService.deleteById(id);
      if (!deleted) return res.status(404).render("errors/404");
      res.redirect("/tasks");
    } catch (error) {
      next(error);
    }
  };


   // ===== CRUD DE USER-TASKS (ADMIN) =====

  // Listar tasks de um usuário
  listUserTasks: Handler = async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const tasks: UserTask[] = await this.userTaskService.getTasksByUserId(userId);
      res.render("tasks/userTasks", { title: "Tasks do Usuário", tasks, userId });
    } catch (error) {
      next(error);
    }
  };

  // Criar task para usuário
  createUserTask: Handler = async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const { title, description, status, role } = req.body;
      await this.userTaskService.createUserTask(userId, { title, description, status, role });
      res.redirect(`/users/${userId}/tasks`);
    } catch (error) {
      next(error);
    }
  };

  // Atualizar role da task de usuário
  updateUserTask: Handler = async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const taskId = Number(req.params.taskId);
      const { role } = req.body;
      await this.userTaskService.updateUserTask(userId, taskId, role);
      res.redirect(`/users/${userId}/tasks`);
    } catch (error) {
      next(error);
    }
  };

  // Deletar associação task-usuário
  deleteUserTask: Handler = async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const taskId = Number(req.params.taskId);
      await this.userTaskService.deleteUserTask(userId, taskId);
      res.redirect(`/users/${userId}/tasks`);
    } catch (error) {
      next(error);
    }
  };
}
