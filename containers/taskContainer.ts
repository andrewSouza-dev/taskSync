import { TaskController } from "../src/controllers/taskController";
import { PrismaTaskRepository } from "../src/repositories/prisma/prismaTaskRepository";
import { TaskService } from "../src/services/taskService";

export const taskRepository = new PrismaTaskRepository();
export const taskService = new TaskService(taskRepository);
export const taskController = new TaskController(taskService);