import { Handler } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/login
  login: Handler = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login({ email, password });

      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // POST /auth/register
  register: Handler = async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
      const newUser = await this.authService.register({ name, email, password, role });

      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

}
