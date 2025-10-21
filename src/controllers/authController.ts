import { Handler } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/login
  login: Handler = async (req, res) => {
    try {
      const { email, password } = req.body;
      const {user: SafeUser, token } = await this.authService.login({ email, password });

      // Salva o token JWT em cookie HTTP-only
      res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 }); // 1 hora

      // Renderiza a tela de dashboard
      return res.status(200).render("dashboard", {
        user: {
          name: SafeUser.name,
          email: SafeUser.email,
          role: SafeUser.role,
        },
      });
    } catch (error: unknown) {
      let message = "Email ou senha incorretos";

      if (error instanceof Error) {
      message = error.message;
    
      res.status(400).render("errors/error", { message });
      }
    }
  };

  // POST /auth/register
  register: Handler = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const newUser = await this.authService.register({ name, email, password, role });

      return res.status(201).render("success", {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });
    } catch (error: unknown) {
      let message = "Erro ao registrar usuário";
      if (error instanceof Error) message = error.message;
      res.status(401).render("errors/error", { message });
    }
  };

  // GET /logout
  logout: Handler = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
  };

}
