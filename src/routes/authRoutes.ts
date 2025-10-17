import { Router } from "express";
import { prisma } from "../database";
import { AuthController } from "../controllers/authController";

const routerAuth = Router();
const controller = new AuthController(prisma);

routerAuth.post("/login", controller.login);
routerAuth.post("/register", controller.register);

export default routerAuth;