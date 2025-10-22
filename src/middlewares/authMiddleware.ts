import { Handler } from "express";
import jwt from "jsonwebtoken";
import { userTaskService } from "../../containers";


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
          .render("errors/error", { 
            message: "Token ausente ou sessão expirada",
            user: res.locals.user || null
          });
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
      res.locals.user = req.user;
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


  static isMemberOrOwner: Handler = async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const taskId = parseInt(req.params.id);

    // Se for admin, libera tudo
    if (req.user!.role === "ADMIN") return next();

    // Member: só se for dono da task
    const task = await userTaskService.getTaskByUserAndTaskId(userId, taskId);
    if (!task) {
      return res.status(403).send("Você não tem permissão para acessar esta task.");
    }
    
    next();
  } catch (err) {
    next(err);
  }
  };
}
