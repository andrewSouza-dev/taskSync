import { Router } from "express";
import prisma from "../database";
import { TaskController } from "../controllers/taskController";

const router = Router();
const controller = new TaskController(prisma);

router.get("/", controller.getAllTasks);
router.get("/:id", controller.showTask);
router.post("/", controller.createTask);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

export default router;