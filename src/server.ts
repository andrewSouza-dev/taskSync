import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


import { router as authRoutes } from "./routes/authRoutes";
import { router as taskRoutes } from "./routes/taskRoutes";
import { router as userTaskRoutes } from "./routes/userTasksRoutes";
import { router as viewsRouter } from "./routes/viewsRoutes";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import { router as userRoutes } from "./routes/userRoutes";


// 🔧 Carrega variáveis do .env
dotenv.config();


const app: Application = express();


// 🚧 Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Necessário para formulários HTML


// Converte import.meta.url para caminho de arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Configuração das views (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 📂 Arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "public")));


// 🌐 Rotas REST (API)
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes); // apenas admins
app.use("/api/usersTasks", userTaskRoutes);


// 🖥️ Rotas das views
app.use("/", viewsRouter);


// 🧱 Middleware global de erro
app.use(errorHandlerMiddleware);


// 🚪 Porta do Servidor
const PORT = process.env.PORT || 3000;


// ▶️ Inicialização
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});