import { Handler } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
  email: string;
  role: "ADMIN" | "MEMBER";
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string; role: "ADMIN" | "MEMBER" };
    }
  }
}

export class AuthMiddleware {
  static verify: Handler = async (req, res, next) => {
    try {
      // 🔍 tenta pegar o token do cookie ou do header
      const token =
        req.cookies?.token ||
        (req.headers.authorization && req.headers.authorization.split(" ")[1]);

      if (!token) {
        return res
          .status(401)
          .render("errors/error", { message: "Token ausente ou sessão expirada" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      // ✅ define req.user e res.locals.user (acessível no EJS)
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };
      res.locals.user = req.user;

      next();
    } catch (error) {
      console.error("Erro no middleware de autenticação:", error);
      res.locals.user = null;
      return res
        .status(401)
        .render("errors/error", { message: "Token inválido ou expirado" });
    }
  };

  static isAdmin: Handler = (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).render("errors/error", { message: "Não autenticado!" });
    }

    if (user.role !== "ADMIN") {
      return res
        .status(403)
        .render("errors/error", { message: "Acesso negado: apenas administradores" });
    }

    next();
  };
}
