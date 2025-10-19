import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { userTaskController } from "../../containers";

const router = Router();

// Todas as rotas protegidas
router.use(AuthMiddleware.verify);

// ROUTER UserTasks
router.get("/:userId/tasks", userTaskController.getUserTasks);
router.get("/:userId/tasks/:taskId", userTaskController.getUserTaskById);
router.post("/:userId/tasks", userTaskController.createUserTask)
router.put("/:userId/tasks/:taskId", userTaskController.updateUserTask)
router.delete("/:userId/tasks/:taskId", userTaskController.deleteUserTask)

export { router };