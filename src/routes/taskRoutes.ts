import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { PrismaTaskRepository } from "../repositories/prisma/prismaTaskRepository";
import { TaskService } from "../services/TaskService";

const routerTask = Router();

const taskRepository = new PrismaTaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);


routerTask.get("/", taskController.getAllTasks);
routerTask.get("/:id", taskController.showTask);
routerTask.post("/", taskController.createTask);
routerTask.put("/:id", taskController.updateTask);
routerTask.delete("/:id", taskController.deleteTask);

export default routerTask;