import { Handler } from "express";
import { UserTaskService } from "../services/userTaskService";

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
}