import { Router } from "express";
import { taskController } from "../../containers/taskContainer";

const routerTask = Router();

// ROUTER TASKS
routerTask.get("/", taskController.getAllTasks);
routerTask.get("/:id", taskController.showTask);
routerTask.post("/", taskController.createTask);
routerTask.put("/:id", taskController.updateTask);
routerTask.delete("/:id", taskController.deleteTask);


export { routerTask };