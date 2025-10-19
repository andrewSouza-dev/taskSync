import { AuthController } from "../src/controllers/authController";
import { PrismaUserRepository } from "../src/repositories/prisma/prismaUserRepository";
import { AuthService } from "../src/services/authService";

export const userRepository = new PrismaUserRepository();
export const authService = new AuthService(userRepository);
export const authController = new AuthController(authService);