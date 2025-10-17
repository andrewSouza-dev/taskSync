import { Router } from "express";
import prisma from "../database";
import { TaskController } from "../controllers/taskController";

const routerTask = Router();
const controller = new TaskController(prisma);

routerTask.get("/", controller.getAllTasks);
routerTask.get("/:id", controller.showTask);
routerTask.post("/", controller.createTask);
routerTask.put("/:id", controller.updateTask);
routerTask.delete("/:id", controller.deleteTask);

export default routerTask;