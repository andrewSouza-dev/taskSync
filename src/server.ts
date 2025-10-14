import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { taskRouter } from "./routes/taskRoutes";

// 🔧 Carrega variáveis do .env
dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

// 🔌 Rotas principais
app.use("/api/task", taskRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});