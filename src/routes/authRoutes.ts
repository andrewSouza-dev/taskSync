import { Router } from "express";
import { authController } from "../../containers/userContainer";

const routerAuth = Router();

// ROUTER USERS 
routerAuth.post("/login", authController.login);
routerAuth.post("/register", authController.register);

export { routerAuth };