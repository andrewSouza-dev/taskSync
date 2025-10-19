import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { userTaskController } from "../../containers";

const router = Router();

// Todas as rotas protegidas
router.use(AuthMiddleware.verify);

// ROUTER UserTasks
router.get("/users/:userId/tasks", userTaskController.getUserTasks);
router.get("/users/:userId/tasks/:taskId", userTaskController.getUserTaskById);

export { router };