import { Router } from "express";
import { authController } from "../../containers";

const router = Router();

// ROUTER USERS 
router.post("/login", authController.login);
router.post("/register", authController.register);

export { router };