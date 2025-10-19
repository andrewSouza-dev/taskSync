import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { userTaskController } from "../../containers";

const router = Router();

// Todas as rotas protegidas
router.use(AuthMiddleware.verify);

// ROUTER UserTasks
router.get("/", userTaskController.getUserTasks);
router.get("/:taskId", userTaskController.getUserTaskById);
router.post("/:taskId", userTaskController.createUserTask)
router.put("/:taskId", userTaskController.updateUserTask)
router.delete("/:taskId", userTaskController.deleteUserTask)

export { router };