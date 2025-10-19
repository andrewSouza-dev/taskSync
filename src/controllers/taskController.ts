import { Handler } from "express";
import { TaskService } from "../services/taskService";
import { CreateTaskRequestSchema, UpdateTaskRequestSchema } from "./schemas/taskRequestSchema";

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
      const data = CreateTaskRequestSchema.parse(req.body);

      const task = await this.taskService.create(data);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };

  updateTask: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const data = UpdateTaskRequestSchema.parse(req.body);

      const task = await this.taskService.update(id, data);
      res.json(task);
    } catch (error) {
      next(error);
    }
  };

  deleteTask: Handler = async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      const deleted = await this.taskService.delete(id);
      res.status(200).json({ deleted });
    } catch (error) {
      next(error);
    }
  };
}
