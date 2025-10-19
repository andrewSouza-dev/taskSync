import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { userTaskController } from "../../containers";

const router = Router();

// Todas as rotas protegidas
router.use(AuthMiddleware.verify);

// ROUTER UserTasks
router.get("/tasks", userTaskController.getUserTasks);
router.get("/tasks/:taskId", userTaskController.getUserTaskById);
router.post("/tasks/:taskId", userTaskController.createUserTask)
router.put("tasks/:taskId", userTaskController.updateUserTask)
router.delete("/tasks/:taskId", userTaskController.deleteUserTask)

export { router };