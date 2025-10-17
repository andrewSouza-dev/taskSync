import { Handler } from "express";
import { TaskService } from "../services/TaskService";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  getAllTasks: Handler = async (req, res, next) => {
    try {
      const tasks = await this.taskService.getAllTasks();

      res.json(tasks);
    } catch (error) {
      next(error);
    }
  };

  showTask: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const task = await this.taskService.show(id);

      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  createTask: Handler = async (req, res, next) => {
    try {
      const userId = Number(req.params.userId); // ou extraído do token JWT
      const data = req.body;

      const task = await this.taskService.create(data, userId);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  updateTask: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;

      const task = await this.taskService.update(id, data);
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  deleteTask: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      await this.taskService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
