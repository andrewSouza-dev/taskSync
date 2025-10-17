import { Handler } from "express";
import { TaskService } from "../services/taskService";

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
      const task = await this.taskService.getTaskById(id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  createTask: Handler = async (req, res, next) => {
    try {
      const userId = Number(req.params.userId); // ou extraído do token JWT
      const { title } = req.body;

      const task = await this.taskService.createTask({ title, userId });
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  updateTask: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const data = req.body;
      const task = await this.taskService.updateTask(id, data);
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  deleteTask: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      await this.taskService.deleteTask(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
