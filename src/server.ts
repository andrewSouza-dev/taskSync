import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router as authRoutes } from "./routes/authRoutes";
import { router as taskRoutes } from "./routes/taskRoutes";
import { router as userTaskRoutes } from "./routes/userTasksRoutes";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";

// 🔧 Carrega variáveis do .env
dotenv.config();

// 🚧 Usados no projeto em geral
const app: Application = express();
app.use(cors());
app.use(express.json());

// 🔌 Rotas principais
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userTaskRoutes);

// Tratar os possiveis erros das rotas
app.use(errorHandlerMiddleware);

// 🚪 Porta do Servidor
const PORT = process.env.PORT || 3000;

// 📎 Url do Servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});