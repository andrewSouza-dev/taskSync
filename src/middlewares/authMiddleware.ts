import { Handler } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number,
  email: string,
  role: "ADMIN" | "MEMBER"
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string; role: "ADMIN" | "MEMBER" };
    }
  }
}
export class AuthMiddleware {

  static  verify : Handler = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Token ausente" });

    const token = header.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
       // Atribui os dados do token ao req.user (agora tipado)
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };

      next();

    } catch (error) {
      res.status(401).json({ error: "Token inválido" });
    }
  }


  static isAdmin: Handler = async (req, res, next) => {
    const user = req.user;

    if (!user) return res.status(401).json({ message: "Não autenticado!"});

    if (user.role !== "ADMIN") return res.status(403).json({ message: "Acesso negado: Admins apenas"})
      
    next();
  }
}
  