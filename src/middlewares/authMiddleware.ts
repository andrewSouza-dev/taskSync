import jwt from "jsonwebtoken";

export class authMiddleware {
    constructor (private readonly ) {}

    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "Token não fornecido" });

    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;
        next();
  } catch {
        res.status(401).json({ error: "Token inválido" });
  }
};

  