import { Router } from "express";
import { UserTaskController } from "../controllers/userTaskController";
import { UserTaskService } from "../services/userTaskService";
import { PrismaUserTaskRepository } from "../repositories/prisma/prismaUserTaskRepository";
import { authController } from "../../containers/userContainer";

const router = Router();

const userTaskRepo = new PrismaUserTaskRepository();
const userTaskService = new UserTaskService(userTaskRepo);
const userTaskController = new UserTaskController(userTaskService);

router.get("/users/:userId/tasks", authController, userTaskController.getUserTasks);
router.get("/users/:userId/tasks/:taskId", authController, userTaskController.getUserTaskById);

export default router;