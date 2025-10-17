import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routerTask }  from "./routes/taskRoutes";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import { routerAuth } from "./routes/authRoutes";

// 🔧 Carrega variáveis do .env
dotenv.config();

// 🚧 Usados no projeto em geral
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(errorHandlerMiddleware);

// 🔌 Rotas principais
app.use("/api/task", routerTask);
app.use("/api/auth", routerAuth);

// 🚪 Porta do Servidor
const PORT = process.env.PORT || 3000;

// 📎 Url do Servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});