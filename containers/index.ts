import { PrismaUserRepository } from "../src/repositories/prisma/prismaUserRepository";
import { PrismaTaskRepository } from "../src/repositories/prisma/prismaTaskRepository";
import { PrismaUserTaskRepository } from "../src/repositories/prisma/prismaUserTaskRepository";
import { AuthService } from "../src/services/authService";
import { TaskService } from "../src/services/taskService";
import { UserTaskService } from "../src/services/userTaskService";
import { AuthController } from "../src/controllers/authController";
import { TaskController } from "../src/controllers/taskController";
import { UserTaskController } from "../src/controllers/userTaskController";

const userRepository = new PrismaUserRepository();
const taskRepository = new PrismaTaskRepository();
const userTaskRepository = new PrismaUserTaskRepository();

export const authService = new AuthService(userRepository);
export const taskService = new TaskService(taskRepository);
export const userTaskService = new UserTaskService(userTaskRepository, taskRepository);

export const authController = new AuthController(authService);
export const taskController = new TaskController(taskService);
export const userTaskController = new UserTaskController(userTaskService);