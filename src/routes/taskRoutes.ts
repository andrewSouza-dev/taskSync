import { Router } from "express";
import { prisma } from "../database";
import { TaskController } from "../controllers/taskController";

const routerTask = Router();
const taskController = new TaskController(prisma);

routerTask.get("/", taskController.getAllTasks);
routerTask.get("/:id", taskController.showTask);
routerTask.post("/", taskController.createTask);
routerTask.put("/:id", taskController.updateTask);
routerTask.delete("/:id", taskController.deleteTask);

export default routerTask;