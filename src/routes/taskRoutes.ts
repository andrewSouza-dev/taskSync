import { Router } from "express";
import { taskController } from "../../containers";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Todas as rotas protegidas
router.use(AuthMiddleware.verify);

// ROUTER TASKS
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.showTask);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);






export { router };