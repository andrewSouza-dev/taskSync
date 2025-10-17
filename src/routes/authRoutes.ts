import { Router } from "express";
import { prisma } from "../database";
import { AuthController } from "../controllers/authController";

const routerAuth = Router();
const authController = new AuthController(prisma);

routerAuth.post("/login", authController.login);
routerAuth.post("/register", authController.register);

export default routerAuth;