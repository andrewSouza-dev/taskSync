import { Handler } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number,
  email: string
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string };
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
      };

      next();

    } catch (error) {
      res.status(401).json({ error: "Token inválido" });
    }
  }
}
  