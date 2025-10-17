import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { PrismaUserRepository } from "../repositories/prisma/prismaUserRepository";
import { AuthService } from "../services/AuthService";

const routerAuth = Router();

const userRepository = new PrismaUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

routerAuth.post("/login", authController.login);
routerAuth.post("/register", authController.register);

export default routerAuth;