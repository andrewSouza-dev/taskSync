import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routerTask  from "./routes/taskRoutes";
import routerAuth from "./routes/authRoutes";

// 🔧 Carrega variáveis do .env
dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

// 🔌 Rotas principais
app.use("/api/task", routerTask);
app.use("/api/auth", routerAuth);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});