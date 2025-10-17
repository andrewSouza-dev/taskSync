import { Handler } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/login
  login: Handler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // authService.login deve retornar algo como: { user, token }
      const result = await this.authService.login(email, password);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // POST /auth/register
  register: Handler = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await this.authService.register({ name, email, password });
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  // opcional: rota para obter dados do usuário autenticado (token -> req.user)
  me: Handler = async (req, res, next) => {
    try {
      const user = (req as any).user; // preenchido pelo middleware de autenticação
      if (!user) return res.status(401).json({ message: "Usuário não autenticado" });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  };
}