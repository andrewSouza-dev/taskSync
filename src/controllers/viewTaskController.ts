import { Handler } from "express";
import { TaskRepository } from "../repositories/taskRepository";
import { UserTaskService } from "../services/userTaskService";

export class ViewTaskController {
  constructor(
    private readonly taskService: TaskRepository,
    private readonly userTaskService: UserTaskService
  ) {}

  // Listar tasks do próprio usuário
  listByUser: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const tasks = await this.userTaskService.getTasksByUserId(userId);
      res.render("tasks/myTasks", { tasks, user: req.user });
    } catch (err) {
      next(err);
    }
  };

  // Formulário de criação
  createForm: Handler = (req, res) => {
    res.render("tasks/newTask", { title: "Criar Task", user: req.user });
  };

  // Criar task
  create: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const { title, description, status } = req.body;

      await this.userTaskService.createUserTask(userId, { title, description, status });
      res.redirect("/my-tasks");
    } catch (err) {
      next(err);
    }
  };

  // Mostrar detalhes da task
  show: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const taskId = Number(req.params.id);

      const userTask = await this.userTaskService.getTaskByUserAndTaskId(userId, taskId);
      res.render("tasks/show", { title: "Detalhes da Task", task: userTask.task, user: req.user });
    } catch (err) {
      next(err);
    }
  };

  // Formulário de edição
  editForm: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const taskId = Number(req.params.id);

      const userTask = await this.userTaskService.getTaskByUserAndTaskId(userId, taskId);
      res.render("tasks/editTask", { 
        title: "Editar Task",
        task: userTask.task,
        user: req.user });
    } catch (err) {
      next(err);
    }
  };

  // Atualizar task
  update: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const taskId = Number(req.params.id);
      const { title, description, status } = req.body;

      const userTask = await this.userTaskService.getTaskByUserAndTaskId(userId, taskId);

      await this.taskService.updateById(userTask.taskId, { title, description, status });
      res.redirect("/my-tasks");
    } catch (err) {
      next(err);
    }
  };

  // Deletar task
  delete: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const taskId = Number(req.params.id);

      const userTask = await this.userTaskService.getTaskByUserAndTaskId(userId, taskId);

      await this.taskService.deleteById(userTask.taskId);
      res.redirect("/my-tasks");
    } catch (err) {
      next(err);
    }
  };

  /* ===== Admin-only methods ===== */
  listAllTasks: Handler = async (req, res, next) => {
    try {
      const tasks = await this.taskService.findAll();
      res.render("admin/tasks/alltasks", { title: "Todas as Tasks", tasks, user: req.user });
    } catch (err) {
      next(err);
    }
  };

  listUserTasks: Handler = async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const tasks = await this.userTaskService.getTasksByUserId(userId);
      res.render("admin/users/user-task/userTasks", { title: "Tasks do Usuário", tasks, user: req.user });
    } catch (err) {
      next(err);
    }
  };

  createUserTask: Handler = async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const { title, description, status, role } = req.body;

      await this.userTaskService.createUserTask(userId, { 
        title, 
        description, 
        status, 
        role
      });
      res.redirect(`/users/${userId}/tasks`);
    } catch (err) {
      next(err);
    }
  };

  updateUserTask: Handler = async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const taskId = Number(req.params.taskId);
      const { role } = req.body;

      await this.userTaskService.updateUserTask(userId, taskId, role);
      res.redirect(`/users/${userId}/tasks`);
    } catch (err) {
      next(err);
    }
  };

  deleteUserTask: Handler = async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const taskId = Number(req.params.taskId);

      await this.userTaskService.deleteUserTask(userId, taskId);
      res.redirect(`/users/${userId}/tasks`);
    } catch (err) {
      next(err);
    }
  };  
  


  //* ===== manipular tasks globais como admin ===== */

  

  createGlobalForm: Handler = (req, res) => {
  res.render("admin/tasks/new", { title: "Criar Task Global", user: req.user });
  };  

  createGlobal: Handler = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !status) {
      return res.status(400).render("errors/error", {
        message: "Título e status são obrigatórios",
        user: req.user
      });
    }

    await this.taskService.create({ title, description, status });
    res.redirect("/tasks");
  } catch (err) {
    next(err);
  }
  };


  showGlobal: Handler = async (req, res, next) => {
  try {
    const rawId = req.params.id;
    const taskId = Number(rawId);

    if (!rawId || isNaN(taskId)) {
      return res.status(400).render("errors/error", {
        message: "ID da tarefa inválido",
        user: req.user
      });
    }

    const task = await this.taskService.findById(taskId);
    if (!task) {
      return res.status(404).render("errors/error", {
        message: "Task não encontrada",
        user: req.user
      });
    }

    res.render("admin/tasks/show", {
      title: "Detalhes da Task",
      task,
      user: req.user
    });
  } catch (err) {
    next(err);
    }
  };

  editGlobalForm: Handler = async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    const task = await this.taskService.findById(taskId);
    if (!task) return res.status(404).render("errors/error", { message: "Task não encontrada" });
    res.render("admin/tasks/edit", { title: "Editar Task", task, user: req.user });
  } catch (err) {
    next(err);
  }
  };

  updateGlobal: Handler = async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    const { title, description, status } = req.body;

    if (isNaN(taskId) || !title || !status) {
      return res.status(400).render("errors/error", {
        message: "Dados inválidos para atualização",
        user: req.user
      });
    }

    await this.taskService.updateById(taskId, { title, description, status });
    res.redirect(`/tasks/${taskId}`);
  } catch (err) {
    next(err);
  }
  };

  deleteTaskAsAdmin: Handler = async (req, res, next) => {
  try {
    const taskId = Number(req.params.id);
    await this.taskService.deleteById(taskId);
    res.redirect("/tasks");
  } catch (err) {
    next(err);
  }
  };

}


  
    
