import { Router } from "express";
import prisma from "../database";
import { AuthController } from "../controllers/authController";

const router = Router();
const controller = new AuthController(prisma);

router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;