import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { PrismaUserRepository } from "../repositories/prisma/prismaUserRepository";
import { AuthService } from "../services/AuthService";

const routerAuth = Router();



routerAuth.post("/login", authController.login);
routerAuth.post("/register", authController.register);

export default routerAuth;