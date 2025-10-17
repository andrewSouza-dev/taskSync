import { Handler } from "express";
import jwt from "jsonwebtoken";

export class AuthMiddleware {
  static verify : Handler = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Token ausente" });

    const token = header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).user = decoded;
      next();
    } catch {
      res.status(401).json({ error: "Token inválido" });
    }
  }
}
  