import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { PrismaTaskRepository } from "../repositories/prisma/prismaTaskRepository";
import { TaskService } from "../services/TaskService";

const routerTask = Router();




routerTask.get("/", taskController.getAllTasks);
routerTask.get("/:id", taskController.showTask);
routerTask.post("/", taskController.createTask);
routerTask.put("/:id", taskController.updateTask);
routerTask.delete("/:id", taskController.deleteTask);

export default routerTask;