import { Handler } from "express";
import { UserTaskService } from "../services/userTaskService";
import { UserTaskRoleSchema } from "./schemas/userTaskRoleSchema";

export class UserTaskController {
  constructor(private readonly userTaskService: UserTaskService) {}

  // 🔹 Buscar todas as tasks de um usuário
  getUserTasks: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.id // do JWT ou param
      const tasks = await this.userTaskService.getTasksByUserId(userId);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  // 🔹 Buscar uma task específica de um usuário
  getUserTaskById: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const taskId = Number(req.params.taskId);

      const userTask = await this.userTaskService.getTaskByUserAndTaskId(userId, taskId);
      res.json(userTask);
    } catch (error) {
      next(error);
    }
  };

  // 🔹 Criar/associar uma task ao usuário logado
  createUserTask: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const taskId = Number(req.params.taskId);
      const { role } = UserTaskRoleSchema.parse(req.body);

      const userTask = await this.userTaskService.createUserTask(userId, taskId, role);
      res.status(201).json(userTask);
    } catch (err) {
      next(err);
    }
  };

  // 🔹 Atualizar role de uma task do usuário logado
  updateUserTask: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const taskId = Number(req.params.taskId);
      const { role } = UserTaskRoleSchema.parse(req.body);

      const updated = await this.userTaskService.updateUserTask(userId, taskId, role);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  // 🔹 Deletar uma task do usuário logado
  deleteUserTask: Handler = async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const taskId = Number(req.params.taskId);

      await this.userTaskService.deleteUserTask(userId, taskId);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}